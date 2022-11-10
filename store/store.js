import * as vm from "../vm/vm.js";
import * as preparer from "../configuration_preparer/preparer.js";
import Vuex from "vuex";
import { useCookies } from "vue3-cookies";

export default new Vuex.Store({

  state: {

    PaymentSucceeded: false, // 
    PaymentFailed: false, //  
    selectedPaymentOption: {
      PaymentMethodId: "",
      PaymentMethodType: "",
      PaymentMethodName: "",
    },
    Bill: {
      // Bill Information about the Current Resource Usage 
      Metadata: {
        Servers: [
        {
          ServerName: "VirtualMachine-3",
          ServerType: "VirtualMachine",
          TotalUsageCost: 1000,
          currency: "usd",
        },
        {
          ServerName: "VirtualMachine-4",
          ServerType: "VirtualMachine",
          TotalUsageCost: 2000,
          currency: "usd",
        },
        {
          ServerName: "VirtualMachine-5",
          ServerType: "VirtualMachine",
          TotalUsageCost: 3000,
          currency: "usd",
        }
      ],
      }
    },

    // Banner Window States 
    ErrorBannerWindowClosed: false,

    // Virtual Server Connection Instructions Page Error's

    DownloadFailed: false, 
    RegenerationFailed: false, 

    RegenerationError: null, 
    DownloadError: null,

    customer: {
      "Username": "John Pandey",
      "Email": "some_email@gmail.com",
      "Password": "some_password",
      "Country": "Canada",
      "City": "Toronto",
      "Street": "National Street, 6",
      "ZipCode": "125189",
    },
    paymentSubscriptions: [ // Suggestion Subscription Offers  
      {
        "id": "1",
        "Reference": "basicTier",
        "BannerName": "Basic Tier",
        "BannerDescription": "For non-commercial and small projects",

        "BannerOptions": [
        '20-full CPUs', // Provides 
        '1500GB Storage Disk',
        '20GB MAX RAM Daily Usage',
        'Personal Dedicated Support Channel'],

        "BannerPrice": "5",
        "Configuration": {

              "paymentConfiguration": {
                  "paymentTerms": 30,
                  "paymentDueDate": "10 Dec, 2021",
              },

              //  Resource Configuration of the Virtual Server 
              "resourceConfiguration": {

                  "CpuNum": 100, 
                  "MaxCpu": 100, 

                  "Memory": 100, 
                  "MaxMemory": 100,

                  "StorageCapacity": 200, 
                  "MaxStorageCapacity": 1000,

              },
              // Hardware Configuration of the Virtual Server 
              "hardwareConfiguration": {
                  "Datacenter": "US/Washington", 
                  "OperationalSystem": "Ubuntu 9", 
                  "PreInstalledTools": ["Docker", "Kubernetes"],
              },
              // SSH Configuration of the Virtual Server 
              "sshConfiguration": {

                  "useRootCertificate": true, 
                  "useRootCredentials": false,

              },
          }
      },
      {
        "id": "2",
        "Reference": "middleTier",
        "BannerName": "Middle Tier",
        "BannerDescription": "for commercial or average projects",
        "BannerOptions": [
          '20-full CPUs', // Provides 
          '1500GB Storage Disk',
          '20GB MAX RAM Daily Usage',
          'Personal Dedicated Support Channel'
        ],
        "BannerPrice": "5",
        "Configuration": {}
      },
      {
        "id": "3",
        "Reference": "advancedTier",
        "BannerName": "Advanced Tier",
        "BannerDescription": "for commercial and huge projects",
        "BannerOptions": [
          '20-full CPUs', // Provides 
          '1500GB Storage Disk',
          '20GB MAX RAM Daily Usage',
          'Personal Dedicated Support Channel'
        ],
        "BannerPrice": "5",
        "Configuration": {}
      },
    ],
    showCustomerProfile: false,
    virtualMachineSavedDraft: {
      // Hardware Configuration goes there...

      "AddedDatacenter": "US/Washington", // empty string with the datacenter name 
      "AddedOperationalSystem": "Ubuntu",  // empty string with the OS system name in the specific format 
      "AddedPreInstalledTools": [],  // array of the names of the tools, going to be preinstalled on the customer's virtual server

      // Resource Configuration goes there...
      "CpuNum": 100,
      "MaxCpu": 100,
      "Memory": 100,

      "MaxMemory": 1000,
      "StorageCapacity": 1000,
      "MaxStorageCapacity": 1000,
      
      "useRootCredentials": true,
      "useRootCertificate": false,
    },
    logout: false,
    loading: false,
    authenticated: true,
    virtualMachineData: [
      {
        "VirtualMachineId": "1567",
        "VirtualMachineName": "Virtual Machine",
        "Running": true, 
        "Deploying": false, 
        "Shutdown": false, 
        "paid": true,
        "paymentDueDate": "2020-20-02", 
        "paymentTerms": 30, 
        "CreatedAt": "1/2/2020",
        "hardware": {
          "Datacenter": "US/Washington",
          "OperationalSystem": "Ubuntu",
          "PreInstalledTools": ["Kubernetes", "Docker"],
        },
        "Ssh": {
          "byRootCredentials": false,
          "byRootCertificate": true,
          "RootUsername": "root",
          "RootPassword": "root_password",
          "IpAddress": "127.235.11.28", // IP Address of the Virtual Machine Server 
        },
        "Owner": {
          "Username": "some-user",
          "Email": "email@gmail.com",
          "City": "Vancouver",
          "Country": "Canada",
          "Street": "Smith's Street, 4",
          "ZipCode": "125167",
        },
        "Capacities": { // Capacities, specified by the Customer 
          "MaxMemory": 1000,
          "MaxCpuNum": 1000,
          "MaxStorageCapacity": 1000,
        },
        "Resources": { // Used Resources by the Virtual Machine Server by now
          "CpuNum": 10,
          "Memory": 100,
          "StorageCapacity": 100,
        },
        "paymentConfiguration": {
          "paymentTerms": "60",
          "paymentDueDate": "05.07.2021",
        }
      },
      {
        "VirtualMachineId": "12578392923",
        "VirtualMachineName": "Server-Vm",
        "Running": false, 
        "Deploying": true, 
        "Shutdown": false, 
        "paid": false,
        "paymentDueDate": "2020-20-02", 
        "paymentTerms": 60,
        "CreatedAt": "1/2/2019",

        "Owner": {
          "Username": "johnMa",
          "Email": "john@gmail.com",
          "City": "Toronto",
          "Country": "Canada",
          "Street": "Smith's Street, 4",
          "ZipCode": "125167",
        },
        "hardware": {
          "Datacenter": "US/Washington",
          "OperationalSystem": "Ubuntu",
          "PreInstalledTools": [],
        },
        "Ssh": {
          "byRootCredentials": true,
          "byRootCertificate": false,
          "IpAddress": "127.235.11.28",
          "RootUsername": "root",
          "RootPassword": "root_password",
        },
        "Capacities": { // Capacities, specified by the Customer 
          "MaxMemory": 1000,
          "MaxCpuNum": 1000,
          "MaxStorageCapacity": 1000,
        },
        "Resources": {
          "CpuNum": 100,
          "Memory": 1000,
          "StorageCapacity": 100,
        },
        "paymentConfiguration": {
          "paymentDueDate": "03.02.2021",
          "paymentTerms": "30"
        }
      },
      {
        "VirtualMachineId": "1256632234",
        "VirtualMachineName": "Virtual Machine",
        "Running": true, 
        "Deploying": false, 
        "Shutdown": false, 
        "paid": false,
        "paymentDueDate": "2020-20-02", 
        "paymentTerms": 60, 
        "CreatedAt": "1/2/2020",
        "Owner": {
          "Username": "some-user",
          "Email": "email@gmail.com",
          "Country": "Canada",
          "City": "Vancouver",
          "Street": "Smith's Street, 4",
          "ZipCode": "125167",
        },
        "hardware": {
          "Datacenter": "US/Washington",
          "OperationalSystem": "Ubuntu",
          "PreInstalledTools": [],
        },
        "Ssh": {
          "byRootCredentials": false,
          "byRootCertificate": true,
          "IpAddress": "127.235.11.28",
          "RootUsername": "root",
          "RootPassword": "root_password",
        },
        "Capacities": { // Capacities, specified by the Customer 
          "MaxMemory": 1000,
          "MaxCpuNum": 1000,
          "MaxStorageCapacity": 1000,
        },
        "Resources": {
          "CpuNum": 10,
          "Memory": 100,
          "StorageCapacity": 100,
        },
        "paymentConfiguration": {
          "paymentDueDate": "04.03.2021",
          "paymentTerms": "30"
        }
      },
      {
        "VirtualMachineId": "124356732412",
        "VirtualMachineName": "Virtual Machine Server",
        "Running": false, 
        "Deploying": true, 
        "Shutdown": false, 
        "paid": true,
        "paymentDueDate": "2020-20-02",
        "paymentTerms": 30,
        "CreatedAt": "1/2/2021",
        
        "Ssh": {
          "byRootCredentials": true,
          "byRootCertificate": false,
          "IpAddress": "127.235.11.28",
          "RootUsername": "root",
          "RootPassword": "root_password",
        },

        "hardware": {
          "Datacenter": "US/Washington",
          "OperationalSystem": "Ubuntu",
          "PreInstalledTools": [],
        },

        "Owner": {
          "Username": "some-user",
          "Email": "email@gmail.com",
          "Country": "Canada",
          "City": "Toronto",
          "Street": "Smith's Street, 4",
          "ZipCode": "125167",
        },

        "Capacities": { // Capacities, specified by the Customer 
          "MaxMemory": 1000,
          "MaxCpuNum": 1000,
          "MaxStorageCapacity": 1000,
        },

        "Resources": {
          "CpuNum": 5,
          "Memory": 100,
          "StorageCapacity": 100,
        },

        "paymentConfiguration": {
          "paymentDueDate": "01.03.2020",
          "paymentTerms": "30"
        }
      },
      {
        "VirtualMachineId": "12566323255231",
        "VirtualMachineName": "Virtual Machine",
        "Running": true, 
        "Deploying": false, 
        "Shutdown": false, 
        "paid": false,
        "paymentDueDate": "2020-20-02",     
        "paymentTerms": 30,
        "CreatedAt": "1/2/2020",
        "Owner": {
          "Username": "some-user",
          "Email": "email@gmail.com",
          "Country": "Canada",
          "City": "Vancouver",
          "Street": "Smith's Street, 4",
          "ZipCode": "125167",
        },
        "hardware": {
          "Datacenter": "US/Washington",
          "OperationalSystem": "Ubuntu",
          "PreInstalledTools": [],
        },
        "Ssh": {
          "byRootCredentials": false,
          "byRootCertificate": true,
          "IpAddress": "127.235.11.28",
          "RootUsername": "root",
          "RootPassword": "root_password",
        },
        "Capacities": { // Capacities, specified by the Customer 
          "MaxMemory": 1000,
          "MaxCpuNum": 1000,
          "MaxStorageCapacity": 1000,
        },
        "Resources": {
          "CpuNum": 10,
          "Memory": 100,
          "StorageCapacity": 100,
        },
        "paymentConfiguration": {
          "paymentDueDate": "01-02-2020",
          "paymentTerms": "30"
        }
      },
      {
        "VirtualMachineId": "124423223512346",
        "VirtualMachineName": "Third Server",
        "Running": false, 
        "Deploying": false, 
        "Shutdown": true, 
        "paid": false,
        "paymentDueDate": "2020-20-02",
        "paymentTerms": 30,
        "CreatedAt": "10/5/2021",

        "Ssh": {
          "byRootCredentials": true,
          "byRootCertificate": false,
          "IpAddress": "127.235.11.28",
          "RootUsername": null, // Root Username for the Virtual Server 
          "RootPassword": null, // Root Password for the Virtual Server 
        },

        "Owner": {
          "Username": "some-user",
          "Email": "email@gmail.com",
          "Country": "Canada",
          "City": "Toronto",
          "Street": "Smith's Street, 4",
          "ZipCode": "125167",
        },

        "hardware": {
          "Datacenter": "US/Washington",
          "OperationalSystem": "Ubuntu",
          "PreInstalledTools": [],
        },

        "Capacities": { // Capacities, specified by the Customer 
          "MaxMemory": 1000,
          "MaxCpuNum": 1000,
          "MaxStorageCapacity": 1000,
        },

        "Resources": {
          "CpuNum": 5,
          "Memory": 10,
          "StorageCapacity": 1000,
        },
        "paymentConfiguration": {
          "paymentDueDate": "2020-01-01",
          "paymentTerms": "30"
        }
      }
    ],
    initializationModal: null,
    modalActive: false,
    virtualMachinesLoaded: true,
    currentVirtualMachineArray: null,
    updateVirtualMachine: null,
    activeError: false,
    activeNotification: false,
    notifications: [],
    error: null,
  },

  mutations: {

    // Handles Customer's Statuses

    GET_CURRENT_PAYMENT_OPTION(state) {
      // Returns the Current Payment Available Option 
      return state.selectedPaymentOption
    },

    SELECT_PAYMENT_METHOD(state, paymentMethodObject) {
      // Selecting the Payment Method Object 
      state.selectedPaymentOption = {
        "PaymentMethodName": paymentMethodObject.PaymentMethodName,
        "PaymentMethodType": paymentMethodObject.PaymentMethodType,
        "PaymentMethodId": paymentMethodObject.PaymentMethodId,
      }
    },
    
    UNSELECT_PAYMENT_METHOD(state) {
      // Unselecting the Payment Method Object Option 
      state.selectedPaymentOption = {
        "PaymentMethodName": "",
        "PaymentMethodType": "",
        "PaymentMethodId": "",
      };
    },

    TOGGLE_PAYMENT_FAILED(state) {
      // Marking Payment as Failed 
      state.PaymentFailed = !state.PaymentFailed 
    },
 
    TOGGLE_PAYMENT_STATUS_UNPAID(state) {
      // Marks Payment Status as Paid
      state.PaymentSucceeded = false
    },
    
    TOGGLE_PAYMENT_STATUS_PAID(state) {
      // Marks Payment Status As Unpaid
      state.PaymentSucceeded = true
    },

    SET_BILL_VALUES(state, bill) {
      state.Bill = bill
    },

    SAVE_PAYMENT_INTENT_CHECKOUT(state, checkoutData) {
      // Saving the Payment Intent Checkout
      state.checkoutData = checkoutData
    },

    TOGGLE_FAILED_DOWNLOAD_CERTIFICATE_ERROR(state, DownloadError) {
      state.DownloadError = DownloadError
      state.DownloadFailed = true
    },

    CLOSE_FAILED_DOWNLOAD_CERTIFICATE_ERROR(state) {
      state.DownloadError = null 
      state.DownloadFailed = false
    },


    TOGGLE_FAILED_REGENERATE_CERTIFICATE_ERROR(state, RegenerationError) {
      state.RegenerationError = RegenerationError
      state.RegenerationFailed = true
    },

    CLOSE_FAILED_REGENERATE_CERTIFICATE_ERROR(state) {
      state.RegenerationError = null
      state.RegenerationFailed = false
    },

    TOGGLE_UPDATE_VIRTUAL_SERVER_CONFIGURATION(state, VirtualMachineId, NewConfiguration) {
      let VirtualServer = state.virtualMachineData.filter((VirtualMachine) => {
        return VirtualMachine.id === VirtualMachineId
      }) || {}
      VirtualServer.Configuration = NewConfiguration
    },

    TOGGLE_ACTIVATE_ERROR_BANNER_WINDOW(state) {
        // Activates the Error Banner Window 
        state.ErrorBannerWindowClosed = true
    },

    TOGGLE_DISACTIVATE_ERROR_BANNER_WINDOW(state) {
        // Disactivates Error Banner Window 
        state.ErrorBannerWindowClosed = false 
    },

    TOGGLE_EDIT_CUSTOMER_AT_STORE(state, NewData) {
      // Updates the Customer Profile at Store
      state.customer = NewData
    },

    TOGGLE_SHOW_CUSTOMER_PROFILE(state) {
      // Triggers event to show the Customer's Profile
      state.showCustomerProfile = true
    },

    TOGGLE_HIDE_CUSTOMER_PROFILE(state) {
      // Triggers event to hide the Customer's Profile
      state.showCustomerProfile = false
    },

    GET_AUTHENTICATION_STATUS() {
      // Returns the Registered Status for the Customer 
      let CookiesModule = useCookies() 
      let Token = CookiesModule.cookies.get("jwt-token") 
      if (Token == null || String(Token).length == 0) {
        return false
      }else{return true}
    },

    TOGGLE_AUTHENTICATED(state) {
      // Changes the status of the Customer to the Authenticated
      state.authenticated = true
    },

    TOGGLE_NOT_AUTHENTICATED(state) {
      // Changes status of the Customer to not Authenticated 
      state.authenticated = false
    },

    // Toggle Methods
    TOGGLE_INITIALIZATION_MODAL(state) {
      // Toggling Initialization Modal Window
      state.initializationModal = !state.initializationModal;
    },

    TOGGLE_LOGOUT_MODAL(state) {
      // Changing state to the logged out, in order to trigger approval logout window
      state.logout = true;
    },

    TOGGLE_HIDE_LOGOUT_MODAL(state) {
      state.logout = false
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
      this.commit('TOGGLE_HIDE_NOTIFICATION', state, notification)
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

    TOGGLE_HIDE_ERROR(state){
      // Toggling Error to Hide
      state.activeError = false
    },

    TOGGLE_ERROR(state, newError) {
      // Toggling Error to show up

      // Showing up the error

      state.error = newError
      state.activeError = !state.activeError
      new Promise(r => setTimeout(r, 5));
      this.commit("TOGGLE_HIDE_ERROR", state, newError)
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


    SAVE_VIRTUAL_MACHINE_CONFIGURATION_DRAFT(state, customizedConfiguration, hardwareConfiguration) {
      // Saves the Configuration Object 
      state.virtualMachineSavedDraft = {
        // Hardware Configuration goes there...

        "AddedDatacenter": hardwareConfiguration["Datacenter"],
        "AddedOperationalSystem": hardwareConfiguration["OperationalSystem"], 
        "AddedPreInstalledTools": hardwareConfiguration["PreInstalledTools"], 

        // Resource Configuration goes there...
        "CpuNum": customizedConfiguration["CpuNum"],
        "MaxCpu": customizedConfiguration["MaxCpu"],
        "Memory": customizedConfiguration["Memory"],

        "MaxMemory": customizedConfiguration["MaxMemory"],
        "StorageCapacity": customizedConfiguration["StorageCapacity"],
        "MaxStorageCapacity": customizedConfiguration["MaxStorageCapacity"],

        "useRootCredentials": customizedConfiguration["useRootCredentials"],
        "useRootCertificate": customizedConfiguration["useRootCertificate"],
      }
    },


    // Virtual Machine Status Methods

    UPDATE_STATUS_TO_RUNNING(state, payload) {
      // Updates Visualized Status to Running
      for (let virtualMachine in state.virtualMachineData){
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
      // Turns that the Virtual Machine Servers Objects has been Successfully Obtained 
      state.virtualMachinesLoaded = true
    },
  },  

  // Action Methods
  actions: {

    GET_VIRTUAL_MACHINE(JwtToken, VirtualMachineId) {
      // Returns A Virtual Machine Server Object Info
      let virtualMachineManager = new vm.VirtualMachineManager()
      let virtualMachine, virtualMachineError = virtualMachineManager.GetCustomerVirtualMachine(JwtToken, VirtualMachineId)
      return virtualMachine, virtualMachineError
    },

    GET_VIRTUAL_MACHINES({commit, state}, JwtToken) {
      // Returns List of the Virtual Machine Servers, belongs To Customer

      let VirtualMachineManager = new vm.VirtualMachineManager()
      let results, ResultError = VirtualMachineManager.GetCustomerVirtualMachines(JwtToken)
      if (ResultError != null) {commit("TOGGLE_ERROR", state, ResultError)}

      for (let virtualMachine in results){
        if (!state.virtualMachineData.some((virtualMachine) => virtualMachine.VirtualMachineId === virtualMachine.VirtualMachineId)) {
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
          commit('INSERT_NEW_VIRTUAL_MACHINE', state.virtualMachineData, newVirtualMachine);
        }
      }
      commit('VIRTUAL_MACHINES_LOADED', state)
    },

    CREATE_VIRTUAL_MACHINE({commit, state}, JwtToken, customizedConfiguration, hardwareConfiguration) {

      // Creates New Virtual Machine Server
      // Initializing New Virtual Machine Manager

      let vmManager = new vm.VirtualMachineManager()

      // Initializing Hardware Configuration
      let HardwareConfiguration = new preparer.HardwareConfiguration(
        hardwareConfiguration["Datacenter"],
        hardwareConfiguration["OperationalSystem"],
        hardwareConfiguration["Tools"],
      )

      // Initializing Customized Configuration with the Resources, Custom OS, Preinstalled Tools etc...
      let CustomizedConfiguration = new preparer.CustomConfiguration(
          customizedConfiguration["Metadata"], customizedConfiguration["Resource"],
          customizedConfiguration["HostSystem"], customizedConfiguration["Ssl"], customizedConfiguration["Tools"]
      )

      // Initializing Empty Virtual Machine Server Instance
      let initialized, initializationErrorCode = vmManager.InitializeVirtualMachine(JwtToken, HardwareConfiguration)
        if (initialized && initializationErrorCode == null) {
          // Applying Customized Configuration

          let appliedInfo, applyErrorCode = vmManager.ApplyVirtualMachineConfiguration(JwtToken, CustomizedConfiguration, initialized["VirtualMachineId"])
          if (applyErrorCode === null && appliedInfo !== null) {

            let virtualMachine = vmManager.GetVirtualMachine(JwtToken, appliedInfo["VirtualMachineId"])
            virtualMachine["Running"] = true
            virtualMachine["Shutdown"] = false
            virtualMachine["Deploying"] = false

            commit('INSERT_NEW_VIRTUAL_MACHINE', state.VirtualMachineData, virtualMachine)
            return appliedInfo, applyErrorCode
          }else{
            commit('TOGGLE_ERROR', "Failed to Apply Configuration")
            if (String(applyErrorCode) === "300") {return null, 300} // Error Code, that is being returned, once the Customer did not paid for the Previous Usage Session
            if (String(applyErrorCode) === "400") {return null, 400} // Error Code, that is being returned, because of the invalid configuration parameters / invalid data
            if (String(applyErrorCode) === "500") {return null, 500} // Error Code, that is being returned, once there is some unknown error has occurred
          }
        }else{
          commit('TOGGLE_ERROR', "Failed to Initialize Virtual Machine")
          if (String(initializationErrorCode) === "300") {return null, 300} // Bill Required Error
          if (String(initializationErrorCode) === "400") {return null, 400} // Invalid Configuration
          if (String(initializationErrorCode) === "500") {return null, 500} // Server Error
        }
    },

    DELETE_VIRTUAL_MACHINE({state}, JwtToken, VirtualMachineId) {
      // Deletes Virtual Machine Server
      let vmManager = new vm.VirtualMachineManager()
      let deleted, deletionError = vmManager.DestroyVirtualMachine(JwtToken, VirtualMachineId)
      if (deleted && deletionError == null) {
        state.VirtualMachineData = state.VirtualMachineData.filter(
        (virtualMachine) => virtualMachine.VirtualMachineId !== VirtualMachineId);
        return deleted, deletionError
      }else {
        return deleted, deletionError
      }
    },

    UPDATE_VIRTUAL_MACHINE({commit, state}, hardwareConfiguration, customizedConfiguration, JwtToken, VirtualMachineId) {
      // Updates Virtual Machine Server

      let vmManager = new vm.VirtualMachineManager()

      // Initializing Hardware Configuration
      let HardwareConfiguration = new preparer.HardwareConfiguration(
          hardwareConfiguration["Datacenter"],
          hardwareConfiguration["OperationalSystem"],
          hardwareConfiguration["Tools"],
      )
      
      // Initializing Customized Configuration with the Resources, Custom OS, Preinstalled Tools etc...
      let CustomizedConfiguration = new preparer.CustomConfiguration(
          customizedConfiguration["Metadata"], customizedConfiguration["Resource"],
          customizedConfiguration["HostSystem"], customizedConfiguration["Ssl"], customizedConfiguration["Tools"]
      )

      let updatedInfo, updateError = vmManager.UpdateVirtualMachine(JwtToken, VirtualMachineId, HardwareConfiguration, CustomizedConfiguration)
      if (updateError == null) {

        let virtualMachine = vmManager.GetVirtualMachine(JwtToken, updatedInfo["VirtualMachineId"])
        commit('INSERT_NEW_VIRTUAL_MACHINE', state.virtualMachineData, virtualMachine)
        return true, updateError
      }else{
        return false, updateError
      }
    },

    SHUTDOWN_VIRTUAL_MACHINE(JwtToken, virtualMachineId) {
      // Shuts down the Virtual Machine  Server

      let vmManager = new vm.VirtualMachineManager()
      let Shutdown, ShutdownError = vmManager.ShutdownVirtualMachine(JwtToken, virtualMachineId)
      return Shutdown, ShutdownError
    },

    START_VIRTUAL_MACHINE(JwtToken, VirtualMachineId) {
      // Starting up the Virtual Machine

      let vmManager = new vm.VirtualMachineManager()
      let Started, StartError = vmManager.StartVirtualMachine(JwtToken, VirtualMachineId)
      return Started, StartError
    },

    REBOOT_VIRTUAL_MACHINE(JwtToken, VirtualMachineId) {
      // Reboots Virtual Machine

      let vmManager = new vm.VirtualMachineManager()
      let Rebooted, RebootError = vmManager.RebootVirtualMachine(JwtToken, VirtualMachineId)
      return Rebooted, RebootError
    },
  },
  modules: {},
});
