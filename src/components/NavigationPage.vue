<template>
  <header class="flex">

    <div class="branding flex" style="max-height: 100px; max-width: 100%; justify-content: space-between;">

      <v-icon size="40" @click="triggerCustomerProfile" style="margin-left: 20px; margin-top: 5px; color: black;" v-if="authenticated">mdi-account-circle</v-icon>
      <v-icon v-else size="40" style="margin-left: 20px; margin-top: 5px; color: black">mdi-account-off</v-icon>


        <div @click="redirectToHome" class="button flex" style="margin-bottom: 5px;">
          <h2>Home</h2>
        </div>

        <div v-if="!authenticated" @click="redirectToLoginPage" class="button flex">
          <h2>Sign In</h2>
        </div>

        <div v-else @click="redirectToVirtualServersPage" class="button flex">
          <h2>Servers</h2>
        </div>

        <div v-if="!authenticated" @click="redirectToRegisterPage" class="button flex">
          <h2>Sign Up</h2>
        </div>

        <div v-else @click="redirectToBillPage" class="button flex">
          <h2>Bills</h2>
        </div>

        <div v-if="authenticated" @click="triggerLogoutModal" class="button flex">
          <h2>Logout</h2>
        </div>

        <div v-else @click="redirectToLoginPage" class="button flex" style="pointer-events: none;">
          <h2 style="color: gray;">Logout</h2>
        </div>

    </div>

  </header>
</template>

<script>


import { mapState, mapMutations } from "vuex";


export default {
  name: "navigationPage",
  methods: {
    ...mapMutations([
      "TOGGLE_LOGOUT_MODAL",
    ]),
    ...mapMutations([
      "TOGGLE_SHOW_CUSTOMER_PROFILE",
      "TOGGLE_HIDE_CUSTOMER_PROFILE",
    ]),

    triggerCustomerProfile() {
      this.TOGGLE_SHOW_CUSTOMER_PROFILE()
    },

    triggerHideCustomerProfile() {
      this.TOGGLE_HIDE_CUSTOMER_PROFILE()
    },

    triggerLogoutModal() {
      // Triggers Logout Modal Window 
      this.TOGGLE_LOGOUT_MODAL()
    },
    redirectToProfile() {
      // Redirects to the Customer's Profile
      this.$router.push({name: "customer_profile"})
    },
    redirectToLoginPage() {
      // Redirects to the Login Page Form 
      this.$router.push({name: "login_page"})
    },
    redirectToVirtualServersPage() {
      // Redirects to the Virtual Servers Page Form 
      this.$router.push({name: "virtual_machines_page"})
    },
    redirectToBillPage() {
      // Redirects to the Bill Page
      this.$router.push({name: "bill_page"})
    },
    redirectToRegisterPage() {
      // Redirects to the Register Page Form 
      this.$router.push({name: "register_page"})
    },
    redirectToHome() {
      // Redirects to the Home Page 
      this.$router.push({name: "main_page"})
    }
  },
  computed: {
    ...mapState([
      "authenticated", 
    ]),
  }
};

</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  flex-direction: row;
  background-color: #1e2139;
  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }
  .branding {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: left;
    padding: 24px;
    @media (min-width: 900px) {
      width: 100%;
    }
    img {
      width: auto;
      height: 30px;
    }
    button:disabled{
      color: #666666;
    }
  }
}
.flex {
  display: flex;
}
</style>