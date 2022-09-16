<script>
  import { mapMutations } from "vuex";
  export default {
    name: "notificationBanner",
    data() {
      return {
        notificationMessage: null,
      }
    },
    template: `
    <div class="modal flex">
      <div class="modal-content">
        <p>{{ notificationMessage }}</p>
      </div>
      <div class="actions flex">
        <button @click="hideNotification" class="red">Close</button>
      </div>
    </div>`,

    methods: {
      ...mapMutations(["TOGGLE_NOTIFICATION", "TOGGLE_HIDE_NOTIFICATION"]),
      toggleNotification(notificationMessage) {
        // Shows up New Notification Banner
        this.notificationMessage = notificationMessage
        this.TOGGLE_NOTIFICATION(notificationMessage)
      },
      hideNotification() {
        // Hides Notification Banner
        this.TOGGLE_HIDE_NOTIFICATION()
      }
    }
  }

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
    max-width: 450px;
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