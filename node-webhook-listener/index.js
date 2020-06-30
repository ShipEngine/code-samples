const express = require('express');
const axios= require('axios');
const bodyParser = require('body-parser');
const fs= require('fs')
const path = require('path')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const API_KEY = 'YOUR_API_KEY';

app.post('/track', function (req, res) {

  let trackingNumber = req.body.data.tracking_number;
  let statusCode = req.body.data.status_code;

  if(statusCode == 'DE') { // Package was delivered

    // Use the trackingNumber to get the contact
    // info associated with this package from your backend system.
    // Email the user that the package was delivered.

    res.sendStatus(200);
  }
});

app.post('/batch', function (req, res) {
  let batchId;
  const resourceUrl = req.body.resource_url;

  res.sendStatus(200);

  axios({
    method: 'get',
    url: resourceUrl,
    responseType: 'application/json',
    headers: {
      'api-key': API_KEY
    }
  })
  .then(function (response) {
    const labelUrl = response.data.label_download.pdf;
    batchId = response.data.batch_id;

    axios({
      method: 'get',
      url: labelUrl,
      responseType: 'stream',
      headers: {
        'api-key': API_KEY
      }
    })
    .then((response) => {
      const filePath = path.resolve(__dirname, 'labels', `${batchId}.pdf`)

      fs.mkdir('labels', { recursive: true }, (err) => {
        if (err) throw err;
      });

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
    })
    .catch((e) => {
      console.log(e);
    });
  });
});

let server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
