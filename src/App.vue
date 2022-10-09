<template>
    <div>
      <div v-if="!mobile" class="app flex flex-column">
          <navigationPage />
          <logoutPage v-if="logout" />
          <loadingPage v-if="loading" />
          <modalPage v-if="modalActive" />
          <customer-profile  v-if="showCustomerProfile" :Customer="fetchCustomerProfile()" />
        <router-view />

      </div>
      <div v-else class="mobile-message flex flex-column">
        <h2>Sorry, this app is not supported on Mobile Devices</h2>
        <p>To use this app, please use a Laptop or Another Device</p>
      </div>
  </div>
</template>



<script>

import { mapState, mapMutations } from "vuex"
import navigationPage from "./components/NavigationPage.vue"
import modalPage from "./components/ModalWindow.vue"
import loadingPage from "./components/LoadingPage.vue"
import logoutPage from "./components/LogoutPage.vue"
import CustomerProfile from './components/CustomerProfileNavBar.vue'
// import * as customers from "../customers/customers.js";
import { useCookies } from "vue3-cookies";

export default {

  setup() {
    const cookies = useCookies();
    return cookies
  },
  mounted() {
    this.JwtToken = this.cookies?.get("jwt-token")
  },
  name: "App",
  data() {
    return {
      mobile: null,
    };
  },
  components: {
    loadingPage,
    navigationPage,
    modalPage,
    logoutPage,
    CustomerProfile,
  },

  created() {
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
    this.checkAuthorized()
  },

  methods: {
    ...mapMutations([
      "TOGGLE_NOT_AUTHENTICATED"
    ]),
    checkAuthorized() {
      // This Method Checks if the Customer is Authorized, while the Page is getting Updated, 
      // If not, it is going to change the state `authenticated` to false 
      let jwtAuthCookie = this.cookies.get("jwt-token") || ''
      if (jwtAuthCookie.length == 0 || jwtAuthCookie == null) {
        this.TOGGLE_NOT_AUTHENTICATED()
      }
    },

    fetchCustomerProfile() {
      // Fetches Customer Profile by the Jwt Token
      // let CustomerManager = new customers.CustomerManager()
      // let CustomerProfile = CustomerManager.GetCustomerProfile(this.JwtToken)
      this.customer = {
        "Username": "John Pandey",
        "Email": "some_email@gmail.com",
        "Password": "some_password",
        "Country": "Canada",
        "City": "Toronto",
        "Street": "National Street, 6",
        "ZipCode": "125189",
      }
      return this.customer
    },

    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
    },
  },

  computed: {
    ...mapState(["loading", "modalActive", "virtualMachinesLoaded", "showCustomerProfile",
    "notification", "error", "activeError", "activeNotification", "logout", "customer"]),
  },
};

</script>


<style lang="scss">


.v-application__wrap {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    max-width: 100%;
    min-height: 0vh !important;
    position: relative;
}

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.app {
  background-color: #141625;
  min-height: 100vh;
  @media (min-width: 900px) {
    flex-direction: row !important;
  }
  .app-content {
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    flex: 1;
    position: relative;
  }
}
.mobile-message {
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #141625;
  color: #fff;
  p {
    margin-top: 16px;
  }
}
// animated invoice
.virtual-machine-setup-enter-active,
.virtual-machine-setup-leave-active {
  transition: 0.8s ease all;
}
.virtual-machine-enter-from,
.virtual-machine-leave-to {
  transform: translateX(-700px);
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}
.dark-purple {
  background-color: #252945;
}
.red {
  background-color: #ec5757;
}
.purple {
  background-color: #7c5dfa;
}
.green {
  background-color: #33d69f;
}
.orange {
  background-color: #ff8f00;
}
// utility classes
.flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.container {
  width: 100%;
  padding: 40px 10px;
  // max-width: 850px;
  margin: 0 auto;
  @media (min-width: 900px) {
    padding-top: 72px;
  }
}
.nav-link {
  text-decoration: none;
  color: initial;
}
// Status Button Styling
.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}
.running {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}
.deploying {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}
.shutdown {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.v-application__wrap {
  // Application Wrapper Initialization Parameters
  background-color: #141625;
  color: #141625;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;
}
  


nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
