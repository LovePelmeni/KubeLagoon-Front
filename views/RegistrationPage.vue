<template>
  <v-app>
    <div class="background"></div>
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="4" class="mx-auto">
        <v-card class="pa-4">
          <div class="text-center">
            <v-avatar size="100" color="indigo lighten-4">
              <v-icon size="40" color="indigo">mdi-account</v-icon>
            </v-avatar>
            <h2 class="indigo--text">Sign UP</h2>
          </div>
          <v-form @submit.prevent="submitRegisterForm" ref="form">
            <v-card-text>
              <v-text-field
                v-model="Username"
                :rules="UsernameRules"
                type="username"
                label="Username"
                placeholder="Username"
                prepend-inner-icon="mdi-account"
                required
              />
              <v-text-field
                v-model="Email"
                :rules="EmailRules"
                type="email"
                label="Email"
                placeholder="Email"
                prepend-inner-icon="mdi-account"
                required
              />
              <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      :type="passwordShow?'text':'password'"
                      label="Password"
                      placeholder="Password"
                      prepend-inner-icon="mdi-key"
                      :append-icon="passwordShow ? 'mdi-eye':'mdi-eye-off'"
                      @click:append="passwordShow = !passwordShow"
                      required
              />

              <v-text-field
                v-model="country"
                :rules="countryRules"
                type="country"
                label="Country"
                placeholder="Country"
                prepend-inner-icon="mdi-account"
                required
              />

              <v-text-field
                v-model="zipCode"
                :rules="zipCodeRules"
                type="zipCode"
                label="ZipCode"
                placeholder="ZipCode"
                prepend-inner-icon="mdi-account"
                required
              />

              <v-text-field
                v-model="street"
                :rules="streetRules"
                type="street"
                label="Street"
                placeholder="Street"
                prepend-inner-icon="mdi-account"
                required
              />
              <v-switch label="Remember me" color="indigo"></v-switch>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn :loading="loading" type="submit" color="indigo">
                <span class="white--text px-8">Sign Up</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-main>
    <v-snackbar top color="green" v-model="snackbar">
      Login success
    </v-snackbar>
  </v-app>
</template>

<script>
import * as customers from "../customers/customers.js"
import {mapMutations} from "vuex";

export default {
  name: 'RegistrationPage',
  data: () => ({

    loading:false,

    snackbar:false,

    passwordShow:false,

    Username: '',
    UsernameRules: [
      username => !!username || 'Username is required',
      username => `^[a-z][A-Z][0-9]{1,100}$`.test(username) || 'Invalid Username'
      username => !this.CheckUsernameExists(username) || 'Username already Exists'
    ],

    Email: '',
    EmailRules: [
      email => !!email || 'E-mail is required',
      email => /.+@.+\..+/.test(email) || 'E-mail must be valid',
      email => !this.CheckEmailExists() || 'Email Already Exists'
    ],

    Password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 10) || 'Password must be 10 characters or more!',
    ],


    Country: '',
    countryRules: [
      country => !!username || 'Country is required',
      country => `^[a-z][A-Z][0-9]{1,100}$`.test(username) || 'Invalid Username'
    ],


    ZipCode: '',
    zipCodeRules: [
      zipcode => !!username || 'Zip Code is required',
      zipcode => `^[a-z][A-Z][0-9]{1,100}$`.test(username) || 'Invalid Username'
    ],

    Street: '',
      StreetRules: [
        street => !!username || 'Street is required',
        street => `^[a-z][A-Z][0-9]{1,100}$`.test(username) || 'Invalid Username'
    ],

  }),
  methods: {

    ...mapMutations(["SHOW_ERROR"])

    CheckUsernameExists(Username) {
      // Checks if the Username Already Exists
    },
    CheckEmailExists(Email) {
      // Checks if the Email already exists
    }
    submitRegisterForm(){
      if (this.$refs.form.validate()){
          this.loading = true
        setTimeout(()=> {
          this.loading = false
          this.snackbar = true
        },3000)
      }
    },
    registerCustomer() {
      let newCustomerManager = new customers.CustomerManager()
      let, RegisterError = newCustomerManager.CreateCustomer(
      this.Username, this.Email, this.Password, this.Country, this.ZipCode, this.Street)
      if (LogError != null){this.SHOW_ERROR(LogError)}
    }
  }
};

</script>

<style lang="scss">

  .background{
    // background-image: url(./assets/Order-Banner.jpg) !important;
    // height: 300px;
    // width: 100%;
    // display: block;
    // position: absolute;
    // top: 0;
    // background-size: cover;
    // position: relative;
    
   padding: 56px;
   max-width: 700px;
   width: 100%;
   background-color: #141625;
   color: #fff;
   box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  }
</style>
