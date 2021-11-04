'use strict';

const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());

// TODO: Do gets and posts

app.get("*", defaultHandler); // fall through

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function defaultHandler(request, response) {
    response.end(JSON.stringify({ result: 'error' }));
}