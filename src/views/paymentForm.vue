<template>
  <body>
      <div class="paymentFormComponent" style="display: flex; justify-content: center; margin-top: 5%;">
        <section>
            <form class="payment-form" style="background-color: #1e2139;" @submit.prevent="SubmitPaymentForm">
                <input type="text" class="paymentFormField" id="customerUsername" placeholder="Username" v-model="customer.Username" />
                <input type="text" class="paymentFormField" id="customerPhoneNumber" placeholder="Phone" v-model="customer.PhoneNumber" />
                <input type="text" class="paymentFormField" id="customerEmail" placeholder="Email address" v-model="customer.Email" />
                <div id="card-element" class="paymentFormField"><!--Stripe.js injects the Card Element--></div>
                <button id="paymentButton" class="btn btn-payment-form" style="margin-top: 40px;" type="submit">
                  <div class="spinner hidden" id="spinner"></div>
                  <label id="button-text" style="color: #fff; opacity: 1; margin-left: 20px; margin-right: 20px; margin-top: 5px;">Pay</label>
                </button>
                <p id="card-error" role="alert"></p>
                <p class="result-message hidden" v-if="paymentSucceeded">
                  Payment succeeded
                </p>
                <p class="error-result-message hidden result-message" v-if="paymentFailed">
                  Payment Failed, {{ paymentError }}
                </p>
            </form>
        </section>
      </div>
  </body>
</template>

<script>

let PAYMENT_APPLICATION_HOST = process.env.PAYMENT_APPLICATION_HOST || 'localhost'
let PAYMENT_APPLICATION_PORT = process.env.PAYMENT_APPLICATION_PORT || 8009

const PaymentFormStyle = {
      base: {
        backgroundColor: "#141625",
        color: "#fff",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
};

import { h } from "vue";
let Logger = require("pino")()

let FRONTEND_APPLICATION_HOST = process.env.FRONTEND_APPLICATION_HOST || 'localhost'
let FRONTEND_APPLICATION_PORT = process.env.FRONTEND_APPLICATION_PORT || String(8080)

class CheckoutBillCalculator {
    // Calculating Price for the Payment Checkout Bill 

    constructor(Currency, BillInformation) {
        this.currency = Currency
        this.BillInformation = BillInformation 
    }
    CalculateTotalInCents() {
        // Calculating Total Checkout Price (in Cents)
        return {
            "Quantity": 1,
            "TotalCost": this.BillInformation.Metadata.Server.TotalUsageCost,
        }
    }
}

class PaymentIntentInitializationError extends Error {
  constructor(ErrorObject) {
    super(ErrorObject);
    this.Error = ErrorObject;
  }
  GetReason() {
    // Returns the Error Description 
    return this.Error
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
            let APIUrl = new URL(`http://${PAYMENT_APPLICATION_HOST}:${PAYMENT_APPLICATION_PORT}/create/payment/intent/`)
            let Response = global.jQuery.ajax({
              url: APIUrl.toString(),
              type: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": `http://${FRONTEND_APPLICATION_HOST}:${FRONTEND_APPLICATION_PORT}`,
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Headers": "*",
              },
              data: JSON.stringify({
                "Amount": BillCostInformation.TotalCost, 
                "Currency": Currency,
                "CustomerData": this.self.customer,
              }), 
              error: function(error) {
                // Processing the Exception 
                console.log(error);
                throw new PaymentIntentInitializationError(
                "Failed to Initialize New Payment Intent");
              },
              success: function(response) {
                if (String(response.statusCode[0]) == "2") {
                  // Processing the Successful Response 
                  console.log(response.responseJSON['intentSecret'])
                  return response.responseJSON["intentSecret"]
                }else{
                  let newError = 'undefined error'
                  // Processing the Unsuccessful Respons
                  console.log(response.responseJSON["exception"])
                  if ('error' in Object.keys(response.responseJSON)) {
                    newError = response.responseJSON["error"]
                  }
                 console.log("Error occurred", newError)
                 throw new PaymentIntentInitializationError(newError)
                }
              }
            })
            console.log(Response)
            return Response
            } catch(Exception) {
                console.log(Exception)
                Logger.debug("Failed to Initialize New Payment Intent, [ERROR]: " + Exception)
                throw Exception
            }
      }
}

import { mapMutations, mapState } from "vuex";
import { loadStripe } from '@stripe/stripe-js';

export default {
    name: "PaymentFormView",
    data() {
        return {
            // Customer Data 
            Username: null,
            Email: null,
            PhoneNumber: null,

            // Component Local Properties Data 
            stripe: null,
            paymentIntentSecret: null,
            paymentElements: null,
            paymentSucceeded: false,
            paymentCanceled: false, 
            paymentFailed: false,
            paymentError: '',
        }
    },
    render(){
        return h()
    },
    async mounted() {
      await this.InitializePaymentElement()
    },
    methods: {
        ...mapMutations(["SAVE_PAYMENT_INTENT_CHECKOUT"]),
        async InitializeStripeModule() {
          // Initializes Stripe Module 
          let PublicStripeKey = process.env.STRIPE_PUBLIC_KEY // grabbing the Stripe Secret key from the Environment Variables
          console.log(PublicStripeKey)
          let stripe = await loadStripe(String('pk_test_51KbRPhBlXqCTWmcHsFZwLrEBFIuQGGmDmXol9YMB66mSmoJM0OKsOcNQC4aPGxJ3xpRrfRMbDxF1GuFrsgUmX59Z006uU7xcuq'))
          this.$data.stripe = stripe
        },  
        ShowPaymentStatusMessage(Message, Type) {
            // Processing the Payment Status Message
            Logger.debug("Message Event has been Activated, " + JSON.stringify(
            {message: Message, Type: Type}))
        },

        async SubmitPaymentForm() {
            // Submitting the Payment Form 
            await this.ConfirmPayment()
        },

        async ConfirmPayment() {
            // Confirming the Payment Intent
    
            let cardElement = this.$data.paymentElements
            let ResponseError = await this.$data.stripe.confirmPayment(cardElement, {
              confirmParams: {
                // return_url: project final route thankyou.vue
                return_url: `http://${FRONTEND_APPLICATION_HOST}:${FRONTEND_APPLICATION_PORT}/payment/success/page/`,
                shipping: {
                  address: {
                    city: this.customer.City,
                    line1: this.customer.Street,
                    postal_code: this.customer.ZipCode,
                    country: this.customer.Country,
                  },
                  username: `${this.customer.Username}`,
                  email: `${this.customer.Email}`,
                  phone: this.customer.PhoneNumber,
                }
              }
            })

            let SuccessType = "success"
            let ErrorType = "error"
            let ProcessingType = "processing"
            let UndefinedType = "undefined"
            let paymentIntent = this.$data.stripe.retrievePaymentIntent(this.$data.paymentIntentSecret)

            switch (ResponseError.type) {
        
                case "succeeded":
                    // Processing the Response with Successful Payment 
                    this.ShowPaymentStatusMessage("Your payment has been processed", SuccessType)
                    Logger.debug("Payment with Credentials" + JSON.stringify(ResponseError), "has been succeeded")
                    this.paymentSucceeded = true 
                    break;

                case "processing":
                    // Processing the Response with the Payment
                    this.ShowPaymentStatusMessage("Your payment is being processed", ProcessingType)
                    Logger.debug("Payment with Credentials" + JSON.stringify(paymentIntent), "has been processing")
                    this.paymentError = ResponseError.message
                    break;

                case "requires_payment_method":
                    // Processing the Response with Unsuccessful Response Type
                    this.ShowPaymentStatusMessage("Your payment requires some additional actions", ErrorType)
                    Logger.debug("Payment with Credentials" + JSON.stringify(paymentIntent), "has been failed")
                    this.paymentError = ResponseError.message
                    this.paymentFailed = true 
                    break;

                default:
                    // Processing the Other type of the Response Errors
                    this.ShowPaymentStatusMessage("Unknown Error", UndefinedType)
                    Logger.debug("Payment with Credentials" + JSON.stringify(paymentIntent), "has been in undefined state") 
                    this.paymentError = ResponseError.message
                    this.paymentFailed = true
                    break;
            }
        },

        async InitializePaymentElement() {
            // Initializing Payment Element, based on the Component HTML Pattern 
            try {
                await this.InitializeStripeModule() // Initializing Stripe Module 
                let ElementType= "payment";
                let stripePaymentCardElement = "card-element"; // ID of the Stripe Payment Card Element
                let PaymentIntentId = new PaymentIntentManager(this, this.Bill).InitializePaymentIntentRequest()
                let StripeFormElements = this.$data.stripe.elements({clientSecret: PaymentIntentId})
                this.$data.paymentElements = StripeFormElements

                // Mouting the Stripe Integration inside the Vue Template 
                let PaymentElement = StripeFormElements.create(ElementType, {style: PaymentFormStyle})
                PaymentElement.mount("#" + stripePaymentCardElement)

                // // Disabling Payment Button on the Card Number Change Event 
                PaymentElement.on('change', function(event){
                  // Changing the Submit Button availability, based on the status of the transaction data
                  switch(event.complete) {
                    case true:
                      Logger.debug("Payment Card element is ready for the Payment")
                      document.getElementById("paymentButton").disabled = false 
                      break;

                    case false:
                      console.log('card change event', event);
                      document.getElementById("paymentButton").disabled = true;
                      break;
                  }
                })
        } catch(Exception) {
          // Processing the Exception 
          if (typeof Exception == PaymentIntentInitializationError) {
              Logger.debug('Exception has been raised', Exception.GetReason())
              this.paymentError = Exception.GetReason()
          }else{
            Logger.debug("Undefined Exception at Payment Intent Initialization Has been catched.")
            this.paymentError = Exception
          }
          this.paymentFailed = true
        }
    },
    },
    computed: {
        ...mapState(["Bill", "customer"]),
    }
}

</script>

<style lang="scss">

.paymentFormField {
  // Class, that describes style properties for the Payment Form Fields 
  background-color: #141625;
  border-radius: 5px 5px 5px 5px;
  margin-top: 20px; 
}

.btn-payment-form {
  background-color: green;
  border-radius: 8px 8px 8px 8px;
}

.checkout {
  border: 1px solid black;
  padding: 3px;
}
.fields {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 30px;
}
.showcase {
  margin-bottom: 20px;
}
.mt {
  margin-top: 20px;
}
.dis {
  opacity: 0.5;
  pointer-events: none;
}

* {
  box-sizing: border-box;
}
.body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
}
.payment-form {
  width: 30vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
}
.input {
  border-radius: 6px;
  margin-bottom: 6px;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  height: 44px;
  font-size: 16px;
  width: 100%;
  background: white;
}
.result-message {
  line-height: 22px;
  font-size: 16px;
}
.result-message .a {
  color: rgb(89, 111, 214);
  font-weight: 600;
  text-decoration: none;
}
.hidden {
  display: none;
}
#card-error {
  color: rgb(105, 115, 134);
  text-align: left;
  font-size: 13px;
  line-height: 17px;
  margin-top: 12px;
}
#card-element {
  border-radius: 5px 5px 5px 5px ;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  height: 44px;
  width: 100%;
  background: #141625;
}
/* Buttons and links */


.paymentButton:disabled {
  // Payment Submit Button State 
  background-color: darkgreen;
}
</style>