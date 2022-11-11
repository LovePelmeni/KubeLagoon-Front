<template>
        <div class="container" @click="selected = true" style="max-width: 100%; max-height: 100%;">
            <div class="p-3 card-body container" style="min-width: 350px; height: 300px; max-width: 60%; overflow: hidden;" >
                <div :class="{
                    'p-3 pb-0 card-header unselected': selected === false, 
                    'p-3 pb-0 card-header selected': selected === true}" 
                    style="border-radius: 10px 10px 0px 0px">

                    <h6 style="color: #fff; font-family: 'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell', 'Fira Sans','Droid Sans','Helvetica Neue',sans-serif;">{{ PaymentMethodName }}</h6></div>
                    <!-- eslint-disable vue/no-v-html -->

                    <div :class="
                    {   // Based on the Current Status of the Widget, it is going to have additional classes.
                        'p-2 card-body selected': selected === true,
                        'p-2 card-body unselected': selected === false,
                    }"
                    style="border-radius: 0px 0px 10px 10px; height: 250px; position: relative;">
                    <button style="margin-top: 25%; width: 20%;" v-if="selected === true" @click="UnselectPaymentMethod()" class="btn btn-unselect"><label>Unselect</label></button>
                    <v-avatar size="200" v-if="selected === false">
                         <v-icon>{{ PaymentMethodIcon }}</v-icon>
                    </v-avatar>
                </div>
            </div>
        </div>
</template>

<script>

import { mapMutations, mapState } from "vuex";

export default {
    name: "PaymentSelectionComponent",
    props: ["PaymentMethodId", "PaymentMethodType", "PaymentMethodIcon", "PaymentMethodName"],
    data() {
        return {
            selected: false,
            selectedOtherOption: false,
        }
    },
    mounted() {
        this.selectedOtherOption = function() {return Object.values(
        this.selectedPaymentOption)[0].length !== 0 && 
        this.selectedPaymentOption.PaymentMethodId != this.$props.PaymentMethodId}
    },
    methods: { 
        ...mapMutations(["SELECT_PAYMENT_METHOD", "UNSELECT_PAYMENT_METHOD"]),

        SelectPaymentMethod() {
            // Selecting the Payment Method
            this.SELECT_PAYMENT_METHOD({
                "PaymentMethodId": this.$props.PaymentMethodId,
                "PaymentMethodType": this.$props.PaymentMethodType,
                "PaymentMethodName": this.$props.PaymentMethodName,
            })
        },
        UnSelectPaymentMethod() {
            // Unselecting the Payment Method 
            this.UNSELECT_PAYMENT_METHOD()
        },
    }, 
    computed: {
        ...mapState(["selectedPaymentOption"])
    }
}

</script>

<style lang="scss">


@media (min-width: 900px){}
.container {
    padding-top: 0px !important;
}

.unselected {
    background-color: #1e2238; 
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
    justify-content: center; 
    align-content: center; 
    align-items: center;
    opacity: 1; 
    max-width: 35%;
}
</style>
