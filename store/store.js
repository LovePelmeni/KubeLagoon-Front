import { createStore } from "vuex";
import * as vm from "../vm/vm.js"

export default createStore({
  state: {
    virtualMachineData: [],
    initializationModal: null,
    modalActive: null,
    virtualMachinesLoaded: null,
    currentVirtualMachineArray: null,
    updateVirtualMachine: null,
  },
  mutations: {

    TOGGLE_VIRTUAL_MACHINE(state) {
      state.initializationModal = !state.initializationModal;
    },

    TOGGLE_INITIALIZATION_MODAL(state) {
      state.modalActive = !state.modalActive;
    },

    SET_VIRTUAL_MACHINE_DATA(state, payload) {
      state.virtualMachineData.push(payload);
    },

    VIRTUAL_MACHINES_LOADED(state) {
      state.virtualMachineLoaded = true;
    },

    SET_CURRENT_VIRTUAL_MACHINE(state, payload) {
      state.currentVirtualMachineArray = state.virtualMachineData.filter((virtualMachine) => {
        return virtualMachine.VirtualMachineId === payload;
      });
    },

    TOGGLE_UPDATE_VIRTUAL_MACHINE(state) {
      state.updateVirtualMachine = !state.updateVirtualMachine;
    },


    SHOW_ERROR(ErrorMessage) {
      // Shows up Exception Banner
    },

    RUN_VIRTUAL_MACHINE(virtualMachineId) {
      // Runs Virtual Machine Server

    },

    SHUTDOWN_VIRTUAL_MACHINE(virtualMachineId) {
      // Shuts down the Virtual Machine  Server

    },

    INSERT_NEW_VIRTUAL_MACHINE(list, virtualMachine) {
      // Inserts new Virtual Machine Objecg  Inside the List
      list = list.push({

                    // General Information about the Customer's Virtual Machine

                    virtualMachineId: virtualMachine.VirtualMachineid,
                    virtualMachineName: virtualMachine.VirtualMachineName,
                    clientEmail: virtualMachine.OwnerEmail,

                    // SSH Credentials for the Virtual Machine
                    RootUsername: virtualMachine.Ssh.RootUsername,
                    RootPassword: virtualMachine.Ssh.RootPassword,
                    Secure: virtualMachine.Ssh.Secure,
                    RootCertificate: virtualMachine.RootCertificate,

                    // Creation Date Info
                    virtualMachineDateUnix: virtualMachine.CreatedAt.Unix(),
                    virtualMachineDate: virtualMachine.CreatedAt,

                    // Pay Terms + Setting up Current Date for the Payment
                    paymentTerms: virtualMachine.PaymentTerms,
                    paymentDueDateUnix: virtualMachine.paymentCreatedAt.Unix(),
                    paymentDueDate: virtualMachine.paymentCreatedAt,

                    // Information about the Customer Billing Account and where the Payments Is Going to be Addressed
                    billerStreetAddress: currentVirtualMachine.billerStreetAddress,
                    billerStreetCity: currentVirtualMachine.billerCity,
                    billerZipCode: currentVirtualMachine.billerZipCode,
                    billerCountry: currentVirtualMachine.billerCountry,

                    // Description
                    virtualMachineItemList: virtualMachine.VirtualMachineItemList,
                    TotalCost: doc.data().invoiceTotal,

                    Running: virtualMachine.Running,
                    Shutdown: virtualMachine.Shutdown,
                    Deploying: virtualMachine.Deploying,
      })
    },

    UPDATE_INSERT_VIRTUAL_MACHINE(list, virtualMachineId, virtualMachine) {

      oldVirtualMachine = list.filter((virtualMachine) => {
        return virtualMachine.VirtualMachineId === virtualMachineId;
      });

      if (oldVirtualMachine != null){
                    // General Information about the Customer's Virtual Machine

                    oldVirtualMachine.virtualMachineId: virtualMachine.VirtualMachineid,
                    oldVirtualMachine.virtualMachineName: virtualMachine.VirtualMachineName,
                    oldVirtualMachine.clientEmail: virtualMachine.OwnerEmail,

                    // SSH Credentials for the Virtual Machine
                    oldVirtualMachine.RootUsername: virtualMachine.Ssh.RootUsername,
                    oldVirtualMachine.RootPassword: virtualMachine.Ssh.RootPassword,
                    oldVirtualMachine.Secure: virtualMachine.Ssh.Secure,
                    oldVirtualMachine.RootCertificate: virtualMachine.RootCertificate,

                    // Creation Date Info
                    oldVirtualMachine.virtualMachineDateUnix: virtualMachine.CreatedAt.Unix(),
                    oldVirtualMachine.virtualMachineDate: virtualMachine.CreatedAt,

                    // Pay Terms + Setting up Current Date for the Payment
                    oldVirtualMachine.paymentTerms: virtualMachine.PaymentTerms,
                    oldVirtualMachine.paymentDueDateUnix: virtualMachine.paymentCreatedAt.Unix(),
                    oldVirtualMachine.paymentDueDate: virtualMachine.paymentCreatedAt,

                    // Information about the Customer Billing Account and where the Payments Is Going to be Addressed
                    oldVirtualMachine.billerStreetAddress: currentVirtualMachine.billerStreetAddress,
                    oldVirtualMachine.billerStreetCity: currentVirtualMachine.billerCity,
                    oldVirtualMachine.billerZipCode: currentVirtualMachine.billerZipCode,
                    oldVirtualMachine.billerCountry: currentVirtualMachine.billerCountry,

                    // Description
                    oldVirtualMachine.virtualMachineItemList: virtualMachine.VirtualMachineItemList,
                    oldVirtualMachine.TotalCost: doc.data().invoiceTotal,

                    oldVirtualMachine.Running: virtualMachine.Running,
                    oldVirtualMachine.Shutdown: virtualMachine.Shutdown,
                    oldVirtualMachine.Deploying: virtualMachine.Deploying,
    }},

    CREATE_VIRTUAL_MACHINE(state, payload) {
      // Creates New Virtual Machine Server

      // Initializing New Virtual Machine Manager
      let vmManager = new vm.VirtualMachineManager()

      // Initializing Hardware Configuration
      let hardwareConfiguration = new preparer.hardwareConfiguration()

      // Initializing Customized Configuration with the Resources, Custom OS, Preinstalled Tools etc...
      let customizedConfiguration = new preparer.customizedConfiguration()

      // Initializing Empty Virtual Machine Server Instance
      let initialized, initializationError = vmManager.InitializeVirtualMachine(hardwareConfiguration)

        if (initialized && initializionError == null) {
          // Applying Customized Configuration

          let appliedInfo, applyError = vmManager.ApplyConfiguration(customizedConfiguration)
          if (applyError != null) {

            let virtualMachine = vmManager.GetVirtualMachine(appliedInfo["VirtualMachineId"])
            this.INSERT_NEW_VIRTUAL_MACHINE(state.virtualMachineData, virtualMachine)

          }else{
            this.SHOW_ERROR("Failed to Apply Configuration")
            return;
          }

        }else{
          this.SHOW_ERROR("Failed to Initialize Virtual Machine")
          return;
        }
    },

    DELETE_VIRTUAL_MACHINE(state, payload, virtualMachineId) {
      // Deletes Virtual Machine Server
      let vmManager = new vm.VirtualMachineManager()
      let deleted, deletionError = vmManager.DeleteVirtualMachine()
      if (deleted && deletionError == null) {
        state.VirtualMachineData = state.VirtualMachineData.filter(
        (virtualMachineId) => virtualMachine.VirtualMachineId !== payload);
      }else {
        this.SHOW_ERROR("Failed to Delete Virtual Machine")
      }
    },

    UPDATE_VIRTUAL_MACHINE(state, payload, virtualMachineId) {
      // Updates Virtual Machine Server

      let vmManager = new vm.VirtualMachineManager()
      let hardwareConfiguration = new preparer.HardwareConfiguration()
      let customizedConfiguration = new preparer.CustomizedConfiguration()

      let updatedInfo, updateError = vmManager.UpdateVirtualMachine(virtualMachineId, hardwareConfiguration, customizedConfiguration)
      if (updateError == null) {
        let virtualMachine = vmManager.GetVirtualMachine(updatedInfo["VirtualMachineId"])

        this.INSERT_NEW_VIRTUAL_MACHINE(state.virtualMachineData, virtualMachine)
      }else{
        this.SHOW_ERROR("Failed To Update Virtual Machine")
      }
    },

    UPDATE_STATUS_TO_RUNNING(state, payload) {
      // Updates Visualized Status to Running
      state.invoiceData.forEach((invoice) => {
        if (virtualMachine.VirtualMachineId === payload) {
          virtualMachine.Running = true;
          virtualMachine.Shutdown = false;
          virtualMachine.Deploying = false;
        }
      });
    },

    UPDATE_STATUS_TO_SHUTDOWN(state, payload) {
      // Updates Visualized Status to Shutdown
      state.virtualMachineData.forEach((virtualMachine) => {
        if (virtualMachine.VirtualMachineId === payload) {
          virtualMachine.Deploying = false;
          virtualMachine.Running = false;
          virtualMachine.Shutdown = true;
        }
      });
    },

    UPDATE_STATUS_TO_DEPLOYING(state, payload) {
      // Updates Visualized Status to Deploying
      state.virtualMachineData.forEach((virtualMachine) => {
        if (virtualMachine.VirtualMachineId === payload) {
          virtualMachine.Running = false;
          virtualMachine.Deploying = true;
          virtualMachine.Shutdown = false;
        }
      });
    },
  },
  actions: {
    async GET_VIRTUAL_MACHINES({ commit, state }) {
      // Returns List of the Virtual Machine Servers, belongs To Customer

      let VirtualMachineManager = new vm.VirtualMachineManager()
      const results = VirtualMachineManager.GetVirtualMachines()

      results.forEach((virtualMachine) => {
        if (!state.VirtualMachineData.some((virtualMachine) => virtualMachine.VirtualMachineId === virtualMachine.id)) {
          const data = {

            // General Information about the Customer's Virtual Machine

            virtualMachineId: virtualMachine.VirtualMachineid,
            virtualMachineName: virtualMachine.VirtualMachineName,
            clientEmail: virtualMachine.OwnerEmail,

            // SSH Credentials for the Virtual Machine
            RootUsername: virtualMachine.Ssh.RootUsername,
            RootPassword: virtualMachine.Ssh.RootPassword,
            Secure: virtualMachine.Ssh.Secure,
            RootCertificate: virtualMachine.RootCertificate,

            // Creation Date Info
            virtualMachineDateUnix: virtualMachine.CreatedAt.Unix(),
            virtualMachineDate: virtualMachine.CreatedAt,

            // Pay Terms + Setting up Current Date for the Payment
            paymentTerms: virtualMachine.PaymentTerms,
            paymentDueDateUnix: virtualMachine.paymentCreatedAt.Unix(),
            paymentDueDate: virtualMachine.paymentCreatedAt,

            // Information about the Customer Billing Account and where the Payments Is Going to be Addressed
            billerStreetAddress: currentVirtualMachine.billerStreetAddress,
            billerStreetCity: currentVirtualMachine.billerCity,
            billerZipCode: currentVirtualMachine.billerZipCode,
            billerCountry: currentVirtualMachine.billerCountry,

            // Description
            virtualMachineItemList: virtualMachine.VirtualMachineItemList,
            TotalCost: doc.data().invoiceTotal,

            Running: virtualMachine.Running,
            Shutdown: virtualMachine.Shutdown,
            Deploying: virtualMachine.Deploying,
          };
          commit("SET_VIRTUAL_MACHINE_DATA", data);
        }
      });
      commit("VIRTUAL_MACHINES_LOADED");
    },

    TOGGLE_UPDATE_VIRTUAL_MACHINE_STATUS({ commit, dispatch }, { virtualMachineId, routeId }) {
      commit("DELETE_VIRTUAL_MACHINES", virtualMachineId);
      dispatch("GET_VIRTUAL_MACHINES");
      commit("TOGGLE_VIRTUAL_MACHINE");
      commit("TOGGLE_UPDATE_VIRTUAL_MACHINE");
      commit("SET_CURRENT_VIRTUAL_MACHINE", routeId);
    },

    TOGGLE_DELETE_VIRTUAL_MACHINE_STATUS({ commit }, docId) {
      // DELETING THE VIRTUAL MACHINE
      commit("DELETE_VIRTUAL_MACHINE", docId);
    },
  },
  modules: {},
});
