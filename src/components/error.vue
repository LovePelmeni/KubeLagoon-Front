<script>
import { mapMutations } from "vuex"

export default {
  name: "errorBanner",
  props: ["errorMessage"],
  template: `
    <div class="error-modal flex">
      <div class="error-modal-content">
        <p>{{ errorMessage }}</p>
        <div class="actions flex">
          <button @click="hideError" class="red">Close</button>
        </div>
      </div>
    </div>
  `,
  methods: {
    ...mapMutations(["TOGGLE_ERROR", "TOGGLE_HIDE_ERROR"]),
    toggleError() {
      // toggles Error to show up
      this.TOGGLE_ERROR(this.errorMessage)
    },
    hideError() {
      this.TOGGLE_HIDE_ERROR(this.errorMessage)
    }
  }
}
</script>

<style lang="scss">
.error-modal {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  .error-modal-content {
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
