const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const API_KEY = 'YOUR_API_KEY';

app.post('/track', (req, res) => {

  let trackingNumber = req.body.data.tracking_number;
  let statusCode = req.body.data.status_code;

  if(statusCode === 'DE') { // Package was delivered

    // Use the trackingNumber to get the contact
    // info associated with this package from your backend system.
    // Email the user that the package was delivered.

  }
  res.sendStatus(200);
});

let server = app.listen(3000, () => {
  console.log('Listening on port %d', server.address().port);
});
