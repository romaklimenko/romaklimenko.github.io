---
title: "How to list Azure resource locations"
date: "2021-04-18"
tags: ["how-to", "cloud", "az-cli", "az-account"]
---

<img src="azure.png" class="img-fluid" />
<small><a href="https://azure.microsoft.com/en-us/global-infrastructure/geographies/" target="_blank">
    https://azure.microsoft.com/en-us/global-infrastructure/geographies/</a></small>

<br />
<br />

If you want to [create a new resource group](https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest#az_group_create) from Azure CLI. You can easily do it like that:
```shell
az group create --location westus -name MyResourceGroup
```

But what if you would like to create a resource group in Europe or Asia? What should you type instead of `westus`?

To have a complete list of available locations, you can run:
```shell
az account list-locations
```

You will get a long output like this:

```json
[
  // ...
  {
    "displayName": "Brazil Southeast",
    "id": "/subscriptions/.../locations/brazilsoutheast",
    "metadata": {
      "geographyGroup": "South America",
      "latitude": "-22.90278",
      "longitude": "-43.2075",
      "pairedRegion": [
        {
          "id": "/subscriptions/.../locations/brazilsouth",
          "name": "brazilsouth",
          "subscriptionId": null
        }
      ],
      "physicalLocation": "Rio",
      "regionCategory": "Other",
      "regionType": "Physical"
    },
    "name": "brazilsoutheast",
    "regionalDisplayName": "(South America) Brazil Southeast",
    "subscriptionId": null
  }
]
```

This list is hard to read and what you need from it is the `name` property of each location.
To get only names, use the `--query` parameter:

```shell
az account list-locations --query "[*].name"
```

The output is way readable now:

```json
[
  "eastus",
  "eastus2",
  "southcentralus",
  "westus2",
  "australiaeast",
  // ...
  "norwaywest",
  "switzerlandwest",
  "ukwest",
  "uaecentral",
  "brazilsoutheast"
]
```

But still, it would be nice to sort the list alphabetically:

```shell
az account list-locations --query "[*].name" --out tsv | sort
```
Output:
```
asia
asiapacific
australia
australiacentral
australiacentral2
australiaeast
australiasoutheast
brazil
brazilsouth
brazilsoutheast
canada
canadacentral
canadaeast
centralindia
centralus
centraluseuap
centralusstage
eastasia
eastasiastage
eastus
eastus2
eastus2euap
eastus2stage
eastusstage
europe
francecentral
francesouth
germanynorth
germanywestcentral
global
india
japan
japaneast
japanwest
jioindiawest
koreacentral
koreasouth
northcentralus
northcentralusstage
northeurope
norwayeast
norwaywest
southafricanorth
southafricawest
southcentralus
southcentralusstage
southeastasia
southeastasiastage
southindia
switzerlandnorth
switzerlandwest
uaecentral
uaenorth
uk
uksouth
ukwest
unitedstates
westcentralus
westeurope
westindia
westus
westus2
westus2stage
westus3
westusstage
```

If you are in PowerShell, you could filter the output like this:

```powershell
az account list-locations --query "[*].name" `
    | ConvertFrom-Json `
    | sort `
    | where { $_ -like "*europe*" }
```

Output:
```
europe
northeurope
westeurope
```