import InitializationModal from "../src/views/InitializationModal.vue";
import hardwareConfiguration from "../src/components/hardwareConfiguration.vue";
import resourceConfiguration from "../src/components/resourceConfiguration.vue";
import sshConfiguration from "../src/components/sshConfiguration.vue";

import { shallowMount } from "@vue/test-utils"


const InitializationModalDataSchema = {

}

const HardwareConfigurationDataSchema = {

}

const ResourceConfigurationDataSchema = {

}

const SshConfigurationDataSchema = {

}


function TestResourceConfiguration() {
    // Tests the Resource Configuration Component, from the "components" directory 
    // * Is being used as a part of the Setup Page
    test('Resource Configuration Interaction Unittest', () => {
        const ResourceConfigurationWrapper = shallowMount(resourceConfiguration)
        ResourceConfigurationWrapper.setData(ResourceConfigurationDataSchema)
    })
}

function TestSshConfiguration() {
    // Tests the Ssh Configuration Component, from "components" directory 
    // * Is being used as a part of the Setup Page 
    test('Ssh Configuration Interaction Unittest', () => {
        const SshConfigurationWrapper = shallowMount(sshConfiguration)
        SshConfigurationWrapper.setData(SshConfigurationDataSchema)
    })
}

function TestHardwareConfiguration() {
    // Tests the Hardware Configuration component, from the `components` directory 
    // * Is being used as a part of the Setup Page
    test('Hardware Configuration Interaction Unittest', () => {
        const HardwareConfigurationWrapper = shallowMount(hardwareConfiguration)
        HardwareConfigurationWrapper.setData(HardwareConfigurationDataSchema)
    })
}

function TestInitializationModalWindow() {
    // Tests the Initialization Modal Window Component, from the `components` directory 
    // * Is being used as a main initialization WIndow of the Setup Page 
    test('Initialization Modal Interaction Unittest', () => {
        const initializationModalWrapper = shallowMount(InitializationModal)
        initializationModalWrapper.setData(InitializationModalDataSchema)
        expect()
    }) 
}

// Testing the Configuration Components
TestResourceConfiguration()
TestHardwareConfiguration()
TestSshConfiguration() 


// Testing the Initialization Window Component View

TestInitializationModalWindow()