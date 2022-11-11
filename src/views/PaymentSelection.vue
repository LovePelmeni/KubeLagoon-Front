<script lang="javascript">

import * as cost from "../../cost/virtualMachineCost.js"
import { useCookies } from "vue3-cookies";
import { mapState, mapMutations } from "vuex";
import PaymentSelectionComponent from "../components/PaymentSelectionComponent.vue";


export default {
    name: "PaymentSelectionView",
    setup() {
        const { cookies } = useCookies();
        const { JwtToken } = cookies.get("jwt-token") || '';
        return JwtToken;
    },
    template: `
        <div class='selectionBlock' style="display: flex; justify-content: space-between; margin-top: 10%;">
            <!-- Selection Options to Choose -->
            <payment-selection-component v-for="(PaymentMethod, index) in PaymentSelectionOfferings" :key="index" 
            :PaymentMethodIcon="PaymentMethod.PaymentMethodIcon" :PaymentMethodName="PaymentMethod.PaymentMethodName" />
        </div>
        <v-btn class="btn btn-payment-selection" :class="{
            'selection-disabled btn': Object.values(selectedOption)[0].length === 0,
            'selection-selected btn': Object.values(selectedOption)[0].length > 0,
            }" @click="SelectOption()"
        style="background-color: green; max-width: 5%; max-height: 5%; margin-left: 20%; margin-right: 20%;">
        <label style="color: #fff;">Select</label></v-btn>
    `,
    data() {
        return {
            selectedOption: {
                "PaymentMethodId": "",
                "PaymentMethodName": "",
                "PaymentMethodType": "",
            }, // selected Payment Option 
            
            PaymentSelectionLoading: false,
            PaymentBitcoinLoading: false,
            PaymentSelectionOfferings: [
                {
                    "PaymentMethodIcon": "mdi-bitcoin",
                    "PaymentMethodName": "Crypto Wallet",
                },
                {
                    "PaymentMethodIcon": "mdi-dollar",
                    "PaymentMethodName": "Credit Card",
                }
            ],
        }
    },
    mounted() {
        this.selectedOption = this.selectedPaymentOption
    },
    watch: {
        selectedPaymentOption: function() {this.$data.selectedOption = this.selectedPaymentOption}
    },
    components: {
        PaymentSelectionComponent,
    },
    methods: {
        ...mapMutations(["SET_BANK_VALUES", "GET_CURRENT_PAYMENT_OPTION"]),

        GetCurrentPaymentOption() {
            // Returns the Current Selected Payment Option 
            return this.GET_CURRENT_PAYMENT_OPTION()
        },

        SelectOption() {
            // Default Button, for selecting one of the payment options  
            if (Object(this.selectedPaymentOption).keys()[0].length > 0) { 
                if (this.selectedPaymentOption.PaymentMethodId === "crypto") {
                    // Processing the following method for the payment 
                    this.SelectPaymentBitcoinGateway()
                } 
                if (this.selectedPaymentOption.PaymentMethodId === "creditCard") {
                    // Processing the following method for the Payment 
                    this.SelectPaymentGateway()
                }
            } 
        },
        SelectPaymentBitcoinGateway() {
            // Redirecting to the Payment Bitcoin Gateway
            this.PaymentBitcoinLoading = true 
            this.FillCheckout() 
            this.PaymentBitcoinLoading = false
            this.$router.push({name: "nft_payment_page"})
        },
        FillCheckout() {
            // Forming the Checkout for the Payment and saving to the Vue State 
            let newBillValues = {
                "Servers": function() {
                    let UnpaidServers = [];
                    for (let VirtualMachineServer in this.VirtualMachineData) {

                        let initialDate = new Date(Date.parse(VirtualMachineServer.paymentDueDate + " 00:00:00"))
                        let subscriptionOverDate = new Date()
                        subscriptionOverDate.setDate(initialDate.getDate()
                        + Number(VirtualMachineServer.paymentTerms))

                        if (initialDate + subscriptionOverDate >= new Date.now()) {

                            UnpaidServers.push({
                                "ServerName": VirtualMachineServer.ServerName, 
                                "ServerType": VirtualMachineServer.ServerType,
                                "TotalUsageCost": function() {
                                    let Manager = new cost.VirtualMachineCostManager()
                                    Manager.GetVirtualMachineCost(VirtualMachineServer.VirtualMachineId, this.JwtToken)
                                }() || 0
                            })

                        }
                    }
                    return {
                        "Metadata": {
                            "Servers": UnpaidServers
                        }
                    }
                }()
            }
            this.SET_BILL_VALUES(newBillValues)
        },

        SelectPaymentGateway() {
            // Redirecting to the Payment Page with 
            this.PaymentSelectionLoading = true
            this.FillCheckout()
            this.PaymentSelectionLoading = false
            this.$router.push({name: "payment_page"}) // Redirecting to the another Page 
        }
    },
    computed: {
        ...mapState(["Bill", "VirtualMachineData", "selectedPaymentOption"])
    }
}

</script>


<style lang="scss">
.label {
    // Label for the Payment Selection Button 
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.selection-selected {
    // Selection Selected Button Status 
    background-color: green;
}
.selection-disabled {
    // Selection Disabled Button Status 
    pointer-events: none;
    background-color: darkgreen;
}
</style>
