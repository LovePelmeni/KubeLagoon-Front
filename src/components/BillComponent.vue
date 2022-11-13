<template>

<div class="billInfoContainer" style="display: flex; justify-content: row;">

    <!-- Bill Information Related Blocks -->

    <div class="billPurchasedItemsInfoContainer" style="display: grid;">
        <div class="informationBlockLine" v-for="(PurchasedItem, index) in Bill.PurchasedItems" :key="index">

            <div class="informationLine" style="justify-content: space-between;">
            <label>Name</label>        
            <label>{{ PurchasedItem.ItemName }}</label>
            </div>

            <div class="informationLine" style="justify-content: space-between;">
            <label>Type</label>        
            <label>{{ PurchasedItem.ItemType }}</label>
            </div>

            <div class="informationLine" style="justify-content: space-between;">
            <label>Total Price</label>        
            <label>{{ PurchasedItem.TotalPrice }}</label>
            </div>

        </div>
    </div>

    <!-- Checkout Information Block -->

    <div class="checkoutInformationContainer" style="display: flex; justify-content: space-between;">
        <h2>In Total: {{ Bill.TotalAmount }}$</h2>
    </div>

    <div class="paymentBlock"> 
        <button class="btn btn-pay" style="background-color: green; color: #fff;">
            <label style="color: #fff;">Pay</label>
        </button>
    </div>
</div>
     
</template>

<script>

import BankSelectionComponent from "./PaymentSelectionComponent.vue";

export default {
    name: "BillComponent",
    components: {BankSelectionComponent,},
    props: ["Bill"],
}

</script>


<style lang="scss">
    
</style>
