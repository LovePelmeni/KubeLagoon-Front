<script>
import  { loadStripe } from "@stripe/stripe-js";
import { h } from "vue";

let Logger = require("pino")()

class CheckoutBillCalculator {
    // Calculating Price for the Payment Checkout Bill 

    constructor(Currency, BillInformation) {
        this.currency = Currency
        this.BillInformation = BillInformation 
    }
    CalculateTotal() {
        // Calculating Total Checkout Price (in Cents)
        let TotalPrice = 0
        for (let Server in this.BillInformation.Metadata.Servers) {
            TotalPrice += Number(Server.TotalCost)
        }
        return {
            "Quantity": this.BillInformation.Metadata.Servers.length(),
            "TotalCost": TotalPrice * 100,
        }
    }
} 


class PaymentSessionControllerManager {

    // Controller for Managing the Payment Session Requests

    constructor(self, PaymentMethodInformation)  {
        this.self = self 
        this.PaymentMethodInformation = PaymentMethodInformation
    }
    InitializePaymentMethodRequest() {
        // Initializing New Payment Method Request 
        try {
        let BillCostInformation = new CheckoutBillCalculator("usd", this.PaymentMethodInformation).CalculateTotal()
        let PaymentMethodSession = this.self.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
                line_items: [{
                    price_data: {
                        currency: "USD",
                        product_data: {
                            servers: this.PaymentMethodInformation["Metadata"]["Servers"],
                        },
                        unit_amount: BillCostInformation.TotalCost, // setting up the total cost in cents
                    },
            quantity: BillCostInformation.Quantity,
        }],
        mode: "payment",
        success_url: `http://${process.env.BACKEND_APPLICATION_HOST}:${process.env.BACKEND_APPLICATION_PORT}/payment/success/page/`,
        cancel_url: `http://${process.env.BACKEND_APPLICATION_HOST}:${process.env.BACKEND_APPLICATION_PORT}/payment/cancel/page/`,
        })
        return PaymentMethodSession.id
        } catch(Exception) {
            this.self.paymentFailed = true 
            this.self.paymentError = "Failed to Perform Payment"
            return null 
        }
    }
}

import { mapMutations, mapState } from "vuex";
import { onMounted } from '@vue/runtime-core';

export default {
    name: "PaymentFormView",
    mounted() {
        this.CreatePaymentSession()
    },
    setup() {
        let stripe = null;  // Initializing the Stripe Module 
        let SecretStripeAccessKey = process.env.STRIPE_SECRET_KEY // grabbing the Stripe Secret key from the Environment Variables
        onMounted(async() => {
            stripe = await loadStripe(String(SecretStripeAccessKey)) // loading the Stripe Module 
        });
        return stripe
    },
    data() {
        return {
            paymentSucceeded: false,
            paymentCanceled: false, 
            paymentFailed: false,
            paymentError: '',
        }
    },
    render(){
        return h()
    },
    methods: {
        ...mapMutations(["SAVE_PAYMENT_INTENT_CHECKOUT"]),
        CreatePaymentSession() {
            // Method is being called, once the Payment has been Initialized Successfully
            // * Initializing Payment Session 
            let PaymentSessionManager = new PaymentSessionControllerManager(this, {
                "Metadata": {
                    "Servers": this.Bill.Metadata.Servers
                }
            })
            let PaymentSessionId = PaymentSessionManager.InitializePaymentMethodRequest()  // Receiving the Payment Session Id 
            this.stripe.redirectToCheckout({session_id: PaymentSessionId}) // Redirecting to the Form 
            .then(function(sessionResponse) {
                // Processing the Payment Session Response 
                switch(sessionResponse) {
                    case sessionResponse.error:
                        Logger.error(`Failed to Confirm Payment Session, Error Has Occurred.
                        ${sessionResponse.error}`)
                        this.TOGGLE_PAYMENT_FAILED() // Toggling Payment To Be Marked As Failure, to trigger an event  
                        this.TOGGLE_PAYMENT_FAILED() // Toggling it Back to False
                        break;

                    case sessionResponse.paymentIntent:
                        Logger.debug(`Payment Session has been confirmed successfully`)
                        this.SAVE_PAYMENT_INTENT_CHECKOUT(sessionResponse.paymentIntent) // saving the payment intent info to the vuex store 
                        // Stripe going to automatically redirect the request to the Success Page, if the Payment have been done successfully
                        break; 
                    default:
                        Logger.debug("Unknown Payment Session Response") 
                        break;
                }   
            }) 
        },
    },
    computed: {
        ...mapState(["Bill"]),
    },
}

</script>