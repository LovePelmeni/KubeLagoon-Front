<template>

    <div class="container connectionInfo fluid" style="position: relative">

        <v-card-actions
        style="
            align-items: flex-end;
            flex: 0 0 auto;

            min-height: 52px;
            padding: 0.5rem;

            max-width: 20%;
            position: absolute;

            right: 0;
            top: 0;
            top: 70px;
        ">
        <v-btn icon @click="showConnectionInfoDocs = !showConnectionInfoDocs">
            <v-icon>{{ showConnectionInfoDocs ? 'mdi-cast-connected' : 'mdi-cast-connected' }}</v-icon>
        </v-btn>
        
        </v-card-actions>

    <v-expand-transition>

        <div class="transitionBlock" v-show="showConnectionInfoDocs">
        <v-divider style="max-width: 60%"></v-divider>
        
        <v-card-text style="background-color: #1e2139; border-radius: 10px;">

            <v-icon v-if="VirtualMachine?.Running === true" style="color: green; margin-bottom: 52px; margin-left: 10px;">mdi-check-bold</v-icon>
            <v-icon v-if="VirtualMachine?.Shutdown === true" style="color: red; margin-right: 10px; margin-bottom: 3px;">mdi-close</v-icon>
            <v-icon v-if="VirtualMachine?.Deploying === true" style="color: yellow; margin-right: 10px; margin-bottom: 3px;">mdi-clock-outline</v-icon>
            <v-icon v-if="VirtualMachine?.Running === false && VirtualMachine?.Shutdown === false && VirtualMachine?.Deploying === false" style="color: red; margin-right: 10px; margin-bottom: 3px;">mdi-emoticon-dead</v-icon>

            <label style="color: #fff; max-width: 60%; margin-top: 10px; margin-bottom: 20px; font-size: 1rem;" v-if="VirtualMachine?.Running === true">
            Congrats! Your Virtual Server is Running, you can connect to it using instructions down below
            </label> 

            <label style="color: #fff; max-width: 60%; margin-top: 10px; margin-bottom: 20px; font-size: 1rem;" v-if="VirtualMachine?.Deploying === true">
            Your Virtual Server is being deployed, please wait
            </label> 

            <label style="color: #fff; max-width: 60%; margin-top: 10px; margin-bottom: 20px; font-size: 1rem;" v-if="VirtualMachine?.Shutdown === true">
            Your Virtual Server is shutdown. Run it up in order to connect.
            </label> 

            <label style="color: #fff; max-width: 60%; margin-top: 10px; margin-bottom: 20px; font-size: 1rem;" v-if="VirtualMachine?.Running === false && VirtualMachine?.Deploying === false && VirtualMachine?.Shutdown === false">
            Oops, Your Virtual Server has been Failed to Deploy
            </label> 


        <!-- Instructions for the SSH Using Root Credentials of the Virtual Server  -->
        <p style="margin-top: 20px; margin-bottom: 30px;" v-if="VirtualMachine.Ssh.byRootCredentials === true && VirtualMachine.Running === true">You are able to Connect to your<code translate="no" dir="ltr">
        <var translate="no">Virtual Server</var>
        </code> with your 
        <code translate="no" dir="ltr">
        Username and Password
        </code>
        Credentials. Just Copy this command into the terminal.</p>

        <!-- Instructions for the SSH using Root Certificate  -->
        <p style="margin-top: 20px; margin-bottom: 30px;" v-if="VirtualMachine.Ssh.byRootCertificate === true && VirtualMachine.Running === true">Replace <code translate="no" dir="ltr">
        <var translate="no">ROOT_CERTIFICATE_PATH</var>
        </code> with your 
        Path to the Downloaded Root Certificate for your Virtual Server.
        Haven't downloaded Root Certificate?
        Download it by clicking on the 
        <code translate="no" dir="ltr">
        Download Certificate
        </code>
        button.</p>

        <div v-if="VirtualMachine?.Ssh.byRootCredentials === true && VirtualMachine?.Running === true" class="code-toolbar"><pre class="prefixed command language-bash" style="    
        background: #081b4b;
        color: #fff;
        border-radius: 16px;
        display: block;
        margin: 1em 0;
        overflow: auto;
        overflow-wrap: normal;
        padding: 1em;
        max-width: 70%;
        margin-left: 150px;
        white-space: normal;
        word-wrap: normal;">
                <code>
                    <ol>
                        <li data-prefix="~">
                        ssh   
                        <span class="token builtin class-name" style="
                        color: #ff4084;
                        background: none;
                        border-radius: 0;
                        display: inline;
                        font-weight: 400;
                        margin: 0;
                        padding: 0;"> {{VirtualMachine?.Ssh.RootUsername}}@{{ VirtualMachine?.Ssh.IpAddress}} </span> 
                         -p {{ VirtualMachine?.Ssh.RootPassword }}
                        </li>
                    </ol>
                </code>
            </pre>
        </div>



         <div v-if="VirtualMachine?.Ssh.byRootCertificate === true && VirtualMachine?.Running === true" class="code-toolbar">
             <pre class="prefixed command language-bash" style="    
            background: #081b4b;
            color: #fff;
            border-radius: 16px;
            display: block;
            margin: 1em 0;
            overflow: auto;
            overflow-wrap: normal;
            padding: 1em;
            white-space: normal;
            word-wrap: normal;
            max-width: 70%;
            margin-left: 150px;">
                <code>
                    <ol>
                        <li data-prefix="~">
                        ssh 
                        <span class="token builtin class-name" style="
                        color: #ff4084;
                        background: none;
                        border-radius: 0;
                        display: inline;
                        font-weight: 400;
                        margin: 0;
                        padding: 0;">{{VirtualMachine?.Ssh.RootUsername}}@{{ VirtualMachine?.Ssh.IpAddress}}</span> 
                        -i <var translate="no">ROOT_CERTIFICATE_PATH</var>
                        </li>
                    </ol>
                </code>
             </pre>
        </div>

        <p v-if="DownloadFailure == true" style="margin-top: 20px; margin-bottom: 30px; color: red; ">{{ DownloadFailureError }}</p>

        <button  @click="DownloadSshCertificateFile()"  class="btn btn-upload-certificate" style="margin-top: 20px; color: #fff; !important" v-if="VirtualMachine.Running === true">
        <a download v-if="VirtualMachine?.Ssh.byRootCertificate === true "><label id="downloadLabel" style="color: #fff !important;" v-if="VirtualMachine.Running === true">Download Certificate</label></a>
        </button>

        </v-card-text>

        </div>
    </v-expand-transition>

</div>
</template>


<script>


import * as ssh from "../../ssh/ssh.js";

export default {
    name: "VirtualMachineConnectionInfo",
    props: ["VirtualMachine"],
    data() {
        return {
            DownloadFailure: false,
            DownloadFailureError: null, 
            showConnectionInfoDocs: false,
        }
    },
    methods: {
       DownloadSshCertificateFile() {
           // Obtaining the Content of the SSH Certificate for the Virtual Machine Server
            let SshKeyPath = `/path/to/${this.VirtualMachine.VirtualMachineId}/${this.VirtualMachine.VirtualMachineName}/cert/`
            // Initializing SSH Manager For the Virtual Server 
            let sshContentManager = new ssh.VirtualMachineSshManager()
            let CertificateContent = sshContentManager.GetSshCertificate(this.JwtToken, SshKeyPath, this.VirtualMachine.VirtualMachineId)
            if (CertificateContent == null) {
            this.DownloadFailure = true; this.DownloadFailureError = "Failed To Download SSL Certificate, please try again later";
            document.getElementById("downloadLabel").innerHTML = "Failed"}else{

            // Downloading the File with SSH Content from the Browser 

            let filename = "customer_avatar"
            var element = document.createElement('a');
            element.setAttribute('href', 'data:application/x-x509-ca-cert;charset=utf-8,' + encodeURIComponent(CertificateContent));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            
            // Imittating the Clicking and downloading the file 
            element.click();
            document.body.removeChild(element);

            }
       },
    }
}



</script>

<style lang="scss">
.btn-upload-certificate {
    background-color: #ec5555;
    color: #fff !important;
}
</style> 