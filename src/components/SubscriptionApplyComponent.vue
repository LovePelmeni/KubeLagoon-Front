<template>

    <div v-if="SuggestionCardNotFound === false" 
    class="initializationModalConfigurationBasedOnSuggestionCard">
        <initialization-modal 
        :updateVirtualMachine="false" 
        :VirtualMachine="CreateServerByConfiguration()"
        :suggestionCard="true" />
    </div>

    <div v-else class="mobile-message flex flex-column">
        <h2>Oops, Seems Like This Subscription is not available right now :(</h2>
        <p>Please come back a little bit sooner</p>
    </div>

</template>

<script>


import initializationModal from "../views/InitializationModal.vue";
import { mapState } from "vuex";

class SuggestionCardOfferingManager { 
    // Suggestion Card Offering Abstraction for handling the Server Creation using the Subscription Configuration 
    constructor(meta) {
        this.self = meta
    }
    // Manager Class for the Suggestion Cards 
    GetSuggestionCardOfferingConfigurationById(OfferingId) {
        // Returns the Configuration of the Suggestion Card Offering 
        let SuggestionCard = this.self.paymentSubscriptions.filter((offering) => {
        return offering.id === OfferingId})[0]
        if (Object.keys(SuggestionCard).length === 0) {this.self.SuggestionCardNotFound = true}
        return SuggestionCard["Configuration"] || {}

        }
    }
    
export default {
    name: "ApplySuggestionComponent",
    data() {
        return {
            SuggestionCardNotFound: false,
            SuggestionCardConfiguration: {},
        }
    },
    computed: {
        ...mapState([
            "paymentSubscriptions"
        ]),
    },
    components: {
        initializationModal,
    },
    methods: {
        CreateServerByConfiguration() {
            // Initializes New Server Based on the Suggestion Card Offerings 
            let suggestionCardOfferingId = this.$route.params.SubscriptionId
            let SuggestionManager = new SuggestionCardOfferingManager(this) 
            let Configuration = SuggestionManager.GetSuggestionCardOfferingConfigurationById(suggestionCardOfferingId)
            return Configuration
        }
    }
}
</script>
