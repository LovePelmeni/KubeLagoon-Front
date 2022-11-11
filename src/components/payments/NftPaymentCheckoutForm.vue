<template>
    <div class="nftPaymentApproveForm">
        <v-form>
            <v-text-field class="nftApproveField" placeholder="Gas">
            </v-text-field>

            <v-text-field class="nftApproveField" placeholder="Limit">
            </v-text-field>

            <v-text-field class="nftApproveField" placeholder="">
            </v-text-field>

            <v-text-field class="nftApproveField" placeholder="">
            </v-text-field>
        </v-form>
    </div>
    
</template>

<script>

export default {
    name: "NftPaymentApproveForm",
    props: ["CheckoutInformation"],
    methods: {
        ApproveNftPaymentForm() {
            // Approving the Nft Payment Form 
        },
    },
}
</script>
