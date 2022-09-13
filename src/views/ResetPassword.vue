<template>

    <form @submit.prevent="ValidateInput" class="virtual-machine-content">
      <loadingPage v-show="loading" />

      <!-- reset Password Details -->

        <div class="resetPassword flex">

          <div class="input flex flex-column">
            <label for="paymentDueDate">New Password</label>
            <input !change="ValidateNewPassword" :rules="PasswordRules" required type="text" id="paymentDueDate" v-model="paymentDueDate" />
            <span id="errors" v-if="error" class="red">{{ error }}</span>
          </div>

        </div>
    </form>
    
</template>

<script lang="javascript">
import { CustomerManager } from "../../customers/customers.js"

export default {
    name: "ResetPassword",
    data() {
        return {
            error: null,
            PasswordRules: (password) => password.length > 0 || 'This field is required',
            NewPassword: null, 
        }
    },
    methods: {
        ...mapMutations(["TOGGLE_ERROR"]),
        ValidateNewPassword(event) {
            // Validating new Password
            if (event.value.length < 0 || event.value.length > 10) {
                this.error = "Invalid Password, please type new one"
            }else{
                let Reset, error = this.ResetPassword(event.value)
                if (Reset != true || error != null) {this.TOGGLE_ERROR(error)}
            }
        },
        ResetPassword(newPassword) {
            // Resetting new Password
            let newCustomerManager = new CustomerManager()
            let Reset, error = newCustomerManager.ResetPassword(newPassword)
            if (error != null || Reset != true) {this.TOGGLE_ERROR(error)}
        },
    }
}
</script>


<style lang="scss">

.resetPassword {
  margin-top: 160px;
  align-items: center;
  img {
    width: 214px;
    height: 200px;
  }
  h3 {
    font-size: 20px;
    margin-top: 40px;
  }
  p {
    text-align: center;
    max-width: 224px;
    font-size: 12px;
    font-weight: 300;
    margin-top: 16px;
  }
}
</style>