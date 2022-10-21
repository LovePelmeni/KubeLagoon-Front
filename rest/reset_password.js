var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST 
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT 


function ResetPasswordRestController(JwtToken, NewPassword) {
    // Resets the Password, Passed on the 
    let APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/reset/password/`)
    let Response, ResponseError = global.jQuery.ajax({
        url: APIUrl.toString(),
        async: false, 
        data: JSON.stringify({"NewPassword": NewPassword}),
        headers: {
            "Authorization": JwtToken, 
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
        },
        success: function(Response) {
            // Processing Success Password Reset 
            if (Response.StatusCode === "201" || Response.StatusCode === "200") {
                return true, null
            }else{
                let error = new Error(Response.responseJSON.Error)
                return false, error
            }
        },
        error: function(error) {
            // Processing Failure 
            let newError = new Error(error)
            return false, newError
        },
    })
    return Response, ResponseError
}

