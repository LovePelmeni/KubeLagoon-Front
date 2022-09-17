<template>
  <v-app>

    <div class="registrationWrapper" style="background-color: #141625">
      <v-col cols="10" lg="4" class="mx-auto">

        <v-card class="pa-4">
          <div class="text-center">
            <h2 class="indigo--text" style="margin-bottom: 30px">Sign up</h2>
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
                    required:items="countries">

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

            <v-switch label="Remember me" color="indigo"></v-switch>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn :loading="loading" type="submit" color="indigo">
                <span class="white--text px-8">Sign up</span>
              </v-btn>
            </v-card-actions>

          </v-form>
        </v-card>
      </v-col>

      <div v-if="Registered" class="formValidationTitle">
      <v-snackbar top color="green" v-model="snackbar">
        Registration success
      </v-snackbar>

      <v-snackbar :v-if="RegisterFailed" top color="red" v-model="snackbar">
        Registration Failed, {{ RegisterError }}
      </v-snackbar>
      </div>
      <div v-else-if="Valid == false" class="formValidationTitle"> 
      </div>
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
      country => !country || 'Country is required',
    ],


    ZipCode: '',
    ZipCodeRules: [
      zipcode => !zipcode.length || 'Zip Code is required',
    ],

    Street: '',
      StreetRules: [
        street => !street.length || 'Street is required',
    ],
  }),

  methods: {

    submitRegisterForm(){
      if (this.$refs.form.validate()){
          this.loading = true
        setTimeout(()=> {
          this.loading = false
          this.snackbar = true
        }, 3000)
        this.registerCustomer()
      }
    },
    registerCustomer() {
      // Submits the Registration Form 
      let newCustomerManager = new customers.CustomerManager()
      let Registered, RegisterError = newCustomerManager.CreateCustomer(this.Username, this.Email, this.Password,
      this.BillingAddress, this.ZipCode, this.Street)
      this.Registered = Registered 
      this.RegisterError = RegisterError
    },
  }
};


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
