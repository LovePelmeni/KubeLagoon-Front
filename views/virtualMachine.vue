<template>
  <div v-if="currentVirtualMachine" class="virtual-machine container">
    <router-link class="nav-link flex" :to="{ name: 'Home' }">
      <img src="@/assets/icon-arrow-left.svg" @click="RedirectHome()" alt="" /> Go Back
    </router-link>

    <!-- Header -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div>
          <span>{{ currentVirtualMachine.Status }}</span>
        </div>
      </div>
      <div class="right flex">
        <button @click="UpdateVirtualMachine(currentVirtualMachine.VirtualMachineId)" class="dark-purple">Edit</button>
        <button @click="DeleteVirtualMachine(currentVirtualMachine.VirtualMachineId)" class="red">Delete</button>
      </div>
    </div>

    <!-- Virtual Machine Details -->
    <div class="virtual-machine-details flex flex-column">
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentVirtualMachine.VirtualMachineName }}</p>
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
            {{ currentInvoice.VirtualMachineCreationDate }}
          </p>
          <h4>Payment Date</h4>
          <p>
            {{ currentInvoice.paymentDueDate }}
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
      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>ID</p>
            <p>Name</p>
            <p>IP</p>
            <p>Instance State</p>
            <p>Created At</p>
          </div>
          <div v-for="(VirtualMachine, index) in currentVirtualMachine.VirtualMachineItemList" :key="index" class="item flex">
            <p>{{ VirtualMachine.VirtualMachineId }}</p>
            <p>{{ VirtualMachine.VirtualMachineName }}</p>
            <p>{{ VirtualMachine.IPAddress }}</p>
            <p>{{ VirtualMachine.State }}</p>
            <p>{{ VirtualMachine.CreatedAt }}</p>
          </div>
        </div>
        <div class="total flex">
          <p>Total Cost</p>
          <p>{{ currentVirtualMachine.TotalCost }}$</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

const cron = require("cron").CronJob
export default {
  name: "virtualMachine",
  data() {
    return {
      currentVirtualMachine: null,
      uniqueCostJobName: null,
    };
  },
  created() {
    this.getCurrentVirtualMachine();
  },
  methods: {

    ...mapMutations(["SET_CURRENT_INVOICE", "TOGGLE_EDIT_INVOICE", "TOGGLE_INVOICE"]),
    ...mapActions(["DELETE_INVOICE", "UPDATE_STATUS_TO_PENDING", "UPDATE_STATUS_TO_PAID"]),

    getCurrentVirtualMachine() {
      this.SET_CURRENT_VIRTUAL_MACHINE(this.$route.params.VirtualMachineId);
      this.currentVirtualMachine = this.currentVirtualMachineArray[0];
    },

    DeleteVirtualMachine(VirtualMachineId) {
      // Redirects to the Delete Virtual Machine Page
      this.$router.push({name: "DeleteVirtualMachine"})
    }

    UpdateVirtualMachine(VirtualMachineId) {
      // Redirects to the Update Virtual Machine Page
      this.$router.push({name: "UpdateVirtualMachine"})
    }

    StartVirtualMachineCostParser(VirtualMachineId) {
      // Updates Virtual Machine Cost Topic in Real Time
      newVirtualMachineCostManager = new cost.VirtualMachineCostManager()
      var JobUniqueName = uid()
      Parser, NewCost, ParseError = newVirtualMachineCostManager.StartVirtualMachineSpendCostParser(UniqueName, VirtualMachineId)

      if (ParserError != null) {
        this.CurrentVirtualMachine.TotalCost = "Failed to Get Total Cost"
      }
      this.CurrentVirtualMachine.TotalCost = NewCost
      this.uniqueCostJobName = JobUniqueName
    }

    ShutdownVirtualMachineCostParser(CostJobUniqueName) {
      // Shuts Down API, that parses Virtual Machine Cost In Real Time
      // Being called, when the Customer press `Back` button
      Job = cron.scheduleJobs[CostJobUniqueName]
      Job.stop()
    }
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
  .invoice-details {
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
  .invoice-details {
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
</style>
