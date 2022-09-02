import * as suggestions from "../rest/suggestions.js"
// Package that Parsers Suggested Resources for the Virtual Machine


/* eslint-disable no-unused-vars */

class SuggestionsReturner {
  // Class Represents Suggestion Manager
  GetSuggestedDatacenters = function(){
    // Returns List of avaialble Datacenters, to deploy your VM Server
    return suggestions.GetDatacenterSuggestionsRestController()
  }

  GetSuggestedOsSystems = function(){
    // Returns List of the OS Systems + Distributions, that can be used as a Main OS on the VM
    return suggestions.GetOsSystemSuggestionsRestController()
  }

  GetSuggestedPreInstallTools = function(){
    // Returns List of tools, that can be pre-installed on the Virtual Machine
    return suggestions.GetPreInstalledToolSuggestionsRestController()
  }
}
