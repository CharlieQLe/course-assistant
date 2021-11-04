'use strict';


const express = require('express');
const app = express();
let port = 8080;

const express = require('express');
const app = express();

// TODO - Add gets and posts here

// Fall-through
app.get('*', (req, res) => res.send(JSON.stringify({ result: 'command not found' })));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
