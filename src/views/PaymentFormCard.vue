<template>

<div class="paymentCardForm">

    <div class="cardNumberReferenceField" ref="creditCardNumber">
        <v-form> 
            <v-text-field placeholder="Username" v-model="Username">
                {{ CustomerUsername }}
            </v-text-field>

            <v-text-field placeholder="Email" v-model="Email">
                {{ CustomerEmail }}
            </v-text-field>

            <v-text-field placeholder="Phone" v-model="PhoneNumber">
                {{ PhoneNumber }}
            </v-text-field>

            <v-text-field placeholder="Total Amount" v-model="TotalAmount">
                {{ CheckoutInfo.TotalAmount }}
            </v-text-field>

            <v-divider></v-divider>
            <div class="checkoutFormItems">

            <checkout-form-items :VirtualServerItems="CheckoutInfo.Metadata.VirtualServers" />
            </div>

            <v-text-field placeholder="Total Amount" v-model="CreditCard">
            </v-text-field>
        </v-form>
        <v-btn class="formSubmitButton btn">Pay</v-btn>
    </div>

</div>
    
</template>

<script>

export default {
    name: "PaymentFormCard", 
    props: ["Customer"],
    data() {
        return {
            CustomerUsername: function(self) {return self.$props.Customer.Username}(this),
            CustomerEmail: function(self) {return self.$props.Customer.Email}(this), 
            CustomerPhoneNumber: function(self) {return self.$props.Customer.PhoneNumber}(this),
            CreditCardNumber: function(self) {return self.$props.Customer.CreditCardNumber}(this), 
        }
    },
    created() {
        this.InitializePaymentElement()
    },
    methods: {
        ...mapMutations(["TOGGLE_SUBMIT_PAYMENT_FORM"]),
        ProcessSubmittionForm() {
            // Processing the Form Submittion 
            this.TOGGLE_SUBMIT_PAYMENT_FORM()
        },
    },
}

</script>

<style lang="scss">
.formSubmitButton {
    // Submitting the Form Button 
    background-color: green;
    border-radius: 10px 10px 10px 10px;
}
</style>
