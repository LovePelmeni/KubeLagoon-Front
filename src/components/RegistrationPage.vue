


<script>

export default {
  name: "registrationPage",
  data() {
    return {
      Username: null,
      Email: null,
      Password: null,
    }
  },
  methods: {

    ShowError(Errors) {
      // Shows Exceptions on the Page
      console.log(Errors)
    },
    ValidateInput() {
      // Validates Customer Input
    },
    ProcessFormRequest() {
      // Creates New Customer
    }
  },
}

</script>
