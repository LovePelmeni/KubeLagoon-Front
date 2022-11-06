<script>

let Logger = require("pino")()
import * as stripe from "stripe";
import PaymentBehaviourBanner from "../components/PaymentBehaviourBanner.vue";

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
        let PaymentMethodSession = stripe.checkout.sessions.create({
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
// When the Customer get's Redirected to this Page
import { loadStripe } from "stripe";

export default {
    name: "PaymentWindowView",
    setup() {
        stripe = null; 
        onMounted(async () => {
            stripe = await loadStripe()
        })
    },
    components: {
        PaymentBehaviourBanner,
    },
    mounted() {
        this.CreatePaymentSession()
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
            stripe.redirectToCheckout({session_id: PaymentSessionId}) // Redirecting to the Form 
            .then(function(sessionResponse) {
                // Processing the Payment Session Response 
                switch(sessionResponse) {
                    case sessionResponse.error:
                        Logger.error(`Failed to Confirm Payment Session, Error Has Occurred.
                        ${sessionResponse.error}`)

                    case sessionResponse.paymentIntent:
                        Logger.debug(`Payment Session has been confirmed successfully`)
                        this.SAVE_PAYMENT_INTENT_CHECKOUT(sessionResponse.paymentIntent) // saving the payment intent info to the vuex store 
                }
            }) 
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
