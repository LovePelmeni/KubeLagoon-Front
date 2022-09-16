<template>
  <router-link class="virtual_machine flex" :to="{ name: 'virtual_machine', params: { VirtualMachineId: VirtualMachine.VirtualMachineId } }">
    
    <div class="left flex">
      <span class="tracking-number">#{{ VirtualMachine.VirtualMachineName }}</span>
      <span class="due-date">{{ VirtualMachine.paymentDueDate }}</span>
      <span class="person">{{ VirtualMachine.CustomerName }}</span>
    </div>
    <div class="right flex">
      <span class="price">{{ VirtualMachine.TotalCost }}$</span>
      <div
        class="status-button flex"
        :class="{ running: VirtualMachine.Running, shutdown: VirtualMachine.Shutdown, deploying: VirtualMachine.Deploying }"
      >
        <span v-if="VirtualMachine.Running">Running</span>
        <span v-if="VirtualMachine.Shutdown">Shutdown</span>
        <span v-if="VirtualMachine.Deploying">Deploying</span>
      </div>
      <div class="icon">
        <img :src="require('@/assets/icon-arrow-right.svg')" alt="arrow-right" />
      </div>
    </div>

  </router-link>
</template>


<script>

export default {
  name: "VirtualMachineBannerInfo",
  props: ["VirtualMachine"],
};
</script>

<style lang="scss" scoped>

.virtual_machine {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #1e2139;
  align-items: center;
  span {
    font-size: 13px;
  }
  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;
    span {
      flex: 1;
    }
    .tracking-number {
      text-transform: uppercase;
    }
  }
  .right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;
    .price {
      flex: 1;
      font-size: 16px;
      font-weight: 600px;
    }
  }
}
</style>