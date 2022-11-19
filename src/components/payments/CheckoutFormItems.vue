<template>

<div class="items" style="background-color: #14639; justify-content: space-between; display: flex;">
    <checkout-item-info class="checkoutItemField"
    :v-for="(Item, index) in Items" :key="index" />
</div>

</template>

<script>

import CheckoutItemInfo from "./CheckoutItemInfo.vue";
export default {
    name: "ControllerControllerView",
    props: ["Items"],
    components: {CheckoutItemInfo},
    mounted() {
        this.MountItems()
    },
}

</script>


<style lang="scss">
.checkoutItemField {
    // Checkout Item Field 
    pointer-events: none;
}
</style>