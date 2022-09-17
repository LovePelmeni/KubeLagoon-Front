<template>
  <header class="flex">
    <div class="branding flex" style="max-height: 100px; justify-content: space-between;">
      <v-avatar :v-if="authenticated" size="50">
        <div @click="redirectToProfile" class="button flex">
          <div class="inner-button flex">
            <img :src="require('@/assets/customer_avatar.png')" alt="icon_plus" />
          </div>
        </div>
      </v-avatar>
      
        <div @click="redirectToHome" class="button flex" style="margin-bottom: 5px;">
          <h2>Home</h2>
        </div>

        <div @click="redirectToLoginPage" class="button flex">
          <h2 v-if="!authenticated">Sign In</h2>
        </div>

        <div @click="redirectToRegisterPage" class="button flex">
          <h2 v-if="!authenticated">Sign Up</h2>
        </div>

        <div @click="triggerLogoutModal" class="button flex">
          <h2 v-if="authenticated">Logout</h2>
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
    ...mapState([
      "authenticated",
    ]),
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
    redirectToRegisterPage() {
      // Redirects to the Register Page Form 
      this.$router.push({name: "register_page"})
    },
    redirectToHome() {
      // Redirects to the Home Page 
      this.$router.push({name: "main_page"})
    }
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
  }
}
.flex {
  display: flex;
}
</style>