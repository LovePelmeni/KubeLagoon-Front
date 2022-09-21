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
    this.JwtToken = this.cookie?.get("jwt-token")
  },

  template: `
    <v-app>
    <div class="profile-content" style="background-color: #141625">
    <div style="margin-top: 5px;">
      <div class="left flex flex-column" style="margin-bottom: 5px; justify-content: center;">
        <h1 v-if="Username.length > 0" style="margin-top: 10px; color: white; align-text: center;">Hello, {{ Username }}!</h1>
        <h1 v-else style="margin-top: 10px; color: white; align-text: center;">Oops, Your Profile Is Not Found :(</h1>
      </div>
    </div>

      <v-col cols="10" lg="6" class="mx-auto">

        <v-card class="pa-4">
          <v-form id="CustomerProfileForm" ref="form">
            <v-card-text>

              <v-text-field
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
                v-else
                disabled
                label="Username"
                placeholder="Username"
              />
              
              <v-text-field
                v-if="EditProfile"
                v-model="Password"
                :rules="PasswordRules"
                :type="passwordShow?'text':'password'"
                label="Password"
                placeholder="Password"
                required
              />

              <v-text-field
                v-else
                disabled
                label="Password"
                placeholder="Password"
              />
              

              <v-text-field
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
                v-else
                disabled
                label="Email"
                placeholder="Email"
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
                v-else
                disabled
                label="ZipCode"
                placeholder="ZipCode"
                />
              

                <v-text-field
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
`,

  data() {
    return {

      // Loading Statuses
      CancelLoading: null,
      ApplyChangesLoading: null,

      // Error Statuses 
      EditProfile: false,
      EditError: null, 
      activeError: false,

      // Customer Profile Form Fields
  
    Username: '',
    UsernameRules: [
      username => !!username || 'Please enter Valid Username',
      username => (username && username.length >= 10) || 'Username should be 10 characters or more!',
    ],

    Email: 'Failed to Fetch Email',
    EmailRules: [
      email => !!email || 'Please Enter Valid E-mail',
      email => /.+@.+\..+/.test(email) || 'E-mail must be valid',
      email => (email && email.length >= 11) || 'E-mail must be at least 11 characters'
    ],

    Password: 'Failed to Fetch Password',
    PasswordRules: [
      password => !!password || 'Please enter the Valid Password',
      password => (password && password.length >= 10) || 'Password must be 10 characters or more!',
    ],

    Country: 'Failed to Fetch Country',
    CountryRules: [
      country => !!country || 'Please select the Country',
    ],

    ZipCode: 'Failed to Fetch Zip Code',
    ZipCodeRules: [
      zipcode => zipcode.length > 0 || 'Please Enter the Valid ZIP Code',
      zipcode => isNaN(zipcode) == false || 'Invalid Zip Code',
    ],

    Street: 'Failed to Fetch Street',
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

      for (let CustomerProperty in Object.keys(Customer || {})) {
          this[CustomerProperty] = Customer[CustomerProperty]
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
  color: #1e2139
}

.v-application__wrap {
  background-color: #141625;
  color: #141625;
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
</style>
