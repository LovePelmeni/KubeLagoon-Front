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
                >Your payment has been accepted, thanks for choosing KubeLagoon</ion-label
              >
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col style="justify-content: space-between;">
              <ion-button
                expand="block"
                class="cancel-go-to-checkout-page-button"
                fill="clear"
                @click="ProcessSuccessPaymentRedirect"
                >Done</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>

export default {
    name: "SuccessPage",
    methods: { 
        processSuccessPaymentRedirect() {
            this.$router.push({name: "main_page"})
        },
    },
}
</script>

<style lang="scss">

</style>
