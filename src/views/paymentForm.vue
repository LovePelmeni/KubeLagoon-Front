<script>

import * as stripe from "stripe";
import PaymentBehaviourBanner from "../components/PaymentBehaviourBanner.vue";
import * as crypto from "crypto";

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

class PaymentIntentControllerManager {
    // Cotnroller for Managing the Payment Intent Requests 
    constructor(PaymentInformation) {
        this.PaymentInformation = PaymentInformation
    }
    GeneratePaymentIntentCode() {
        // Generates payment Intent Random code, for payment request identification 
        return crypto.randomUUID()
    }
    SendFinalPaymentRequest() {
        // Initializing Payment Request 
        let newPayment = new stripe.PaymentRequest({
            country: this.PaymentInformation["country"],
            currency: this.PaymentInformation["currency"],
            total: {
                label: `payment_bill_${this.GeneratePaymentIntentCode()}`,
                amount: this.PaymentInformation["amount"]
            },
            requestPayerName: true,
            requestPayerEmail: true
        })
        newPayment.on('cancel', function(){
            this.self.paymentCanceled = true
        })
        newPayment.on('success', function() {
            this.self.paymentSucceeded = true
        })
        newPayment.on('failure', function(event) {
            this.self.paymentFailed = true
            this.self.paymentError = event
        })
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
        Pay() {
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
