<script>
import BankSelectionComponent from "../components/BankSelectionComponent.vue";
import { mapState } from "vuex";

export default {
    name: "CheckoutView",
    template: `
    
    <div class="bankDollarIcon" style="justify-content: center; align-items: center; align-content: center; display: flex; margin-top: 50px; margin-bottom: 30px;">
        <v-icon size="100" style="color: #fff; justify-content: center; display: flex;">mdi-currency-usd</v-icon>
    </div>

    <h4 class="section-title_title__VEDfK" style="color: #fff; ">Select The Bank</h4>
    <h2 class="hero_description__IXY_z">
        In order to pay out for your current bill, you need to select the bank, your credit card is compatible with.
        <br aria-hidden="true" class="hero_description-break__u_niN text-link_link__OUsK1" style="color: #DE1D8D">
        You can pick out from the one's specified down below, that is currently supported within the company</h2>

    <div class="checkoutWindow">
        <!--- Bank Selection Component, that customer picking up, before making any Payments ---!>
        <div class="bankSelection" style="align-items: center;">
        <bank-selection-component />
        <button class="btn btn-pay" style="width: 200px;"id="checkoutPaymentButton" @click="SubmitPaymentForm">Pay</button>
        </div>
    </div>
    `,
    components: {
        BankSelectionComponent,
    },
    data() {
        return {
            PaymentLoading: false,
        }
    },
    methods: {
        SubmitPaymentForm() {
            // Submitting Payment Form and Creating new Payment Request 
        },
        RedirectToPaymentRequestController() {
            // Redirecting to the Payment Window Component, once the Info for checkout has been specified
            this.$router.push({name: "payment_page"})
        },
        CreateNewPaymentRequest() {
            // Creating new Payment Method Request
        }
    },
    computed: {
        ...mapState(["selectedPaymentBank"]),
    }
}

</script>

<style lang="scss">

.btn {
  padding: 16px 24px;
  border: none;
  border-radius: 24px;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.btn-pay {
    background-color: green;
    color: white;
}

</style>
