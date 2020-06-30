ShipEngine NodeJS Webhook Listener Example
==========================================
This is a fully functional webhook listener written in NodeJS using Express. It currently provides sample endpoints for
`batch` and `track` events.

## Pre-Requisites
1. Install [NodeJS](https://nodejs.org) per the site's instructions. Likewise, you can use other package managers,
such as [HomeBrew](https://brew.sh/) on macOS or Linux, and [Choclatey](https://chocolatey.org/) for Windows.
1. Verify that [npm](https://www.npmjs.com/) was installed successfully along with NodeJS by running the following command
from a terminal: `npm -v`.

## Setup
Clone the repo:
```
git clone git@github.com:ShipEngine/code-samples.git
```

Install dependencies:
```
cd code-samples/node-webhook-listener
npm install

```

## Implementation
This example application exposes endpoints to receive webhook traffic and includes a sample implementation of what
action your application might take once the webhook is received. You should replace the sample implementation with
the logic that meets your business needs.

At a minimum, you will need to set the `API_KEY` variable at the top of the file to a valid API key for your account.
```
const API_KEY = 'YOUR_API_KEY';
```
## Run the Application
```
npm start
```

## Helper Script
This repo contains a helper script, `trigger-webhooks.js`, that you can use to programmatically trigger `batch` webhook requests in ShipEngine.
You must set the constant variables at the top of the file to valid values for your account. You must set a `WAREHOUSE_ID` because
batch processing can only be performed for shipments originating from a warehouse. You must provide a valid `CARRIER_ID`
for a carrier connected to your ShipEngine account and provide a valid service code for that carrier. This example creates
a shipment that will be sent from a warehouse in Austin, TX to a recipient in San Jose, CA, so be sure to use a domestic
service code such as `usps_first_class_mail` or `ups_ground`, depending on the carrier you use.

```
// Fill in the following variables with your own data
const API_KEY = 'YOUR_API_KEY';
const WAREHOUSE_ID = 'YOUR_WAREHOUSE_ID';
const SERVICE_CODE = 'YOU_SERVICE_CODE';
const CARRIER_ID = 'YOUR_CARRIER_ID';
```
