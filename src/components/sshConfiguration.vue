<template>
      <h1>SSH Configuration</h1>

      <div class="container fluid" style="position: relative">
          <v-switch
          ref="by_root_certificate"
          color="red"
          @click="toRootCertificate"
          v-model="useRootCertificate"
          label="Use Public Key"
          style="
            .v-selection-control .v-label {
                height: 100%;
                width: 50%;
            }"
          />
         
          <v-card-actions style="  
            align-items: flex-end;
            flex: 0 0 auto;
            min-height: 52px;
            padding: 0.5rem;
            max-width: 20%;
            position: absolute;
            right: 0;
            top: 0;
            top: 70px;
              ">

                <v-btn icon @click="showRootCertificateDescription = !showRootCertificateDescription">
                  <v-icon>{{ showRootCertificateDescription ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>

          </v-card-actions>

          <v-expand-transition>
            <div v-show="showRootCertificateDescription">
              <v-divider style="max-width: 40%"></v-divider>

              <v-card-text style="background-color: #1e2139; border-radius: 10px;">
                <label style="color: #fff; max-width: 60%">Provides the ability for you to connect to your Server Using Root SSH Certificate 
                It is more secure, but to maintain that security you will need to change them regularly</label> 
              </v-card-text>
            </div>
          </v-expand-transition>

        </div>



        <div class="container fluid" style="position: relative">

          <v-switch
          ref="by_root_credentials"
          color="blue"
          @click="toRootCredentials"
          v-model="useRootCredentials"
          label="Use Root User Credentials"
          style="
          .v-selection-control .v-label {
              height: 100%;
              width: 50%;
          }"
          />

          <v-card-actions style="    
            align-items: flex-end;
            flex: 0 0 auto;
            min-height: 52px;
            padding: 0.5rem;
            max-width: 20%;
            position: absolute;
            right: 0;
            top: 0;
            top: 70px;">

                <v-btn icon @click="showRootCredentialsDescription = !showRootCredentialsDescription">
                  <v-icon>{{ showRootCredentialsDescription ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>

          </v-card-actions>


          <v-expand-transition>
            <div v-show="showRootCredentialsDescription">
              <v-divider style="max-width: 60%"></v-divider>

              <v-card-text style="background-color: #1e2139; border-radius: 10px;">
                <label style="color: #fff; max-width: 60%">Provides ability for you to connect to your Virtual Server, by using Credentials of the Host System
                It makes it easier to connect, but lack security</label>
              </v-card-text>
            </div>
          </v-expand-transition>

      </div>
</template>

<script>


import { mapState } from "vuex";
export default {

  name: "sshConfiguration",
  props: [
    "sshConfiguration"
  ],
  data() {
    return {  

      // Triggers 

      showRootCredentialsDescription: false, 
      showRootCertificateDescription: false,

      // Configuration of the SSH for the Virtual Machine Server
      
      useRootCredentials: function(object) {
        let sshConfiguration = object.$props.sshConfiguration || {};
        return sshConfiguration.useRootCredentials || false}(this),
        
      useRootCertificate: function(object) {
        let sshConfiguration = object.$props.sshConfiguration || {};
        return sshConfiguration?.useRootCertificate || false}(this),
    }
  },
  mounted() {
    this.CheckIsDraft()
  },
  methods: {

    ...mapState(
      ["virtualMachineSavedDraft"]
    ),

    CheckIsDraft() {
      // Checks if the Previous 
      for (let PropertyKey in Object.keys(this.virtualMachineSavedDraft)) {
        this[PropertyKey] = this.virtualMachineSavedDraft[PropertyKey]
      }
    },

    toRootCertificate() {
      this.useRootCertificate = true
      this.useRootCredentials = false
    },
    
    toRootCredentials() {
      this.useRootCredentials = true
      this.useRootCertificate = false
    }
  },
};

</script>