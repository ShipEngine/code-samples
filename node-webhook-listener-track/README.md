ShipEngine NodeJS Webhook Listener Example
==========================================
This is a fully functional webhook listener written in NodeJS using Express.  It provides a sample implementation for
 listening for `track` events.

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
cd code-samples/node-webhook-listener-track
npm install

```

## Implementation
This example application exposes an endpoint to receive webhook traffic and includes a sample implementation of what
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
