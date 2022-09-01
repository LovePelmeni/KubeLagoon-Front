<template>
  <div v-if="currentVirtualMachine" class="virtual-machine container">
    <router-link class="nav-link flex" :to="{ name: 'HomePage' }">
      <img src="@/assets/icon-arrow-left.svg" @click="RedirectHome()" alt="" /> Go Back
    </router-link>

    <!-- Header -->

    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div>
          <span>{{ CurrentVirtualMachine.Status }}</span>
        </div>
      </div>
      <div class="right flex">
        <button @click="UpdateVirtualMachine(CurrentVirtualMachine.VirtualMachineId)" class="dark-purple">Edit</button>
        <button @click="DeleteVirtualMachine(CurrentVirtualMachine.VirtualMachineId)" class="red">Delete</button>
      </div>
    </div>

    <!-- Virtual Machine Details -->

    <div class="virtual-machine-details flex flex-column">
      <div class="top flex">

        <div class="left flex flex-column">
          <p><span>#</span>{{ CurrentVirtualMachine.VirtualMachineName }}</p>
          <p>Virtual Machine Server</p>
        </div>
        <div class="right flex flex-column">
          <p>KubeLagoon, Inc</p>
        </div>
      </div>

      <div class="middle flex">
        <div class="payment flex flex-column">
          <h4>Creation Date</h4>
          <p>
            {{ CurrentVirtualMachine.CreatedAt }}
          </p>
        </div>

        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>'KubeLagoon, Inc'</p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Sent To</h4>
          <p>kubeLagoonManager@gmail.com</p>
        </div>
      </div>

      <!-- Queryset of the Virtual Machines Created By the Customer !-->

      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>ID</p>
            <p>Name</p>
            <p>IP</p>
            <p>Instance State</p>
            <p>Created At</p>
          </div>
          <div v-for="(VirtualMachine, index) in GetVirtualMachineItemList()" :key="index" class="VirtualMachine flex">

            <p>{{ VirtualMachine.VirtualMachineId }}</p>
            <p>{{ VirtualMachine.VirtualMachineName }}</p>
            <p>{{ VirtualMachine.IPAddress }}</p>
            <p>{{ VirtualMachine.State }}</p>
            <p>{{ VirtualMachine.CreatedAt }}</p>
          </div>
        </div>
        <div class="TotalCost flex">
          <p>Total Cost This Month</p>
          <p>{{ VirtualMachine.TotalCostThisMonth }}$</p>
          <p>Cost Per Day</p>
          <p>{{ VirtualMachine.PricePerDay }}$</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

/* eslint-disable no-unused-vars */

import { mapActions, mapMutations, mapState } from "vuex";
import * as cost from "../cost/virtualMachineCost.js"

var uuidv4 = require("uuid")
const cron = require("cron").CronJob

export default {
  name: "virtualMachine",
  data() {
    return {
      // General Virtual Machine Info
      CurrentVirtualMachine: null,
      VirtualMachineItemList: [],
    };
  },
  created() {
    // Initializing Initial Variables
    this.getCurrentVirtualMachine();
    this.getVirtualMachineList();
  },
  methods: {

    RedirectHome() {
      // redirects to the Main Page
      this.$route.push({name: 'HomePage'})
    }
    showError(ErrorMessage) {
      // Shows up the Error Message Banner
    },

    getCurrentVirtualMachine() {
      // Returns Current Virtual Machine within an Array
      let VirtualMachineId = this.$route.params.VirtualMachineId
      this.SetCurrentVirtualMachine(VirtualMachineId)
    },

    setCurrentVirtualMachine(VirtualMachineId) {
      // Setting up Current Virtual Machine within an Array
      let VirtualMachineData = this.getVirtualMachineInfo(VirtualMachineId)
      this.CurrentVirtualMachine = {
        "VirtualMachineId": VirtualMachineData["VirtualMachineId"],
        "VirtualMachineName": VirtualMachineData["VirtualMachineName"],
        "CreatedAt": VirtualMachineData["CreatedAt"],
        "Status": VirtualMachineData["Status"],
      }
    },

    getVirtualMachineList() {
      // Return List of the Virtual Machines, Owned by the Customer
      let VirtualMachineManager = new vm.VirtualMachineManager()
      let virtualMachineList, ListError = VirtualMachineManager.GetVirtualMachineList()
      if (ListError == null){this.VirtualMachineItemList = []}
      var VirtualMachines = [];
      for (VirtualMachine in virtualMachineList) {
        VirtualMachines.push({
          "VirtualMachineId": VirtualMachine["VirtualMachineId"],
          "VirtualMachineName": VirtualMachineName["VirtualMachineName"],
          "IPAddress": VirtualMachine["IPAddress"],
          "CreatedAt": VirtualMachine["CreatedAt"],
          "Status": VirtualMachine["Status"],
          "TotalCostThisMonth": VirtualMachineData["TotalCostThisMonth"],
          "PricePerDay": VirtualMachineData["PricePerDay"],
        })
      }
    },

    getVirtualMachineInfo(VirtualMachineId) {
      // Returns Virtual MachineInfo
      let VirtualMachineManager = new vm.VirtualMachineManager()
      let VirtualMachineInfo, VirtualMachineInfoError = VirtualMachineManager.GetVirtualMachine(VirtualMachineId)
      return VirtualMachineInfo
    }

    DeleteVirtualMachine(VirtualMachineId) {
      // Redirects to the Delete Virtual Machine Page
      this.$route.push({name: "DeleteVirtualMachine",
      params: {"VirtualMachineId": VirtualMachineId}})
    },

    UpdateVirtualMachine(VirtualMachineId) {
      // Redirects to the Update Virtual Machine Page
      this.$route.push({name: "UpdateVirtualMachine",
      params: {"VirtualMachineId": VirtualMachineId}})
    },
  },
  computed: {
    ...mapState(["currentVirtualMachineArray", "updateVirtualMachine"]),
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
