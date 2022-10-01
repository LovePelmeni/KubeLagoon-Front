<template>
  <v-app>
    <div class="profile-content" style="background-color: #141625">
    <div style="margin-top: 5px;">
      <div class="left flex flex-column" style="margin-bottom: 5px; justify-content: center;">

        <div v-if="JwtToken != null">
        <h1 style="color: white; align-text: center;" v-if="Username.length > 0">Hello, {{ Customer.Username }}!</h1>
        </div>

        <div v-else class="mobile-message flex flex-column">
        <h2>Oops, You Profile Not Found :(</h2>
        <p>Please make sure you are authenticated and retry again</p>
        </div>

      </div>
    </div>
      <!-- Checking if the Customer Profile has been Obtained, otherwise, it is going to be not found page -->
      <v-col v-if="JwtToken != null" cols="10" lg="6" class="mx-auto"> 

        <v-card class="pa-4" style="background-color: #141625;">
          <v-form id="CustomerProfileForm" ref="form">
            <v-card-text>

              <v-text-field
                style="background-color: #1e2139; border-radius: 2px; 2px; 2px; 2px;"
                v-if="EditProfile"
                v-model="Username"
                :rules="UsernameRules"
                type="username"
                label="Username"
                placeholder="Username"
                prepend-inner-icon="mdi-account"
                required
              />

              <v-text-field
                style="background-color: #1e2139; border-radius: 2px; 2px; 2px; 2px; margin-top: 20px;"
                v-else
                disabled
                label="Username"
                placeholder="Username"
              />
              
              <v-text-field
                style="background-color: #1e2139; margin-top: 20px;"
                v-if="EditProfile"
                v-model="Password"
                :rules="PasswordRules"
                :type="passwordShow?'text':'password'"
                label="Password"
                placeholder="Password"
                required
              />

              <v-text-field
                style="background-color: #1e2139; margin-top: 20px;"
                v-else
                disabled
                label="Password"
                placeholder="Password"
              />
              

              <v-text-field
              style="background-color: #1e2139; margin-top: 20px;"
              v-if="EditProfile"
              v-model="Email"
              :rules="EmailRules"
              type="email"
              label="Email"
              placeholder="Email"
              prepend-inner-icon="mdi-account"
              required
              />

              <v-text-field
                style="background-color: #1e2139; margin-top: 20px;"
                v-else
                disabled
                label="Email"
                placeholder="Email"
              />
                    <v-select
                    style="background-color: #1e2139; margin-top: 20px;"
                    v-model="Country"
                    type="country"
                    label="Country"
                    placeholder="select Country"
                    prepend-inner-icon="mdi-account"
                    :items="[
                    'Russia', 'USA', 
                    'England', 'Germany', 
                    'France', 'Italy', 
                    'Norway', 'Ukraine', 'Canada']" required>
                    </v-select>

                <v-text-field
                style="background-color: #1e2139; margin-top: 20px;"
                v-if="EditProfile"
                v-model="ZipCode"
                :rules="ZipCodeRules"
                type="zipCode"
                label="ZipCode"
                placeholder="Zip code"
                prepend-inner-icon="mdi-account"
                required
                />

                <v-text-field
                style="background-color: #1e2139; margin-top: 20px;"
                v-else
                disabled
                label="ZipCode"
                placeholder="ZipCode"
                />
              

                <v-text-field
                  style="background-color: #1e2139; margin-top: 20px;"
                  v-if="EditProfile"
                  v-model="Street"
                  :rules="StreetRules"
                  type="street"
                  label="Street"
                  placeholder="Street"
                  prepend-inner-icon="mdi-account"
                  required
                />

                <v-text-field
                  style="background-color: #1e2139; margin-top: 20px;"
                  v-else
                  disabled
                  label="Street"
                  placeholder="Street"
                />

              </v-card-text>


              <div class="save flex">

                  <div class="buttonBlock flex" style="width: 800px">
                    <v-btn type="submit" v-if="EditProfile == true" @click="CancelEditProfileController" id="CancelSetup" style="background-color: #ec5757" :loading="CancelLoading">Cancel Setup</v-btn>
                    <v-btn v-if="EditProfile == true" style="background-color: green;" :loading="ApplyChangesloading" type="submit" @click="ApplyChangesProfileController">Save</v-btn>
                    <v-btn v-if="EditProfile == false" style="background-color: #7c5dfa;" type="submit" @click="EditProfileController">Edit Profile</v-btn>
                  </div>
              </div>
              
          </v-form>
        </v-card>
      </v-col>

      <v-snackbar top color="green">
        Edited Successfully
      </v-snackbar>

      <v-snackbar v-if="activeError" top color="red">
        Update Failed, {{ EditError }}
      </v-snackbar>
      </div>
  </v-app>

  <body>
      <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
  </body>
</template>

<script>

import { useCookies } from "vue3-cookies";
import * as customers from "../../customers/customers.js"

export default {

  name: "CustomerProfile",
  setup() {
    const { cookie } = useCookies();
    return { cookie };
  },
  mounted() {
    this.JwtToken = this.cookie?.get("jwt-token") || "jwt-token"
  },
  props: [
    "Customer"
  ],
  data: (selfInstance) => {
    return {

      // Loading Statuses
      CancelLoading: null,
      ApplyChangesLoading: null,

      // Error Statuses 
      EditProfile: false,
      EditError: null, 
      activeError: false,

      // Customer Profile Form Fields
  
    Username: selfInstance.Customer.Username || 'Failed to Fetch Username',
    UsernameRules: [
      username => !!username || 'Please enter Valid Username',
      username => (username && username.length >= 10) || 'Username should be 10 characters or more!',
    ],

    Email: selfInstance.Customer.Email || 'Failed to Fetch Email',
    EmailRules: [
      email => !!email || 'Please Enter Valid E-mail',
      email => /.+@.+\..+/.test(email) || 'E-mail must be valid',
      email => (email && email.length >= 11) || 'E-mail must be at least 11 characters'
    ],

    Password: selfInstance.Customer.Password || 'Failed to Fetch Password',
    PasswordRules: [
      password => !!password || 'Please enter the Valid Password',
      password => (password && password.length >= 10) || 'Password must be 10 characters or more!',
    ],

    Country: selfInstance.Customer.Country || 'Failed to Fetch Country',
    CountryRules: [
      country => !!country || 'Please select the Country',
    ],

    ZipCode: selfInstance.Customer.ZipCode || 'Failed to Fetch Zip Code',
    ZipCodeRules: [
      zipcode => zipcode.length > 0 || 'Please Enter the Valid ZIP Code',
      zipcode => isNaN(zipcode) == false || 'Invalid Zip Code',
    ],

    Street: selfInstance.Customer.Street || 'Failed to Fetch Street',
      StreetRules: [
        street => street.length > 0 || 'Please Enter the Valid Street',
    ],
    };
  },
  created() {
    this.GetCustomerProfile(this?.JwtToken)
  },
  methods: {

    GetCustomerProfile() {
      // Returns the Customer's Profile 
      let customerManager = new customers.CustomerManager()
      let Customer, CustomerError = customerManager.GetCustomerProfile(this.JwtToken)
      if (CustomerError != null) {this.activeError = true; this.EditError = "Failed to Render Profile"}else{

      for (let CustomerProperty in Object.keys(Customer || {"Username": "Username", "Email": "email@gmail.com", "Password": "Password"})) {
          this.$data[CustomerProperty] = Customer[CustomerProperty]
      }}
      this.activeError = false 
      this.EditError = null
    },

    RedirectToMainPage() {
      // Redirects to the Main Page of the Application 
      this.$router.push({name: "main_page"})
    },

    EditProfileController() {
      // Activates Customer Profile Edit Form
      this.EditProfile = true
    },

    CancelEditProfileController() {
      // Cancels Operation of Editing the Customer's Profile 
      this.CancelLoading = true
      this.EditProfile = false
      this.CancelLoading = false
    },

    ApplyChangesProfileController() {
      // Applies Form Changes to the Customer's Profile 
      this.ApplyChangesloading = true 
      this.EditProfile = false 

      let customerManager = new customers.CustomerManager()
      let Edited, EditError = customerManager.EditCustomer()

      if (EditError != null || Edited == false) {
      this.activeError = true; this.EditError = "Error"}
      this.activeError = false 
      this.EditError = null
      this.ApplyChangesLoading = false
    }
  },
};

</script>

<style lang="scss" scoped>

.profile-content {

  .CustomerProfileForm {
    background-color:  #d9dcf7;
    .save {
      margin-top: 60px;
      div {
        flex: 1;
      }
      .buttonBlock{
        justify-content: space-between;
      }
    }
  }
  flex: 1;
  position: relative;
  width: 100%;
  background-color: #141625;
  color: #141625;
  // color: #1e2139
}

.dark-purple {
  background-color: #252945;
}
.red {
  background-color: #ec5757;
}
.purple {
  background-color: #7c5dfa;
}
.green {
  background-color: #33d69f;
}
.orange {
  background-color: #ff8f00;
}

.mobile-message {
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background-color: #141625;
  color: #fff;
  p {
    margin-top: 16px;
  }
}
</style>
