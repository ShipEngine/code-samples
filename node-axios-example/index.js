const axios = require('axios');

const headers = {
  'api-key': '<your api-key>',
  'Content-Type': 'application/json',
};

const config = {
  headers,
  baseUrl:  'https://api.shipengine.com',
  validateStatus(){
    return true;
  }
};

async function createLabel(data) {
  let response = await axios.post('https://api.shipengine.com/v1/labels', data, config);
  return response;
}

async function trackLabel(labelId) {
  let response = await axios.get(`https://api.shipengine.com/v1/labels/${labelId}/track`, config);
  return response;
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
