<template>
<div class='CheckoutItem'>

    <v-card-actions>
        <v-btn class="btn vm-full-info">
            <v-icon style="background-color: green;">mdi-plus</v-icon>
        </v-btn>
    </v-card-actions>

    <v-expand-devision>
    <div class="paymentItemProperties" v-show="Show">/
        <!-- Describing the Full Information about the Virtual Server -->
        <div class="Item" :v-for="(ItemProperty, index) in ItemInformation.Properties" :key="index" style="justify-content: row;">
            <label style="color: #fff; font-family: Serif;">{{ ItemProperty.Name }}</label>
            <label style="color: #fff; font-family: Serif;">{{ ItemProperty.Value }}</label>
        </div>
    </div>
                
    <div class="paymentItemDescription" v-show="Show">/
        <!-- Describing the Full Information about the Virtual Server -->
        <label style="color: #fff; font-family: Serif;">{{ Item.Description }}</label>
    </div>

    <div class="paymentItemAmountInfo">
        {{ Item.TotalAmount }}
    </div>
    </v-expand-devision>

</div>
    
</template>

<script>

export default {
    name: "CheckoutItemInfo",
    props: ["Show", "ItemInformation"],
    mounted() {
        if (!this.$props.Show) {
            this.$props.Show = false
        }
    }
}

</script>

<style lang="scss">
.Item {
    // Item Class, describes the Item 
    background-color: #111; 
    border-radius: 10px 10px 10px 10px;
}
.paymentItemAmountInfo {
    // Item Amount cost Information 
    background-color: #111;
    border-radius: 10px 10px 10px 10px;
    .label {
        // Inside Label 
        color: #fff;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1rem;
    }
}
</style>
