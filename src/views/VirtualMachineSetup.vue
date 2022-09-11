<script type="text/javascript">

  import initializationModal from "../components/InitializationModal.vue"
  export default {
    name: "VirtualMachineSetup",
    components: {
      initializationModal,
    },
    template: `
      <template>
        <loadingPage v-if="loading" />
        <initializationModal />
      </template>
    `,
  }

</script>
