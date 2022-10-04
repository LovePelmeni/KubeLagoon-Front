<template>
  <div class="modal flex">
    <div class="modal-content" style="width: 500px !important;">
      <p>Are you sure you want to logout?</p>
      <div class="actions flex">
        <button @click="closeLogoutModal" class="purple">Return Back</button>
        <button @click="logoutCustomer" class="red">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from "vuex";
import { useCookies } from "vue3-cookies";

export default {
  name: "logoutPage",
  setup() {
    const { cookie } = useCookies();
    return { cookie };
  },
  methods: {

    ...mapState(["logout", "authenticated"]),
    ...mapMutations(["TOGGLE_LOGOUT_MODAL", "TOGGLE_HIDE_LOGOUT_MODAL", "TOGGLE_NOT_AUTHENTICATED"]),

    closeModal() {
    // Closing the Modal Window 
      this.TOGGLE_HIDE_LOGOUT_MODAL()
    },
    closeLogoutModal() {
      // Closing Logout Modal Window 
      this.closeModal()
    },
    logoutCustomer() {
      // Removing the Jwt Token so customer is no longer able to perform any operations, that requires authentication 
      this.cookie?.delete("jwt-token")
      this.TOGGLE_NOT_AUTHENTICATED()
      this.TOGGLE_HIDE_LOGOUT_MODAL()
      this.$router.push({name: "login_page"})
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  .modal-content {
    border-radius: 20px;
    padding: 48px 32px;
    background-color: #252945;
    color: #fff;
    p {
      text-align: center;
    }
    .actions {
      margin-top: 24px;
      button {
        flex: 1;
      }
    }
  }
}
</style>
