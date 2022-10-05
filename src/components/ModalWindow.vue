<template>
  <div class="modal flex">
    <div class="modal-content" style="width: 500px;">
      <p>Are you sure you want to exit? Your changes will not be saved?</p>
      <div class="actions flex">
        <button @click="closeModal" class="purple">Return</button>
        <button @click="closeVirtualMachineSettings" class="red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from "vuex";

export default {
  name: "modalPage",
  methods: {
    ...mapMutations(["TOGGLE_MODAL", "TOGGLE_INITIALIZATION_MODAL", "TOGGLE_VIRTUAL_MACHINE_SETTINGS", "TOGGLE_UPDATE_VIRTUAL_MACHINE_SETTINGS"]),
    closeModal() {
      this.TOGGLE_MODAL();
    },
    closeVirtualMachineSettings() {
      this.TOGGLE_MODAL();
      this.TOGGLE_INITIALIZATION_MODAL();
      if (this.updateVirtualMachine) {
        this.TOGGLE_UPDATE_VIRTUAL_MACHINE_SETTINGS();
      }
    },
  },
  computed: {
    ...mapState(["updateVirtualMachine"]),
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
    width: 500px !important; 
    max-width: 1000px;
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
