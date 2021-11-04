'use strict';

const loginAPI = require('./api/login.js')
const tasksAPI = require('./api/tasks.js')
const classApi = require('./api/class.js');

const express = require('express');
const app = express();
const port = 8080;

app.use(express.json()); // process json 
app.use(express.static('./public')); // serve public files

// TODO: Do gets and posts

app.get("/class", classApi.classGet);
app.post("/class", classApi.classPost);

app.get("/login", loginAPI.profileGet)
app.get("/login", loginAPI.profilePost)

app.get("/home", tasksAPI.taskGet)
app.get("/home", tasksAPI.taskPost)

app.get("*", defaultHandler); // fall through

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function defaultHandler(request, response) {
    response.end(JSON.stringify({ result: 'error' }));
}