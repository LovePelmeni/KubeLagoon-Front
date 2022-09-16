<template>
  <header class="flex">
    <div class="branding flex" style="max-height: 100px; justify-content: space-between;">
      <router-link :v-if="this.registered && this.loggedIn" :to="{name: 'customer_profile'}"></router-link><v-avatar :v-if="this.registered && this.loggedIn" size="50">
        <div @click="redirectToProfile" class="button flex">
          <div class="inner-button flex">
            <img :src="require('@/assets/customer_avatar.png')" alt="icon_plus" />
          </div>
        </div>
      </v-avatar>
      
        <div class="main_page">
        <router-link :to="{name: 'main_page'}"></router-link><h1>home</h1>
        </div>

        <div class="login_page">
        <router-link v-if="this.registered != true && this.loggedIn == false" :to="{name: 'login'}"></router-link><h1 style="align-text: center;">Sign In</h1>
        </div>

        <div class="register_page">
        <router-link v-if="this.registered != true && this.loggedIn == false" :to="{name: 'register'}"></router-link><h1 style="align-text: center;">Sign up</h1>
        </div>

    </div>

  </header>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "navigationPage",
  methods: {
    ...mapState([
      "loggedIn",
      "registered",
    ]),
    redirectToProfile() {
      // Redirects to the Customer's Profile
      this.$router.push({name: "customer_profile"})
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