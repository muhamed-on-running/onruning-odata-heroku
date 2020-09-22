const express = require('express');
const path = require('path')
const fs = require('fs')
const port = process.env.PORT || 5005;
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Edurekas REST API with Node.js Tutorial!!');
    });

app.get('/odata/\\$metadata', function(req, res){
    res.contentType('application/xml');
    res.sendFile(path.join(__dirname , 'Metadata/metadata-single.xml'));
});

// app.get('/odata/hsos/\\$metadata', function(req, res){
//     res.contentType('application/xml');
//     res.sendFile(path.join(__dirname , 'Metadata/metadata-short.xml'));
// });

app.get('/odata/hsos/\\$metadata', function(req, res){
    res.contentType('application/xml');
    res.sendFile(path.join(__dirname , 'Metadata/metadata-short-oneway.xml'));
});

app.get('/odata/entities/\\$metadata', function(req, res){
    res.contentType('application/xml');
    res.sendFile(path.join(__dirname , 'Metadata/metadata-hsos.xml'));
});

app.get('/odata/hsoentities/\\$metadata', function(req, res){
    res.contentType('application/xml');
    res.sendFile(path.join(__dirname , 'Metadata/metadata-hso-entities.xml'));
});


app.listen(port, () => console.log(`Listening on port ${port}..`));