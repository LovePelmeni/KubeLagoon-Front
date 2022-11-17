<template>

<div class="items" style="background-color: #14639; justify-content: space-between; display: flex;">
    <v-text-field class="checkoutItemField" 
    :v-for="(Item, index) in CheckoutItemData" :key="index">{{ Item.VirtualServerName }}</v-text-field>
</div>
    
</template>

<script>

export default {
    name: "ControllerControllerView",
    props: ["CheckoutItemData"],
}

</script>


<style lang="scss">
.checkoutItemField {
    // Checkout Item Field 
    pointer-events: none;
}
</style>