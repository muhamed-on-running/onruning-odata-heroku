const express = require('express');
const path = require('path')
const fs = require('fs')
const port = process.env.PORT || 5005;
const app = express();

//Index
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname+'/pages/index.html'))
);

//Sales order header and Sales order line 
app.get('/odata/sohs/\\$metadata', (req, res) => 
    res.sendFile(path.join(__dirname, 'xml/metadata/soh-only.xml'))
);

app.get('/odata/sohs-hsos/\\$metadata', (req, res) => 
    res.sendFile(path.join(__dirname, 'xml/metadata/soh-hso.xml'))
);

//HSOs with partner attribute in NavigationProperty
app.get('/odata/hsos/partner/\\$metadata', (req, res) => 
    res.sendFile(path.join(__dirname, 'xml/metadata/hsos-partner.xml'))
);

//HSOs without partner attribute in NavigationProperty
app.get('/odata/hsos/nopartner/\\$metadata', (req, res) => 
    res.sendFile(path.join(__dirname, 'xml/metadata/hsos-only.xml'))
);

//Single HSO with no relations
app.get('/odata/hso/\\$metadata', (req, res) => 
    res.sendFile(path.join(__dirname, 'xml/metadata/hso-single.xml'))
);

app.listen(port, () => console.log(`Listening on port ${port}..`));