<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>

import * as vm_components from "./components/VirtualMachine.vue"

export default {
  name: 'costs'
  components: {
    vm_components.costs
  }
}
export default {
  name: 'resources'
  components: {
    vm_components.resources
  }
}
export default {
  name: 'virtualMachine'
  components: {
    vm_components.virtualMachine
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
