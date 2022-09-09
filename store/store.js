import * as vm from "../vm/vm.js"
import * as preparer from "../configuration_preparer/preparer.js"
import Vuex from "vuex";

export default new Vuex.Store({

  state: {
    virtualMachineData: [],
    initializationModal: null,
    modalActive: false,
    virtualMachinesLoaded: false,
    currentVirtualMachineArray: null,
    updateVirtualMachine: null,
    activeError: false,
    activeNotification: false,
    notifications: [],
    error: null,
  },

  mutations: {

    // Toggle Methods
    TOGGLE_INITIALIZATION_MODAL(state) {
      // Toggling Initialization Modal Window
      state.initializationModal = !state.initializationModal;
    },

    TOGGLE_MODAL(state) {
      // Toggling Modal Window
      state.modalActive = !state.modalActive;
    },

    TOGGLE_NOTIFICATION(state, notification) {
      // Toggling Notification Modal Window
      state.activeNotification = !state.activeNotification
      state.notifications.push({'message': notification.message, 'date': new Date().now()})
      new Promise(r => setTimeout(r, 5));
      // Hiding Notification Back
      this.TOGGLE_HIDE_NOTIFICATION(state, notification)
    },

    TOGGLE_HIDE_NOTIFICATION(state, notification) {
      // Hides the Notification
      state.activeNotification = false
      state.notifications = state.notifications.filter((notificationObj) => {
        return notificationObj.message !== notification
      })
    },

    TOGGLE_UPDATE_VIRTUAL_MACHINE(state) {
      // Toggling Update Virtual Machine Window
      state.updateVirtualMachine = !state.updateVirtualMachine;
    },

    TOGGLE_ERROR(state, newError) {
      // Toggling Error to show up

      // Showing up the error
      state.error = newError
      state.activeError = !state.activeError
      state.errors.push({'error': newError})
      new Promise(r => setTimeout(r, 5));
      this.TOGGLE_HIDE_ERROR(state, newError)
    },

    TOGGLE_HIDE_ERROR(state, error){
      // Toggling Error to Hide
      state.activeError = false
      state.error = state.error.filter((errorObj) => {
        return errorObj.error !== error
      })
    },

    // Virtual Machine Methods

    GET_VIRTUAL_MACHINE(VirtualMachineId) {
      // Returns A Virtual Machine Server Object Info
      let virtualMachineManager = new vm.VirtualMachineManager()
      let virtualMachine = virtualMachineManager.GetCustomerVirtualMachine(VirtualMachineId)
      return virtualMachine
    },

    GET_VIRTUAL_MACHINES(state) {
      // Returns List of the Virtual Machine Servers, belongs To Customer

      let VirtualMachineManager = new vm.VirtualMachineManager()
      let results, ResultError = VirtualMachineManager.GetVirtualMachines()
      if (ResultError != null) {this.TOGGLE_ERROR(ResultError)}

      for (let virtualMachine in results){
        if (!state.VirtualMachineData.some((virtualMachine) => virtualMachine.VirtualMachineId === virtualMachine.VirtualMachineId)) {
          const newVirtualMachine = {

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
            billerStreetAddress: virtualMachine.billerStreetAddress,
            billerStreetCity: virtualMachine.billerCity,
            billerZipCode: virtualMachine.billerZipCode,
            billerCountry: virtualMachine.billerCountry,

            // Description
            virtualMachineItemList: virtualMachine.VirtualMachineItemList,
            TotalCost: virtualMachine.TotalCost,

            Running: virtualMachine.Running,
            Shutdown: virtualMachine.Shutdown,
            Deploying: virtualMachine.Deploying,
          };
          this.INSERT_NEW_VIRTUAL_MACHINE(state.virtualMachineData, newVirtualMachine);
        }
      }
      this.VIRTUAL_MACHINES_LOADED(state);
    },

    CREATE_VIRTUAL_MACHINE(state, customizedConfiguration, hardwareConfiguration) {

      // Creates New Virtual Machine Server
      // Initializing New Virtual Machine Manager

      let vmManager = new vm.VirtualMachineManager()

      // Initializing Hardware Configuration
      let HardwareConfiguration = new preparer.hardwareConfiguration(hardwareConfiguration)

      // Initializing Customized Configuration with the Resources, Custom OS, Preinstalled Tools etc...
      let CustomizedConfiguration = new preparer.customizedConfiguration(customizedConfiguration)

      // Initializing Empty Virtual Machine Server Instance
      let initialized, initializationError = vmManager.InitializeVirtualMachine(HardwareConfiguration)
        if (initialized && initializationError == null) {
          // Applying Customized Configuration

          let appliedInfo, applyError = vmManager.ApplyConfiguration(CustomizedConfiguration)
          if (applyError != null && appliedInfo != null) {

            let virtualMachine = vmManager.GetVirtualMachine(appliedInfo["VirtualMachineId"])
            virtualMachine["Running"] = true
            virtualMachine["Shutdown"] = false
            virtualMachine["Deploying"] = false

            this.INSERT_NEW_VIRTUAL_MACHINE(state.VirtualMachineData, virtualMachine)
            return appliedInfo, applyError
          }else{
            this.TOGGLE_ERROR("Failed to Apply Configuration")
            return;
          }
        }else{
          this.TOGGLE_ERROR("Failed to Initialize Virtual Machine")
          return;
        }
    },

    DELETE_VIRTUAL_MACHINE(state, payload) {
      // Deletes Virtual Machine Server
      let vmManager = new vm.VirtualMachineManager()
      let deleted, deletionError = vmManager.DeleteVirtualMachine(payload["VirtualMachineId"])
      if (deleted && deletionError == null) {
        state.VirtualMachineData = state.VirtualMachineData.filter(
        (virtualMachine) => virtualMachine !== payload);
      }else {
        this.TOGGLE_ERROR("Failed to Delete Virtual Machine")
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
        this.TOGGLE_ERROR("Failed To Update Virtual Machine")
      }
    },

    SHUTDOWN_VIRTUAL_MACHINE(virtualMachineId) {
      // Shuts down the Virtual Machine  Server

      let vmManager = new vm.VirtualMachineManager()
      let Shutdown, ShutdownError = vmManager.ShutdownVirtualMachine(virtualMachineId)
      if (Shutdown != true || ShutdownError != null) {this.TOGGLE_ERROR(ShutdownError)}
    },

    START_VIRTUAL_MACHINE(virtualMachineId) {
      // Starting up the Virtual Machine

      let vmManager = new vm.VirtualMachineManager()
      let Started, StartError = vmManager.StartVirtualMachine(virtualMachineId)
      if (Started != true || StartError != null) {this.TOGGLE_ERROR(StartError)}
    },

    REBOOT_VIRTUAL_MACHINE(virtualMachineId) {
      // Reboots Virtual Machine

      let vmManager = new vm.VirtualMachineManager()
      let Rebooted, RebootError = vmManager.RebootVirtualMachine(virtualMachineId)
      if (Rebooted != true || RebootError != null ) {this.TOGGLE_ERROR(RebootError)}
    },


    // Store's State Management Methods


    SET_CURRENT_VIRTUAL_MACHINE(state, virtualMachineId) {
      state.currentVirtualMachineArray = state.virtualMachineData.filter((virtualMachine) => {
        return virtualMachine.VirtualMachineId === virtualMachineId;
      });
    },

    INSERT_NEW_VIRTUAL_MACHINE(list, virtualMachine) {
      // Inserts new Virtual Machine Objecg  Inside the List
      list.push({

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
                    billerStreetAddress: virtualMachine.billerStreetAddress,
                    billerStreetCity: virtualMachine.billerCity,
                    billerZipCode: virtualMachine.billerZipCode,
                    billerCountry: virtualMachine.billerCountry,

                    // Description
                    virtualMachineItemList: virtualMachine.VirtualMachineItemList,
                    TotalCost: virtualMachine.TotalCost,

                    Running: virtualMachine.Running,
                    Shutdown: virtualMachine.Shutdown,
                    Deploying: virtualMachine.Deploying,
      })
    },

    UPDATE_INSERT_VIRTUAL_MACHINE(list, virtualMachineId, UpdatedVirtualMachineData) {

      let oldVirtualMachine = list.filter((virtualMachine) => {
        return virtualMachine.VirtualMachineId === virtualMachineId;
      });

      if (oldVirtualMachine != null){
                    // General Information about the Customer's Virtual Machine

                    oldVirtualMachine.virtualMachineId =  UpdatedVirtualMachineData.VirtualMachineid,
                    oldVirtualMachine.virtualMachineName =  UpdatedVirtualMachineData.VirtualMachineName,
                    oldVirtualMachine.clientEmail = UpdatedVirtualMachineData.OwnerEmail,

                    // SSH Credentials for the Virtual Machine
                    oldVirtualMachine.RootUsername = UpdatedVirtualMachineData.Ssh.RootUsername
                    oldVirtualMachine.RootPassword = UpdatedVirtualMachineData.Ssh.RootPassword
                    oldVirtualMachine.Secure = UpdatedVirtualMachineData.Ssh.Secure
                    oldVirtualMachine.RootCertificate = UpdatedVirtualMachineData.RootCertificate

                    // Creation Date Info
                    oldVirtualMachine.virtualMachineDateUnix = UpdatedVirtualMachineData.CreatedAt.Unix()
                    oldVirtualMachine.virtualMachineDate = UpdatedVirtualMachineData.CreatedAt

                    // Pay Terms + Setting up Current Date for the Payment
                    oldVirtualMachine.paymentTerms = UpdatedVirtualMachineData.PaymentTerms
                    oldVirtualMachine.paymentDueDateUnix =  UpdatedVirtualMachineData.paymentCreatedAt.Unix()
                    oldVirtualMachine.paymentDueDate = UpdatedVirtualMachineData.paymentCreatedAt

                    // Information about the Customer Billing Account and where the Payments Is Going to be Addressed
                    oldVirtualMachine.billerStreetAddress = UpdatedVirtualMachineData.billerStreetAddress
                    oldVirtualMachine.billerStreetCity = UpdatedVirtualMachineData.billerCity
                    oldVirtualMachine.billerZipCode = UpdatedVirtualMachineData.billerZipCode
                    oldVirtualMachine.billerCountry = UpdatedVirtualMachineData.billerCountry

                    // Description
                    oldVirtualMachine.virtualMachineItemList = UpdatedVirtualMachineData.VirtualMachineItemList
                    oldVirtualMachine.TotalCost = UpdatedVirtualMachineData.TotalCost

                    oldVirtualMachine.Running = UpdatedVirtualMachineData.Running
                    oldVirtualMachine.Shutdown = UpdatedVirtualMachineData.Shutdown
                    oldVirtualMachine.Deploying = UpdatedVirtualMachineData.Deploying
    }},


    // Virtual Machine Status Methods

    UPDATE_STATUS_TO_RUNNING(state, payload) {
      // Updates Visualized Status to Running
      for (let virtualMachine in state.VirtualMachineData){
          if (virtualMachine.VirtualMachineId === payload) {
            virtualMachine.Running = true;
            virtualMachine.Shutdown = false;
            virtualMachine.Deploying = false;
          }
      }
    },

    UPDATE_STATUS_TO_SHUTDOWN(state, payload) {
      // Updates Visualized Status to Shutdown
      for (let virtualMachine in state.virtualMachineData){
          if (virtualMachine.VirtualMachineId === payload) {
            virtualMachine.Deploying = false;
            virtualMachine.Running = false;
            virtualMachine.Shutdown = true;
          }
      }
    },

    UPDATE_STATUS_TO_DEPLOYING(state, payload) {
      // Updates Visualized Status to Deploying
      for (let virtualMachine in state.virtualMachineData){
        if (virtualMachine.VirtualMachineId === payload) {
          virtualMachine.Running = false;
          virtualMachine.Deploying = true;
          virtualMachine.Shutdown = false;
        }
      }
    },

    VIRTUAL_MACHINES_LOADED(state) {
      state.virtualMachineLoaded = true;
    },
  },
  modules: {},
});
