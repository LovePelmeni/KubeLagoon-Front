<template>
    
<div class="paymentCardForm">
    <div class="cardNumberReferenceField" ref="creditCardNumber">
        <v-form> 
            <v-text-field placeholder="Username" v-model="Username">
                {{ CustomerUsername }}
            </v-text-field>

            <v-text-field placeholder="Email" v-model="Email">
                {{ CustomerEmail }}
            </v-text-field>

            <v-text-field placeholder="Phone" v-model="PhoneNumber">
                {{ PhoneNumber }}
            </v-text-field>

            <v-text-field placeholder="Total Amount" v-model="TotalAmount">
                {{ CheckoutInfo.TotalAmount }}
            </v-text-field>
            
            <!--  Divider between the blocks -->
            <v-divider></v-divider> 

            <div class="checkoutFormItems">
                <checkout-form-items :Items="Bill.Metadata.Servers" />
            </div>
            <!-- Stripe Payment Element -->
            <div class="payment-element">
            </div>

        </v-form>
        <v-btn class="formSubmitButton btn">Pay</v-btn>
    </div>

</div>
    
</template>

<script>

import  { loadStripe } from "@stripe/stripe-js";
import { h } from "vue";

let Logger = require("pino")()

let FRONTEND_APPLICATION_HOST = process.env.FRONTEND_APPLICATION_HOST
let FRONTEND_APPLICATION_PORT = process.env.FRONTEND_APPLICATION_PORT

class CheckoutBillCalculator {
    // Calculating Price for the Payment Checkout Bill 

    constructor(Currency, BillInformation) {
        this.currency = Currency
        this.BillInformation = BillInformation 
    }
    CalculateTotalInCents() {
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


class PaymentIntentManager {

    // Controller for Managing the Payment Session Requests

    constructor(self, PaymentMethodInformation)  {
        this.self = self 
        this.PaymentMethodInformation = PaymentMethodInformation
    }
    InitializePaymentIntentRequest() {
        // Initializing New Payment Method Request 
        try {
            let Currency = "usd";
            let BillCostInformation = new CheckoutBillCalculator("usd", 
            this.PaymentMethodInformation).CalculateTotalInCents()
            
            let PaymentIntent = this.self.stripe.paymentIntents.create({
                payment_method_types: ["card"],
                amount: BillCostInformation.TotalCost,
                currency: Currency,
            })
            return PaymentIntent.id
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
        this.InitializePaymentElement()
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
            paymentIntentSecret: null,
            paymentElements: null,
            paymentSucceeded: false,
            paymentCanceled: false, 
            paymentFailed: false,
            paymentError: '',
        }
    },
    created() {
        this.InitializePaymentElement()
    },
    render(){
        return h()
    },
    methods: {
        ...mapMutations(["SAVE_PAYMENT_INTENT_CHECKOUT"]),

        ShowPaymentStatusMessage(Message, Type) {
            // Processing the Payment Status Message
            Logger.debug("Message Event has been Activated, " + JSON.stringify(
            {message: Message, Type: Type}))
        },

        SubmitPaymentForm() {
            // Submitting the Payment Form 
            this.ConfirmPayment()
        },
        ConfirmPayment() {
            // Confirming the Payment
            let elements = this.$data.paymentElements
            let ResponseError = this.stripe.confirmPaymentIntent({
                elements,
                confirm: {
                    return_url: `http://${FRONTEND_APPLICATION_HOST}:${FRONTEND_APPLICATION_PORT}/payment/success/page/`
                }
            })
            let SuccessType = "success"
            let ErrorType = "error"
            let ProcessingType = "processing"
            let UndefinedType = "undefined"
            let paymentIntent = this.stripe.retrievePaymentIntent(this.$data.paymentIntentSecret)

            switch (ResponseError.type) {
        
                case "succeeded":
                    // Processing the Response with Successful Payment 
                    this.ShowPaymentStatusMessage("Your payment has been processed", SuccessType)
                    Logger.debug("Payment with Credentials" + JSON.stringify(ResponseError), "has been succeeded")
                    break

                case "processing":
                    // Processing the Response with the Payment
                    this.ShowPaymentStatusMessage("", ProcessingType)
                    Logger.debug("Payment with Credentials" + JSON.stringify(paymentIntent), "has been processing")
                    break

                case "requires_payment_method":
                    // Processing the Response with Unsuccessful Response Type
                    this.ShowPaymentStatusMessage("", ErrorType)
                    Logger.debug("Payment with Credentials" + JSON.stringify(paymentIntent), "has been failed")
                    break

                default:
                    // Processing the Other type of the Response Errors
                    this.ShowPaymentStatusMessage("", UndefinedType)
                    Logger.debug("Payment with Credentials" + JSON.stringify(paymentIntent), "has been in undefined state") 
                    break
            }
        },

        InitializePaymentElement() {
            // Initializing Payment Element, based on the Component HTML Pattern 
            let ElementTheme = {theme: "dark"}
            let stripePaymentCardElement = "payment-element"; // ID of the Stripe Payment Card Element
            let NewPaymentIntentId = new PaymentIntentManager(this, this.Bill).InitializePaymentIntentRequest()
            let StripeFormElements = this.stripe.elements({ElementTheme, NewPaymentIntentId})
            this.$data.paymentElements = StripeFormElements
            this.$data.paymentIntentSecret = NewPaymentIntentId

            // Mouting the Stripe Integration inside the Vue Template 
            StripeFormElements.create('payment')
            StripeFormElements.mount('#' + stripePaymentCardElement)
        },
    },
    computed: {
        ...mapState(["Bill"]),
    },
}


</script>

<style lang="scss">
.formSubmitButton {
    // Submitting the Form Button 
    background-color: green;
    border-radius: 10px 10px 10px 10px;
}
</style>