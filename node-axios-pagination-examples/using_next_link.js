const axios = require('axios');

// Set up headers to use with axios HTTP client
const headers = {
    'api-key': '<YOUR_API_KEY>',
    'Content-Type': 'application/json',
};

// Create axios config
const config = {
    headers,
    baseURL:  'https://api.shipengine.com',
    validateStatus(){
        return true;
    }
};

async function getLabels() {

    // Make the initial request
    let getLabelsResponse = await axios.get('/v1/labels', config);

    // getLabelsResponse will contain the first page of data in the response
    // Add code to use that data in your application

    console.log(`This is page ${getLabelsResponse.data.page}`)

    // Loop through the paginated data using the next link to get the rest of the data.
    // As long as there is a next href, we have more data.
    while (getLabelsResponse.data.links.next.href) {
        getLabelsResponse = await axios.get(getLabelsResponse.data.links.next.href, config);
        // Add code to use this page of data in your application
        console.log(`This is page ${getLabelsResponse.data.page}`)
    }
}

getLabels().catch( (e) => {
    console.log(`There was an error: ${e.message}`);
});
