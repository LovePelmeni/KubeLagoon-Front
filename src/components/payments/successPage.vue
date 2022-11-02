<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>KubeLagoon, inc</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="medium">Stripe Payment Gateway</ion-title>
        </ion-toolbar>
      </ion-header>

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
                @click="ProcessSuccessPaymentRedirect"
                >Done</ion-button
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
    name: "successPaymentPage",
    methods: { 
        processSuccessPaymentRedirect() {
            this.$router.push({name: "main_page"})
        }    
    },
}
</script>

<style lang="scss">

</style>
