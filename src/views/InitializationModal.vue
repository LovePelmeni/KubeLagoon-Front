<template>
  <div class="virtual-machine-wrap">

    <v-col cols="10" lg="4" class="mx-auto">
      <v-card class="pa-4">

    <v-form @submit.prevent="ValidateInput" class="virtual-machine-content" style="width: 1500px; justify-content: center">
      <loadingPage v-show="loading" />

      <!-- Virtual Machine Work Details -->

        <div class="resourceConfigBlock" style="width: 800px">
        <!-- Hardware Configuration  -->
          <hardwareConfiguration />
        </div>

        <div class="resourceConfigBlock" style="width: 800px">
          <!-- resource Configuration -->
          <resourceConfiguration />
        </div>

        <div class="resourceConfigBlock" style="width: 800px">
          <!-- SSH Configuration -->
          <sshConfiguration />
        </div>

        <div class="payment flex" style="width: 800px">

          <div class="modalField flex flex-column">
            <label for="virtualMachineCreationDate">Creation Date</label>
            <input disabled type="text" id="virtualMachineCreationDate" v-model="virtualMachineCreationDate" />
          </div>

          <div class="modalField flex flex-column">
            <label for="paymentDueDate">Payment Due</label>
            <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate" />
          </div>
        </div>

        <div class="modalField flex flex-column">

          <label for="paymentTerms">Payment Terms</label>
          <select @change="ProcessPaymentTermsChangeEvent" style="width: 750px" type="text" id="paymentTerms" v-model="paymentTerms">
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
          
        </div>

        <div class="TotalCost flex" style="width: 750px; justify-content: center;">
          <p>In Total Per Day</p>
          <p>${{ TotalCost }}</p>
        </div>


      <!-- Save/Exit -->

              <div class="save flex">

                  <div class="buttonBlock flex" style="width: 800px">
                    <button type="submit" @click="closeVirtualMachineSettings" class="red"> Cancel Setup</button>
                    <button v-if="!updateVirtualMachine" type="submit" @click="saveVirtualMachineDraft" class="dark-purple">Save Setup</button>
                    <button v-if="!updateVirtualMachine" type="submit" @click="CreateNewVirtualMachine" class="purple">Create New Virtual Machine</button>
                    <button v-if="updateVirtualMachine"  type="sumbit" class="purple">Update Virtual Machine</button>
                  </div>
              </div>
          </v-form>
      </v-card>
    </v-col>

    </div>

    <body>
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
    </body>

</template>

<script>

import { mapMutations, mapActions, mapState } from "vuex";
import loadingPage from "../components/LoadingPage.vue";
import * as vm from "../../vm/vm.js";
import { useCookies } from "vue3-cookies";

import hardwareConfiguration from "../components/hardwareConfiguration.vue";
import resourceConfiguration from "../components/resourceConfiguration.vue";
import sshConfiguration from  "../components/sshConfiguration.vue";
import { VirtualMachineCostCalculator } from "../../cost/virtualMachineCost.js";


export default {

  name: "initializationModal",
  setup() {
    const { cookie } = useCookies();
    return { cookie };
  },
  mounted() {
    this.JwtToken = this.cookie?.get("jwt-token")
  },
  data() {
    return {
      // General Extra Attributes
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      loading: null,

      virtualMachineCreationDate: null,
      virtualMachineDateUnix: null,
      paymentDueDate: null,
      paymentTerms: null,

      updateVirtualMachine: false,

      VirtualMachineRunning: null,
      VirtualMachineDeploying: null,
      VirtualMachineShutdown: null,

      VirtualMachineDraft: null,
      VirtualMachineItemList: [],
      TotalCost: 0,
    };
  },
  components: {
    loadingPage,
    hardwareConfiguration,
    resourceConfiguration,
    sshConfiguration,
  },
  created() {
    // get current date for invoice date field

    this.CheckIsDraft() // Checking if this is Saved Draft or Customer Want to Initialize New Configuration
    this.GetCustomerVirtualMachines()

    if (!this.updateVirtualMachine) {
      this.virtualMachineDateUnix = Date.now();
      this.virtualMachineCreationDate = new Date(this.virtualMachineDateUnix).toLocaleDateString("en-us", this.dateOptions);
      this.paymentDueDate = new Date(this.virtualMachineDateUnix).toLocaleDateString("en-us", this.dateOptions);
    }
    if (this.updateVirtualMachine) {
      const currentVirtualMachine = this.currentVirtualMachineArray[0];
      this.VirtualMachineCreationDate = currentVirtualMachine.VirtualMachineCreationDate;
      this.VirtualMachinePending = currentVirtualMachine.VirtualMachinePending;
      this.VirtualMachineDraft = currentVirtualMachine.VirtualMachineDraft;
      this.VirtualMachineItemList = currentVirtualMachine.VirtualMachineItemList;
    }
  },
  methods: {

    ...mapMutations([
      "TOGGLE_INITIALIZATION_MODAL",
      "TOGGLE_UPDATE_VIRTUAL_MACHINE",
      "TOGGLE_ERROR",
    ]),
    ...mapActions([
      "GET_VIRTUAL_MACHINE",
      "GET_VIRTUAL_MACHINES",
      "CREATE_VIRTUAL_MACHINE",
      "DELETE_VIRTUAL_MACHINE",
    ]),

    checkClick(e) {
      if (e.target === this.$refs.virtualMachineWrap) {
        this.TOGGLE_MODAL();
      }
    },

    ProcessPaymentTermsChangeEvent() {
      // Once customer decided to restore the vm server within the specific amount of days
      // this method gonna calculate the total price, depending on the amount of days

      if (this.CpuNum == null || this.CpuNum == 0) {
        this.CpuNum = 0
      }

      if (this.Memory == null || this.Memory == 0) {
        this.Memory = 0
      }

      if (this.storageCapacity == null || this.storageCapacity == 0) {
        this.storageCapacity = 0
      }

      let PricePerDay = document.getElementById("paymentTerms").value;
      let BillManager = new VirtualMachineCostCalculator(this.CpuNum, this.Memory, this.storageCapacity)
      let TotalPricePerDay = BillManager.CalculateCostPerDay()
      this.getVirtualMachineCostTotal(TotalPricePerDay, Number(PricePerDay))
    },

    CheckIsDraft() {
      //Checks if the Configuration is a Saved Draft
    },


    ValidateInput() {
      // Validates The Whole Configuration Input
    },

    addVirtualMachineToList(NewVirtualMachine) {
      // Adds new Object to the Customer's Virtual Machine List
      this.VirtualMachineItemList.push({
        "ID": NewVirtualMachine.VirtualMachineId,
        "Name": NewVirtualMachine.VirtualMachineName,
        "Status": NewVirtualMachine.Status,
        "Price": NewVirtualMachine.Price,
        "TotalCost": NewVirtualMachine.TotalCost,
      })
    },

    removeVirtualMachineFromList(VirtualMachineId) {
      // Removes Virtual Machine Info Object from the Customer's Virtual Machines List
      let UpdatedVirtualMachineItemList = this.VirtualMachineItemList.filter((VirtualMachine) => {
          return VirtualMachine.VirtualMachineId === VirtualMachineId
      })
      this.VirtualMachineItemList = UpdatedVirtualMachineItemList
    },

    closeVirtualMachineSettings() {
      if (this.updateVirtualMachine) {
        this.TOGGLE_UPDATE_VIRTUAL_MACHINE();
      }
      this.$router.push({name: "main_page"})
    },

    GetCustomerVirtualMachines() {
      // Returns Queryset of the Virtual Machines, related to the Customer
      let newVirtualMachineManager = new vm.VirtualMachineManager()
      let VirtualMachinesQueryset, GetError = newVirtualMachineManager.GetCustomerVirtualMachines(this.JwtToken)
      if (GetError != null) {this.TOGGLE_ERROR(GetError.error)}
      this.VirtualMachineItemList = VirtualMachinesQueryset
    },

    // Virtual Machine Functions Goes There
    CreateNewVirtualMachine(hardwareConfigurationData, customizedConfigurationData) {

      // Initializes New Virtual Machine
      // Initializing New Resources

      let VirtualMachineInfo, CreationError = this.CREATE_VIRTUAL_MACHINE(
      this.JwtToken, hardwareConfigurationData, customizedConfigurationData)

      // If the Virtual Machine Has been Successfully Initialized and Created
      // Adding it to the Customer's Virtual Machine Item List

      if (CreationError == null) {
        let VmManager = new vm.VirtualMachineManager()
        let VirtualMachine = VmManager.GetVirtualMachine(this.JwtToken, VirtualMachineInfo["VirtualMachineId"])
        this.addVirtualMachineToList(VirtualMachine)
      }
    },


    DeleteVirtualMachine(VirtualMachineId) {
      // Deletes Selected Virtual Machine, Activates Warning before doing that Operation
      this.DELETE_VIRTUAL_MACHINE(this.JwtToken, VirtualMachineId)
      this.VirtualMachineItemList = this.VirtualMachineItemList.filter((item) => item.id !== VirtualMachineId);
    },


    getVirtualMachineCostTotal(PricePerDay, SelectedDays) {
      // Returns Total Amount of the Money, that Customer will need to pay for All Virtual Machines Maintainance Monthly
      this.TotalCost = PricePerDay * SelectedDays
    },

    saveDraft() {
      this.VirtualMachineDraft = true;
    },

    UploadVirtualMachine() {
      if (this.VirtualMachineItemList.length <= 0) {
        alert("Please ensure you filled out work items!");
        return;
      }
      this.loading = true;
      this.TOGGLE_INITIALIZATION_MODAL();
      this.loading = false;
      this.GET_VIRTUAL_MACHINES();
    },

    UpdateVirtualMachine(NewConfiguration) {
      if (this.VirtualMachineItemList.length <= 0) {
        alert("Please ensure you filled out work items!");
        return;
      }
      const data = {
        VirtualMachineId: this.$route.params.VirtualMachineId,
        UpdatedConfiguration: NewConfiguration,
      };
      this.UPDATE_VIRTUAL_MACHINE(data);
    },

    submitForm() {
      if (this.updateVirtualMachine) {
        this.UpdateVirtualMachine();
        return;
      }
      this.UploadVirtualMachine();
    },

  },
  computed: {
    ...mapState(["updateVirtualMachine", "currentVirtualMachineArray"]),
  },

  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
      this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString("en-us", this.dateOptions);
    },
  },
};

</script>

<style lang="scss" scoped>

.virtual-machine-wrap {
  
  flex: 1;
  position: relative;
  width: 100%;
  background-color: #141625;

  .resourceConfigBlock {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .virtual-machine-content {

    max-width: 865px;

    h1 {
      margin-bottom: 48px;
      color: #fff;
    }
    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }
    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }
    // Bill To / Bill From
    .hardwareConfiguration {
      margin-bottom: 48px;

      h4 {
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
      label {
          font-size: 12px;
          margin-bottom: 6px;
      }
        input {
          width: 100%;
          background-color: #1e2139;
          color: #fff;
          border-radius: 4px;
          padding: 12px 4px;
          border: none;
          &:focus {
            outline: none;
          }
        }
    }
    .sshConfiguration {
          h4 {
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
    .resourceConfiguration {
      margin-bottom: 48px;
      h4 {
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
      .resources-details {
        gap: 16px;
        div {
          flex: 1;
        }
      }
      .modalField {
        margin-bottom: 24px;
      }
        label {
          font-size: 12px;
          margin-bottom: 6px;
        }
        select,
        input {
          width: 100%;
          background-color: #1e2139;
          color: #fff;
          border-radius: 4px;
          padding: 12px 4px;
          border: none;
          &:focus {
            outline: none;
          }
       }
    }
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }
      .work-items {
        .item-list {
          width: 100%;
          // Item Table Styling
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .virtual-machine-id {
              flex-basis: 50%;
            }
            .virtual-machine-name{
              flex-basis: 10%;
            }
            .status{
              flex-basis: 10%;
            }
            .price {
              flex-basis: 20%;
            }
            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }
          .table-heading {
            margin-bottom: 16px;
            th {
              text-align: left;
            }
          }
          .table-items {
            position: relative;
            margin-bottom: 24px;
            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }
        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;
          img {
            margin-right: 4px;
          }
        }
    }
    .save {
      margin-top: 60px;
      div {
        flex: 1;
      }
      .buttonBlock{
        justify-content: space-between;
      }
    }
  }
  .TotalCost {
    color: #fff;
    
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

  .modalField {
    margin-bottom: 24px;
  }
  label {
    font-size: 12px;
    margin-bottom: 6px;
  }
  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
    &:focus {
      outline: none;
    }
  }
}

.v-card {
  overflow: initial;
  max-width: 10000px;
}
</style>
