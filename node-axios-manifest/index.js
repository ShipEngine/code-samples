const axios = require('axios');
const { DateTime } = require('luxon');
const fs = require('fs');
const path = require('path');

// Set up headers to use with axios HTTP client
const headers = {
    'api-key': '<YOU_API_KEY>',
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

async function createManifest() {
    // Create timestamps for the beginning and end of our business day
    const date = new Date();
    const startDate = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ hours: 6 }).toISO();
    const endDate = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ hours: 18 }).toISO();

    // Add url params to existing config object
    config.params = {
        created_at_start: startDate,
        created_at_end: endDate
    };

    // Make the request
    const getLabelsResponse = await axios.get('/v1/labels', config);

    // Loop through the labels returned in the response above and grab the label_id of each one
    const labelIds = getLabelsResponse.data.labels.map( (label) => {
        return label.label_id
    });

    // Create the payload for the request
    const data = {
        label_ids: labelIds
    };

    // Make the request
    const createManifestResponse = await axios.post('/v1/manifests', data, config);

    // Grab the data we are interested in
    const manifestUrl = createManifestResponse.data.manifest_download.href;
    const manifestId = createManifestResponse.data.manifest_id

    // Update the responseType on the existing config object to 'stream' to download the PDF
    config.responseType = 'stream';

    // Make the request
    const downloadManifestResponse = await axios.get(manifestUrl, config);

    // Directory where we want to store manifests
    const dir = 'manifests';

    try {
        if (!fs.existsSync(path.resolve(__dirname, dir,))) {
            fs.mkdirSync(dir)
        }
    } catch (err) {
        console.error('Error creating directory: ', err)
    }

    // The file we want to save the manifest to. It is convenient to use the manifest_id.
    const filePath = path.resolve(__dirname, dir, `${manifestId}.pdf`);
    const writer = fs.createWriteStream(filePath, { flag:'wx'});

    // Write the data to the file
    downloadManifestResponse.data.on('data', function(chunk) {
        writer.write(chunk);
    });
}

createManifest().catch( (e) => {
    console.log(`There was an error: ${e.message}`);
});
