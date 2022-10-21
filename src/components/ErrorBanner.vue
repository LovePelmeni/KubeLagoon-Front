<template>
  <div class="modal flex">
    <div class="modal-content" style="width: 500px !important; margin-left: 20px;">
      <v-icon style="color: red; margin-bottom: 30px;" size="50">mdi-alert</v-icon>
      <p style="color: red;">{{ ReasonError }}</p>
      <div class="actions flex">
        <button @click="closeErrorBannerWindow()" class="red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from "vuex";
import { useCookies } from "vue3-cookies";

export default {
  name: "logoutPage",
  props: ["ReasonError", "Regenerate", "Download"],
  setup() {
    const { cookie } = useCookies();
    return { cookie };
  },
  methods: {
    ...mapMutations(
    [
      "CLOSE_FAILED_DOWNLOAD_CERTIFICATE_ERROR",
     "CLOSE_FAILED_REGENERATE_CERTIFICATE_ERROR"
    ]
    ),
    
    closeErrorBannerWindow() {
      // Closing Logout Modal Window 
      if (this.$props.Download === true) {
        this.CLOSE_FAILED_DOWNLOAD_CERTIFICATE_ERROR()
      }
      if (this.$props.Regenerate === true) {
        this.CLOSE_FAILED_REGENERATE_CERTIFICATE_ERROR()
      }
    },
  },
  computed: {
    ...mapState(["DownloadFailed", "RegenerationFailed"])
  }
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
