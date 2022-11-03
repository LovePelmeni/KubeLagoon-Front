<script>

import * as stripe from "stripe";
import PaymentBehaviourBanner from "../components/PaymentBehaviourBanner.vue";
import * as crypto from "crypto";
import * as jwt from "jose";

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

class PaymentMethodControllerManager {

    // Controller for Managing the Payment Session Requests

    constructor(self, PaymentMethodInformation, JwtToken)  {
        this.self = self 
        this.PaymentMethodInformation = PaymentMethodInformation
        this.JwtToken = JwtToken
    }
    getCustomerCredentials() {
        // Getting the Information from the Jwt Token 
        return jwt.decodeJwt(this.JwtToken)
    }
    InitializePaymentMethodRequest() {
        // Initializing New Payment Method Request  
        let CustomerInformation = this.getCustomerCredentials()
        let PaymentMethod = stripe.createPaymentMethod({
            type: "card",
            card: "",   
            billing_details: {
                name: CustomerInformation["Username"],
                email: CustomerInformation["Email"]
            }
        })
        return PaymentMethod["method_id"]
    }
}

class RefundControllerManager {
    // Controller for managing the Refund Requests
    constructor(self, paymentId) {
        this.self = self
        this.paymentId = paymentId
    }
    InitializeRefundRequest() {
        // Initializing the Refund Request 
        let Refund = new stripe.createRefund(this.paymentId, null, null)
        Refund.on('failure', function() {
            // Checking the Failure events for the Refund 
        }) 
        Refund.on('success', function() {
            // Checking the Success events for the Refund 
        })
        Refund.on('cancel', function() {
            // checking the Cancel event for the Refund 
        })
    }
}

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
        },
    },
}
</script>


<style lang="scss">

.paymentForm {
    background-color: #141414;
}

</style>
