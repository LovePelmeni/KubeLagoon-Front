<template>
<div class='CheckoutItems'>

    <v-card-actions>
        <v-btn class="btn vm-full-info">
            <v-icon style="background-color: green;">mdi-plus</v-icon>
        </v-btn>
    </v-card-actions>
                
    <v-expand-devision>
    <div class="paymentItemsDescription" v-show="Show">
        <!-- Describing the Full Information about the Virtual Server -->
    </div>
    </v-expand-devision>

</div>
    
</template>


<script>

export default {
    name: "CheckoutItemInfo",
    props: ["Show"],
    mounted() {
        if (!this.$props.Show) {
            this.$props.Show = false
        }
    }
}
</script>
