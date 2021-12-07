'use strict';

const fs = require('fs');
const { MongoClient } = require('mongodb');
const minicrypt = require('./miniCrypt');
const mc = new minicrypt();

// Get the secrets
if (fs.existsSync('./secrets.json')) {
    const secrets = JSON.parse(fs.readFileSync('./secrets.json'));
    if (!process.env.SECRET) {
        process.env.SECRET = secrets.session;
    }
    if (!process.env.URI) {
        process.env.URI = secrets.uri;
    }
} else {
    if (!process.env.URI) {
        console.log('no URI for database!');
    }
    if (!process.env.SECRET) {
        console.log('no secrets!');
    }
}

// Connect to the database
const client = new MongoClient(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(_ => { });

module.exports = { client, mc };