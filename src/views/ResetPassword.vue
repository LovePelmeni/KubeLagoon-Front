<template>

    <form @submit.prevent="ValidateInput" class="virtual-machine-content">
      <loadingPage v-show="loading" />

      <!-- reset Password Details -->

        <div class="resetPassword flex">

          <div class="modalField flex flex-column">
            <label for="NewPassword">New Password</label>
            <input !change="ValidateNewPassword" :rules="PasswordRules" required type="text" id="paymentDueDate" v-model="paymentDueDate" />
            <span id="errors" v-if="error" class="red">{{ error }}</span>
          </div>

        </div>
    </form>

      <v-snackbar top color="green" :v-if="!ResetFailed" >
        Password has been Reset
      </v-snackbar>

      <v-snackbar :v-if="ResetFailed" top color="red" >
        Reset Failed, {{ ResetError }}
      </v-snackbar>
    
</template>

<script lang="javascript">


import { CustomerManager } from "../../customers/customers.js"
import { mapMutations } from "vuex";

export default {
    name: "ResetPassword",
    data() {
        return {
            ResetError: null,
            PasswordRules: (password) => password.length > 0 || 'This field is required',
            NewPassword: null, 
        }
    },
    methods: {
        ...mapMutations(["TOGGLE_ERROR"]),

        ValidateNewPassword(Password) {
            // Validating new Password
            if (Password.length < 10 || Password === null) {
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
    },
    watch: {
      NewPassword: function() {
        this.ValidateNewPassword(this.NewPassword)
      }
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

    .modalField {
    margin-bottom: 24px;
  }
  label {
    font-size: 12px;
    margin-bottom: 6px;
  }
  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
    &:focus {
      outline: none;
    }
  }

}
</style>