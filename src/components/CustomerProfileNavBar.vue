<script>

// import { mdiCloseThick } from '@mdi/js';
import { mapMutations } from "vuex";
  export default {
    name: "CustomerProfile",
    props: ["Customer"],
    template: `
  <v-app>
  <v-card class="mx-auto" width="256" tile style="background-color: #1e2139;">
    <v-navigation-drawer permanent>
      <v-system-bar @click="TOGGLE_HIDE_CUSTOMER_PROFILE()">
        <v-icon style="color: black;">mdi-close-thick</v-icon>
        </v-system-bar>
      <v-list>

        <v-list-item>
          <v-avatar size="150">
            <v-img src="${require('@/assets/customer_avatar.png')}"></v-img>
          </v-avatar>
        </v-list-item>

        <v-list-item link>

            <v-list-item-title class="text-h6">
              {{ CustomerData.Username.value }}
            </v-list-item-title>

            <v-list-item-subtitle>{{ CustomerData.Email.value }}</v-list-item-subtitle>

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
            v-for="(CustomerProperty, index) in ['Password', 'Country', 'City', 'ZipCode', 'Street']"
            :key="index"
          >
            <v-icon style="position: absolute; bottom: 30%; left: 0">{{ CustomerData[CustomerProperty].icon }}</v-icon> 
            <v-list-item-title style="font-family: ont-family: 'Poppins', sans-serif; font-size: 0.75em;">{{ CustomerData[CustomerProperty].value }}</v-list-item-title>

          </v-list-item>

        </v-list-item-group>
      </v-list>
          <v-btn type="submit" style="margin-top: 20px;background-color: #ec5757" @click="redirectEditPage" :loading="EditLoading">Edit Profile</v-btn>
    </v-navigation-drawer>
  </v-card>
  </v-app>

    `,
    data: (selfInstance) => ({
      EditLoading: false,
      selectedItem: 0,
      CustomerData: {
        "Username": {"icon": "mdi-account-circle", "value": selfInstance.Customer.Username || '-'},
        "Email": {"icon": "mdi-at", "value": selfInstance.Customer.Email || '-'},
        "Password": {"icon": "mdi-lock", "value": "*".repeat(selfInstance.Customer.Password.length) || '-'},
        "Country": {"icon": "mdi-city-variant", "value": selfInstance.Customer.Country || '-'},
        "City": {"icon": "mdi-city-variant", "value": selfInstance.Customer.City || '-'},
        "ZipCode": {"icon": "mdi-lock", "value": selfInstance.Customer.ZipCode || '-'},
        "Street": {"icon": "mdi-lock", "value": selfInstance.Customer.Street || '-'},
      },
    }),
    methods: {
      ...mapMutations([
        "TOGGLE_HIDE_CUSTOMER_PROFILE",
      ]),
      redirectEditPage() {
        // Redirects to the Edit Profile Page 
        this.EditLoading = true
        this.TOGGLE_HIDE_CUSTOMER_PROFILE()
        this.$router.push({name: "edit_customer_profile"})
        this.EditLoading = false
      }
    },
}

</script>



<style lang="scss">

.v-list-item-subtitle {
    -webkit-box-orient: vertical !important;
    display: -webkit-box !important;
    opacity: var(--v-medium-emphasis-opacity) !important;
    overflow: hidden !important;
    padding: 0 !important;
    text-overflow: ellipsis !important;
    font-size: 0.7rem !important;
    font-weight: 400 !important;
    letter-spacing: 0.0178571429em !important;
    line-height: 1rem !important;
    text-transform: none !important;
}

.v-navigation-drawer {
    left: 0px;
    z-index: 1006;
    transform: translateX(0%);
    position: fixed;
    height: calc((100% - 0px) - 0px);
    top: 0px;
    bottom: 0px;
    width: 256px;
    background-color: #1e2139 !important;
    color: #fff !important;
    border-radius: 0 20px 30px 0;
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