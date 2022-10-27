<script>

export default {
    name: "PaymentWindowView",
    template: `
    <template>
        <div class="paymentForm"> 
            <!-- Payment Window -->
        </div>
        <button class="btn btn-pay" @click="Pay">
    </template>
    `,
    methods: {
        Pay() {
            // Method is being called, once the Payment has been Initialized Successfully
        },
        PaymentCallback() {
            // Payment Callback, is being called, once the payment has been Successfully executed
        }
    }
}
</script>


<style lang="scss">

.paymentForm {
    background-color: #141414;
}

</style>
