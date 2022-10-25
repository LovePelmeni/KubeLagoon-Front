<template>
     <h1 style="color: #fff; margin-top: 20px;">Available Banks</h1>
            <div class="banks" style="display: flex; margin-top: 10px; min-width: 60%; max-width: 40%; justify-content: space-between; margin-left: 20%;">
                <div v-for="(bankGroup, index) in banks" :key="index" class="container" style="justify-content: flex-end; max-width: 100%;">
                <div v-for="(Bank, bankIndex) in bankGroup" :key="bankIndex" @click="SelectBank()" class="p-3 card-body container" 
                style="min-width: 250px; height: 250px; max-width: 60%; overflow: hidden;">

                    <div class="p-3 pb-0 card-header">
                        <h6 style="color: #fff; font-family: 'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell', 'Fira Sans','Droid Sans','Helvetica Neue',sans-serif;">{{ Bank.bankTitle }}</h6></div>
                        <!-- eslint-disable vue/no-v-html -->

                        <div class="p-2 card-body" style="background-color: #1e2238; border-radius: 0px 0px 10px 10px; height: 190px;">
                        <v-avatar size="150">
                            <input id="bankCode" hidden :value="Bank.bankValue" />
                            <v-img :src="require(`@/assets/banks/${Bank.bankLogo.split('/').at(-1)}`)"></v-img>
                        </v-avatar>
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
                [
                {
                    "bankTitle": "SberBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": "../assets/banks/sberbank.svg",
                },
                {
                    "bankTitle": "RoscomBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": "../assets/banks/sberbank.svg"
                },
                ],
                [{   
                    "bankTitle": "TinkoffBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": "../assets/banks/sofcombank.svg"
                },
                {
                    "bankTitle": "AlphaBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": "../assets/banks/sberbank.svg"
                },
                ],
                [
                {   
                    "bankTitle": "CitiBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": "../assets/banks/sberbank.svg"
                },
                {   
                    "bankTitle": "SofcomBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": "../assets/banks/sofcombank.svg"
                }
                ],
            ],
            bank: {
                "bankTitle": "SberBank",
                "bankValue": "SberBank",
                "bankLogo": "../assets/sberbank.svg",
            }
        }
    },
    methods: { 
        ...mapMutations(["SELECT_BANK"]),

        SelectBank(event) {
            // Selecting the Bank, and being redirected to the payment page
            let BankCode = event.target.getElementById("bankCode").value;
            let Bank = this.banks.filter((bank) => {
                return bank.bankValue.toLowerCase() === BankCode.toLowerCase()
            })
            this.bank = Bank
            this.SELECT_BANK(Bank)
        },
        CreatePaymentMethodRequest() {
            // Initializes the Payment Request, based on the Total Amount, and selected Bank
        }, 
        ApproveSubmittion() {
            // Approve the Submittion of the Bank Selection Form 
            this.CreatePaymentMethodRequest()
        }
    },
}

</script>
