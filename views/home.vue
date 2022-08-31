<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Loggings</h1>
        <span>There are {{ VirtualMachines.length }} Total Virtual Machines</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span
            >Filter by status <span v-if="filteredVirtualMachines">: {{ filteredVirtualMachines }}</span></span
          >
          <img src="@/assets/icon-arrow-down.svg" alt="" />
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filterVirtualMachines">By Creation Date</li>
            <li @click="filterVirtualMachines">Clear Filter</li>
          </ul>
        </div>
        <div @click="newInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="" />
          </div>
          <span>New Virtual Machine</span>
        </div>
      </div>
    </div>

    <!-- Invoices -->
    <div v-if="VirtualMachines.length > 0">
      <VirtualMachine v-for="(VirtualMachine, index) in filteredData" :invoice="virtualMachine" :key="index" />
    </div>

    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.svg" alt="" />
      <h3>There is nothing here</h3>
      <p>Create a new invoice by clicking the New Invoice button and get started</p>
    </div>
  </div>
</template>

<script>

import virtualMachine from "../components/VirtualMachine.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      filterMenu: null,
      filteredVirtualMachines: null,
    };
  },
  components: {
    Invoice,
  },
  methods: {
    ...mapMutations(["TOGGLE_INVOICE"]),
    newInvoice() {
      this.TOGGLE_INVOICE();
    },
    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },

    filterVirtualMachines(e) {
      if (e.target.innerText === "Clear Filter") {
        this.filteredVirtualMachines = null;
        return;
      }
      if (e.target.innerText === "By Creation Date")  {
        QueryIds = []
        for (VirtualMachine in this.filteredVirtualMachines) {
          QueryIds.push(VirtualMachine.VirtualMachineId)
        }
        VirtualMachineManager = new vm.VirtualMachineManager()
        FilteredQueryset = VirtualMachineManager.FilterVirtualMachinesByCreationDate(QueryIds)
        this.filterVirtualMachines = FilteredQueryset
      }
      this.filteredInvoice = e.target.innerText;
    },
  },
  computed: {
    ...mapState(["VirtualMachines"]),
    filteredData() {
      return this.VirtualMachinesList.filter((invoice) => {
        if (this.filteredInvoice === "Draft") {
          return virtualMachine.VirtualMachineDraft === true;
        }
        if (this.filteredInvoice === "Pending") {
          return virtualMachine.VirtualMachinePending === true;
        }
        if (this.filteredInvoice === "Paid") {
          return virtualMachine.VirtualMachinePaid === true;
        }
        return invoice;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;
  .header {
    margin-bottom: 65px;
    .left,
    .right {
      flex: 1;
    }
    .right {
      justify-content: flex-end;
      align-items: center;
      .button,
      .filter {
        align-items: center;
        span {
          font-size: 12px;
        }
      }
      .filter {
        position: relative;
        margin-right: 40px;
        cursor: pointer;
        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
        }
        .filter-menu {
          width: 120px;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: #1e2139;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;
            &:hover {
              color: #1e2139;
              background-color: #fff;
            }
          }
        }
      }
      .button {
        padding: 8px 10px;
        background-color: #7c5dfa;
        border-radius: 40px;
        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }
  .empty {
    margin-top: 160px;
    align-items: center;
    img {
      width: 214px;
      height: 200px;
    }
    h3 {
      font-size: 20px;
      margin-top: 40px;
    }
    p {
      text-align: center;
      max-width: 224px;
      font-size: 12px;
      font-weight: 300;
      margin-top: 16px;
    }
  }
}
</style>
