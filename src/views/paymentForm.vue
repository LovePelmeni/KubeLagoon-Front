<script>

import * as stripe from "stripe";
import PaymentBehaviourBanner from "../components/PaymentBehaviourBanner.vue";

class CheckoutBillCalculator {
    // Calculating Price for the Payment Checkout Bill 
    constructor(Currency, BillInformation) {
        this.currency = Currency
        this.BillInformation = BillInformation 
    }
    CalculateTotal() {
        // Calculating Total Checkout Price 
        let TotalPrice = 0
        for (let Server in this.BillInformation.Metadata.Servers) {
            TotalPrice += Number(Server.TotalCost)
        }
        return {
            "Quantity": this.BillInformation.Metadata.Servers.length(),
            "TotalCost": TotalPrice,
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
        let PaymentMethodSession = stripe.checkout.sessions.create({
            payment_method_types: ["card"],
                line_items: [{
                    price_data: {
                        currency: "USD",
                        product_data: {
                            servers: this.PaymentMethodInformation["Metadata"]["Servers"],
                        },
                        unit_amount: BillCostInformation.TotalCost, // setting up the total cost
                    },
            quantity: BillCostInformation.Quantity,
        }],
        mode: "payment",
        success_url: `http://${env.BACKEND_APPLICATION_HOST}:${env.BACKEND_APPLICATION_PORT}/payment/success/page/`,
        cancel_url: `http://${env.BACKEND_APPLICATION_HOST}:${env.BACKEND_APPLICATION_PORT}/payment/cancel/page/`,
        })
        return PaymentMethodSession.id
        } catch(Exception) {
            this.self.paymentFailed = true 
            this.self.paymentError = "Failed to Perform Payment"
            return null 
        }
    }
}

class PaymentIntentManager {
    // Class, responsible for implementing the payment intent 
    constructor(PaymentSession) {
        this.PaymentSession = PaymentSession
    }
    CreatePaymentIntent() {
        // Creating the Payment Intent, returns the Id of the Stripe Payment Intent Object 
    }
}

class PaymentSessionConfirmationManager {
    // Class, responsible for confirming the Payment Session Requests 
    ConfirmPaymentRequest(PaymentIntentId) {
        // Confirming the Payment Session Request 
        stripe.confirmPayment(PaymentIntentId).then(function(resultEvent){
            switch (resultEvent) {
                case resultEvent.error: 
                    pass 
                case resultEvent.paymentIntent:
                    pass 
            }
        })
    }
}
import { loadStripe } from "stripe";

export default {
    name: "PaymentWindowView",
    template: `
    <template>
        <div class="paymentForm"> 
            <!-- Payment Window -->
        </div>
        <button class="btn btn-pay" @click="Pay">
        <payment-behaviour-banner v-if="paymentCanceled" :ReasonError="You Canceled the Payment, Want to repeat?" /> 
        <payment-behaviour-banner v-if="paymentFailed" :ReasonError="paymentError" /> 
    </template>
    `,
    setup() {
        stripe = null; 
        onMounted(async () => {
            stripe = await loadStripe()
        })
    },
    components: {
        PaymentBehaviourBanner,
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
        CreatePaymentSession() {
            // Method is being called, once the Payment has been Initialized Successfully
            // * Initializing Payment Session 
            let PaymentSessionManager = new PaymentSessionControllerManager(this, {
                "Metadata": {
                    "ServerName": Bill.Metadata.ServerName,
                    "ServerType": Bill.Metadata.ServerType,
                }
            })
            let PaymentSessionId = PaymentSessionManager.InitializePaymentMethodRequest()  // Receiving the Payment Session Id 
            stripe.redirectToCheckout({session_id: PaymentSessionId}) // Redirecting to the Form 
            .then(function(sessionResponse) {
                if (sessionResponse.error != null) {
                this.paymentError = sessionResponse.error; this.paymentFailed = true}
            }) 
            this.paymentFailed = false 
            this.paymentError = null
        },
        CreatePaymentIntent() {
            // Method is being called, once the Payment Session is being Initialized Successfully 
        },
        ConfirmPayment() {
            // Confirming the Payment, once the Customer has filled out the Payment Form, and submitted it up
        },
    },
    computed: {
        ...mapState(["Bill"]),
    }
}
</script>


<style lang="scss">

.paymentForm {
    background-color: #141414;
}

</style>
