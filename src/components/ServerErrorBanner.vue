<template>

    <div class="modal flex" v-if="closed === false">
        <div class="modal-content" style="width: 500px !important; margin-left: 20px;">
            <v-icon style="color: red; margin-bottom: 30px;" size="50">mdi-alert</v-icon>
            <p style="color: red;">{{ ReasonError }}</p>
            <div class="actions flex">
                <button @click="RedirectToBillPage" class="green">Pay</button>
                <button @click="closeWindow()" class="red">Close</button>
            </div>
        </div>
    </div>
    
</template>

<script>


export default {
    name: "ServerErrorBanner",
    props: ["ReasonError"],
    data() {
        return {
            closed: true,
        }
    },
    mounted() {
        this.closed = true
    },
    methods: {
        closeWindow() {
            // Closing the Banner Window
            this.closed = false
        }
    },
}
</script>
