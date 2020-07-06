const express = require('express');
const axios= require('axios');
const bodyParser = require('body-parser');
const fs= require('fs')
const path = require('path')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const API_KEY = 'YOUR_API_KEY';

app.post('/batch', async (req, res) => {

  const resourceUrl = req.body.resource_url;
  res.sendStatus(200);

  const resourceUrlResponse = await axios({
    method: 'get',
    url: resourceUrl,
    responseType: 'application/json',
    headers: {
      'api-key': API_KEY
    }
  });

  const labelUrl = resourceUrlResponse.data.label_download.pdf;
  const batchId = resourceUrlResponse.data.batch_id;

  const labelUrlResponse = await axios({
     method: 'get',
     url: labelUrl,
     responseType: 'stream',
     headers: {
       'api-key': API_KEY
     }
  });

  const dir = 'labels';

  try {
    if (!fs.existsSync(path.resolve(__dirname, dir,))) {
      fs.mkdirSync(dir)
    }
  } catch (err) {
    console.error('Error creating directory: ', err)
  }

  const filePath = path.resolve(__dirname, 'labels', `${batchId}.pdf`);
  const writer = fs.createWriteStream(filePath, { flag:'wx'});

  labelUrlResponse.data.on('data', function(chunk) {
    writer.write(chunk);
  });

});

let server = app.listen(3000, () => {
  console.log('Listening on port %d', server.address().port);
});
