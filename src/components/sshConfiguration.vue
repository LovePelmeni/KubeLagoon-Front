<template>
  <div class="sshConfiguration flex flex-column">
      <h4>SSL Configuration</h4>
      <v-container fluid>
          <v-switch
          @click="toRootCertificate"
          v-model="useRootCertificate"
          label="Use Public Key"
          ></v-switch>

          <v-switch
          @click="toRootCredentials"
          v-model="useRootCredentials"
          label="Use Root User Credentials"
          ></v-switch>

      </v-container>
  </div>
</template>


<script>

export default {

  name: "sshConfiguration",
  data() {
    return {

      // Error Context
       errors: {
          SSH: {},
      },

      // Configuration of the SSH for the Virtual Machine Server
      useRootCredentials: false,
      useRootCertificate: false,
    }
  },
  methods: {
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
