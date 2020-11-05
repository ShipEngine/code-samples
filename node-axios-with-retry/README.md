# Purpose #
The purpose of this code example is to demonstrate how to use [Node.js](https://nodejs.org/en/) 
and the [axios](https://github.com/axios/axios) library to make HTTP requests
to the ShipEngine API. This example demonstrates adding the (`retry-axios`) (https://github.com/JustinBeckwith/retry-axios/blob/master/README.md)
interceptor to handle HTTP [429 errors](https://www.shipengine.com/docs/rate-limit).

# Pre-Requisites #
This example assumes that you have already connected a UPS carrier and have a basic understanding of Javascript.

# Run It! #
1. Install [Node.js](https://nodejs.org/en/)
2. Install [NPM](https://nodejs.org/en/download/package-manager/).
3. Install pre-requisites by running `npm install from the top-level directory.
3. Replace `'<your api-key>'` with a valid API key for your ShipEngine account. (or replace `service_code` with a valid
service code for your connected carrier)
4. Run the script by running `npm run example.
