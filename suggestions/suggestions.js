import "../rest/suggestions.js"
// Package that Parsers Suggested Resources for the Virtual Machine

class SuggestionsReturner {

  function GetSuggestedDatacenters() -> list {
    // Returns List of avaialble Datacenters, to deploy your VM Server
    return suggestions.GetDatacenterSuggestionsRestController()
  }

  function GetSuggestedOsSystems() -> list {
    // Returns List of the OS Systems + Distributions, that can be used as a Main OS on the VM 
    return suggestions.GetOsSystemSuggestionsRestController()
  }

  function GetSuggestedPreInstallTools() -> list{
    // Returns List of tools, that can be pre-installed on the Virtual Machine
    return suggestions.GetPreInstalledToolSuggestionsRestController()
  }
}
