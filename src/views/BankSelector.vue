<template>

    <div class="banks" style="display: flex; justify-content: grid;">
        <div :v-for="(bank, index) in banks" :key="index"
        style="background-color: #14675; border-radius: 10px 10px 10px 10px">
            <!-- <img :src="require(bank.bankLogo)" size="40"> -->
        </div>
    </div>
    
</template>

<script>

export default {
    name: "BankSelectionView",
    data() {
        return {
            banks: [
                {
                    "bankTitle": "SperBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": ""
                }
            ],
        }
    },
    methods: {
        SelectBank() {
            // Selecting the Bank, and being redirected to the payment page
        }
    }
}
</script>
