<script>

import InitializationModal from "../views/InitializationModal.vue";

export default {
    name: "InitializationModalPage",
    components: {
        InitializationModal
    },
    template: `
        <initialization-modal :updateVirtualMachine="false" :suggestionCard="false" />
    `,
}

</script>