<template>
        <h1>Select Bank</h1>
            <div class="banks" style="display: grid; justify-content: space-between">
                <div v-for="(bank, index) in banks" :key="index">
                <div @click="SelectBank()" class="p-3 card-body" style="min-width: 300px; max-width: 100%; overflow: hidden;">
                    <div class="p-3 pb-0 card-header"><h6>{{ bank.bankTitle }}</h6>
                    <!-- eslint-disable vue/no-v-html -->
                        <div class="p-3 card-body">
                        <!-- <img :src="require(bank.bankLogo)" /> -->

                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>

import { mapMutations } from "vuex";

export default {
    name: "BankSelectionView",
    data() {
        return {
            banks: [
                {
                    "bankTitle": "SberBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": ""
                },
                {
                    "bankTitle": "RoscomBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": ""
                },
                {   
                    "bankTitle": "TinkoffBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": ""
                },
                {
                    "bankTitle": "AlphaBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": ""
                },
                {   
                    "bankTitle": "CitiBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": ""
                }
            ],
            bank: {
                "bankTitle": "SberBank",
                "bankValue": "SberBank",
                "bankLogo": ""
            }
        }
    },
    methods: {
        ...mapMutations(["SELECT_BANK"]),
        SelectBank(event) {
            // Selecting the Bank, and being redirected to the payment page
            let BankName = event.target.querySelector("h6").value;
            let Bank = this.banks.filter((bank) => {
                return bank.bankTitle.toLowerCase() === BankName.toLowerCase()
            })
            this.bank = Bank
            this.SELECT_BANK(Bank)
        },
        CreatePaymentMethodRequest() {
            // Initializes the Payment Request, based on the Total Amount, and selected Bank
        }, 
        ApproveSubmittion() {
            // Approve the Submittion of the Bank Selection Form 
            this.$router.push({name: "payment_page"})
        }
    },
}

</script>

<style lang="scss">

</style>