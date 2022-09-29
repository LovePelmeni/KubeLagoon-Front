<template>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="login-row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 login-card login-card-plain" style="height: 550px;">
                <div class="pb-0 card-header text-start">
                <h1 class="text-center" style="margin-top: 10px; color: #fff;">Sign In</h1>
                </div>
                <div class="login-card-body">
                  <form role="form" class="text-start">

                    <v-card-text>
                    <v-text-field
                        v-model="Email"
                        :rules="EmailValidationRules"
                        type="email"
                        label="Email"
                        placeholder="Email"
                        prepend-inner-icon="mdi-account"
                        required
                    />

                    <v-text-field
                            class="password-field"
                            v-model="Password"
                            :rules="PasswordValidationRules"
                            :type="passwordShow?'text':'password'"
                            label="Password"
                            placeholder="Password"
                            prepend-inner-icon="mdi-key"
                            :append-icon="passwordShow ? 'mdi-eye':'mdi-eye-off'"
                            @click:append="passwordShow = !passwordShow"
                            required
                    />
                        <v-switch 
                        @click="RememberUserFunction"
                        v-model="RememberUser"
                        label="Remember me"
                        color="indigo"></v-switch>

                    <div class="text-center">
                      <soft-button
                        
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        full-width
                        >Sign in
                      </soft-button>
                    </div>
                    </v-card-text>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <router-link
                      :to="{ name: 'register_page' }"
                      class="text-success text-gradient font-weight-bold"
                      >Sign up</router-link
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>


// import SoftInput from "../components/SoftInput.vue";
import SoftButton from "../components/SoftButton.vue";

const body = document.getElementsByTagName("body")[0];

import { mapMutations } from "vuex";
import * as customers from "../../customers/customers.js";

export default {

  created() {
    body.classList.remove("bg-gray-100");
  },

  name: 'LoginPage',
  components: {
    SoftButton,
  },
  data: () => ({
    
    // Remember User Data Attributes
    RememberUser: false,

    // Login Statuses
    LoginError: null,
    loggedFailed: false,
    logged: false,

    LoginLoading: false,
    snackbar: false,
    passwordShow: false,

    Email: '',
    EmailValidationRules: [
      username => !!username || 'Email is required',
      username => (username && username.length >= 8) || 'Invalid Email',
    ],

    Password: '',
    PasswordValidationRules: [
      password => !!password || 'Password is required',
      password => (password && password.length >= 10) || 'Invalid Password',
    ],
  }),

  methods: {
    
    ...mapMutations(["TOGGLE_ERROR"]),
    submitLoginForm(){
      // Submits the Login Form 
      if (this.$refs.form.validate()){
          this.LoginLoading = true
          setTimeout(()=> {
            this.LoginLoading = false
          }, 1000)
          this.loginCustomer(this.Username, this.Password)
          }
    },
    beforeUnmount() {
      this.toggleEveryDisplay();
      this.toggleHideConfig();
      body.classList.add("bg-gray-100");
    },
    loginCustomer(Username, Password) {
      // Loggs Customer Inside the Application using JWT Token

      let newCustomerManager = new customers.CustomerManager()
      let loggedIn, LogError = newCustomerManager.LoginCustomer(Username, Password)
      if (LogError != null && loggedIn != true){

        this.LoginError = LogError || "Failed to Login, Invalid Credentials"; 
        this.loggedFailed = true}else{

        this.logged = true
        this.$router.push({name: "main_page"})
      }
    },
  }
}

</script>

<style lang="scss">

.form-check-label {
    font-size: .875rem;
    font-weight: 400;
}

.form-switch {
    padding-left: 3rem;
}

.form-check {
    display: block;
    min-height: 1.5rem;
    padding-left: 1.73em;
    margin-bottom: 0.125rem;
}



.v-messages__message {
    align-items: center;
    align-content: center;
    text-align: center;
    line-height: 12px;
    word-break: break-word;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    hyphens: auto;
    transition-duration: 150ms;
    color: red;
}

.px-1 {
    padding-right: 4px !important;
    padding-left: 4px !important;
    margin-bottom: 10px !important;
}

.form-check-input[type=checkbox], .form-check-label {
    cursor: pointer;
}
html * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.form-label, label {
    font-size: .75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #344767;
    margin-right: 5px;
}
label {
    display: inline-block;
}

.password-field {

.v-messages__message {
    margin-left: 40px;
}
}


.btn-danger, .btn-danger:hover, .btn-dark, .btn-dark:hover, .btn-info, .btn-info:hover, .btn-primary, .btn-primary:hover, .btn-secondary, .btn-secondary:hover, .btn-success, .btn-success:hover, .btn-warning, .btn-warning:hover, .btn.bg-gradient-danger, .btn.bg-gradient-danger:hover, .btn.bg-gradient-dark, .btn.bg-gradient-dark:hover, .btn.bg-gradient-info, .btn.bg-gradient-info:hover, .btn.bg-gradient-primary, .btn.bg-gradient-primary:hover, .btn.bg-gradient-secondary, .btn.bg-gradient-secondary:hover, .btn.bg-gradient-success, .btn.bg-gradient-success:hover, .btn.bg-gradient-warning, .btn.bg-gradient-warning:hover {
    color: #fff;
}

.btn:not([class*=btn-outline-]) {
    border: 0;
}
[type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {
    cursor: pointer;
}
.bg-gradient-success {
    background-color: #7c5dfa;
}
.btn {
    margin-bottom: 1rem;
    letter-spacing: -.025rem;
    box-shadow: 0 4px 7px -1px rgb(0 0 0 / 11%), 0 2px 4px -1px rgb(0 0 0 / 7%);
    background-size: 150%;
    background-position-x: 25%;
}
.badge, .btn {
    text-transform: uppercase;
}
.mb-2 {
    margin-bottom: 0.5rem!important;
}
.mb-0 {
    margin-bottom: 0!important;
}
.my-4 {
    margin-top: 1.5rem!important;
    margin-bottom: 1.5rem!important;
}
.w-100 {
    width: 100%!important;
}
.btn {
    display: inline-block;
    font-weight: 700;
    line-height: 1.4;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    // background-color: transparent;
    border: 1px solid transparent;
    padding: 0.75rem 1.5rem;
    font-size: .75rem;
    border-radius: 0.5rem;
    transition: all .15s ease-in;
}
.btn:disabled {
    color: #67748e;
}

.form-switch .form-check-input:checked {
    border-color: rgba(58,65,111,.95);
    background-color: rgba(58,65,111,.95);
}

.form-switch .form-check-input:checked {
    background-position: 100%;
    background-image: none;
}
.form-check-input:checked[type=checkbox], .form-check-input:checked[type=radio] {
    background-image: linear-gradient(310deg,#141727,#3a416f);
}
.form-switch .form-check-input {
    border: 1px solid #e9ecef;
    position: relative;
    background-color: rgba(58,65,111,.1);
    height: 1.25em;
    border-radius: 2px;
}
.form-check-input[type=checkbox], .form-check-label {
    cursor: pointer;
}
.form-switch .form-check-input {
    width: 2.5rem;
    margin-left: -3rem;
    background-image: none;
    background-position: 0;
    border-radius: 2.5rem;
    transition: background-color .25s ease,border-color .25s ease,background-position .15s ease-in-out,opacity .15s ease-out,box-shadow .15s ease-in-out;
}
.form-check-input:checked {
    background-color: transparent;
    border-color: transparent;
}
// .form-check-input[type=checkbox] {
//     border-radius: 0.5rem;
// }
.form-check .form-check-input {
    float: left;
    margin-left: -1.73em;
}
.form-check-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.form-check-input {
    width: 1.23em;
    height: 1.23em;
    margin-top: 0.135em;
    vertical-align: top;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: contain;
    border: none;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    transition: background-color .25s ease,border-color .25s ease,background-position .15s ease-in-out,opacity .15s ease-out,box-shadow .15s ease-in-out;
}


.card .card-header {
    padding: 1.5rem;
}

.card-header:first-child {
    border-radius: 1rem 1rem 0 0;
}
.text-start {
    text-align: center!important;
}
.pb-0 {
    padding-bottom: 0!important;
}
.card-header {
    padding: 0.5rem 1rem;
    margin-bottom: 0;
    background-color: #1e2139;
    border-bottom: 0 solid rgba(0,0,0,.125);
}

.oblique .oblique-image {
    transform: skewX(10deg);
}

.bg-cover, .mask {
    background-size: cover;
}
.z-index-0 {
    z-index: 0!important;
}
.ms-n6 {
    margin-left: -4rem!important;
}
.ms-auto {
    margin-left: auto!important;
}
.h-100 {
    height: 100%!important;
}
.position-absolute {
    position: absolute!important;
}
.fixed-bottom, .fixed-top {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
}
.fixed-top {
    top: 0;

}
html * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
*, :after, :before {
    box-sizing: border-box;
}
// user agent stylesheet
div {
    display: block;
}

.form-switch {
    padding-left: 3rem;
}

.form-check {
    display: block;
    min-height: 1.5rem;
    padding-left: 1.73em;
    margin-bottom: 0.125rem;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.4rem;
    color: #495057;
    background-color: #1e2139;
    background-clip: padding-box;
    border: 1px solid #1e2139;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.5rem;
    transition: box-shadow .15s ease,border-color .15s ease;
}

button, input, optgroup, select, textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

input[type="Email" i] {
    padding: 1px 2px;
}
input[type="Password" i] {
  padding: 1px 2px;
}

// user agent stylesheet
input {
    writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: fieldtext;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    -webkit-rtl-ordering: logical;
    cursor: text;
    background-color: field;
    margin: 0em;
    padding: 1px 2px;
    border-width: 2px;
    border-style: inset;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
}

.mx-auto {
    margin-right: auto!important;
    margin-left: auto!important;
}

.col-md-6 {
    flex: 0 0 auto;
    width: 50%;
}
// .row>* {
//     flex-shrink: 0;
//     width: 100%;
//     max-width: 100%;
//     margin-right: auto !important;
//     margin-left: auto !important;
//     margin-top: var(--bs-gutter-y);
// }

.text-start {
    text-align: left!important;
}

// user agent stylesheet
.form {
    display: block;
    margin-top: 0em;
}
.login-card .login-card-body {
    font-family: Open Sans;
    padding: 1.5rem;
}
.login-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 500;
    word-wrap: break-word;
    background-color: #1e2139;
    background-clip: border-box;
    border: 0 solid rgba(0,0,0,.125);
    border-radius: 1rem;
}
.login-row {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(var(--bs-gutter-y)*-1);
    margin-right: calc(var(--bs-gutter-x)*-0.5);
    margin-left: calc(var(--bs-gutter-x)*-0.5);
}
// body {
//     font-weight: 400;
//     line-height: 1.6;
// }
// body {
//     margin: 0;
//     font-family: var(--bs-body-font-family);
//     font-size: var(--bs-body-font-size);
//     font-weight: var(--bs-body-font-weight);
//     line-height: var(--bs-body-line-height);
//     color: var(--bs-body-color);
//     text-align: var(--bs-body-text-align);
//     background-color: var(--bs-body-bg);
//     -webkit-text-size-adjust: 100%;
//     -webkit-tap-highlight-color: transparent;
// }

.text-gradient.text-success {
    background-color: #7c5dfa
}

.text-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    z-index: 1;
}
.font-weight-bolder {
    font-weight: 700!important;
}
.text-success {
    color: #7c5dfa!important;
}

.h1, .h2, .h3 {
    font-weight: 700;
}
.h3 {
    font-size: 1.875rem;
    line-height: 1.375;
}


.mb-0 {
    margin-bottom: 0!important;
}

.p {
    line-height: 1.625;
    font-weight: 400;
}
.p {
    font-size: 1rem;
}
.lead, .p {
    font-weight: 400;
}
.p {
    line-height: 1.6;
}
.p {
    margin-top: 0;
    margin-bottom: 1rem;
}
*, :after, :before {
    box-sizing: border-box;
}
// user agent stylesheet
.p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

  // .background{
  //   position: relative;
  //   padding: 56px;
  //   width: 100%;
  //   background-color: #141625;
  //   color: #fff;
  //   box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  // }
  // .v-application__wrap {
  // position: relative;
  //  padding: 56px;
  //  width: 100%;
  //  background-color: #141625;
  // }

  // .pa-4 {
  //   justify-content: space-between;
  //   margin-top: 50px; 
  //   max-width: 900px; 
  //   background-color: #1e2139;
  // }

</style>
