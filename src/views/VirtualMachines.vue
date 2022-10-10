<template>

  <div class="homeWrapper" v-if="Authenticated">

    <router-link :to="{ name: 'login_page'}"></router-link>
    <router-link :to="{ name: 'register_page'}"></router-link>

    <!-- Header -->

    <div :v-if="virtualMachineData.length > 0 && virtualMachinesLoaded == true" class="header flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span>Filter by status</span>
          <img :src="require('@/assets/icon-arrow-down.svg')" alt="icon-arrow-down" style="width:10%; height:10%"/>
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filterVirtualMachine">Running</li>
            <li @click="filterVirtualMachine">Shutdown</li>
            <li @click="filterVirtualMachine">Deploying</li>
            <li @click="filterVirtualMachine">Clear</li>
          </ul>
        </div>

        <div @click="newVirtualMachine" class="button flex">
          <div class="inner-button flex">
            <img :src="require('@/assets/icon-plus.svg')" alt="icon_plus" />
          </div>
          <span>New Virtual Machine</span>
        </div>
    </div>

    <!-- Virtual Machines -->

    <div style="margin-top: 5px;" v-if="virtualMachineData.length > 0 && virtualMachinesLoaded == true">
      <div class="left flex flex-column" style="margin-bottom: 70px; justify-content: center;">
        <h4 class="section-title_title__VEDfK" style="margin-top: 10px;">Your Virtual Servers</h4>
        <span style="margin-bottom: 20px; margin-top: 40px;">You have {{ virtualMachineData.length }} Virtual Servers</span>
      </div>
      <VirtualMachineBannerInfo style="justify-content: center; margin-bottom: 30px; margin-left: 200px; margin-right: 200px;" v-for="(VirtualMachine, index) in filteredData" :VirtualMachine="VirtualMachine" :key="index" />
    </div>
    <div v-else class="empty flex flex-column">
      <img :src="require('@/assets/illustration-empty.svg')" alt="illustration-empty" />
      <h3>There is nothing here</h3>
      <p>Let's create a new Virtual Server Now!</p>
      <button type="submit" class="red">Create Virtual Server</button>
    </div>

    </div>

    <div v-else>
      <not-authenticated-window />
    </div>

    <body>
      <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
    </body>

</template>

<script>


import { mapMutations, mapActions, mapState } from "vuex";
import VirtualMachineBannerInfo from "../components/VirtualMachineBannerInfo.vue";
import NotAuthenticatedWindow from "../components/NotAuthenticatedWindow.vue";

export default {
  name: "VirtualMachinesPage",
  data() {
    return {
      // Filter Params
      filterMenu: null,
      filterParams: null,
    };
  },
  created() {
    this.getVirtualMachines()
  },
  methods: {
    ...mapMutations(["TOGGLE_INITIALIZATION_MODAL", "TOGGLE_MODAL"]),
    ...mapActions(["GET_VIRTUAL_MACHINES"]),
    getVirtualMachines() {
      // Receives the query of the Virtual Machines
      this.GET_VIRTUAL_MACHINES()
    },
    newVirtualMachine() {
      // Pushes to the Virtual Machine Initialization Page
      this.$router.push({name: "virtual_machine_setup"})
    },
    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
    filterVirtualMachine(e) {
      if (e.target.innerText === "Clear") {
        this.filterParams = null;
        return;
      }
      this.filterParams = e.target.innerText;
    },
  },
  components: {
    VirtualMachineBannerInfo,
    NotAuthenticatedWindow,
  },
  computed: {
    Authenticated() {
      return this.$store.state.authenticated
    },
    ...mapState(["virtualMachineData", "virtualMachinesLoaded"]),
    filteredData() {
      return this.virtualMachineData.filter((virtualMachine) => {

        if (this.filterParams === "Clear") {
          this.filteredVirtualMachine = null
          return true
        }
        if (this.filterParams === "Running") {
          return virtualMachine.Running === true;
        }
        if (this.filterParams === "Shutdown") {
          return virtualMachine.Shutdown === true;
        }
        if (this.filterParams === "Deploying") {
          return virtualMachine.Deploying === true;
        }
        return virtualMachine;
      });
  },
},
}


</script>


<style lang="scss" scoped>


.geist-container.jsx-499702677>* {
    --gap-ratio: 1;
}

.section-title_title__VEDfK {
    text-align: center;
    margin: 0 0 var(--geist-gap);
    padding-bottom: var(--geist-gap-half);
    font-weight: 500;
    letter-spacing: -.05em;
    font-size: 2.5rem;
}
*, :after, :before, html {
    box-sizing: border-box;
}

.h4 {
    display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}


.homeWrapper {
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    flex: 1;
    position: relative;

  color: #fff;
  .header {
    margin-top: 30px;
    margin-bottom: 10px;
    .left,
    .right {
      flex: 1;
      align-content: center;
    }
      justify-content: flex-end;
      align-items: center;
      flex: 1;
      align-content: center;
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
.dark-purple {
  background-color: #252945;
}
.red {
  background-color: #ec5757;
}
.purple {
  background-color: #7c5dfa;
}
.green {
  background-color: #33d69f;
}
.orange {
  background-color: #ff8f00;
}
// utility classes
.flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;
  @media (min-width: 900px) {
    padding-top: 72px;
  }
}
.nav-link {
  text-decoration: none;
  color: initial;
}
// Status Button Styling
.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}
.running {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}
.deploying {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}
.shutdown {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}

</style>