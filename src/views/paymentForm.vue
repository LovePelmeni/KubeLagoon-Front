<script>

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
        let PaymentMethodSession = this.stripe.checkout.sessions.create({
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
import { loadStripe } from "@stripe/stripe-js";

export default {
    name: "PaymentFormView",
    mounted() {
        this.CreatePaymentSession()
    },
    created() {
        var STRIPE_SECRET_KEY = String(process.env.STRIPE_SECRET_KEY) // parsing the stripe secret key from the environment variables
        loadStripe(STRIPE_SECRET_KEY)
    },
    data() {
        return {
            paymentSucceeded: false,
            paymentCanceled: false, 
            paymentFailed: false,
            paymentError: '',
        }
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


<style lang="scss">

.paymentForm {
    background-color: #141414;
}

</style>
