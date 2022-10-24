var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT 


function GetVirtualMachineWeekResourceMetricsRestController(JwtToken, VirtualMachineId) {
    // Rest Controller, that returns Resource Usage Metrics of the Virtual Machine Server within the Week 
    let apiUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/health/week/metrics`)
    apiUrl.searchParams.append("VirtualMachineId", VirtualMachineId)
    let ResponseMetrics, ResponseError = global.jQuery.ajax({
        url: apiUrl.toString(),
        type: "GET",
        headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Authorization": JwtToken,
        },
        success: function(Response) {
            // Returns Success Response 
            if (Response.StatusCode == "200") {
                return Response.Metrics, null
            }else{
                let newError = new Error(Response.Error)
                return [], newError
            }
        },
        error: function(ResponseError) {
            // Returns Exception
            let newError = new Error(ResponseError)
            return null, newError
        },
    })
    return ResponseMetrics, ResponseError
}

function GetVirtualMachineResourceMetricsRestController(JwtToken, VirtualMachineId) {
    // Rest Controller, that Parses current Resource Usage Info of the Virtual Machine Server 

    let apiUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/health/metrics`)
    apiUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

    let ResponseMetrics, ResponseError = global.jQuery.ajax({
        url: apiUrl.toString(),
        type: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "GET,POST,PUT,DELETE",
            "Authorization": JwtToken,
        },
        success: function(Response) {
            // Returns Response Metrics 
            if (String(Response.statusCode) == "200") {
                return Response.responseJSON["data"], null 
            }
            if (String(Response.statusCode == "400")) {
                return {}, null
            }
            return {}, null
        },
        error: function(ResponseError) {
            // Response Cotnroller
            let error = new Error(ResponseError)
            return null, error
        }
    })
    return ResponseMetrics, ResponseError
}


export { GetVirtualMachineResourceMetricsRestController, GetVirtualMachineWeekResourceMetricsRestController}