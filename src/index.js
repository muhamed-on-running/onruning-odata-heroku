const express = require('express');
const path = require('path')
const fs = require('fs')
const port = process.env.PORT || 5005;
const bodyParser = require('body-parser');
const app = express();
const querystring = require('querystring');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname + '/pages/index.html'))
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

app.get('/external/metadata.svc/', (req, res) =>
    res.sendFile(path.join(__dirname, 'xml/metadata/external-data-service.xml'))
);

app.get('/external/metadata.svc/\\$metadata', (req, res) =>
    res.sendFile(path.join(__dirname, 'xml/metadata/external-metadata-example.xml'))
);

app.get('/external/metadata.svc/\\$metadata#Categorys', (req, res) => {
    fs.readFile(path.join(__dirname, 'xml/metadata/external-data-example.json'), 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        res.send(JSON.parse(data));
    })
}
);

app.get('/external/metadata.svc/Categorys', (req, res) => {
    fs.readFile(path.join(__dirname, 'xml/metadata/external-data-example.json'), 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.setHeader("Preference-Applied", "odata.track-changes")
        res.send(JSON.parse(data));
    })
}
);

app.get('/json/data', (req, res) => {
    console.log(path.join(__dirname, 'json/example.json'));
    fs.readFile(path.join(__dirname, 'json/example.json'), 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        res.send(JSON.parse(data));
    })
}
);

/*****************/
/* new endpoints */
app.get('/example/service/', (req, res) =>
    res.sendFile(path.join(__dirname, 'odata/service.json'))
);
app.get('/example/service/\\$metadata', (req, res) =>
    res.sendFile(path.join(__dirname, 'odata/metadata.xml'))
);
//example/service
app.get('/example/service/Dummies', (req, res) => {
    try {
        var url = require('url');
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query.$filter;
        if(query) {
            if (query.includes('1')) {
                res.sendFile(path.join(__dirname, 'odata/firstItemFilter.json'));
            }
            else if (query.includes('2')) {
                res.sendFile(path.join(__dirname, 'odata/secondItemFilter.json'))
            }
            else {
                res.setHeader("Preference-Applied", "odata.track-changes")
                res.sendFile(path.join(__dirname, 'odata/setList.json'))
            }
        } else {
            res.setHeader("Preference-Applied", "odata.track-changes")
            res.sendFile(path.join(__dirname, 'odata/setList.json'))
        }
      }
      catch (e) {
       res.send(e);
      }
});

app.get('/example/service/Dummies[(]1[)]', (req, res) =>
    res.sendFile(path.join(__dirname, 'odata/firstItem.json'))
);

app.get('/example/service/Dummies[(]2[)]', (req, res) =>
    res.sendFile(path.join(__dirname, 'odata/secondItem.json'))
);

app.get('/example/update', (req, res) => {
    var url = require('url');
    console.log("in");
    // read file and make object
    let content = JSON.parse(fs.readFileSync(path.join(__dirname,'odata/setList.json')));
    var url_parts = url.parse(req.url, true);
    let old = content.value[0].Name;
    console.log(old);
    var name = url_parts.query.name
    content.value[0].Name = old + name;
    fs.writeFileSync(path.join(__dirname,'odata/setList.json'), JSON.stringify(content, null, 2))
    res.send('OK');
})


app.listen(port, () => console.log(`Listening on port ${port}..`));