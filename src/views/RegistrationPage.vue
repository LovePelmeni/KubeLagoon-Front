<template>
  <v-app>

    <div class="registrationWrapper" style="background-color: #141625">

        <div style="margin-top: 5px;">
      <div class="left flex flex-column" style="margin-bottom: 5px; justify-content: center;">
        <h1 style="margin-top: 10px; color: white; align-text: center;">Sign Up</h1>
      </div>
        </div>

      <v-col cols="10" lg="6" class="mx-auto">

        <v-card class="pa-4">
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
                      v-model="Password"
                      :rules="PasswordRules"
                      :type="passwordShow?'text':'password'"
                      label="Password"
                      placeholder="Password"
                      prepend-inner-icon="mdi-key"
                      :append-icon="passwordShow ? 'mdi-eye':'mdi-eye-off'"
                      @click:append="passwordShow = !passwordShow"
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

                    <v-select
                    v-model="Country"
                    type="country"
                    label="Country"
                    placeholder="select Country"
                    prepend-inner-icon="mdi-account"
                    required:items="countries" required>

                           <template v-slot:selection="{ item, index}">
                              <input type="hidden" :value="index">
                              <img :src="item.IconImageUrl">{{ item.CountryName }}
                            </template>

                            <template v-slot:item="{ item, index }">
                              <input type="hidden" :value="index">
                              <img :src="item.IconImageUrl">{{ item.CountryName }}
                            </template>
                      </v-select>

                <v-text-field
                  v-model="ZipCode"
                  :rules="ZipCodeRules"
                  type="zipCode"
                  label="ZipCode"
                  placeholder="Zip code"
                  prepend-inner-icon="mdi-account"
                  required
                />

                <v-text-field
                  v-model="Street"
                  :rules="StreetRules"
                  type="street"
                  label="Street"
                  placeholder="Street"
                  prepend-inner-icon="mdi-account"
                  required
                />

            <v-switch 
            @click="RememberUserFunction"
            v-model="RememberUser"
            label="Remember me"
            color="indigo"></v-switch>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn :loading="loading" type="submit" color="indigo">
                <span class="white--text px-8">Sign up</span>
              </v-btn>
            </v-card-actions>

          </v-form>
        </v-card>
      </v-col>

      <v-snackbar v-model="Registered" top color="green">
        Registration success
      </v-snackbar>

      <v-snackbar v-model="RegisterFailed" top color="red">
        Registration Failed, {{ RegisterError }}
      </v-snackbar>
      </div>
  </v-app>

  <body>
      <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
  </body>
  
</template>

<script>

import * as customers from "../../customers/customers.js";

export default {

  name: 'RegistrationPage',
  data: () => ({

      // Response Attributes 
      Registered: false,
      RegisterFailed: false, 
      RegisterError: null, 


      countries: [
        {
          "IconImageUrl": "@/assets/europe_moscow.png",
          "CountryName": "Russia", 
        },
        {
          "CountryName": "Germany",
          "IconImageUrl": "@/assets/europe_berlin.png",
        }
      ],

    loading:false,
    snackbar:false,
    passwordShow:false,
    Valid: false,

    RememberUser: false,

    Username: '',
    UsernameRules: [
      username => !!username || 'This Field is Required',
      username => (username && username.length >= 10) || 'Username should be 10 characters or more!',
    ],

    Email: '',
    EmailRules: [
      email => !!email || 'E-mail is required',
      email => /.+@.+\..+/.test(email) || 'E-mail must be valid',
      email => (email && email.length >= 11) || 'E-mail must be at least 11 characters'
    ],

    Password: '',
    PasswordRules: [
      password => !!password || 'Password is required',
      password => (password && password.length >= 10) || 'Password must be 10 characters or more!',
    ],


    Country: '',
    CountryRules: [
      country => !!country || 'Country is required',
    ],


    ZipCode: '',
    ZipCodeRules: [
      zipcode => zipcode.length > 0 || 'Zip Code is required',
      zipcode => isNaN(zipcode) == false || 'Invalid Zip Code',
    ],

    Street: '',
      StreetRules: [
        street => street.length > 0 || 'Street is required',
    ],
  }),

  methods: {

    RememberUserFunction() {
      // Remembers the Username and Password 
    },
    
    submitRegisterForm(){
      // Submitting the Registration Form 

      if (this.$refs.form.validate()){
        this.loading = true
      setTimeout(()=> {
        this.loading = false
        this.snackbar = true
      }, 2000)
        this.registerCustomer()
        }
    },
    registerCustomer() {
      // Submits the Registration Form 
      
      let newCustomerManager = new customers.CustomerManager()
      let Registered, RegisterError = newCustomerManager.CreateCustomer(this.Username, this.Email, this.Password,
      this.BillingAddress, this.ZipCode, this.Street)
      this.Registered = Registered || false

      if (Registered == false || RegisterError != null) {
      this.RegisterError = RegisterError || "Failed to Register";
      this.RegisterFailed = true}
    },
  }
}
</script>

<style lang="scss">

.registrationWrapper {

  .registrationForm {
    background-color:  #d9dcf7;
  }
  flex: 1;
  position: relative;
  width: 100%;
  background-color: #141625;
  color: #1e2139
}

.v-application__wrap {
  background-color: #141625;
  color: #141625;
}

</style>
