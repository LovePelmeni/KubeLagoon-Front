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
                >Done</ion-button
              >
              <ion-button
                expand="block"
                class="cancel-go-to-checkout-page-button"
                fill="clear"
                @click="DownloadCheckoutPdfFile"
                >Downlooad PDF</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>

class CheckoutFileManager {
  // Class, responsible for managing the Payment Checkouts into Files
  GetImageFile(CheckoutContent) {
    // returns the Image JPEG / PNG File with the Checkout Information 
  }
}
export default {
    name: "SuccessPage",
    methods: { 
        processSuccessPaymentRedirect() {
            this.$router.push({name: "main_page"})
        },
        DownloadCheckoutPdfFile() {
          // Downloading the Checkout Pdf File on the Client Side 
          let newManager = new CheckoutFileManager() 
          let CheckoutFileContent = newManager.GetImageFile(this.checkoutData)
          let element = document.createElement("a");
          element.setAttribute('href', 'data:image/png;charset=utf-8,' + encodeURIComponent(CheckoutFileContent));
          element.setAttribute('download', "payment_" + String(this.checkoutData.checkoutId));
          element.style.display = 'none';

          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }
    },
    computed: {
      ...mapState(["checkoutData"])
    }
}
</script>

<style lang="scss">

</style>
