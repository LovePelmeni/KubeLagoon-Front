<script>
import { NftPaymentForm } from "../components/payments/NftPaymentForm.vue";
import  { mapMutations } from "vuex";
export default {
    components: {NftPaymentForm},
    template: `
        <nft-payment-form />
    `,
    name: "NftPaymentView",
    methods: {
        ...mapMutations(["TOGGLE_PAYMENT_PAID", "TOGGLE_PAYMENT_UNPAID"]),
        PerformTransaction() {
            // Performing the Blockchain Transaction 
        },
        SubmitForm() {
            // Submitting the Blockchain Transaction Form 
        }
    }
}

</script>
