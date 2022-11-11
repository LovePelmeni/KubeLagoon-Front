<template>
    <div class="nftPaymentApproveForm" style="background-color: gray; border-radius: 10px 10px 10px 10px;">
        <v-form>
            <v-text-field class="nftApproveField" placeholder="Your Address">
            </v-text-field>

            <v-text-field class="nftApproveField" placeholder="Contract Address">
            </v-text-field>

            <v-text-field class="nftApproveField" placeholder="Total Amount">
            </v-text-field>

            <v-text-field class="nftApproveField" placeholder="Total Items">
            </v-text-field>
        </v-form>
        <v-btn class="btn" @click="ApproveNftPaymentForm()"></v-btn>
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

<style lang="scss">
.nftApproveField {
    // NFT Form Field 
    background-color: #232323;
}
</style>