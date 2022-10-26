<template>
        <div class="banks" style="display: flex; min-width: 60%; max-width: 40%; justify-content: space-between; margin-left: 20%;">
                <div v-for="(bankGroup, index) in banks" :key="index" class="container" style="justify-content: flex-end; max-width: 100%;">
                <div v-for="(Bank, bankIndex) in bankGroup" :key="bankIndex" @click="SelectBank"
                class="p-3 card-body container"
                style="min-width: 250px; height: 250px; max-width: 60%; overflow: hidden;" >
                <input id="bankTitle" hidden :value="Bank.bankTitle" />

                    <div class="p-3 pb-0 card-header" style="border-radius: 10px 10px 0px 0px">
                        <h6 style="color: #fff; font-family: 'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell', 'Fira Sans','Droid Sans','Helvetica Neue',sans-serif;">{{ Bank.bankTitle }}</h6></div>
                        <!-- eslint-disable vue/no-v-html -->

                        <div :class="
                        {   // Based on the Current Status of the Widget, it is going to have additional classes.
                            'p-2 card-body selected': Bank.selected === true,
                            'p-2 card-body': Bank.selected === false,
                        }"
                        style="background-color: #1e2238; border-radius: 0px 0px 10px 10px; height: 190px;">
                        <button v-if="Bank.selected === true" class="btn btn-unselect">Unselect</button>
                        <v-avatar size="150" v-if="Bank.selected === false">
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
    name: "BankSelectionComponent",
    data() {
        return {
            banks: [
                [
                {
                    "bankTitle": "SberBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": "../assets/banks/sberbank.svg",
                    "selected": false,
                },
                {
                    "bankTitle": "RoscomBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": "../assets/banks/sberbank.svg",
                    "selected": false,
                },
                ],
                [{   
                    "bankTitle": "TinkoffBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": "../assets/banks/sofcombank.svg",
                    "selected": false,
                },
                {
                    "bankTitle": "AlphaBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": "../assets/banks/sberbank.svg",
                    "selected": false,
                },
                ],
                [
                {   
                    "bankTitle": "CitiBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": "../assets/banks/sberbank.svg",
                    "selected": false,
                },
                {   
                    "bankTitle": "SofcomBank",
                    "bankValue": "", // unique identifier for the bank, that will be potentially used for making payment transaction
                    "bankLogo": "../assets/banks/sofcombank.svg",
                    "selected": false,
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
            let BankTitle = event.target.querySelector("bankTitle").value;
            let Bank = function() { 
                for (let BankGroup in this.banks) {
                    for (let Bank in BankGroup) {
                        if (Bank.bankTitle.toLowerCase() === BankTitle) {
                            Bank.selected = true
                        }
                    }
                }
            }()
            this.bank = Bank
            this.SELECT_BANK(Bank)
        },
    },
}

</script>

<style lang="scss">


@media (min-width: 900px){}
.container {
    padding-top: 0px !important;
}

.selected {
    background-color: black !important;
}
.btn-unselect {
    background-color: #fff;
}
</style>
