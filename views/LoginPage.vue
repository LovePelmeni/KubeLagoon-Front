<template>
  <!-- Login Page !-->
  <LoginPage />
  <router-view></router-view>
</template>

<script>

import * as customers from "../customers/customers.js"
import { mapMutations } from "vuex";

export default {
  name: 'LoginPage',
  data: () => ({

    loading:false,

    snackbar:false,

    passwordShow:false,

    Username: '',
    UsernameRules: [
      username => !!username || 'Username is required',
      username => `^[a-z][A-Z][0-9]{1,100}$`.test(username) || 'Invalid Username',
      username => (username && username.length >= 10) || 'Username should be 10 characters or more!',
    ],

    Password: '',
    PasswordRules: [
      password => !!password || 'Password is required',
      password => (password && password.length >= 10) || 'Password must be 10 characters or more!',
    ],
  }),

  template: `
  <v-app>
    <div class="background"></div>
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="4" class="mx-auto">
        <v-card class="pa-4">
          <div class="text-center">
            <v-avatar size="100" color="indigo lighten-4">
              <v-icon size="40" color="indigo">mdi-account</v-icon>
            </v-avatar>
            <h2 class="indigo--text">Sign IN</h2>
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
              <v-switch label="Remember me" color="indigo"></v-switch>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn :loading="loading" type="submit" color="indigo">
                <span class="white--text px-8">Sign UP</span>
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
  `,
  methods: {

    ...mapMutations(["SHOW_ERROR"]),
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
      let loggedIn, LogError = newCustomerManager.LoginCustomer(this.email, this.password)
      if (LogError != null && loggedIn != true){this.SHOW_ERROR(LogError)}
    }
  }
};

</script>

<style lang="scss">

  .background{
    // height: 300px;
    // width: 100%;
    // display: block;
    // position: absolute;
    // top: 0;
    // background-size: cover;

    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
</style>
