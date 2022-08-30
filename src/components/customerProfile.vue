// Template Goes there

<script>

import "../customers/customers.js" as customers

function ShowCustomerProfile() {
  // Function Parses Customer Data and Shows Out Customer's Profile Component
  CustomerId = $.getCookie("jwt-token")["UserId"]
  newCustomerManager = new customers.CustomerManager()
  CustomerProfile = newCustomerManager.GetCustomerProfile(CustomerId)

  export default {
    el: "#customerProfile",
    data() {
      return {
        Esername: CustomerProfile.Username,
        Email: CustomerProfile.Email,
        CreatedAt: CustomerProfile.CreatedAt,
        VirtualMachinesCount: CustomerProfile.VirtualMachinesCount,
      }
    }
  }
}

</script>
