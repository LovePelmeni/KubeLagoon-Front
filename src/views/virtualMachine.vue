<template>
  <div v-if="currentVirtualMachine" class="virtual-machine container">
    <router-link class="nav-link flex" :to="{ name: 'main_page' }">
      <img :src="icon_arrow_left" @click="RedirectHome()" alt="" /> Go Back
    </router-link>

    <!-- Header -->

    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
         <div
           class="status-button flex"
           :class="{
             running: currentVirtualMachine.Running,
             shutdown: currentVirtualMachine.Shutdown,
             deploying: currentVirtualMachine.Deploying,
           }"
         >
           <span v-if="currentVirtualMachine.Running">Running</span>
           <span v-if="currentVirtualMachine.Shutdown">Shutdown</span>
           <span v-if="currentVirtualMachine.Deploying">Deploying</span>
         </div>

         <div class="right flex">

          <button @click="toggleUpdateVirtualMachine" class="dark-purple">Edit</button>
          <button @click="deleteVirtualMachine(currentVirtualMachine.VirtualMachineId)" class="red">Delete</button>
          <button id="shutdownButton" @click="updateVirtualMachine(currentVirtualMachine.VirtualMachineId)" v-if="currentInvoice.Deploying" class="orange">
           Shutdown
          </button>
          <button id="runButton"
            v-if="currentVirtualMachine.virtualMachineDraft || currentVirtualMachine.Shutdown"
            @click="u(currentVirtualMachine.VirtualMachineId)"
            class="green"
          >
            Run
          </button>
      </div>
    </div>

    <!-- Invoice Details -->
    <div class="virtual-machine-details flex flex-column">
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentVirtualMachine.VirtualMachineName }}</p>
          <p>Virtual Machine Server</p>
        </div>
        <div class="right flex flex-column">
          <p>All the Bills will be address to</p>
          <p>{{ currentVirtualMachine.billerStreetAddress }}</p>
          <p>{{ currentVirtualMachine.billerCity }}</p>
          <p>{{ currentVirtualMachine.billerZipCode }}</p>
          <p>{{ currentVirtualMachine.billerCountry }}</p>
        </div>
      </div>
      <div class="middle flex">
        <div class="payment flex flex-column">
          <h4>Creation Date</h4>
          <p>
            {{ currentVirtualMachine.CreatedAt }}
          </p>
          <h4>Payment Date</h4>
          <p>
            {{ currentVirtualMachine.paymentDueDate }}
          </p>
        </div>
        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>{{ currentVirtualMachine.clientName }}</p>
          <p>{{ currentVirtualMachine.clientStreetAddress }}</p>
          <p>{{ currentVirtualMachine.clientCity }}</p>
          <p>{{ currentVirtualMachine.clientZipCode }}</p>
          <p>{{ currentVirtualMachine.clientCountry }}</p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Sent To</h4>
          <p>{{ currentVirtualMachine.OwnerEmail }}</p>
        </div>
      </div>
      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>ID</p>
            <p>Name</p>
            <p>Status</p>
            <p>Price Per Day</p>
            <p>TotalCost Per Month</p>
          </div>
          <div v-for="(virtualMachine, index) in currentVirtualMachine.VirtualMachineItemList" :key="index" class="VirtualMachine flex">
            <p>{{ virtualMachine.VirtualMachineId }}</p>
            <p>{{ virtualMachine.VirtualMachineName }}</p>
            <p>{{ virtualMachine.Status }}</p>
            <p>{{ virtualMachine.PricePerDay }}</p>
            <p>{{ virtualMachine.TotalCost }}</p>
          </div>
        </div>
        <div class="TotalCost flex">
          <p>In Total This Month</p>
          <p>{{ currentVirtualMachine.TotalCost }}</p>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script>

/* eslint-disable no-unused-vars */

import { mapActions, mapMutations, mapState } from "vuex";
import {router} from "../router/index.js"

export default {
  name: "virtualMachine",
  data() {
    return {
      // General Virtual Machine Info
      currentVirtualMachine: null,
      VirtualMachineItemList: [],
    };
  },
  created() {
    // Initializing Initial Variables
    this.getCurrentVirtualMachine();
  },
  methods: {

   ...mapMutations(["SET_CURRENT_VIRTUAL_MACHINE", "TOGGLE_UPDATE_VIRTUAL_MACHINE", "TOGGLE_VIRTUAL_MACHINE", "RUN_VIRTUAL_MACHINE", "SHUTDOWN_VIRTUAL_MACHINE", "SHOW_ERROR"]),
   ...mapActions(["DELETE_VIRTUAL_MACHINE", "UPDATE_STATUS_TO_RUNNING", "UPDATE_STATUS_TO_SHUTDOWN", "UPDATE_STATUS_TO_DEPLOYING"]),


    RedirectHome() {
      // redirects to the Main Page
      router.$refs.push({name: 'main_page'})
    },

    getCurrentVirtualMachine() {
      // Returns Current Virtual Machine within an Array
      var VirtualMachineId = this.$route.params.VirtualMachineId
      this.setCurrentVirtualMachine(VirtualMachineId)
      this.CurrentVirtualMachine = this.CurrentVirtualMachineArray[0]
    },

    setCurrentVirtualMachine(VirtualMachineId) {
      // Setting up Current Virtual Machine within an Array
      this.SET_CURRENT_VIRTUAL_MACHINE(VirtualMachineId)
    },

    ShutdownVirtualMachine(VirtualMachineId) {
      // Shutting down the Virtual Machine Server
      document.getElementById("shutdownButton").innerText = "Shutting Down..."
      let ShutdownError = this.SHUTDOWN_VIRTUAL_MACHINE()
      if (ShutdownError != null) {this.SHOW_ERROR(
      "Failed to Shutdown Virtual Machine, " + ShutdownError.error)} else{
      this.toggleShutdownVirtualMachine(VirtualMachineId)}
    },

    RunVirtualMachine(VirtualMachineId) {
      // Running the Virtual Machine Server
      document.getElementById("runButton").innerText = "Running..."
      let RunError = this.RUN_VIRTUAL_MACHINE(VirtualMachineId)
      if (RunError != null ) {this.SHOW_ERROR(
      "Failed to Run Virtual Machine, " + RunError.error); return; }else{
      this.toggleRunVirtualMachine(VirtualMachineId)}
    },

    toggleRunVirtualMachine(VirtualMachineId) {
      // Mark Virtual Machine as Running
      this.UPDATE_STATUS_TO_RUNNING(VirtualMachineId)
    },

    toggleShutdownVirtualMachine(VirtualMachineId) {
      // Mark Virtual Machine as Shutdowned one
      this.UPDATE_STATUS_TO_SHUTDOWN(VirtualMachineId)
    },

    toggleUpdateVirtualMachine() {
      // Toggles Virtual Machine Status
      this.TOGGLE_UPDATE_VIRTUAL_MACHINE();
      this.TOGGLE_VIRTUAL_MACHINE();
    },

    DeleteVirtualMachine(VirtualMachineId) {
      // Redirects to the Delete Virtual Machine Page
      this.DELETE_VIRTUAL_MACHINE(VirtualMachineId)
      this.$route.push({name: "DeleteVirtualMachine",
      params: {"VirtualMachineId": VirtualMachineId}})
    },
  },
  computed: {
  ...mapState(["currentVirtualMachineArray", "updateVirtualMachine"]),
},
  watch: {
    updateVirtualMachine() {
      if (!this.updateVirtualMachine) {
        this.currentVirtualMachine = this.currentVirtualMachineArray[0];
      }
    },
  },
};

</script>

<style lang="scss" scoped>
.virtual-machine {
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 12px;
    img {
      margin-right: 16px;
      width: 7px;
      height: 10px;
    }
  }
  .header,
  .virtual-machine-details {
    background-color: #1e2139;
    border-radius: 20px;
  }
  .header {
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;
    .left {
      align-items: center;
      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }
    .right {
      flex: 1;
      justify-content: flex-end;
      button {
        color: #fff;
      }
    }
  }
  .virtual-machine-details {
    padding: 48px;
    margin-top: 24px;
    .top {
      div {
        color: #dfe3fa;
        flex: 1;
      }
      .left {
        font-size: 12px;
        p:first-child {
          font-size: 24px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }
        p:nth-child(2) {
          font-size: 16px;
        }
        span {
          color: #888eb0;
        }
      }
      .right {
        font-size: 12px;
        align-items: flex-end;
      }
    }
    .middle {
      margin-top: 50px;
      color: #dfe3fa;
      gap: 16px;
      h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }
      p {
        font-size: 16px;
      }
      .bill,
      .payment {
        flex: 1;
      }
      .payment {
        h4:nth-child(3) {
          margin-top: 32px;
        }
        p {
          font-weight: 600;
        }
      }
      .bill {
        p:nth-child(2) {
          font-size: 16px;
        }
        p:nth-child(3) {
          margin-top: auto;
        }
        p {
          font-size: 12px;
        }
      }
      .send-to {
        flex: 2;
      }
    }
    .bottom {
      margin-top: 50px;
      .billing-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: #252945;
        .heading {
          color: #dfe3fa;
          font-size: 12px;
          margin-bottom: 32px;
          p:first-child {
            flex: 3;
            text-align: left;
          }
          p {
            flex: 1;
            text-align: right;
          }
        }
        .VirtualMachine {
          margin-bottom: 32px;
          font-size: 13px;
          color: #fff;
          &:last-child {
            margin-bottom: 0;
          }
          p:first-child {
            flex: 3;
            text-align: left;
          }
          p {
            flex: 1;
            text-align: right;
          }
        }
      }
      .TotalCost {
        color: #fff;
        padding: 32px;
        background-color: rgba(12, 14, 22, 0.7);
        align-items: center;
        border-radius: 0 0 20px 20px;
        p {
          flex: 1;
          font-size: 12px;
        }
        p:nth-child(2) {
          font-size: 28px;
          text-align: right;
        }
      }
    }
  }
}

.red {
  background-color: #ec5757;
}
.green {
  background-color: #33d69f;
}

</style>
