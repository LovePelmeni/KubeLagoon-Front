<script>
import BankSelectionComponent from "../components/BankSelectionComponent.vue";

export default {
    name: "CheckoutView",
    template: `
    <div class="checkoutWindow">
        <!--- Bank Selection Component, that customer picking up, before making any Payments ---!>
        <div class="bankSelection" style="align-items: center;">
        <bank-selection-component />
        <button id="checkoutPaymentButton" @click="SubmitPaymentForm">Pay</button>
        </div>
    </div>`,
    components: {
        BankSelectionComponent,
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
    }
}
</script>

<style lang="scss">

</style>
