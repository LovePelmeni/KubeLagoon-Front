<template>
  <section class="showcase">
    <div class="nes-container with-title">
      <h3>VirtualMachine Bill Payout ${{ TotalBillCost }}
      </h3>
      <div class="img">
        <img
          src=""
          alt=""
          srcset=""
        />
      </div>
    </div>
  </section>
  <div class="nes-container with-title is-centered">
    <form @submit.prevent="SubmitPaymentForm">
      <fieldset :class="{ dis: loading }" class="fields">
        <div class="nes-field"></div>
        <div class="nes-field">
          <label for="name_field">Name</label>
          <input
            v-model="customer.Username"
            placeholder="Jane Doe"
            type="text"
            name="name"
            id="name_field"
            class="nes-input"
          />
        </div>
        <div class="nes-field">
          <label for="email_field">Email</label>
          <input
            v-model="customer.Email"
            placeholder="jane.doe@example.com "
            type="email"
            name="email"
            id="email_field"
            class="nes-input"
          />
        </div>
        <div class="nes-field">
          <label for="address_field">Address</label>
          <input
            v-model="customer.Address"
            placeholder="1234 Sycamore Street"
            type="text"
            name="address"
            id="address_field"
            class="nes-input"
          />
        </div>
        <div class="nes-field">
          <label for="city_field">City</label>
          <input
            v-model="customer.City"
            placeholder="Reno"
            type="text"
            name="city"
            id="city_field"
            class="nes-input"
          />
        </div>
        <div class="nes-field">
          <label for="state_field">State</label>
          <input
            v-model="customer.Country"
            placeholder="Nevada"
            type="text"
            name="state"
            id="state_field"
            class="nes-input"
          />
        </div>
        <div class="nes-field">
          <label for="zip_field">Zip</label>
          <input
            v-model="customer.ZipCode"
            placeholder="89523"
            type="text"
            name="zip"
            id="zip_field"
            class="nes-input"
          />
        </div>
        <div class="nes-field">
          <label for="email_field">Credit Card</label>
          <div id="stripe-element-mount-class" class="nes-input" />
        </div>
      </fieldset>
      <div class="nes-field">
        <button
          style="margin-top: 30px;"
          type="submit"
          class="nes-btn is-primary"
          :class="{ dis: loading }"
        >
          {{ loading ? "Loading..." : `Pay $${TotalBillCost}.00` }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>

const PaymentFormStyle = {
  style: {
    base: {
      iconColor: "#000",
      color: "#000",
      fontWeight: "800",
      fontFamily: "Press Start 2P",
      fontSize: "22px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883"
      },
      "::placeholder": {
        color: "green"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "red"
    }
  }
};
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
            TotalPrice += Number(this.BillInformation.Metadata.Servers[Server].TotalUsageCost)
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
import { loadStripe } from '@stripe/stripe-js';

export default {
    name: "PaymentFormView",
    data() {
        return {
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

        SubmitPaymentForm() {
            // Submitting the Payment Form 
            this.ConfirmPayment()
        },
        ConfirmPayment() {
            // Confirming the Payment
            let elements = this.$data.paymentElements
            let ResponseError = this.$data.stripe.confirmPaymentIntent({
                elements,
                confirm: {
                    return_url: `http://${FRONTEND_APPLICATION_HOST}:${FRONTEND_APPLICATION_PORT}/payment/success/page/`
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

        async InitializePaymentElement() {
            // Initializing Payment Element, based on the Component HTML Pattern 
            await this.InitializeStripeModule() // Initializing Stripe Module 

            let ElementTheme = {theme: "dark"};
            let ElementType= "card";
            let stripePaymentCardElement = "stripe-element-mount-class"; // ID of the Stripe Payment Card Element
            let NewPaymentIntentId = new PaymentIntentManager(this, this.Bill).InitializePaymentIntentRequest()
            let StripeFormElements = this.$data.stripe.elements({ElementTheme, NewPaymentIntentId})
            this.$data.paymentElements = StripeFormElements
            this.$data.paymentIntentSecret = NewPaymentIntentId

            // Mouting the Stripe Integration inside the Vue Template 
            let PaymentElement = StripeFormElements.create(ElementType, PaymentFormStyle)
            PaymentElement.mount("#" + stripePaymentCardElement)
        },
    },
    computed: {
        ...mapState(["Bill", "customer"]),
        TotalBillCost: function() {
          let TotalCostUsage = 0;
          this.Bill.Metadata.Servers.forEach(function(server){
              TotalCostUsage += Number(server.TotalUsageCost)
          })
          return TotalCostUsage
        }
    },
}


</script>

<style lang="scss">

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
.img {
  display: flex;
  justify-content: center;
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
// .button {
//   margin-top: 30px;
// }
</style>