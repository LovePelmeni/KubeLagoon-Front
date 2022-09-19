<template>
  <v-app>
    <div class="loginWrapper" style="background-color: #141625">
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="4" class="mx-auto">

        <v-card class="pa-4">
          <div class="text-center">
            <h2 class="indigo--text">Sign in</h2>
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
    </v-main>
    
    <v-snackbar :v-if="this.logged == true" top color="green" v-model="snackbar">
      Login success
    </v-snackbar>

    <v-snackbar :v-if="this.loggedFailed == true" top color="red" v-model="snackbar">
      Login Failed, Invalid Credentials
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
import {  mapMutations, mapState } from "vuex";

export default {

  name: 'LoginPage',
  data: () => ({
    
    // Login Statuses
    LoginError: null,
    loggedFailed: false,
    logged: false,

    loading:false,
    snackbar:false,
    passwordShow:false,

    Username: '',
    UsernameRules: [
      username => !!username || 'Username is required',
      username => (username && username.length >= 10) || 'Username should be 10 characters or more!',
    ],

    Password: '',
    PasswordRules: [
      password => !!password || 'Password is required',
      password => (password && password.length >= 10) || 'Password must be 10 characters or more!',
    ],
  }),

  methods: {
    ...mapMutations(["TOGGLE_ERROR"]),
    ...mapState(["loading"]),
    
    submitLoginForm(){
      if (this.$refs.form.validate()){
          this.loading = true
        setTimeout(()=> {
          this.loading = false
          this.snackbar = true
        },3000)
      }
    },
    loginCustomer() {
      let newCustomerManager = new customers.CustomerManager()
      let loggedIn, LogError = newCustomerManager.LoginCustomer(this.Username, this.password)
      if (LogError != null && loggedIn != true){this.LoginError = LogError; this.loggedFailed = true}else{
        this.loggedIn = true 
        this.logged = true
        this.$router.push({name: "main_page"})
      }
    },
  }
};

</script>

<style lang="scss">

  .background{
    position: relative;
    padding: 56px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .v-application__wrap {
  position: relative;
   padding: 56px;
   width: 100%;
   background-color: #141625;
  }

  .pa-4 {
    justify-content: space-between;
    margin-top: 50px; 
    max-width: 900px; 
    background-color: #1e2139;
  }

</style>

