<template>
  <div class="profile-wrap">

    <v-col cols="10" lg="4" class="mx-auto">
      <v-card style="max-width: 5000px;" class="pa-4">

    <v-form class="profile-content" id="form" ref="form" style="max-width: 10000px; gap: 1">

      <!-- Customer's Profile Details -->

        <div style="justify-content: center;">

          <v-avatar size="50">
              <div @click="redirectToProfile" class="button flex">
                <div class="inner-button flex">
                  <img :src="require('@/assets/customer_avatar.png')" alt="icon_plus" />
                </div>
              </div>
          </v-avatar>

        </div>

        <div class="resourceConfigBlock" style="width: 800px">
          <!-- resource Configuration -->

          <div class="modalField flex flex-column">
          <label for="Username">Username</label>

          <v-text-field
          v-if="!EditProfile"
          :rules="UsernameRules"
          id="Username" 
          v-model="Username"
          />

          <v-text-field
          v-else
          disabled
          :rules="UsernameRules"
          id="Username" 
          v-model="Username"
          />
          </div>

    
        <div class="modalField flex flex-column">
          <label for="Email">Email</label>

          <v-text-field
          v-if="!EditProfile"
          :rules="EmailRules"
          id="Email" 
          v-model="Email" />

          <v-text-field
          v-else
          disabled
          id="Email" 
          v-model="Email"
          />

        </div>

        <div class="modalField flex flex-column">
          <label for="Password">Password</label>

          <v-text-field
          v-if="!EditProfile"
          :rules="Password"
          id="Password"
          v-model="Password" />

          <v-text-field
          v-else
          disabled
          id="Password" 
          v-model="Username"
          />

        </div>

        <div class="resources-details flex">

          <div class="modalField flex flex-column">
            <label for="BillingAddress">Billing Address</label>

            <v-text-field
            v-if="!EditProfile"
            :rules="BillingAddressRules"
            id="BillingAddress" 
            v-model="BillingAddress" />
            
            <v-text-field
            v-else
            disabled
            id="BillingAddress" 
            v-model="BillingAddress"
            />
          </div>

          <div class="modalField flex flex-column">

            <label for="ZipCode">ZIP Code</label>

            <v-text-field
            v-if="!EditProfile"
            :rules="ZipCodeRules"
            id="ZipCode"
            v-model="ZipCode" />

            <v-text-field
            v-else
            disabled
            :rules="ZipCodeRules"
            id="ZipCode" 
            v-model="ZipCode"
            />

          </div>

          <div class="modalField flex flex-column">
            <label for="Street">Street</label>

            <v-text-field
            v-if="!EditProfile"
            :rules="StreetRules"
            id="Street"
            v-model="Street" />

            <v-text-field
            v-else
            disabled
            id="Street" 
            v-model="Street"
            />

            </div>
          </div>
        </div>

      <!-- Save/Exit -->

              <div class="save flex">

                  <div class="buttonBlock flex" style="width: 800px">
                    <v-btn type="submit" @submit="CancelEditProfileController" v-if="EditProfile == true" id="Cancel" style="background-color: #ec5757;" :loading="CancelLoading">Cancel</v-btn>
                    <v-btn type="submit" @submit="ApplyChangesProfileController" v-if="EditProfile == true" id="ApplyChanges" style="background-color: green;" :loading="ApplyChangesLoading">Apply Changes</v-btn>
                    <v-btn style="background-color: #252945;" v-if="EditProfile == false" :loading="Saveloading" type="submit" @submit="EditProfileController">Edit Profile</v-btn>
                    <v-btn style="background-color: #7c5dfa;" :loading="Createloading" type="submit" @submit="RedirectToMainPage">Go Back</v-btn>
                  </div>
              </div>
          </v-form>
      </v-card>
    </v-col>

      <v-snackbar v-if="!activeError" top color="green">
        Changes has been Applied to the Profile 
      </v-snackbar>

      <v-snackbar v-if="activeError" top color="red">
       Apply Changes Failed, {{ EditError }}
      </v-snackbar>
    </div>

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
    this.JwtToken = this.cookie?.get("jwt-token")
    this.CheckIsDraft()
  },
  data() {
    return {

      // Loading Statuses
      CancelLoading: null,
      ApplyChangesLoading: null,

      // Error Statuses 
      EditError: null, 
      activeError: false,

      // Customer Profile Form Fields
      Username: "Not Found", 
      Email: "Not Found", 
      Password: "Not Found", 
      BillingAddress: "Not Found", 
      Street: "Not Found",
      ZipCode: "Not Found",
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
      this.loading = true 
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
    }
  },
};

</script>

<style lang="scss" scoped>

.profile-wrap {
  
  flex: 1;
  position: relative;
  width: 100%;
  background-color: #141625;

  .resourceConfigBlock {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .profile-content {

    max-width: 865px;

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

    .resourceConfiguration {
      margin-bottom: 48px;
      h4 {
              font-size: 20px;
              margin-top: 40px;
            }
      p {
            text-align: center;
            max-width: 224px;
            font-size: 12px;
            font-weight: 300;
            margin-top: 16px;
          }
      .resources-details {
        gap: 16px;
        div {
          flex: 1;
        }
      }
      .modalField {
        margin-bottom: 24px;
        .disabledProfileField {
          :disabled {background-color: gray}
        }
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
          &:focus {
            outline: none;
          }
       }
    }
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }
      .work-items {
        .item-list {
          width: 100%;
          // Item Table Styling
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .virtual-machine-id {
              flex-basis: 50%;
            }
            .virtual-machine-name{
              flex-basis: 10%;
            }
            .status{
              flex-basis: 10%;
            }
            .price {
              flex-basis: 20%;
            }
            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }
          .table-heading {
            margin-bottom: 16px;
            th {
              text-align: left;
            }
          }
          .table-items {
            position: relative;
            margin-bottom: 24px;
            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }
        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;
          img {
            margin-right: 4px;
          }
        }
    }
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
  .TotalCost {
    color: #fff;
    
    background-color: rgba(12, 14, 22, 0.7);
    align-items: center;
    border-radius: 0 0 20px 20px;
    p {
      flex: 1;
      font-size: 12px;
    }
    p:nth-child(2) {
      font-size: 28px;
      text-align: right;
    }
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
    &:focus {
      outline: none;
    }
  }
}

.v-card {
  overflow: initial;
  max-width: 10000px;
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
