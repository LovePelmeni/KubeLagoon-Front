<template>
      <h1>SSH Configuration</h1>
      <v-container fluid>
          <v-switch
          color="red"
          @click="toRootCertificate"
          v-model="useRootCertificate"
          label="Use Public Key"
          ></v-switch>

          <v-switch
          color="blue"
          @click="toRootCredentials"
          v-model="useRootCredentials"
          label="Use Root User Credentials"
          ></v-switch>

      </v-container>
</template>

<script>

import { mapState } from "vuex";

export default {

  name: "sshConfiguration",
  data() {
    return {

      // Configuration of the SSH for the Virtual Machine Server
      useRootCredentials: false,
      useRootCertificate: false,
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

    ValidateSsh(SshConfiguration) {
        // Validates SSH Option, selected by the Customer
        if (SshConfiguration.Type.length == 0) {
          this.errors["SSL"]["Type"] = "This field is required"
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
