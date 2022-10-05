<template>
    <div class="homePageWrapper">
        <h4 class="section-title_title__VEDfK" style="color: #fff; margin-top: 30px;">KubeLagoon</h4>

        <div class="list_geistListItem__82_ac">
            <div data-version="v1" style="--flex:1;--justify-content:flex-start;--align-items:stretch"
             class="jsx-499702677 geist-container">

             <div class="hero_gradient-button-wrapper__bi4sF">
                 <span aria-hidden="true" class="hero_button-bg__seSDp hero_bg-1__Idwnm">
                </span>
                <span aria-hidden="true" class="hero_button-bg__seSDp hero_bg-2__OnKew">
                    </span><span aria-hidden="true" class="hero_button-bg__seSDp hero_bg-3__Ik39k">
                        </span><a role="button" tabindex="0" 
                        @click="redirectToAboutPage"
                        target="_blank" type="submit" rel="noopener" data-testid="landing-page/hero/get-demo-cta"
                        class="button_base__AOyi_ reset_reset__90FTf button_button__dmey4 reset_reset__90FTf hero_gradient-button__kkwJu button_large__FQLqa button_ghost__sBWMh"
                        data-geist-button="" data-version="v1"><span class="button_content__9hWh7">About</span>
                        </a>
                    </div>
                </div
            ></div>

        <div class="list_geistListItem__82_ac">
            <div data-version="v1" style="--flex:1;--justify-content:flex-start;--align-items:stretch"
             class="jsx-499702677 geist-container">

             <div class="hero_gradient-button-wrapper__bi4sF">
                 <span aria-hidden="true" class="hero_button-bg__seSDp hero_bg-1__Idwnm">
                </span>
                <span aria-hidden="true" class="hero_button-bg__seSDp hero_bg-2__OnKew">
                    </span><span aria-hidden="true" class="hero_button-bg__seSDp hero_bg-3__Ik39k">
                        </span><a role="button" tabindex="0" 
                        @click="redirectToBillPage"
                        target="_blank" type="submit" rel="noopener" data-testid="landing-page/hero/get-demo-cta"
                        class="button_base__AOyi_ reset_reset__90FTf button_button__dmey4 reset_reset__90FTf hero_gradient-button__kkwJu button_large__FQLqa button_ghost__sBWMh"
                        data-geist-button="" data-version="v1"><span class="button_content__9hWh7">Billing Info</span>
                        </a>
                    </div>
                </div
        ></div>

        <h2 class="hero_description__IXY_z">
            KubeLagoon Cloud Platform offers great developer experience and reliability
            <br aria-hidden="true" class="hero_description-break__u_niN"> 
            Our platform enables people to do their best work with remote servers</h2>

            <div class="list_geistListItem__82_ac">
                <div data-version="v1" style="--flex:1;--justify-content:flex-start;--align-items:stretch" 
                class="jsx-499702677 geist-container">
                <a role="button" tabindex="0" href="#get-started"
                 type="submit" class="button_base__AOyi_ reset_reset__90FTf button_button__dmey4 reset_reset__90FTf button_large__FQLqa button_invert__ESQI6"
                 data-geist-button="" data-version="v1">
                 <span class="button_content__9hWh7">Start Deploying</span>
                 </a>
                </div>
            </div>
    </div>
    
</template>


<script>

import  { useCookies } from "vue3-cookies";

export default {
    name: "HomePage",
    setup() {
        const jwtToken = useCookies();
        return jwtToken
    },
    mounted() {
        this.JwtToken = this.jwtToken?.cookies.get("jwt-token")
    },
    methods: {
        redirectToBillPage() {
            // Redirects to the Bill Page
            this.$router.push({name: "bill_page"})
        },
        redirectToAboutPage() {
            // Redirects to the Bill Page
            this.$router.push({name: "bill_page"})
        },
    } 
}

</script>

<style lang="scss">

.geist-list.jsx-1681548526>.list_geistListItem__82_ac {
    padding: var(--geist-gap-half);
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
    font-family: var(--_1psdadq2f);
}
.body, .html {
    font-family: var(--font-sans);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--geist-background);
    color: var(--geist-foreground);
    scroll-padding-top: var(--header-height);
}


.button_content__9hWh7 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
}

*, :after, :before, html {
    box-sizing: border-box;
}
.hero_gradient-button-wrapper__bi4sF .hero_gradient-button__kkwJu {
    background-color: var(--geist-background);
    background-clip: padding-box;
    border: 1px solid transparent;
    box-shadow: 0 4px 4px 0 #00000010;
    color: var(--geist-foreground);
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
    color: var(--themed-bg);
    --lighten-color: hsla(0,0%,100%,.8);
}
.button_large__FQLqa {
    height: var(--geist-form-large-height);
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
a, details summary {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}

a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
}

.dark-theme .hero_gradient-button-wrapper__bi4sF .hero_gradient-button__kkwJu {
    box-shadow: 0 4px 4px 0 #00000040;
}
.hero_gradient-button-wrapper__bi4sF .hero_gradient-button__kkwJu {
    background-color: var(--geist-background);
    background-clip: padding-box;
    border: 1px solid transparent;
    box-shadow: 0 4px 4px 0 #00000010;
    color: var(--geist-foreground);
    transition-property: color,background-color,box-shadow;
    transition-duration: .15s;
    transition-timing-function: ease;
}
.dark-theme .button_ghost__sBWMh {
    --lighten-color: rgba(0,0,0,.75);
}
.button_ghost__sBWMh {
    background-image: linear-gradient(to right,var(--lighten-color),var(--lighten-color));
}
.button_ghost__sBWMh {
    background: none;
    border-color: transparent;
    color: var(--themed-bg);
    --lighten-color: hsla(0,0%,100%,.8);
}
.button_large__FQLqa {
    height: var(--geist-form-large-height);
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
a, details summary {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
*, :after, :before, html {
    box-sizing: border-box;
}

a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}




.geist-list.jsx-1681548526>.list_geistListItem__82_ac {
    padding: var(--geist-gap-half);
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
    height: var(--geist-form-large-height);
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
a, details summary {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
*, :after, :before, html {
    box-sizing: border-box;
}

a:-webkit-any-link {
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
*, :after, :before, html {
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
    color: var(--geist-secondary);
    font-weight: 400;
    font-size: 1.25rem;
    letter-spacing: -.02em;
    text-align: center;
    margin: var(--geist-gap-quarter) 0 var(--geist-space-16x);
    margin-top: 30px;
}
*, :after, :before, html {
    box-sizing: border-box;
}
user agent stylesheet
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