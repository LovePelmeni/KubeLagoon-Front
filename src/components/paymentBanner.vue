<template>
           <div class="pricing_plan-card__8Q2Iu pricing_plan-card-personal__FBJhu">
           <div class="pricing_plan-card-header__g8BK_ pricing_plan-card-header-personal__All8V">

           <p class="text_wrapper__aJlSM text_s-32__lPhW6 text_w-700__BJEFg text_lh-32__iP9gT" data-version="v1" style="--color:var(--geist-foreground);">
           <span class="pricing_plan-card-header-text__xEN2p">{{ BannerName }}</span>
           </p>

           <span aria-hidden="true" class="geist-spacer" data-version="v1" style="margin-top: 5px;"></span>
           <p class="text_wrapper__aJlSM text_s-16__wD_tc text_w-600__hi7Y9 text_lh-24___qKPu" data-version="v1" style="--color: inherit;"><span class="pricing_plan-card-header-description__mdnYK" style="margin-top: 30px; margin-bottom: 10px;">{{ BannerPrice }}$ / month</span></p>
           <span aria-hidden="true" class="geist-spacer" data-version="v1" style="margin-top: 5px;"></span>

                <!-- Pricing Card Headers -->
                <div class="pricing_plan-card-header-description__mdnYK pricing_plan-card-header-description-personal__iKbGC" style="margin-top: 15px;">
                    <p class="text_wrapper__aJlSM text_s-16__wD_tc text_w-600__hi7Y9 text_lh-24___qKPu" data-version="v1" 
                    style="--color: inherit;">{{ BannerDescription }}</p>
                </div>
            </div>
           <div class="pricing_plan-card-body__tIAYe">

           <div data-version="v1" class="container jsx-917344996 stack_stack__A16oG stack" style="--flex: initial; --direction:column; --align:stretch; --justify:flex-start;">
               
                <div data-version="v1" v-for="Option in BannerOptions" :key="Option" class="jsx-1558625419 stack_stack__A16oG stack" style="margin-top: 30px; --flex: initial; --direction:row; --align:stretch; --justify:flex-end;">

                    <div style="position: absolute;">
                        <svg data-testid="geist-icon" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color: green; --geist-fill:currentColor; --geist-stroke:var(--geist-background);">
                        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="var(--geist-fill)" stroke="var(--geist-fill)"></path>
                        <path d="M8 11.8571L10.5 14.3572L15.8572 9" fill="none" stroke="var(--geist-stroke)">
                        </path>
                        </svg>
                    </div>
                    <p class="text_wrapper__aJlSM text_s-14__COjdp text_w-400__XA97_ text_lh-24___qKPu" data-version="v1" style="--color:var(--accents-6);">{{ Option }}</p>
                </div>

            </div>
        </div>
            <div class="pricing_plan-card-footer__iC0uW">
            <a role="button" tabindex="0" @click="redirectVirtualMachineSetup()" type="submit" class="button_base_class button_base__AOyi_ reset_reset__90FTf button_button__dmey4 reset_reset__90FTf geist-themed geist-default geist-default-fill button_large__FQLqa button_invert__ESQI6" data-geist-button="" data-version="v1">
            <span class="button_content__9hWh7 button_start___N8dd" ref="subscriptionButton">Deploy Server</span>
            <span class="button_suffix__i0gL_"><svg data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color: currentcolor;">
            <path d="M5 12h14"></path><path d="M12 5l7 7-7 7">
                            </path>
                        </svg>
                    </span>
                </a>
            </div>
        </div>
</template>

<script>



export default {
    name: "paymentBanner",
    props: [
        "BannerName",
        "BannerDescription",
        "BannerOptions",
        "BannerPrice",
        "SubscriptionId",
    ],
    methods: {
        redirectVirtualMachineSetup() {
            // Redirects to the Virtual Machine Setup Page, with already prepared (inserted) parameters 
            // According to the Banner Suggestion
            let SubscriptionId = this.$props.SubscriptionId 
            console.log(SubscriptionId)
            this.$router.push({name: "apply_subscription_page",
            params: {'SubscriptionId': SubscriptionId}})
        },
    }
}

</script>

<style lang="scss">


.button_suffix__i0gL_ {
    margin-top: 5px;
}
.link_primary__8ELPN {
    color: var(--geist-foreground);
}

.link_link__LTNaQ {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    outline: none;
}
.a, .details .summary {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
*, :after, :before, html {
    box-sizing: border-box;
}

.a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}


.hero_description__EwadB {
    font-size: 24px;
    line-height: 34px;
}

.hero_description__EwadB {
    font-size: 20px;
    line-height: 26px;
    letter-spacing: -.03em;
    text-align: center;
    margin: 0;
    color: var(--accents-5);
}

.button_base_class {
    cursor: pointer;
    background-color: #fff !important;
}

.text_wrapper__aJlSM.text_lh-32__iP9gT {
    line-height: 2rem;
}

.text_wrapper__aJlSM.text_w-700__BJEFg {
    font-weight: 700;
}
.text_wrapper__aJlSM.text_s-32__lPhW6 {
    font-size: 2rem;
    letter-spacing: -.049375rem;
    font-weight: 600;
    line-height: 2.5rem;
}
.text_wrapper__aJlSM {
    font-family: "Inter",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;;
    margin: 0;
    color: var(--color);
}


.svg {

    color: green !important;
    --geist-fill: currentColor;
    --geist-stroke: #fff;
    height: 24;
    shape-rendering: geometricprecision;
    stroke: currentcolor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5;
    width: 24;
}

.svg:not(:root) {
    overflow: hidden;
}

.stack.jsx-1558625419>*+* {
    margin-left: 8px;
}

.text_wrapper__aJlSM.text_lh-24___qKPu {
    line-height: 1.5rem;
}
.text_wrapper__aJlSM.text_w-400__XA97_ {
    font-weight: 400;
}
.text_wrapper__aJlSM.text_s-14__COjdp {
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.25rem;
}
.text_wrapper__aJlSM {
    font-family: "Inter",-apple-system,
    BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen",
    "Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;;
    margin: 0;
    color: var(--color);
}

.button_large__FQLqa {
    height: 48px;
    font-size: 1rem;
    line-height: 1.5rem;
}

.button_button__dmey4 {
    border-radius: var(--geist-radius);
    color: var(--themed-fg,var(--geist-background));
    background: var(--themed-bg,var(--geist-foreground));
    border: 1px solid var(--themed-border,var(--geist-foreground));
    font-weight: 500;
    padding: 0 var(--geist-gap-half);
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-property: border-color,background,color,transform,box-shadow;
    transition-duration: .15s;
    transition-timing-function: ease;
    font-size: var(--geist-form-font);
    line-height: var(--geist-form-line-height);
    height: var(--geist-form-height);
}
.button_base__AOyi_ {
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background-color: #fff;
    margin-right: 20% !important;
    margin-left: 20% !important;
}
.reset_reset__90FTf {
    outline: none;
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
}
.a, .details .summary {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}

.pricing_plan-card__8Q2Iu .pricing_plan-card-header-text__xEN2p {
    color: #fff;
}

.pricing_plan-card-body__tIAYe {
    flex: 1 1;
    padding: var(--card-padding);
    background-color: hsl(233, 35%, 15%);
}

.pricing_plan-card-footer__iC0uW {
    padding: 40px;
    background-color: hsl(233, 35%, 15%);
}

.pricing_plans-wrapper__95BQG .pricing_plan-card__8Q2Iu {
    overflow: visible;
    --card-padding: 40px;
}

.pricing_plan-card-enterprise__JiGCc, .pricing_plan-card-personal__FBJhu {
    border: 1px solid #444;
}

.pricing_plan-card__8Q2Iu {
    --card-padding: 40px;
}

.pricing_plan-card__8Q2Iu {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
    --card-padding: 32px;
    margin: 20px;
}

.pricing_plan-card-header__g8BK_ {
    position: relative;
    border-radius: 12px;
    border-bottom: 1px solid #444;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background: hsl(233, 35%, 15%);
}

.pricing_plan-card-header-description__mdnYK {
    max-width: 300px;
    margin-right: calc(-1 * 16px);
}

.pricing_plan-card-header-personal__All8V {
    border-bottom: 1px solid hsl(233, 35%, 15%);
}
.pricing_plan-card-header__g8BK_ {
    padding: var(--card-padding);
}

.text_wrapper__aJlSM.text_lh-24___qKPu {
    line-height: 1.5rem;
}
.text_wrapper__aJlSM.text_w-600__hi7Y9 {
    font-weight: 600;
}
.text_wrapper__aJlSM.text_s-16__wD_tc {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
}

.pricing_plan-card-header-description__mdnYK>p {
    color: #888;
}
.text_wrapper__aJlSM {
    font-family: "Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",
    "Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans",
    "Droid Sans","Helvetica Neue",sans-serif;;
    margin: 0;
    color: #fff;
}
*, :after, :before, html {
    box-sizing: border-box;
}

.p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

.dark-theme, .dark-theme .geist-disabled .geist-disabled-skip, .invert-theme {
    --geist-foreground: #fff;
    --geist-background: hsl(233, 35%, 15%);
    --geist-selection: var(--geist-highlight-purple);
    --accents-8: #fafafa;
    --accents-7: #eaeaea;
    --accents-6: #999;
    --accents-5: #888;
    --accents-4: #666;
    --accents-3: #444;
    --accents-2: #333;
    --accents-1: #111;
    --geist-secondary-lighter: var(--accents-2);
    --geist-secondary-light: var(--accents-3);
    --geist-secondary: var(--accents-5);
    --geist-secondary-dark: var(--accents-7);
    --geist-link-color: var(--geist-success-light);
    --geist-marketing-gray: var(--accents-1);
    --geist-code: var(--geist-foreground);
    --geist-error-light: #f33;
    --geist-error: red;
    --geist-error-dark: #e60000;
    --dropdown-box-shadow: 0 0 0 1px var(--accents-2);
    --dropdown-triangle-stroke: #333;
    --scroller-start: #000;
    --scroller-end: transparent;
    --header-background: rgba(0,0,0,.5);
    --header-border-bottom: inset 0 -1px 0 0 hsla(0,0%,100%,.1);
    --header-import-flow-background: hsla(0,0%,7%,.8);
    --shadow-smallest: 0 0 0 1px var(--accents-2);
    --shadow-extra-small: 0 0 0 1px var(--accents-2);
    --shadow-small: 0 0 0 1px var(--accents-2);
    --shadow-medium: 0 0 0 1px var(--accents-2);
    --shadow-large: 0 0 0 1px var(--accents-2);
    --shadow-sticky: 0 0 0 1px var(--accents-2);
    --shadow-hover: 0 0 0 1px var(--geist-foreground);
    --portal-opacity: 0.75;
    --geist-violet-background: #291d3a;
    --geist-violet-background-secondary: #211830;
    --geist-violet-background-tertiary: #211830;
    --geist-background-rgb: 0,0,0;
    --geist-foreground-rgb: 255,255,255;
    --geist-console-header: #0f0310;
    --geist-console-purple: #8a63d2;
    --geist-console-text-color-default: var(--geist-foreground);
    --geist-console-text-color-blue: #3291ff;
    --geist-console-text-color-pink: #eb367f;
    --next-icon-border: #fff;
}

.dark-theme .invert-theme, .geist-disabled .geist-disabled-skip, :root {
    --geist-success-lighter: #d3e5ff;
    --geist-success-light: #3291ff;
    --geist-success: #0070f3;
    --geist-success-dark: #0761d1;
    --geist-error-lighter: #f7d4d6;
    --geist-error-light: #ff1a1a;
    --geist-error: #e00;
    --geist-error-dark: #c50000;
    --geist-warning-lighter: #ffefcf;
    --geist-warning-light: #f7b955;
    --geist-warning: #f5a623;
    --geist-warning-dark: #ab570a;
    --geist-violet-lighter: #d8ccf1;
    --geist-violet-light: #8a63d2;
    --geist-violet: #7928ca;
    --geist-violet-dark: #4c2889;
    --geist-violet-background: #fff;
    --geist-violet-background-secondary: #291c3a;
    --geist-violet-background-tertiary: #eae5f4;
    --geist-background-rgb: 255,255,255;
    --geist-foreground-rgb: 0,0,0;
    --geist-console-header: #efe7ed;
    --geist-console-purple: #7928ca;
    --geist-console-text-color-default: var(--geist-foreground);
    --geist-console-text-color-blue: #0070f3;
    --geist-console-text-color-pink: #eb367f;
    --geist-console-text-color-purple: #7928ca;
    --geist-cyan-lighter: #aaffec;
    --geist-cyan-light: #79ffe1;
    --geist-cyan: #50e3c2;
    --geist-cyan-dark: #29bc9b;
    --geist-highlight-purple: #f81ce5;
    --geist-highlight-magenta: #eb367f;
    --geist-highlight-pink: #ff0080;
    --geist-highlight-yellow: #fff500;
    --geist-foreground: #000;
    --geist-background: #fff;
    --geist-selection: var(--geist-cyan-light);
    --accents-1: #fafafa;
    --accents-2: #eaeaea;
    --accents-3: #999;
    --accents-4: #888;
    --accents-5: #666;
    --accents-6: #444;
    --accents-7: #333;
    --accents-8: #111;
    --geist-link-color: var(--geist-success);
    --geist-marketing-gray: #fafbfc;
    --geist-code: var(--geist-foreground);
    --geist-secondary-lighter: var(--accents-2);
    --geist-secondary-light: var(--accents-3);
    --geist-secondary: var(--accents-5);
    --geist-secondary-dark: var(--accents-7);
    --dropdown-box-shadow: 0 4px 4px 0 rgba(0,0,0,.02);
    --dropdown-triangle-stroke: #fff;
    --scroller-start: #fff;
    --scroller-end: hsla(0,0%,100%,0);
    --shadow-smallest: 0px 2px 4px rgba(0,0,0,.1);
    --shadow-extra-small: 0px 4px 8px rgba(0,0,0,.12);
    --shadow-small: 0 5px 10px rgba(0,0,0,.12);
    --shadow-medium: 0 8px 30px rgba(0,0,0,.12);
    --shadow-large: 0 30px 60px rgba(0,0,0,.12);
    --shadow-hover: 0 30px 60px rgba(0,0,0,.12);
    --shadow-sticky: 0 12px 10px -10px rgba(0,0,0,.12);
    --portal-opacity: 0.25;
    --wv-green: #0cce6b;
    --wv-orange: #ffa400;
    --wv-red: #ff4e42;
    --next-icon-border: #000;
}
:root {
    font-size: 16px;
    --geist-space: 4px;
    --geist-space-2x: 8px;
    --geist-space-4x: 16px;
    --geist-space-8x: 32px;
    --geist-space-16x: 64px;
    --geist-space-24x: 96px;
    --geist-space-32x: 128px;
    --geist-space-48x: 192px;
    --geist-space-64x: 256px;
    --geist-space-small: 32px;
    --geist-space-medium: 40px;
    --geist-space-large: 48px;
    --geist-space-gap: 24px;
    --geist-space-gap-half: 12px;
    --geist-space-gap-quarter: var(--geist-space-2x);
    --geist-gap: var(--geist-space-gap);
    --geist-gap-half: var(--geist-space-gap-half);
    --geist-gap-quarter: var(--geist-space-gap-quarter);
    --geist-gap-double: var(--geist-space-large);
    --geist-gap-section: var(--geist-space-small);
    --geist-space-negative: -4px;
    --geist-space-2x-negative: -8px;
    --geist-space-4x-negative: -16px;
    --geist-space-8x-negative: -32px;
    --geist-space-16x-negative: -64px;
    --geist-space-24x-negative: -96px;
    --geist-space-32x-negative: -128px;
    --geist-space-48x-negative: -192px;
    --geist-space-64x-negative: -256px;
    --geist-space-small-negative: -32px;
    --geist-space-medium-negative: -40px;
    --geist-space-large-negative: -48px;
    --geist-space-gap-negative: -24px;
    --geist-space-gap-half-negative: -12px;
    --geist-space-gap-quarter-negative: var(--geist-space-2x-negative);
    --geist-gap-negative: var(--geist-space-gap-negative);
    --geist-gap-half-negative: var(--geist-space-gap-half-negative);
    --geist-gap-quarter-negative: var(--geist-space-gap-quarter-negative);
    --geist-gap-double-negative: var(--geist-space-large-negative);
    --geist-page-margin: var(--geist-space-gap);
    --geist-page-width: 1200px;
    --geist-page-width-with-margin: calc(var(--geist-page-width) + calc(2 * var(--geist-page-margin)));
    --geist-radius: 5px;
    --geist-marketing-radius: 8px;
    --font-sans: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
    --font-mono: Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace;
    --header-height: 64px;
    --header-border-bottom: inset 0 -1px 0 0 rgba(0,0,0,.1);
    --header-background: hsla(0,0%,100%,.8);
    --header-import-flow-background: hsla(0,0%,98%,.8);
    --geist-form-large-font: 1rem;
    --geist-form-large-line-height: 1.5rem;
    --geist-form-large-height: var(--geist-space-large);
    --geist-form-small-font: 0.875rem;
    --geist-form-small-line-height: 0.875rem;
    --geist-form-small-height: var(--geist-space-small);
    --geist-form-font: 0.875rem;
    --geist-form-line-height: 1.25rem;
    --geist-form-height: var(--geist-space-medium);

}

.geist-list.jsx-1681548526>.list_geistListItem__82_ac {
    padding: 12px;
    -webkit-box-flex: 0;
    -webkit-flex-grow: 0;
    -moz-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -webkit-flex-basis: 50%;
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    min-width: 0;
}

.list_geistListItem__82_ac {
    flex-grow: 0;
    min-width: 0;
}
*, :after, :before, html {
    box-sizing: border-box;
}

.div {
    display: block;
}
.body {
    font-family: #fee2e2;;
}

.body, .html {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #000;
    color: #fff;
    scroll-padding-top: 64px;
}

.button_content__9hWh7 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
}

.hero_gradient-button-wrapper__bi4sF .hero_gradient-button__kkwJu {
    background-color: #00000010;
    background-clip: padding-box;
    border: 1px solid transparent;
    box-shadow: 0 4px 4px 0 #00000010;
    color: #fff;
    transition-property: color,background-color,box-shadow;
    transition-duration: .15s;
    transition-timing-function: ease;
}
.dark-theme .button_ghost__sBWMh {
    --lighten-color: rgba(0,0,0,.75);
}
.button_ghost__sBWMh {
    background: none;
    border-color: transparent;
    color: #000;
    --lighten-color: hsla(0,0%,100%,.8);
}
.button_large__FQLqa {
    height: 48px;
    font-size: 1rem;
    line-height: 1.5rem;
}
.button_button__dmey4 {
    border-radius: 4px 4px 4px 4px;
    color: #000;
    background: #000;
    border: 1px solid #fff;
    font-weight: 500;
    padding: 0 12px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-property: border-color,background,color,transform,box-shadow;
    transition-duration: .15s;
    transition-timing-function: ease;
    font-size: 0.875rem;
    line-height: 1.25rem;
    height: 40px;
}
.button_base__AOyi_ {
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background: none;
}
.reset_reset__90FTf {
    outline: none;
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
}
.a, .details .summary {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}

.a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
}

.dark-theme .hero_gradient-button-wrapper__bi4sF .hero_gradient-button__kkwJu {
    box-shadow: 0 4px 4px 0 #00000040;
}
.hero_gradient-button-wrapper__bi4sF .hero_gradient-button__kkwJu {
    background-color: #000;
    background-clip: padding-box;
    border: 1px solid transparent;
    box-shadow: 0 4px 4px 0 #00000010;
    color: #fff;
    transition-property: color,background-color,box-shadow;
    transition-duration: .15s;
    transition-timing-function: ease;
}
.dark-theme .button_ghost__sBWMh {
    --lighten-color: rgba(0,0,0,.75);
}
.button_ghost__sBWMh {
    background-image: linear-gradient(to right, rgba(0,0,0,.75), #fff);
}
.button_ghost__sBWMh {
    background: none;
    border-color: transparent;
    color: #000;
    --lighten-color: hsla(0,0%,100%,.8);
}
.button_large__FQLqa {
    height: 48px;
    font-size: 1rem;
    line-height: 1.5rem;
}
.button_button__dmey4 {
    border-radius: 5px;
    color: #000;
    background: #fff;
    border: 1px solid #fff;
    font-weight: 500;
    padding: 0 12px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-property: border-color,background,color,transform,box-shadow;
    transition-duration: .15s;
    transition-timing-function: ease;
    font-size: 0.875rem;
    line-height: 1.25rem;
    height: 40px;
}
.button_base__AOyi_ {
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background: none;
}


.geist-list.jsx-1681548526>.list_geistListItem__82_ac {
    padding: 12px;
    -webkit-box-flex: 0;
    -webkit-flex-grow: 0;
    -moz-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -webkit-flex-basis: 50%;
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    min-width: 0;
}

.list_geistListItem__82_ac {
    flex-grow: 0;
    min-width: 0;
}
*, :after, :before, html {
    box-sizing: border-box;
}

.geist-container.jsx-499702677>* {
    --gap-ratio: 1;
}

.button_large__FQLqa {
    height: 48px;
    font-size: var(--geist-form-large-font);
    line-height: var(--geist-form-large-line-height);
}
.button_button__dmey4 {
    border-radius: var(--geist-radius);
    color: var(--themed-fg,var(--geist-background));
    background: var(--themed-bg,var(--geist-foreground));
    border: 1px solid var(--themed-border,var(--geist-foreground));
    font-weight: 500;
    padding: 0 var(--geist-gap-half);
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-property: border-color,background,color,transform,box-shadow;
    transition-duration: .15s;
    transition-timing-function: ease;
    font-size: var(--geist-form-font);
    line-height: var(--geist-form-line-height);
    height: var(--geist-form-height);
}
.button_base__AOyi_ {
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background: none;
}
.reset_reset__90FTf {
    outline: none;
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
}
.a, .details .summary {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
*, :after, :before, html {
    box-sizing: border-box;
}

.a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}

.geist-container.jsx-499702677>* {
    --gap-ratio: 1;
}


.section-title_title__VEDfK {
    text-align: center;
    margin: 0 0 var(--geist-gap);
    padding-bottom: var(--geist-gap-half);
    font-weight: 700;
    letter-spacing: -.05em;
    font-size: 3.75rem;
}
*, :after, :before, .html {
    box-sizing: border-box;
}

.h4 {
    display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}


.hero_description__IXY_z {
    line-height: 1.6em!important;
    color: #fff;
    font-weight: 400;
    font-size: 1.25rem;
    letter-spacing: -.02em;
    text-align: center;
    margin: var(--geist-gap-quarter) 0 var(--geist-space-16x);
    margin-top: 30px;
}
*, :after, :before, .html {
    box-sizing: border-box;
}
.h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

</style>