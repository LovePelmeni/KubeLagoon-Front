<template>
        <div class="banks" style="display: flex; min-width: 60%; max-width: 40%; justify-content: space-between; margin-left: 20%;">
            <div class="container" style="justify-content: flex-end; max-width: 100%;">
            <div 
            class="p-3 card-body container"
            style="min-width: 250px; height: 250px; max-width: 60%; overflow: hidden;" >

                <div class="p-3 pb-0 card-header" style="border-radius: 10px 10px 0px 0px">
                    <h6 style="color: #fff; font-family: 'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell', 'Fira Sans','Droid Sans','Helvetica Neue',sans-serif;">{{ PaymentMethodTitle }}</h6></div>
                    <!-- eslint-disable vue/no-v-html -->

                    <div :class="
                    {   // Based on the Current Status of the Widget, it is going to have additional classes.
                        'p-2 card-body selected': selected === true,
                        'p-2 card-body': selected === false,
                    }"
                    style="background-color: #1e2238; border-radius: 0px 0px 10px 10px; height: 190px;">
                    <button v-if="selected === true" @click="selected = false" class="btn btn-unselect"><label>Unselect</label></button>
                    <v-avatar size="150" v-if="selected === false">
                         <v-icon>{{ PaymentMethodIcon }}</v-icon>
                    </v-avatar>
                        
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import { mapMutations } from "vuex";

export default {
    name: "PaymentSelectionComponent",
    props: ["MethodType", "PaymentMethodIcon", "PaymentMethodTitle"],
    methods: { 
        ...mapMutations(["SELECT_PAYMENT_METHOD", "UNSELECT_PAYMENT_METHOD"]),

        SelectPaymentMethod() {
            // Selecting the Payment Method
            this.SELECT_PAYMENT_METHOD(this.MethodType)
        },
        UnSelectPaymentMethod() {
            // Unselecting the Payment Method 
            this.UNSELECT_PAYMENT_METHOD()
        }
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

.label {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.btn-unselect {
    background-color: #fff;
    color: black;
}
</style>
