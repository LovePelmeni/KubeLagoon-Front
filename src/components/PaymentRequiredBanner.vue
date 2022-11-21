<template>
<div class="transitionBlock">
        <v-divider style="max-width: 60%"></v-divider>
        
        <v-card-text style="background-color: #1e2139; border-radius: 10px;">
            
        <div class="iconDollar">
        <v-icon style="color: red; margin-bottom: 10px; margin-left: 10px; align-items: center; position: center; justify-content: center;" size="100">mdi-currency-usd-off</v-icon>
        </div>

        <h1 style="color: red; margin-bottom: 20px; font-size: 2rem; margin-top: 15px;">
            Payment Subscription is expired
        </h1> 

        <div class="code-toolbar" style="margin-top: 10px;">
            <h2><label style="color: red;">Your Subscription is outdated and operations is freezed. Please pay out for the usage.</label></h2>
        </div>

        <div class="apiButtons" style="justify-content: space-between; display: block;">
        <button  @click="RedirectPaymentSelection()"  class="btn btn-payout" style="margin-top: 20px; margin-left: 30px; color: #fff; !important">
            <label id="downloadLabel" style="color: #fff !important; margin-bottom: 1px !important;">Payout</label>
        </button>

        <button  @click="RedirectPaymentCheck()"  class="btn btn-check" style="margin-top: 20px; margin-left: 30px; color: green; !important">
            <label id="downloadLabel" style="color: #fff !important; margin-bottom: 1px !important;">Get Check</label>
        </button>

        </div>
        </v-card-text>

        </div>
</template>

<script>

export default {
    name: "PaymentRequiredBanner",
    methods: {
        RedirectPaymentSelection() {
            // Redirecting the Customer To The Bill Page
            this.$router.push({name: "payment_page"})
        },
        RedirectPaymentCheck() {
            this.$router.push({name: "payment_check"})
        }
    }
}
</script>


<style lang="scss">

.btn-check {
    background-color: green;
}

.btn-payout {
    background-color: red;
}
</style>