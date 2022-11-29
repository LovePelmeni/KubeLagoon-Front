<script>
// Edit Page for the Virtual Machine Server 

import InitializationModal from './InitializationModal.vue';
import { mapState } from "vuex";
import VirtualServerNotFoundWindow from "../components/VirtualServerNotFoundWindow.vue";
import ForbiddenWindow from "../components/ForbiddenWindow.vue";
import NotAuthenticatedWindow from "../components/NotAuthenticatedWindow.vue";

export default {
    // Component of the Edit Virtual Machine Page 
    name: "EditInitializationModalPage",
    components: {
        InitializationModal,
        VirtualServerNotFoundWindow,
        ForbiddenWindow,
        NotAuthenticatedWindow
    },
    data() {
        return {
            ServerNotFound: false,
            HasPermissions: true,
        }
    },
    template: `
        <div class="editVirtualMachinePage" v-if='ServerNotFound === false && Authenticated === true && HasPermissions === true'>
        <initialization-modal :updateVirtualMachine="true" :VirtualMachine="GetVirtualMachineServerConfiguration()" />
        </div>

        <div v-else-if="Authenticated === false"> 
            <not-authenticated-window />
        </div>

        <div v-else-if="HasPermissions === false"> 
            <forbidden-window />
        </div>

        <div v-else-if="ServerDoesExist === false"> 
            <virtual-server-not-found-window />
        </div>
    `,
    computed: {
        ...mapState(["virtualMachineData"]),
        Authenticated() {
            return this.$store.state.authenticated
        }
    },
    methods: {
        // All of the Methods Goes There
        GetVirtualMachineServerInfo(VirtualMachineId) {
            // Returns data about the Virtual Machine Server 
            let VirtualMachineServer = this.$store.state.virtualMachineData.filter((VirtualMachine) => {
                return VirtualMachine.VirtualMachineId === VirtualMachineId;
            }) || {}
            let VirtualMachine = VirtualMachineServer[0] || {"hardware": {}, "Capacities": {}, "Resources": {}, "Ssh": {}};
            if (Object.keys(VirtualMachine).length === 0) {this.ServerNotFound = true}
            return VirtualMachine
        },

        GetVirtualMachineServerConfiguration() {
            // Preparing Virtual Machine Server Configuration 

            let VirtualMachine = this.GetVirtualMachineServerInfo(this.$route.params.VirtualMachineId)
            let VirtualMachineConfiguration = {

                // Payment Configuration Info of the Virtual Server 

                "paymentConfiguration": {
                    "paymentTerms": VirtualMachine["paymentTerms"],
                    "paymentDueDate": VirtualMachine["paymentDueDate"],
                },

                //  Resource Configuration of the Virtual Server 
                "resourceConfiguration": {

                    "CpuNum": VirtualMachine["Resources"]["CpuNum"], 
                    "MaxCpu": VirtualMachine.Capacities["MaxCpuNum"], 

                    "Memory": VirtualMachine["Resources"]["Memory"], 
                    "MaxMemory": VirtualMachine["Capacities"]["MaxMemory"],

                    "StorageCapacity": VirtualMachine["Resources"]["StorageCapacity"], 
                    "MaxStorageCapacity": VirtualMachine["Capacities"]["MaxStorageCapacity"],

                },
                // Hardware Configuration of the Virtual Server 
                "hardwareConfiguration": {

                    "Datacenter": VirtualMachine["hardware"]["Datacenter"], 
                    "OperationalSystem": VirtualMachine["hardware"]["OperationalSystem"], 
                    "PreInstalledTools": VirtualMachine["hardware"]["PreInstalledTools"],

                },
                // SSH Configuration of the Virtual Server 
                "sshConfiguration": {

                    "useRootCertificate": VirtualMachine["Ssh"]["byRootCertificate"], 
                    "useRootCredentials": VirtualMachine["Ssh"]["byRootCredentials"],

                },
            }
            return VirtualMachineConfiguration
        }
    },
}
</script>
