<template>
  <v-app>
    <div class="registrationWrapper" style="background-color: #141625">
      <v-col cols="10" lg="4" class="mx-auto">
        <v-card class="pa-4">
          <div class="text-center">
            <h2 class="indigo--text" style="margin-bottom: 30px">Sign up</h2>
          </div>
          <v-form @submit.prevent="submitLoginForm" ref="form">
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
                      v-model="password"
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
                    type="country"
                    label="Country"
                    placeholder="select Country"
                    prepend-inner-icon="mdi-account"
                    required:items="countries">
                           <template v-slot:selection="{ country }">
                              <img :src="item.image">{{ country.name }}
                            </template>

                            <template v-slot:item="{ country }">
                              <img :src="item.image">{{ country.name }}
                            </template>
                      </v-select>

                <v-text-field
                  v-model="zipCode"
                  :rules="ZipCodeRules"
                  type="zipCode"
                  label="ZipCode"
                  placeholder="Zip code"
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
                <span class="white--text px-8">Sign in</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>

      <div v-if="Valid" class="formValidationTitle">
      <v-snackbar top color="green" v-model="snackbar">
        Registration success
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
import { mapMutations } from "vuex";

export const Countries = {
  name: "Countries",
  data() {
    return {
      countries: [],
    }
  },
  created() {
    this.GetCountries()
  },
  methods: {
    GetCountries() {
      // Returns the Array of the Available Countries
    }
  }
}

export default {

  name: 'RegistrationPage',
  components: [
    Countries,
  ],
  data: () => ({

    loading:false,
    snackbar:false,
    passwordShow:false,
    Valid: false,

    Username: '',
    UsernameRules: [
      username => !!username || 'Username is required',
      username => `^[a-z][A-Z][0-9]{1,100}$`.test(username) || 'Invalid Username',
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
      zipcode => !!zipcode || 'Zip Code is required',
    ],

    Street: '',
      StreetRules: [
        street => !!street || 'Street is required',
    ],
  }),

  methods: {
    ...mapMutations(["TOGGLE_ERROR"]),

    submitRegisterForm(){
      if (this.$refs.form.validate()){
          this.loading = true
        setTimeout(()=> {
          this.loading = false
          this.snackbar = true
        }, 3000)
        this.Valid = true
      }else{
        this.Valid = false
      }
    },
    registerCustomer() {
      let newCustomerManager = new customers.CustomerManager()
      let RegisterError = newCustomerManager.CreateCustomer(
      this.Username, this.Email, this.Password, this.Country, this.ZipCode, this.Street)
      if (RegisterError != null){this.TOGGLE_ERROR(RegisterError)}
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
}

.v-application__wrap {
  background-color: #141625;
}


</style>
