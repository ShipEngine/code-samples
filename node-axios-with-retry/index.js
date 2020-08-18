const axios = require('axios');

const headers = {
  'api-key': '_YOUR_API_KEY_',
  'Content-Type': 'application/json',
};

const config = {
  headers,
  baseUrl:  'https://api.shipengine.com',
  validateStatus(){
    return true;
  },
  raxConfig: {

    // Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
    retry: 5,

    // Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
    noResponseRetries: 2,

    // Milliseconds to delay at first.  Defaults to 100.
    retryDelay: 100,

    // HTTP methods to automatically retry.  Defaults to:
    // ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT']
    httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT', 'POST'],

    // The response status codes to retry.  Supports a double
    // array with a list of ranges.  Defaults to:
    // [[100, 199], [429, 429], [500, 599]]
    statusCodesToRetry: [[429, 429]],

    // You can detect when a retry is happening, and figure out how many
    // retry attempts have been made
    onRetryAttempt: (err) => {
      const cfg = rax.getConfig(err);
      console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
    }
  }
};

async function createLabel(data) {
  return await axios.post('https://api.shipengine.com/v1/labels', data, config);
}

async function trackLabel(labelId) {
  return await axios.get(`https://api.shipengine.com/v1/labels/${labelId}/track`, config);
}

const labelData = {
  "shipment": {
    "service_code": "ups_ground",
    "ship_to": {
      "name": "Mickey and Minnie Mouse",
      "phone": "7147814565",
      "company_name": "The Walt Disney Company",
      "address_line1": "500 South Buena Vista Street",
      "city_locality": "Burbank",
      "state_province": "CA",
      "postal_code": "91521",
      "country_code": "US",
      "address_residential_indicator": "No"
    },
    "ship_from": {
      "name": "Shippy",
      "phone": "5124854282",
      "company_name": "ShipEngine",
      "address_line1": "3800 N. Lamar Blvd.",
      "address_line2": "Suite 220",
      "city_locality": "Austin",
      "state_province": "TX",
      "postal_code": "78756",
      "country_code": "US",
      "address_residential_indicator": "No"
    },
    "packages": [
      {
        "weight": {
          "value": 1.0,
          "unit": "ounce"
        }
      }
    ]
  },
  "is_return_label": false
};

async function createAndTrackLabel(data){
  let response = await createLabel(data);
  let labelId = response.data.label_id;
  let trackingResponse = await trackLabel(labelId);
  console.log(`Label with label_id=${labelId} is in the ${trackingResponse.data.status_description} state.`);
};

createAndTrackLabel(labelData);
