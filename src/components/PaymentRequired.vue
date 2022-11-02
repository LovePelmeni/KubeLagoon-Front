<template>
    <div class="modal flex">
    <div class="modal-content" style="width: 500px !important; margin-left: 20px;">
      <v-icon style="color: red; margin-bottom: 30px;" size="50">mdi-alert</v-icon>
      <p style="color: red;">Operation Denied. You haven't paid for the previous session</p>
      <div class="actions flex">
        <button @click="RedirectToBillPage" class="green">Pay</button>
        <button @click="closeErrorBannerWindow()" class="red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name: "PaymentRequiredComponentBanner",
    props: ["BillId"],
    methods: {
        RecoveringPreviousPaymentSession() {
            // Recovering Previous Payment Session, customer missed
        },
        RedirectToBillPage() {
            // Redirecting the Customer To The Bill Page
            this.RecoveringPreviousPaymentSession()
            this.$router.push({name: "payment_page"})
        },

    }
}
</script>
