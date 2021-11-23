'use strict';

const fs = require('fs');
const { MongoClient } = require('mongodb');

// Get the secrets
let secrets;
let uri = '';
if (!process.env.URI) {
    if (fs.existsSync('./secrets.json')) {
        secrets = JSON.parse(fs.readFileSync('./secrets.json'));
        uri = secrets.uri;
    } else {
        console.log('no secrets json found!');
    }
} else {
    uri = process.env.URI;
}

// Connect to the database
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => { });

module.exports = { client };