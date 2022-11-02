<template>
  <router-link class="virtual_machine flex" :to="{ name: 'virtual_machine', params: { VirtualMachineId: VirtualMachine.VirtualMachineId } }">
    
    <div class="left flex">
      <span class="tracking-number">#{{ VirtualMachine.VirtualMachineName }}</span>
      <span class="due-date">{{ GetDateDifference(VirtualMachine.CreatedAt) }} days ago</span>
      <span class="person">{{ VirtualMachine.Ssh.IpAddress }}</span>
    </div>
    <div class="right flex">
      <span class="price">{{ GetVirtualMachineTotalCost() }}$</span>
      <div
        class="status-button flex"
        :class="{ 
        running: VirtualMachine.Running,
        shutdown: VirtualMachine.Shutdown, 
        deploying: VirtualMachine.Deploying,
        failure: VirtualMachine.Running === false && VirtualMachine.Shutdown === false && VirtualMachine.Deploying === false}"
      >
        <span v-if="VirtualMachine.Running">Running</span>
        <span v-if="VirtualMachine.Shutdown">Shutdown</span>
        <span v-if="VirtualMachine.Deploying">Deploying</span>
        <span v-if="VirtualMachine.Deploying === false && VirtualMachine.Running === false && VirtualMachine.Shutdown === false">Failure</span>
      </div>
      <div class="icon">
        <img :src="require('@/assets/icon-arrow-right.svg')" alt="arrow-right" />
      </div>
    </div>

  </router-link>
</template>

<script>

import * as cost from "../../cost/virtualMachineCost"

export default {
  name: "VirtualMachineBannerInfo",
  props: ["VirtualMachine"],
  methods: {
    GetVirtualMachineTotalCost() {
      // Returns the Total Cost Per Month for the Virtual Machine Server 
      let BillCalculator = new cost.VirtualMachineCostCalculator(
        Number(this.VirtualMachine?.Resources.CpuNum), 
        Number(this.VirtualMachine?.Resources.Memory), 
        Number(this.VirtualMachine?.Resources.StorageCapacity),
      )
      return BillCalculator.CalculateCostPerMonth()
    },
    parseDate(str) {
      // Parses Date from the String to the Date Object
      var date = str.split('/');
      return new Date(date[2], date[0]-1, date[1]);
    },
    GetDateDifference(CreationDateValue) {
      // Returns the Value between
      let currentDate = new Date();
      let Datetime = this.parseDate(CreationDateValue)
      let Now = this.parseDate(currentDate.toLocaleDateString().replaceAll(".", "/"))
      let DaysAgo =  Math.round((Now-Datetime)/(1000*60*60*24))
      return DaysAgo
    }
  }, 
}

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


.failure {
  &::before {
    background-color: rgba(255, 0, 0, 0.838);
  }
  color: rgba(255, 0, 0, 0.838);
  background-color: rgba(223, 227, 250, 0.1);
}

</style>