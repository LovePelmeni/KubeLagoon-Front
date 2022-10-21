class UniqueCodeLinkGenerator {
    // Generates the Unique Link, that redirects to the Reset Password Page 
    GenerateCode() {

    }
    GenerateFullLink() {

    }
}

class InstructionsManager {
    // Manager for the Instructions for the Password Resetting 
    GetInstructions() {
        return ""
    }
}

class EmailResetPasswordNotificationManager {
    // Manager for sending out "Reset Password" Link with the Instructions for the Password Reset
    constructor(JwtToken, Email) {
        this.Email = this.GetIdentifier(JwtToken, Email)
    } 

    GetIdentifier(JwtToken, Email) {
        // Picking up the 
        if (Email != null) {
            return Email 
        }
        if (JwtToken != null) {
            return JwtToken
        }
    }

    SendEmailResetMessage() {
        // Sending to the Customer's Email 
    }
} 