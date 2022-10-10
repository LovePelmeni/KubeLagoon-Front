const BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST || 'localhost'
const BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT || '8000'

function ValidateUsernameRestController(Username) {
    // Checks if this Username is already been taken or not 
    let ApiUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/validate/username`)
    let Response = global.jQuery.ajax({
        url: ApiUrl.toString(),
        type: "POST",
        data: JSON.stringify({"Username": Username}),
        success: function(Response) {
            return Response.responseJSON["status"] || false
        },
        error: function(error) {
            console.log(error)
            return false
        }
    })
    return Response
}

function ValidateEmailRestController(Email) {
    // Checks if this Email is already been taken or not 
    let ApiUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/validate/email`)
    let Response = global.jQuery.ajax({
        url: ApiUrl.toString(),
        type: "POST",
        data: JSON.stringify({"Email": Email}),
        success: function(Response) {
            return Response.responseJSON["status"] || false
        },
        error: function(error) {
            console.log(error)
            return false
        }
    })
    return Response
}


export {
    ValidateEmailRestController,
    ValidateUsernameRestController
}