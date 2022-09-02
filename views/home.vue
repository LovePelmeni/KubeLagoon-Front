<template>
  <div class="HomePage container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Virtual Machines</h1>
        <span>You have {{ virtualMachineData.length }} total Virtual Machines</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span
            >Filter by status <span v-if="filteredVirtualMachine">: {{ filteredVirtualMachines }}</span></span
          >
          <img src="@/assets/icon-arrow-down.svg" alt="" />
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filteredVirtualMachine">Running</li>
            <li @click="filteredVirtualMachine">Shutdown</li>
            <li @click="filteredVirtualMachine">Deploying</li>
            <li @click="filteredVirtualMachine">Clear</li>
          </ul>
        </div>
        <div @click="newVirtualMachine" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="" />
          </div>
          <span>New VirtualMachine</span>
        </div>
      </div>
    </div>
    <!-- Invoices -->
    <div v-if="virtualMachineData.length > 0">
      <Invoice v-for="(VirtualMachine, index) in filteredData" :invoice="VirtualMachine" :key="index" />
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.svg" alt="" />
      <h3>There is nothing here</h3>
      <p>Create a new invoice by clicking the New Invoice button and get started</p>
    </div>
  </div>
</template>

<script>

/* eslint-disable no-unused-vars */

import virtualMachine from "../src/components/VirtualMachine.vue";
import { mapMutations, mapState } from "vuex";
import * as vm from "../vm/vm.js"

export default {

  name: "HomePage",
  data() {
    return {
      filterMenu: null,
      filteredVirtualMachine: null,
    };
  },
  components: {
    virtualMachine,
  },
  methods: {

     ...mapMutations(["TOGGLE_VIRTUAL_MACHINE"]),

    newVirtualMachine() {
      // Initializes Empty Form for the Virtual Machine Configuration
      this.TOGGLE_VIRTUAL_MACHINE()
    },

    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },

    filterVirtualMachine(e) {
      if (e.target.innerText === "Clear") {
        this.filteredVirtualMachine = null;
        return;
      }
      this.filteredVirtualMachine = e.target.innerText;
    },
  },

  computed: {
    ...mapState(["virtualMachineData"]),
    filteredData() {
      return this.virtualMachineData.filter((virtualMachine) => {

        if (this.filteredVirtualMachine === "Clear") {
          this.filteredVirtualMachine = null
          return true
        }
        if (this.filteredVirtualMachine === "Running") {
          return virtualMachine.Running === true;
        }
        if (this.filteredVirtualMachine === "Shutdown") {
          return virtualMachine.Shutdown === true;
        }
        if (this.filteredVirtualMachine === "Deploying") {
          return virtualMachine.Deploying === true;
        }
        return virtualMachine;
      });
  },
},
}

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


.red {
  background-color: #ec5757;
}
.green {
  background-color: #33d69f;
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
