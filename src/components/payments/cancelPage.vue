<template>
  <ion-page>

    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>KubeLagoon, inc</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-label class="cancel-label"
                >You have been canceled the Transaction! Want to go back?</ion-label
              >
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button
                expand="block"
                class="cancel-go-to-checkout-page-button"
                fill="clear"
                @click="onGoToCheckoutPageClicked"
                >Back to Payment</ion-button
              >
              <ion-button
                expand="block"
                class="cancel-go-to-checkout-page-button"
                fill="clear"
                @click="onGoToCheckoutPageClicked"
                >Back to Home</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>

export default {
    name: "CancelPage",
    methods: {
        redirectBackToPayment() {
          // Redirecting to the Payment Page back to the Session 
            this.$router.push({name: "payment_page"});
        },
    } 
}
</script>

<style lang="scss">

</style>