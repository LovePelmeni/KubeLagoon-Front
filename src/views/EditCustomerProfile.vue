<script>
import EditCustomerProfileComponent from "../components/EditCustomerProfileComponent.vue";
import { mapState } from "vuex";

export default {
    name: "EditCustomerProfile",
    data() {
        return {
            customerProfile: {}
        }
    },
    mounted() {
        this.GetCustomerProfile()
    },
    components: {
        EditCustomerProfileComponent
    },
    template: `
    <div class="EditCustomerProfilePage">
        <edit-customer-profile-component :customer="customerProfile" />
    </div>`,
    computed: {
        ...mapState([
            "customer"
        ])
    },
    methods: {

        GetCustomerProfile() {
            // Obtaining the Customer Profile from the Store 
            this.customerProfile = this.customer
        }
    }
}

</script>


<style lang="scss">

</style>
