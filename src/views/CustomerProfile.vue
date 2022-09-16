<template>

    <div class="customerProfileBlock" style="justify-content: center; align-text: center;">

      <div @click="redirectToProfile" class="button flex">
          <div class="inner-button flex">
            <img :src="require('@/assets/customer_avatar.png')" style="justify-content: center; max-width: 400px; max-hight: 400px" alt="icon_plus" />
          </div>
      </div>

      <h1 style="margin-top: 20px;">Hello, {{ Customer.Username }}</h1>

      <div class="modalField flex flex-column">
        <label for="MaxCpu">Email</label>
        <v-card-text required type="text" id="Email">{{ Customer.Email }}</v-card-text>
      </div>

      <div class="modalField flex flex-column">
        <label for="City">City</label>

        <v-card-text
        @change="ValidateMemoryResources"
        required type="text" id="City" >{{ Customer.City }}</v-card-text>
      </div>

      <div class="resources-details flex">

        <div class="modalField flex flex-column">
          <label for="ZipCode">ZipCode</label>
          <v-card-text required type="text" id="ZipCode">{{ Customer.ZipCode }}</v-card-text>
        </div>

        <div class="modalField flex flex-column">
          <label for="Street">Street</label>
          <v-card-text required type="text" id="Street">{{ Customer.Street }}</v-card-text>
        </div>

      </div>

    </div>


    <body>
      <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
    </body>

</template>
<script>

import * as customers from "../../customers/customers.js";
import { useCookies } from "vue3-cookies";


export default {
      name: "CustomerProfile",
      setup() {
        const { cookies } = useCookies(); 
        return { cookies }
      },
      mounted() {
        this.JwtToken = this.cookie?.get("jwt-token")
      },
      created() {
        this.ShowCustomerProfile()
      },
      data() {
        return {
          // Customer Credentials
          Customer: {}, 
        }
      },
        methods: {

          ShowCustomerProfile() {
            // Function Parses Customer Data and Shows Out Customer's Profile Component
          
            let newCustomerManager = new customers.CustomerManager()
            let CustomerProfile = newCustomerManager.GetCustomerProfile(this.JwtToken)

            // Customer Info 
            this.Customer["Username"] = CustomerProfile["Username"]
            this.Customer["Email"] =  CustomerProfile["Email"]
            this.Customer["Password"] = "**********"

            // Billing Address Info 
            this.Customer["BillingAddress"] = CustomerProfile["BillingAddress"]
            this.Customer["Country"] = CustomerProfile["Country"]
            this.Customer["ZipCode"] = CustomerProfile["ZipCode"]
          },

          Logout() {
            // Logging out the Customer from the Profile
            if (this.cookies.get("jwt-token").length != 0) {
              this.cookies.delete("jwt-token");
              return this.$router.push({name: "login_page"})
            }
          },
          Login() {
            // Logs Customer in the Profile
            return this.$router.push({name: "login_page"})
          }
        },
      }

</script>

<style>

.customerProfileBlock {
  justify-content: center;
  
  flex: 1;
  position: relative;
  width: 100%;
  background-color: #141625;
  max-width: 865px;
}
  h1 {
        margin-bottom: 48px;
        color: #fff;
  }

  h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
  }
  h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
  }

    .modalField {
        margin-bottom: 24px;
    }
    label {
      font-size: 12px;
      margin-bottom: 6px;
    }
    select,
    input {
      width: 100%;
      background-color: #1e2139;
      color: #fff;
      border-radius: 4px;
      padding: 12px 4px;
      border: none;
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
  }

.v-card {
  overflow: initial;
  max-width: 10000px;
}
</style>
