<template>

  <div class="initializationModalWindowView">

  <div class="virtual-machine-wrap">
    <v-col cols="10" lg="4" class="mx-auto" style="max-width: 80%;">
      <v-card style="max-width: 100%; overflow: hidden;" class="pa-4" ref="initialization-card">

    <v-form class="virtual-machine-content" id="form" ref="form" style="max-width: 100%; overflow: hidden; gap: 1; margin-left: auto !important; margin-right: auto !important">

      <!-- Virtual Machine Work Details -->

        <div class="resourceConfigBlock" style="
        width: 800px max-width: 100%; 
        overflow: hidden;
        margin-left: auto !important;
        margin-right: auto !important;
        
        .v-messages__message {
        margin-top: 10px;
        align-items: center;
        align-content: center;
        text-align: center;
        line-height: 12px;
        word-break: break-word;
        overflow-wrap: break-word;
        word-wrap: break-word;
        -webkit-hyphens: auto;
        hyphens: auto;
        transition-duration: 150ms;
        color: #344767 !important;
      }">

        <!-- Hardware Configuration  -->

          <hardwareConfiguration ref="hardwareConfiguration" :updateVirtualMachine="updateVirtualMachine" :suggestionCard="IsSuggestionCard" :hardwareConfiguration="VirtualMachineSetupConfiguration['hardwareConfiguration']" />

        </div>

        <div class="resourceConfigBlock" style="width: 800px; max-width: 100%; overflow: hidden; margin-left: auto !important; margin-right: auto !important">
          <!-- resource Configuration -->
    
          <resourceConfiguration ref="resourceConfiguration" :resourceConfiguration="VirtualMachineSetupConfiguration['resourceConfiguration']" />

        </div>

        <div class="resourceConfigBlock" style="width: 800px; max-width: 100%; overflow: hidden; margin-left: auto !important; margin-right: auto !important">
          <!-- SSH Configuration -->

          <sshConfiguration ref="sshConfiguration" :sshConfiguration="VirtualMachineSetupConfiguration['sshConfiguration']" />

        </div>

        <div class="payment flex" style="width: 800px; max-width: 100%; overflow: hidden; margin-left: auto !important; margin-right: auto !important ">

          <div class="modalField flex flex-column" style="margin-right: 20px; margin-left: 0px !important;">
            <label for="virtualMachineCreationDate">Creation Date</label>
            <input disabled type="text" id="virtualMachineCreationDate" v-model="virtualMachineCreationDate" />
          </div>

          <div class="modalField flex flex-column" style="margin-left: auto !important; margin-right: auto !important">
            <label for="paymentDueDate">Payment Due</label>
            <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate" />
          </div>
        </div>

        <div class="modalField flex flex-column" style="width: 800px; max-width: 100%; overflow: hidden; margin-left: auto !important; margin-right: auto !important ">

          <label for="paymentTerms">Payment Terms</label>
          <select @change="ProcessPaymentTermsChangeEvent" style="max-width: 100%; overflow: hidden;"
          type="text" id="paymentTermsField" v-model="paymentTerms" aria-placeholder="Select Bill Terms">
            <option id="30" value="30">30 Days</option>
            <option id="60" value="60">60 Days</option>
          </select>
          
        </div>

        <div class="TotalCost flex" 

        style="width: 800px; max-width: 100%; overflow: hidden; 
        margin-left: auto !important; margin-right: auto !important ">
        
          <p>In Total Per Day</p>
          <p>${{ TotalCost }}</p>

        </div>

      <!-- Save/Exit -->

              <div class="save flex">
                  <div class="buttonBlock flex" style="width: 800px; max-width: 100%; overflow: hidden;">
                    <v-btn type="submit" @click="closeVirtualMachineSettings" id="" style="background-color: #ec5757" :loading="CancelLoading">Cancel Setup</v-btn>
                    <v-btn style="background-color: #252945;" :loading="Saveloading" type="submit" @submit="saveVirtualMachineDraft">Save Setup</v-btn>
                    <v-btn v-if="!updateVirtualMachineServer || IsSuggestionCard" style="background-color: #7c5dfa;" :loading="Createloading" type="submit" @submit="CreateNewVirtualMachine">Create Server</v-btn>
                    <v-btn v-if="updateVirtualMachineServer" type="submit" @click="UpdateVirtualMachine" id="updateVirtualMachineServer" style="background-color: green;">Apply Configuration</v-btn>
                  </div>
              </div>
          </v-form>
      </v-card>
    </v-col>

      <v-snackbar v-if="!OperationFailed" top color="green">
        Virtual Server Has Been Created
      </v-snackbar>

      <v-snackbar v-if="OperationFailed" top color="red">
        Operation Failed, {{ VirtualServerInitializationError }}
      </v-snackbar>
    </div>

    <error-banner  v-if="ServerErrorCode === 500" :ReasonError="'Failed To Initialize New Server, Unknown Error'" />
    <error-banner  v-if="ServerErrorCode === 400" :ReasonError="'Failed To Initialize New Server, Invalid Parameters Specified'" />
    <error-banner  v-if="ServerErrorCode === 300" :ReasonError="'Failed To Initialize New Server, You havent paid for the previous session'" />
    
    <body>
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
    </body>

  </div>

</template>

<script>

import { mapMutations, mapActions, mapState } from "vuex";
import * as vm from "../../vm/vm.js";
import { useCookies } from "vue3-cookies";

import hardwareConfiguration from "../components/hardwareConfiguration.vue";
import resourceConfiguration from "../components/resourceConfiguration.vue";

import sshConfiguration from  "../components/sshConfiguration.vue";
import { VirtualMachineCostCalculator } from "../../cost/virtualMachineCost.js";
import ErrorBanner from "../components/ErrorBanner.vue";

export default {

  name: "initializationModal",
  setup() {
    const { cookie } = useCookies();
    return { cookie };
  },
  props: [
    "suggestionCard",
    "updateVirtualMachine",
    "VirtualMachine",
  ],
  mounted() {
    this.JwtToken = this.cookie?.get("jwt-token")
    this.CheckIsDraft() 
    this.InitializePaymentTerms()
    if (this.suggestionCard === true) {this.IsSuggestionCard = true}
    if (this.updateVirtualMachine === true || this.suggestionCard === true) {
    this.ApplyPaymentTerms()}else{this.ApplyDefaultPaymentTermsPeriod()}
  },
  data() {
    return {

      // Loading Statuses
      Createloading: null, 
      Saveloading: null, 
      CancelLoading: null, 

      // Edit Configuration View 

      VirtualMachineSetupConfiguration: this.$props.VirtualMachine || {}, // Property, that is not null, once the customer decided to update the Virtual Server 

      // Operation Types specification 
      Operated: false,
      OperationFailed: false,
      ServerErrorCode: 0,

      // General Extra Attributes
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      loading: null,

      virtualMachineCreationDate: null,
      virtualMachineDateUnix: null,

      // Payment Due Date Configuration 

      paymentDueDate: function(object) {
        let Configuration = object.$props.VirtualMachine || {}; 
        if (Object.keys(Configuration).length === 0) {return null}
        return Configuration["paymentConfiguration"]["paymentDueDate"] || null
      }(this),
      
      // Payment Terms Configuration 

      paymentTerms: null,

      updateVirtualMachineServer: this.$props.updateVirtualMachine || false,
      IsSuggestionCard: this.$props.suggestionCard || false, // Field that is going to be filled with true, once customer 
      // decided to follow subscription (base tier, middle tier or advanced tier) with the prepared Virtual Server Configuration.

      VirtualMachineRunning: null,
      VirtualMachineDeploying: null,
      VirtualMachineShutdown: null,

      VirtualMachineDraft: null,
      VirtualMachineItemList: [],
      TotalCost: 0,
    };
  },
  components: {
    hardwareConfiguration,
    resourceConfiguration,
    sshConfiguration,
    ErrorBanner,
  },
  created() {

    // get current date for invoice date field
    this.GetCustomerVirtualMachines()
    this.virtualMachineDateUnix = Date.now();
    this.virtualMachineCreationDate = new Date(this.virtualMachineDateUnix).toLocaleDateString("en-us", this.dateOptions);
    this.paymentDueDate = new Date(this.virtualMachineDateUnix).toLocaleDateString("en-us", this.dateOptions);
  },
  computed: {
    ...mapState([
      "loading",
      "virtualMachineSavedDraft"
    ]),
  },
  methods: {

    ...mapMutations([
      "TOGGLE_UPDATE_VIRTUAL_SERVER_CONFIGURATION",
      "TOGGLE_INITIALIZATION_MODAL",
      "TOGGLE_UPDATE_VIRTUAL_MACHINE",
      "TOGGLE_ERROR",
      "SAVE_VIRTUAL_MACHINE_CONFIGURATION_DRAFT"
    ]),
    ...mapActions([
      "GET_VIRTUAL_MACHINE",
      "GET_VIRTUAL_MACHINES",
      "CREATE_VIRTUAL_MACHINE",
      "DELETE_VIRTUAL_MACHINE",
    ]),

    ApplyPaymentTerms() {
      // Applying the Payment Terms to the Edit Virtual Machine Page 

      let Configuration = this.$props.VirtualMachine || {}
      this.paymentTerms = Configuration["paymentConfiguration"]["paymentTerms"]

      let FirstSelected = ""
      let SecondSelected = ""

      let PaymentTermsValue = String(
      Configuration["paymentConfiguration"]["paymentTerms"])

      let FirstOption = "<option value='"
      + String(30) + "'" + FirstSelected + ">" + String(30) + " days" + "</option>"

      let SecondOption = "<option value='"
      + String(60) + "'" + SecondSelected + ">" + String(60) + " days" + "</option>"

      if (String(PaymentTermsValue).toLowerCase() === "30") {
          FirstSelected = ":" + "selected"
      }

      else if (String(PaymentTermsValue).toLowerCase() === "60") {
         SecondSelected = ":" + "selected"
      }
      document.getElementById("paymentTermsField").innerHTML = FirstOption + " \n " + SecondOption
    },

    ApplyDefaultPaymentTermsPeriod() {
      // Applying the Default Period for the Payment Terms Field 

      let FirstSelected = ""
      let SecondSelected = ""

      let FirstOption = "<option value='"
      + String(30) + "'" + FirstSelected + ">" + String(30) + " days" + "</option>"

      let SecondOption = "<option value='"
      + String(60) + "'" + SecondSelected + ">" + String(60) + " days" + "</option>"

      FirstSelected = ":" + "selected"
      document.getElementById("paymentTermsField").innerHTML = FirstOption + " \n " + SecondOption
    },

    checkClick(e) {
      if (e.target === this.$refs.virtualMachineWrap) {
        this.TOGGLE_MODAL();
      }
    },
    
    InitializePaymentTerms() {
      // Initializing the Payment Terms Initial Event
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + 30);
      this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString("en-us", this.dateOptions);
    },

    ProcessPaymentTermsChangeEvent() {
      // Once customer decided to restore the vm server within the specific amount of days
      // this method gonna calculate the total price, depending on the amount of days

      // Resources 

      let CpuNum = this.$refs.resourceConfiguration.CpuNum || 0
      let Memory = this.$refs.resourceConfiguration.Memory || 0
      let StorageCapacity = this.$refs.resourceConfiguration.StorageCapacity || 0

      let PricePerDay = document.getElementById("paymentTermsField").value;
      let BillManager = new VirtualMachineCostCalculator(CpuNum, Memory, StorageCapacity)
      let TotalPricePerDay = BillManager.CalculateCostPerDay()
      this.getVirtualMachineCostTotal(TotalPricePerDay, Number(PricePerDay))
    },

    CheckIsDraft() {
      // Checks if the Configuration is a Saved Draft
      if (this.virtualMachineSavedDraft != null) {
        this.paymentDueDate = this.virtualMachineSavedDraft["paymentDueDate"]
        this.paymentTerms = this.virtualMachineSavedDraft["paymentTerms"]
      }
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
      // Closing the initialization Modal Window and redirects to the Main Page
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
    CreateNewVirtualMachine() {

      // Initializes New Virtual Machine
      // Initializing New Resources

      this.Createloading = true

      let hardwareConfigurationData = this.GetHardwareSubmittedFormData()
      let customizedConfigurationData = this.GetResourceConfigurationSubmittedFormData()

      this.loading = true
      let VirtualMachineInfo, CreationErrorCode = this.CREATE_VIRTUAL_MACHINE(
      this.JwtToken, customizedConfigurationData, hardwareConfigurationData)

      // If the Virtual Machine Has been Successfully Initialized and Created
      // Adding it to the Customer's Virtual Machine Item List

      if (CreationErrorCode === null) {
        let VmManager = new vm.VirtualMachineManager()
        let VirtualMachine = VmManager.GetVirtualMachine(this.JwtToken, VirtualMachineInfo["VirtualMachineId"])
        this.addVirtualMachineToList(VirtualMachine)
      }else{
        this.ServerErrorCode = CreationErrorCode
      }
      this.Createloading = false
    },

    UpdateVirtualMachine() {
      // Updates the Virtual Machine Servers
      let NewConfiguration = {

                "paymentConfiguration": {
                    "paymentTerms": this.paymentTerms,
                    "paymentDueDate": this.paymentDueDate,
                },

                //  Resource Configuration of the Virtual Server 
                "resourceConfiguration": {

                    "CpuNum": this.$refs.resourceConfiguration.cpuNum, 
                    "MaxCpu": this.$refs.resourceConfiguration.MaxCpu, 

                    "Memory": this.$refs.resourceConfiguration.Memory, 
                    "MaxMemory": this.$refs.resourceConfiguration.MaxMemory,

                    "StorageCapacity": this.$refs.resourceConfiguration.StorageCapacity, 
                    "MaxStorageCapacity": this.$refs.resourceConfiguration.MaxStorageCapacity,

                },
                // Hardware Configuration of the Virtual Server 
                "hardwareConfiguration": {

                    "Datacenter": this.$refs.hardwareConfiguration.AddedDatacenter, 
                    "OperationalSystem": this.$refs.hardwareConfiguration.AddedOperationalSystem, 
                    "PreInstalledTools": this.$refs.hardwareConfiguration.AddedPreInstalledTools,

                },
                // SSH Configuration of the Virtual Server 
                "sshConfiguration": {

                    "useRootCertificate": this.$refs.sshConfiguration.useRootCertificate, 
                    "useRootCredentials": this.$refs.sshConfiguration.useRootCredentials,
                },
      }
      let VirtualMachineId = this.$params.VirtualMachineId
      this.TOGGLE_UPDATE_VIRTUAL_SERVER_CONFIGURATION(VirtualMachineId, NewConfiguration)
    },

    getVirtualMachineCostTotal(PricePerDay, SelectedDays) {
      // Returns Total Amount of the Money, that Customer will need to pay for All Virtual Machines Maintainance Monthly
      this.TotalCost = PricePerDay * SelectedDays
    },

    saveVirtualMachineDraft() {

      // Marks the Virtual Machine Configuration the Virtual Machine
      this.Saveloading = true

      // Receiving the Values from the Filled Form and Putting in the Single Object of the Configuration 

      let customizedConfigurationData = this.GetResourceConfigurationSubmittedFormData() 
      let hardwareConfigurationData = this.GetHardwareSubmittedFormData()

      // Then saves it to the Store 
      this.SAVE_VIRTUAL_MACHINE_CONFIGURATION_DRAFT(
      customizedConfigurationData, hardwareConfigurationData)
      this.Saveloading = false
    },
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


.v-card-actions {
  top: 0px !important;
}


.v-card[data-v-8b415dba] {
    margin-top: 50px;
    overflow: initial;
    max-width: auto !important;
    margin-left: auto !important;
    margin-right: auto !important;
    background-color: #1e2139;
}

@media (min-width: 1280px){}
.v-col-lg-4 {
    flex: 0 0 33.3333333333%;
    max-width: auto !important;
}

.v-col-10 {
    flex: 0 0 83.3333333333%;
    max-width: auto !important;
}

.virtual-machine-wrap {
  
  flex: 1;
  position: relative;
  width: 100%;
  background-color: #141625;
  margin-left: auto;
  margin-right: auto;

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

.virtual-machine-wrap {
  left: 0px;
}

.v-card {
  overflow: initial;
  max-width: 10000px;
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
</style>
