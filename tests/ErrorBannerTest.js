
import ErrorBanner from "../src/components/ErrorBanner.vue";
import  { expect, beforeEach, describe, it } from "vitest";
import PaymentRequiredErrorBanner from "../src/components/paymentRequiredErrorBanner.vue";
import  { shallowMount } from "@vue/test-utils"


function TestErrorBanner() {
    // Error Banner Test Setup 
    describe("When the Error Occurs", () => {
        let WrapperComponent;
        beforeEach(() => {
            let ReasonError = "Some Test ReasonError";
            WrapperComponent = shallowMount(ErrorBanner, {
                props: {
                    "ReasonError": ReasonError
                }
            })
        })
        it('Expecting, that the Banner Title equals to the one, specified Above', () => expect(WrapperComponent.text()).toMatch(ReasonError))
        it('Expecting, that the Banner has been Rendered', () => expect(WrapperComponent.text()).not.toBeNull())
    })
}

function TestPaymentRequiredErrorBanner() {
    // Testing the Payment Required Banner, 
    // The way, how it gets triggered within the another component 
    describe("When the Customer Trying to Perform action, which requires Payment", () => {
        let PaymentRequiredBannerComponent = shallowMount(PaymentRequiredErrorBanner)
        it("Expecting, that the Banner has been rendered", 
        () => expect(PaymentRequiredBannerComponent.text()).not.toBeNull())
    })
}

TestErrorBanner()
TestPaymentRequiredErrorBanner()
TestConnectionInfoBanner()