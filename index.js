'use strict';

const { MongoClient } = require('mongodb');
const userAPI = require('./api/user.js');
const taskAPI = require('./api/tasks.js');
const classAPI = require('./api/class.js');
const tagAPI = require('./api/tags.js');
const noteAPI = require('./api/notepad.js');
const flashcardAPI = require('./api/flashcard.js');

const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json()); // process json 
app.use(express.static('./public')); // serve public files
app.use(express.static('./public/css')); // serve public files
app.use(express.static('./public/js')); // serve public files

// Set the signup and login endpoints
app.post("/api/signup", userAPI.postSignup);
app.post("/api/login", userAPI.postLogin);

// Set the user endpoints
app.get("/api/users/:user", userAPI.getData);
app.post("/api/users/:user/edit", userAPI.postEdit);
app.post("/api/users/:user/delete", userAPI.postDelete);

// Set the task endpoints
app.get("/api/users/:user/tasks", taskAPI.getAll);
app.post("/api/users/:user/tasks/create", taskAPI.postCreate);
app.post("/api/users/:user/tasks/:taskid", taskAPI.getTask);
app.post("/api/users/:user/tasks/:taskid/edit", taskAPI.postEdit);
app.post("/api/users/:user/tasks/:taskid/remove", taskAPI.postRemove);

// Set the class endpoints
app.get("/api/users/:user/class/", classAPI.getAll);
app.get("/api/users/:user/class/:class", classAPI.getClass);
app.post("/api/users/:user/class/:class/create", classAPI.postCreate);
app.post("/api/users/:user/class/:class/edit", classAPI.postEdit);
app.post("/api/users/:user/class/:class/remove", classAPI.postRemove);
app.get("/api/users/:user/class/:class/search", classAPI.getSearch);

// Set the tag endpoints
app.get("/api/users/:user/tags", tagAPI.getAll);
app.post("/api/users/:user/tags/:tag/create", tagAPI.postCreate);
app.post("/api/users/:user/tags/:tag/remove", tagAPI.postRemove);

// Set the note endpoints
app.get("/api/users/:user/class/:class/notes/:note", noteAPI.getNote);
app.get("/api/users/:user/class/:class/notes/:note/tags", noteAPI.getTags);
app.post("/api/users/:user/class/:class/notes/:note/create", noteAPI.postCreate);
app.post("/api/users/:user/class/:class/notes/:note/remove", noteAPI.postRemove);
app.post("/api/users/:user/class/:class/notes/:note/edit", noteAPI.postEdit);
app.post("/api/users/:user/class/:class/notes/:note/addTags", noteAPI.postAddTags);
app.post("/api/users/:user/class/:class/notes/:note/removeTags", noteAPI.postRemoveTags);

// Set the flashcard endpoints
app.get("/api/users/:user/class/:class/flashcards/:flashcard", flashcardAPI.getFlashcards);
app.get("/api/users/:user/class/:class/flashcards/:flashcard/tags", flashcardAPI.getTags);
app.post("/api/users/:user/class/:class/flashcards/:flashcard/create", flashcardAPI.postCreate);
app.post("/api/users/:user/class/:class/flashcards/:flashcard/remove", flashcardAPI.postRemove);
app.post("/api/users/:user/class/:class/flashcards/:flashcard/addTags", flashcardAPI.postAddTags);
app.post("/api/users/:user/class/:class/flashcards/:flashcard/removeTags", flashcardAPI.postRemoveTags);
app.post("/api/users/:user/class/:class/flashcards/:flashcard/addFlashcard", flashcardAPI.postAddFlashcard);
app.post("/api/users/:user/class/:class/flashcards/:flashcard/removeFlashcard", flashcardAPI.postRemoveFlashcard);

// Set the default handler
app.get("*", defaultHandler);

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
console.log(uri);

// Connect to the database
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => { });

// Start the server
app.listen(process.env.PORT || 8080, () => console.log(`Server listening on http://localhost:${process.env.PORT || 8080}`));

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function defaultHandler(request, response) {
    response.end(JSON.stringify({ result: 'error', path: __dirname, request: request.path }));
}

module.exports = { client }