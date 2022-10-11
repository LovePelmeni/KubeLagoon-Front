<script>
// Edit Page for the Virtual Machine Server 

import InitializationModal from './InitializationModal.vue';
import { mapState } from "vuex";
import VirtualServerNotFoundWindow from "../components/VirtualServerNotFoundWindow.vue";
import ForbiddenWindow from "../components/ForbiddenWindow.vue";
import NotAuthenticatedWindow from "../components/NotAuthenticatedWindow.vue";

export default {
    name: "EditInitializationModalPage",
    components: {
        InitializationModal,
        VirtualServerNotFoundWindow,
        ForbiddenWindow,
        NotAuthenticatedWindow
    },
    data() {
        return {
            VirtualMachine: {
                "hardware": {},
                "Capacities": {},
                "Resources": {},
                "Ssh": {},
            },
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
    mounted() {
        this.GetVirtualMachineServerInfo(this.$route.params.VirtualMachineId)
    },
    methods: {

        GetVirtualMachineServerInfo(VirtualMachineId) {
            // Returns data about the Virtual Machine Server 
            let VirtualMachine = this.$store.state.virtualMachineData.filter((VirtualMachine) => {
                return VirtualMachine.VirtualMachineId === VirtualMachineId;
            }) || {}
            this.VirtualMachine = VirtualMachine[0] || {"hardware": {}, "Capacities": {}, "Resources": {}, "Ssh": {}};
            if (Object.keys(this.VirtualMachine).length === 0) {this.ServerNotFound = true}
        },

        GetVirtualMachineServerConfiguration() {
            // Preparing Virtual Machine Server Configuration 

            let VirtualMachineConfiguration = {
                
                "resourceConfiguration": {

                    "CpuNum": this.VirtualMachine["Resources"]["CpuNum"], 
                    "MaxCpu": this.VirtualMachine.Capacities["MaxCpuNum"], 

                    "Memory": this.VirtualMachine["Resources"]["Memory"], 
                    "MaxMemory": this.VirtualMachine["Capacities"]["MaxMemory"],

                    "StorageCapacity": this.VirtualMachine["Resources"]["StorageCapacity"], 
                    "MaxStorageCapacity": this.VirtualMachine["Capacities"]["MaxStorageCapacity"],

                },
                "hardwareConfiguration": {

                    "AddedDatacenter": this.VirtualMachine["hardware"]["Datacenter"], 
                    "AddedOperationalSystem": this.VirtualMachine["hardware"]["OperationalSystem"], 
                    "PreInstalledTools": this.VirtualMachine["hardware"]["PreInstalledTools"],

                },
                "sshConfiguration": {

                    "useRootCertificate": this.VirtualMachine["Ssh"]["byRootCertificate"], 
                    "useRootCredentials": this.VirtualMachine["Ssh"]["byRootCredentials"],

                },
            }
            console.log(VirtualMachineConfiguration)
            return VirtualMachineConfiguration
        }
    },
}
</script>
