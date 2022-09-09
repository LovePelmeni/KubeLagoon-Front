<template>
  <div class="HomePage container">
    <router-link :to="{ name: 'login_page'}"></router-link>
    <router-link :to="{ name: 'register_page'}"></router-link>
    <router-link :to="{ name: 'customer_profile'}"></router-link>

    <!-- Header -->

    <div class="header flex">
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span
            >Filter by status <span v-if="filteredVirtualMachine">: {{ filteredVirtualMachines }}</span></span
          >
          <img :src="require('@/assets/icon-arrow-down.svg')" alt="icon-arrow-down" style="width:10%;height:10%"/>
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filteredVirtualMachine">Running</li>
            <li @click="filteredVirtualMachine">Shutdown</li>
            <li @click="filteredVirtualMachine">Deploying</li>
            <li @click="filteredVirtualMachine">Clear</li>
          </ul>
        </div>

        <transition name="virtualMachine">
          <initializationModal v-if="initializationModal" />
        </transition>

        <div @click="newVirtualMachine" class="button flex">
          <div class="inner-button flex">
            <img :src="require('@/assets/icon-plus.svg')" alt="icon_plus" />
          </div>
          <span>New Virtual Machine</span>
        </div>
      </div>
    </div>

    <!-- Virtual Machines -->

    <div v-if="virtualMachineData.length > 0 && virtualMachinesLoaded == true">
      <div class="left flex flex-column">
        <h1>Virtual Servers</h1>
        <span>You have {{ virtualMachineData.length }} Virtual Servers</span>
      </div>
      <VirtualMachineBannerInfo v-for="(VirtualMachine, index) in filteredData" :VirtualMachine="VirtualMachine" :key="index" />
    </div>
    <div v-else class="empty flex flex-column">
      <img :src="require('@/assets/illustration-empty.svg')" style="width: 50%; height: 50%; margin" alt="illustration-empty" />
      <h3>There is nothing here</h3>
      <p>Let's create a new Virtual Server Now!</p>
    </div>
  </div>
</template>

<script>

/* eslint-disable no-unused-vars */

import { mapMutations, mapState } from "vuex";
import VirtualMachineBannerInfo from "../components/VirtualMachineBannerInfo.vue";
import initializationModal from "../components/InitializationModal.vue";

export default {

  name: "HomePage",
  data() {
    return {
      filterMenu: null,
      filteredVirtualMachine: null,
    };
  },
  methods: {
    ...mapMutations(["TOGGLE_INITIALIZATION_MODAL", "TOGGLE_MODAL"]),

    newVirtualMachine() {
      // Initializes Empty Form for the Virtual Machine Configuration
      this.TOGGLE_INITIALIZATION_MODAL(this)
    },

    saveDraft() {
      // Saves the Draft of the Configuration
      this.TOGGLE_INITIALIZATION_MODAL()
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

  components: {
    VirtualMachineBannerInfo,
    initializationModal,
  },

  computed: {

    ...mapState(["virtualMachineData", "initializationModal", "virtualMachinesLoaded"]),

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
