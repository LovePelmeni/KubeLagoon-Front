<template>
  <v-app>

    <div class="profile-content container fluid" style="position: relative; background-color: #141625; justify-content: space-between; display: flex;">

      <div class="customerProfileImage" style="position: relative; height: 500px; width: 500px;">
      <img :src="require('../assets/customer_avatar.png')" 
      style="height: 500px; width: 500px; left: 0; top: 50px; margin-left: 40px;" >
      </div>

      <!-- Checking if the Customer Profile has been Obtained, otherwise, it is going to be not found page -->
      <v-col v-if="JwtToken != null && ProfileFetchFailure === false" cols="10" lg="6" class="mx-auto"> 

        <v-card class="pa-4" style="background-color: #141625;">
          <v-form id="CustomerProfileForm" ref="form">
            <v-card-text>

              <v-text-field
                style="background-color: #1e2139; border-radius: 2px; 2px; 2px; 2px;"
                v-if="EditProfile && EditProfileDisabled === false"
                v-model="Username"
                :rules="UsernameRules"
                type="username"
                label="Username"
                placeholder="Username"
                prepend-inner-icon="mdi-account"
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
                v-if="EditProfile && EditProfileDisabled === false"
                v-model="Password"
                :rules="PasswordRules"
                :type="passwordShow?'text':'password'"
                label="Password"
                placeholder="Password"
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
              v-if="EditProfile && EditProfileDisabled === false"
              v-model="Email"
              :rules="EmailRules"
              type="email"
              label="Username"
              placeholder="Username"
              prepend-inner-icon="mdi-account"
              />

              <v-text-field
                style="background-color: #1e2139; margin-top: 20px;"
                v-else
                disabled
                label="Email"
                placeholder="Email"
              />
              
              <v-select
              style="background-color: #1e2139; margin-top: 20px; 
              .v-input__details{
                  background-color: #141625 !important; 
              }"
              item-title="countryTitle"
              item-value="countryValue"
              v-model="Country"
              type="country"
              label="Country"
              placeholder="select Country"
              prepend-inner-icon="mdi-account"
              :items="[
              'Russia', 'USA', 
              'England', 'Germany', 
              'France', 'Italy', 
              'Norway', 'Ukraine', 'Canada']">
              </v-select>

                <v-text-field
                style="background-color: #1e2139; margin-top: 20px;"
                v-if="EditProfile && EditProfileDisabled === false"
                v-model="ZipCode"
                :rules="ZipCodeRules"
                type="zipCode"
                label="ZipCode"
                placeholder="Zip code"
                prepend-inner-icon="mdi-account"
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
                  v-if="EditProfile && EditProfileDisabled === false"
                  v-model="Street"
                  :rules="StreetRules"
                  type="street"
                  label="Street"
                  placeholder="Street"
                  prepend-inner-icon="mdi-account"
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
        Edit Failed, {{ EditError }}
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
import { mapMutations } from "vuex";

export default {

  name: "EditCustomerProfileComponent",
  props: [
    "customer"
  ],
  setup() {
    const { cookie } = useCookies();
    return { cookie };
  },
  mounted() {
    this.JwtToken = this.cookie?.get("jwt-token") || "jwt-token"
    this.CheckProfileFetched()
  },
  data() {
    return {

    // Loading Statuses

    CancelLoading: null,
    ApplyChangesLoading: null,

    // Error Statuses 

    EditProfile: false,
    EditProfileDisabled: false,
    ProfileFetchFailure: false,

    EditError: null, 
    activeError: false,

    // Customer Profile Form Fields
  
    Username: function(object) {return object.$props.customer.Username || object.MarkAsFetchFailure()}(this) || null,
    UsernameRules: [
      username => !!username || 'Please enter Valid Username',
      username => (username && username.length >= 10) || 'Username should be 10 characters or more!',
    ],

    Email: function(object) {if(object.$props.customer.Email == null) {
    object.MarkAsFetchFailure(); return object.$props.customer.Email}else{
    return object.$props.customer.Email}}(this) || null,

    EmailRules: [
      email => !!email || 'Please Enter Valid E-mail',
      email => /.+@.+\..+/.test(email) || 'E-mail must be valid',
      email => (email && email.length >= 11) || 'E-mail must be at least 11 characters'
    ],

    Password: function(object) {if (
    object.$props.customer.Password == null) {object.MarkAsFetchFailure();
    return object.$props.customer.Password}else{return object.$props.customer.Password}}(this) || null,

    PasswordRules: [
      password => !!password || 'Please enter the Valid Password',
      password => (password && password.length >= 10) || 'Password must be 10 characters or more!',
    ],

    Country: {
      'countryTitle': function(object) {return object.$props.customer["Country"]}(this),
      'countryValue': function(object) {return object.$props.customer["Country"]}(this),
    },

    CountryRules: [
      country => !!country || 'Please select the Country',
    ],

    ZipCode: function(object) {return object.$props.customer.ZipCode || object.MarkAsFetchFailure()}(this) || null,
    ZipCodeRules: [
      zipcode => zipcode.length > 0 || 'Please Enter the Valid ZIP Code',
      zipcode => isNaN(zipcode) == false || 'Invalid Zip Code',
    ],

    Street: function(object) {return object.$props.customer.Street || object.MarkAsFetchFailure()}(this) || null,
      StreetRules: [
        street => street.length > 0 || 'Please Enter the Valid Street',
    ],
    };
  },
  methods: {
    ...mapMutations(["TOGGLE_EDIT_CUSTOMER_AT_STORE"]),

    MarkAsFetchFailure() {
      // Triggers  the Profile not found banner, once some info about Customer's Profile 
      // has been failed to be fetched 
      this.ProfileFetchFailure = true
    },

    CheckProfileFetched() {
      // Checks if the customer Profile Data has been fetched successfully, otherwise 
      // this method blocks any actions, to prevent bad consuqences with accident updates
      if (this.$props.customer === {} || this.$props.customer === null) {
        this.EditProfileDisabled = true
      }
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

      let EditForm = customers.CustomerEditForm(
        function(){if (this.Username.length > 0) {return this.Username} else{return null} }() || this.$props.customer.Username,
        function(){if (this.Email.length > 0) {return this.Email} else{return null} }() || this.$props.customer.Email,
        function(){if (this.Password.length > 0) {return this.Password} else{return null} }() || this.$props.customer.Password,
        function(){if (this.Country.length > 0) {return this.Country} else{return null} }() || this.$props.customer.Country,
        function(){if (this.City.length > 0) {return this.City} else{return null} }() || this.$props.customer.City,
        function(){if (this.ZipCode.length > 0) {return this.ZipCode} else{return null} }() || this.$props.customer.ZipCode,
        function(){if (this.Street.length > 0) {return this.Street} else{return null} }() || this.$props.customer.Street,
      )

      let customerManager = new customers.CustomerManager()
      let Edited, EditError = customerManager.EditCustomer(this.JwtToken, EditForm)

      if (EditError != null || Edited == false) {
      this.activeError = true; this.EditError = "Error"}
      this.activeError = false 
      this.EditError = null
      this.ApplyChangesLoading = false
      this.TOGGLE_EDIT_CUSTOMER_AT_STORE(EditForm.ToBlob())
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

.v-input__details{
    background-color: #141625 !important; 
}

</style>