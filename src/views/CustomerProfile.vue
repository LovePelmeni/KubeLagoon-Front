<script>

import * as customers from "../../customers/customers.js";
import $ from "jquery";
import { useCookies } from "vue3-cookies";


export default {
      name: "CustomerProfile",
      setup() {
        const { cookies } = useCookies(); 
        return { cookies }
      },
      mounted() {
        this.JwtToken = this.cookie?.get("jwt-token")
      },
      data() {
        return {
          // Customer Credentials
          Username: null,
          Email: null,
          CreatedAt: null,

          // Billing Address Info 
          BillingAddress: null, 
          Country: null, 
          ZipCode: null,
        }
      },
      template: `
      
      `,
        methods: {

          ShowCustomerProfile() {
            // Function Parses Customer Data and Shows Out Customer's Profile Component
          
            let newCustomerManager = new customers.CustomerManager()
            let CustomerProfile = newCustomerManager.GetCustomerProfile(this.JwtToken)

            // Customer Info 
            this.Username = CustomerProfile["Username"]
            this.Email =  CustomerProfile["Email"]
            this.Password = "*" * CustomerProfile["Password"].length

            // Billing Address Info 
            this.BillingAddress = CustomerProfile["BillingAddress"]
            this.Country = CustomerProfile["Country"]
            this.ZipCode = CustomerProfile["ZipCode"]
          },

          Logout() {
            // Logging out the Customer from the Profile
            if ($.cookie("jwt-token").length != 0) {
              this.cookies.delete("jwt-token");
              return this.$router.push({name: "login_page"})
            }
          },
          Login() {
            // Logs Customer in the Profile
            return this.$router.push({name: "login_page"})
          }
        },
      }

</script>

<style>
</style>
