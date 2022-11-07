<script lang="javascript">

import * as cost from "../../cost/virtualMachineCost.js"
import { useCookies } from "vue3-cookies";
import { mapState } from "vuex";

export default {
    name: "PaymentSelectionView",
    setup() {
        const { cookies } = useCookies();
        const { JwtToken } = cookies.get("jwt-token");
        return JwtToken
    },
    template: `

        <div class='selectionBlock' style="justify-content: space-between; margin-left: 20%; margin-right: 20%; margin-top: 10%;">
            <!-- Selection Options to Choose -->
            <payment-selection-component :PaymentMethodIcon="'mdi-bitcoin'" :PaymentMethodName="'Crypto'" />
            <payment-selection-component :PaymentMethodIcon="'mdi-dollar'" :PaymentMethodName="'Credit Card'" />
            <v-btn class="btn btn-payment-selection" style="background-color: green;"><label>Select</label></v-btn>
        </div>
        
    `,
    data() {
        return {
            PaymentSelectionLoading: false,
            PaymentBitcoinLoading: false,
        }
    },
    methods: {

        SelectionPaymentBitcoinGateway() {
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
        ...mapState(["Bill", "VirtualMachineData"])
    }
}
</script>

<style lang="scss">
.label {
    // Label for the Payment Selection Button 
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
