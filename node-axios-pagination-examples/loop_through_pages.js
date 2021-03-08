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
    const { pages } = getLabelsResponse.data;
    console.log(`There are ${pages} pages of data in this response.`);


    // getLabelsResponse will contain the first page of data in the response
    // Add code to use that data in your application here

    console.log(`This is page ${getLabelsResponse.data.page}`)

    // Loop through the paginated data using URL query parameter
    for(let i=2; i <= pages; i++) {

        // Add url params to existing config object.
        // You can also add page_size if you wish to change the default page size, which is 25.
        config.params = {
            page: i,
        };

        getLabelsResponse = await axios.get('/v1/labels', config);
        // Add code to use this page of data in your application
      console.log(`This is page ${getLabelsResponse.data.page}`);
    }
}

getLabels().catch( (e) => {
    console.log(`There was an error: ${e.message}`);
});
