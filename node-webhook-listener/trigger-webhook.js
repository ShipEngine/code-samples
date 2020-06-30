const axios= require('axios');
const urljoin = require('url-join');
const util = require('./util.js');

const baseUrl = 'https://api.shipengine.com';
const shipDate = util.getFutureDate();

// Fill in the following variables with your own data
const API_KEY = 'YOUR_API_KEY';
const WAREHOUSE_ID = 'YOUR_WAREHOUSE_ID';
const SERVICE_CODE = 'YOU_SERVICE_CODE';
const CARRIER_ID = 'YOUR_CARRIER_ID';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'api-key': API_KEY,
        responseType: 'application/json'
    }
});

const shipmentPayload =
{
  'shipments': [
   {
     'carrier_id': CARRIER_ID,
     'service_code': SERVICE_CODE,
     'ship_to': {
        'name': 'Jane Doe',
        'phone': '714-781-4565',
        'company_name': '',
        'address_line1': '525 S Winchester Blvd',
        'city_locality': 'San Jose',
        'state_province': 'CA',
        'postal_code': '91128',
        'country_code': 'US'
      },
      'warehouse_id': WAREHOUSE_ID,
      'packages': [
       {
         'weight': {
           'value': 1.0,
           'unit': 'ounce'
         }
       }
      ]
    }
  ]
};

const batchPayload =
{
    'batch_notes': 'Batch to Test Webhook',
    'shipment_ids': [
        ''
    ],
    'rate_ids': []
};

const processBatchPayload =
{
    'ship_date': shipDate,
    'label_layout': '4x6',
    'label_format': 'pdf'
};

axiosInstance({
    method: 'POST',
    url: '/v1/shipments',
    data: shipmentPayload
})
.then(function (response) {
    console.log('Create shipment status: ', response.status);
    const shipmentId = response.data.shipments[0].shipment_id;
    console.log('shipmentId=', shipmentId);

    batchPayload.shipment_ids[0] = shipmentId;

    axiosInstance({
        method: 'POST',
        url: '/v1/batches',
        data: batchPayload

    })
    .then((batchResponse) => {
        console.log('Create bach status: ', batchResponse.status);
        const batchId = batchResponse.data.batch_id;
        console.log(`batchId=${batchId}`)
        axiosInstance({
            method: 'POST',
            url: `/v1/batches/${batchId}/process/labels`,
            data: processBatchPayload

        })
        .then((res) => {
         console.log('Process batch status: ', res.status);
         console.log('Batch processed');
        })
        .catch((e) => {
            console.log(`Error processing batch ${e}`);
        });
    })
    .catch((e) => {
        console.log(`Error creating batch: ${e}`);
    });
})
.catch((e) => {
    console.log(`Error creating shipment: ${e}`);
});




