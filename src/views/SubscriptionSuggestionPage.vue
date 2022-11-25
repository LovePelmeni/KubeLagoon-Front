<template>
    <div class="subscriptionSuggestionSet" v-if="VirtualConfigurationSuggestions.length < 1">
        <payment-banner v-for="(Config, index) in VirtualConfigurationSuggestions" 
        :BannerName="Config.Name" :BannerDescription="Config.Description" 
        :BannerPrice="Config.Price" :BannerOptions="Config.Options" 
        :SubscriptionId="Config.Id" :key="index" />
    </div>
    <div class="SuggestionsNotFoundError">
        <label style="color: #fff;">No Suggestions has been Found</label>
    </div>
</template>

<script>

let Logger = require('pino')()

class VirtualServerConfigurationManager {
    // Class, for parsing the Virtual Server Configuration Dataset
    GetConfigurations(CustomerJwtToken) {
        // Returns the Array of the Configurations, based on the Previous Customer Choice 
        let APIUrl = new URL(`http://${process.env.BACKEND_APPLICATION_HOST}:${process.env.BACKEND_APPLICATION_PORT}/get/filtered/configuraitons/`);
        let Response = global.jQuery.ajax({
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "jwt-token": CustomerJwtToken,
            },
            url: APIUrl.toString(),
            response: function(response){ 
                // Processing the Http Response 
                if (response.statusCode === 200) {
                    let Configurations = response.responseJSON["Configurations"] // array of the Virtual Server Configurations
                    return Configurations
                }else {
                    return [];
                }
            },
            error: function(error) {
                // Processing the Queryset Exception
                Logger.error(error); // saving exception to the logger 
                return null;
            }
        })
        return Response;
    }
}


import { useCookies } from "vue3-cookies";

export default {
    name: "SubscriptionSuggestionPage",
    data() {
        return {
            VirtualConfigurationSuggestions: []
        }
    },
    setup() {
        const { cookies } = useCookies().cookies
        const { JwtToken } = cookies.get("jwt-token") // Parsing Customer's Jwt Token
        return JwtToken
    },
    methods: {
        GetFilteredConfigurations() {
            // Getting the Filtered Server Configuration, based on the Customer Previous Search
            this.VirtualConfigurationSuggestions = new VirtualServerConfigurationManager(
            ).GetConfigurations(this.JwtToken)
        }
    }
}

</script>
