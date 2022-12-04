const express = require('express');
const applicationService = express() 

let STRIPE_SECRET_KEY = String(process.env.STRIPE_SECRET_KEY || 'sk_test_51KbRPhBlXqCTWmcH0ByNRrTQgKwsodAmpUfReugFtuxeAtMBe4ABVab2gaNvbDzGMAsnJcG1ANcZ8PcHnNI0c4Co00eRdg7s1O')
const Stripe = require('stripe').Stripe; 
const stripe = new Stripe(STRIPE_SECRET_KEY)

const winston = require('winston');

const Logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'payment-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "./paymentIntentErrorLogger.log", level: 'error' }),
    new winston.transports.File({ filename: './paymentCombinedLogger.log'}),
  ],
});

let crossOriginResourceSharingLib = require('cors');
let PAYMENT_APPLICATION_PORT = process.env.PAYMENT_APPLICATION_PORT


class CheckoutUploaderManager {
    // Class, responsible for saving the Checkout Documents to the Database 

    constructor(PaymentDocument) {
        this.PaymentIntentDocument = PaymentDocument
    }
    OperationTimeout() {
        return new Promise(() => {}, 1000)
    }
    async UploadCheckout() {
        // Uploading the Checkout Document to the Backend Server's Database 
        let APIUrl = new URL(`http://${process.env.BACKEND_APPLICATION_HOST}:${process.env.BACKEND_APPLICATION_HOST}/upload/payment/checkout/`)
        let HttpResponse = global.jQuery.ajax({
            url: APIUrl.toString(),
            data: JSON.stringify({"CheckoutDocument": this.PaymentIntentDocument}),
            type: "POST",
            async: false, 
            success: function(httpResponse) {
                return httpResponse.statusCode
            },
            error: function(httpError) {
                return httpError
            }
        })
        if (HttpResponse.statusCode.toString().startsWith("2")) {
        Logger.debug(`Payment Checkout #${this.PaymentIntentDocument["paymentId"]} has been Saved to the Storage`)}else{
        Logger.error(`Failed to Save the Payment Checkout to the Storage, Error: ` + HttpResponse.responseJSON["Error"])}
        return this.OperationTimeout()
    }
}

class PaymentWebhookManager {
    // Class, responsible for handling payment webhooks

    ProcessWebhookPaymentState(paymentEvent) {
        // Identifying the Payment Operation State 
        switch (paymentEvent.type){
            case "payment_intent.succeeded":
                Logger.debug("Payment Intent has been proceed successfully, Information: " + 
                JSON.stringify(paymentEvent.state.object))
                let PaymentIntentInformation = paymentEvent.state.object
                return PaymentIntentInformation

            case "payment_intent.attached": 
                Logger.info("Payment Intent has been attached to the Customer")
                return null 
            default:
                Logger.error("payment unhandled event type: " + paymentEvent.type)
                return null
        }
    }
}

applicationService.use(express.json())
applicationService.post("/create/payment/intent/", crossOriginResourceSharingLib(), async (request, response) => {
    // Processing the payment Intent Creation, based on the Input Data 

    // Setting up the Cors Headers

    response.setHeader("Access-Control-Allow-Origin", request.headers["access-control-allow-origin"])
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS,DELETE");
    response.setHeader("Access-Control-Allow-Credentials", true)

    try {
        let Amount = JSON.parse(request.body)["Amount"]
        let Currency = JSON.parse(request.body)["Currency"]
        let CustomerData = JSON.parse(request.body)["CustomerData"]

        let NewPaymentIntent = await stripe.paymentIntents.create({
            amount: Amount, 
            currency: Currency, 
            payment_method_types: "card",
            metadata: CustomerData + {CreatedAt: Date.now()}
        })

        console.log(NewPaymentIntent.client_secret);

        if (NewPaymentIntent.error != null) {
        Logger.debug("Processing Unsuccessful Payment Intent [ERROR]: " + NewPaymentIntent.error)
        return response.status(200).send({intentSecret: NewPaymentIntent.client_secret})}
        Logger.debug("Processing Successful Payment Intent")
        return response.status(400).send({error: NewPaymentIntent.error})
        
    }catch(responseError) {
        Logger.debug("Failed to Initialize new Payment intent", responseError)
        return response.status(500).send({error: responseError})
    }
})

applicationService.post("/payment/webhook/", express.raw({type: "application/json"}),
 async (request, response) => {
     // Processing the Payment Webhook Http Request
    let approvementSignatureHeader = request.headers["stripe-signature"]
    try {
        let event = stripe.webhooks.constructEvent(
            request.body, 
            approvementSignatureHeader,
            webhookStripeSecret
        )
        if (event != null) {
            let WebhookManager = new PaymentWebhookManager() 
            let CheckedWebhook = WebhookManager.ProcessWebhookPaymentState(event)
            if (CheckedWebhook != null) {async () => {
                let manager = new CheckoutUploaderManager(CheckedWebhook) 
                return manager.UploadCheckout()
            }}
        }
        response.setHeader("Cache-Control", "max_age=3600")
        response.status(201).send(`Payment has been Proceeded Successfully`)
    } catch(error) {
        Logger.info("Attempted to Fake the Webhook Payment Event")
        response.status(400).send(JSON.stringify({"Error": "Invalid Event: " + error}))
    }
})

applicationService.use(
    crossOriginResourceSharingLib(
    {
        origin: `http://${process.env.FRONTEND_APPLICATION_HOST}:${process.env.FRONTEND_APPLICATION_PORT}`, 
        methods: "POST,PUT,DELETE,OPTIONS", 
        exposedHeaders: "Keep-Alive,Connection",
    }
))

applicationService.listen(Number(PAYMENT_APPLICATION_PORT), function() {
    Logger.debug("Webhook Service has been Successfully Started");
    console.log("Webhook Service has been Successfully Started");
})
