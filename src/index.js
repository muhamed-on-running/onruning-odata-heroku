const express = require('express');
const path = require('path')
const fs = require('fs')
const port = process.env.PORT || 5005;
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Edurekas REST API with Node.js Tutorial!!');
    });

app.get('/odata', function(req, res){
    res.contentType('application/xml');
    res.sendFile(path.join(__dirname , 'Metadata/metadata.xml'));
});

app.listen(port, () => console.log(`Listening on port ${port}..`));