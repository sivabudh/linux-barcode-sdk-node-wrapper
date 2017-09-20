// Express
const express = require('express');
const app = express();

// Lodash
const _ = require('lodash');

// DBR
const dbr = require('./build/Release/dbr');
dbr.initLicense("t0068MgAAAGvV3VqfqOzkuVGi7x/PFfZUQoUyJOakuduaSEoI2Pc8+kMwjrojxQgE5aJphmhagRmq/S9lppTkM4w3qCQezxk=");

// Promisify
const {promisify} = require('util');
const decodeFilePromise = promisify(dbr.decodeFileAsync);

app.get('/', async (req, res) => {
    console.log("Received a barcode scan request!");
    try {
        const oneDimensionType = 0x3FF;
        const scannedResults = await decodeFilePromise('test.jpg', oneDimensionType);

        const imeiResults = _.uniq(_.map(_.filter(scannedResults, ['format', 'CODE_128']), 'value'));
        console.log(`Successfully scanned the image: ${imeiResults}`);

        res.send(`IMEI results: ${imeiResults}`);
    }
    catch (err) {
        console.log(`Failed to scan the image: ${err}`);
        res.send('Could not scan the barcode!');
    }
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
