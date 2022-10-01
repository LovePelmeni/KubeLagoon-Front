<template>
  <v-app>
  <v-card class="mx-auto" width="256" tile style="background-color: #1e2139;">
    <v-navigation-drawer permanent>
      <v-system-bar @click="TOGGLE_HIDE_CUSTOMER_PROFILE()"></v-system-bar>
      <v-list>

        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ CustomerData.Username.value }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ CustomerData.Email.value }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >

          <v-list-item
            v-for="(CustomerProperty, index) in Object.keys(CustomerData)"
            :key="index"
          >
            <v-list-item-icon>
            <v-icon>mdi-menu-icon</v-icon> 
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ CustomerProperty["value"] }}</v-list-item-title>
            </v-list-item-content>

          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
  </v-app>
</template>



<script>

// import { mdiCloseThick } from '@mdi/js';
import { mdiAt } from "@mdi/js";
import { mapMutations } from "vuex"
import HomePage from "../views/home.vue";

  export default {
    name: "CustomerProfile",
    props: ["Customer"],
    data: () => ({
      selectedItem: 0,
      CustomerData: {},
    }),
    components: {
      HomePage,
    },
    created() {
        this.ConvertCustomerProfileJSONToSchema()
    },
    methods: {

      ...mapMutations([
        "TOGGLE_HIDE_CUSTOMER_PROFILE",
      ]),
        ConvertCustomerProfileJSONToSchema() {
            // Converts the Customer Profile info, into an appropriate Object Type 
            this.CustomerData = {
                "Username": {"icon": "mdi-account-circle", "value": this.Customer.Username || '-'},
                "Email": {"icon": "mdi-at", "value": this.Customer.Email || '-'},
                "Password": {"icon": "mdi-lock", "value": this.Customer.Password || '-'},
                "Country": {"icon": "mdi-city-variant", "value": this.Customer.Country || '-'},
                "City": {"icon": "mdi-city-variant", "value": this.Customer.City || '-'},
                "ZipCode": {"icon": "mdi-account-lock-open", "value": this.Customer.ZipCode || '-'},
                "Street": {"icon": "mdi-account-lock-open", "value": this.Customer.Street || '-'},
            }
        }
    },
}



</script>



<style lang="scss">

.v-navigation-drawer {
    left: 0px;
    z-index: 1006;
    transform: translateX(0%);
    position: fixed;
    height: calc((100% - 0px) - 0px);
    top: 0px;
    bottom: 0px;
    width: 256px;
    background-color: #1e2139;
    color: #fff;
}
.v-system-bar {
    top: 0px !important;
    z-index: 1004 !important;
    transform: translateY(0%) !important;
    position: fixed !important;
    height: 24px !important;
    left: 222px !important;
    /* width: 20px; */
    background-color: red !important;
    width: calc((100% - 256px) - 0px + 35px) !important;
    height: 4% !important;
    border-radius: 0 0 0 5px !important;
}
</style>