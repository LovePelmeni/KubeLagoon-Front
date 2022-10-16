<template>
    <div v-if="SuggestionCardNotFound === false" 
    class="initializationModalConfigurationBasedOnSuggestionCard">
        <initialization-modal />
    </div>
</template>

<script>

import initializationModal from "../views/InitializationModal.vue";
import { mapState } from "vuex";

class SuggestionCardOfferingManager { 
    constructor(meta) {
        this.self = meta
    }
    // Manager Class for the Suggestion Cards 
    GetSuggestionCardOfferingConfigurationById(OfferingId) {
        // Returns the Configuration of the Suggestion Card Offering 
        let SuggestionCard = this.self.suggestionCardOfferings.filter((offering) => {
        return offering.id === OfferingId})
        if (Object.keys(SuggestionCard).length() === 0) {this.self.SuggestionCardNotFound = true}else{
            return SuggestionCard.Configuration
        }
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
            "suggestionCardOfferings"
        ]),
    },
    components: {
        initializationModal
    },
    methods: {
        CreateServerByConfiguration() {
            // Initializes New Server Based on the Suggestion Card Offerings 
            let suggestionCardOfferingId = this.$route.params.SuggestionCardOfferingId 
            let SuggestionManager = new SuggestionCardOfferingManager(this) 
            let Configuration = SuggestionManager.GetSuggestionCardOfferingConfigurationById(suggestionCardOfferingId)
            this.SuggestionCardConfiguration = Configuration
        }
    }
}
</script>
