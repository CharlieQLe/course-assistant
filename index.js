'use strict';

const loginAPI = require('./api/login.js')
const taskAPI = require('./api/tasks.js')
const classApi = require('./api/class.js');
const noteApi = require('./api/notepad.js');
const flashcardApi = require('./api/flashcard.js');

const express = require('express');
const app = express();

app.use(express.json()); // process json 
app.use(express.static('./public')); // serve public files
app.use(express.static('./public/css')); // serve public files
app.use(express.static('./public/js')); // serve public files

// TODO: Do gets and posts

app.get("/:user/class", classApi.get);
app.post("/:user/class", classApi.post);

app.post("/", loginAPI.profilePost)

app.get("/home", taskAPI.taskGet)
app.post("/home", taskAPI.taskPost)

app.get("/:user/:class/note", noteApi.get)
app.post("/note", noteApi.post)

app.get("/:user/:class/flashcard", flashcardApi.get)
app.post("/flashcard", flashcardApi.post)


app.get("*", defaultHandler); // fall through

app.listen(process.env.PORT || 8080, () => console.log(`Server listening on http://localhost:${process.env.PORT || 8080}`));

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function defaultHandler(request, response) {

    response.end(JSON.stringify({ result: 'error', path: __dirname, request: request.path }));
}