'use strict';

const fileAPI = require('./api/files.js');
const userAPI = require('./api/user.js');
const taskAPI = require('./api/tasks.js');
const tagAPI = require('./api/tags.js');
const noteAPI = require('./api/notepad.js');
const flashcardAPI = require('./api/flashcard.js');

const express = require('express');
const app = express();

app.use(express.json()); // process json 
app.use(express.static('./public')); // serve public files

// Set the signup and login endpoints
app.post("/api/signup", userAPI.postSignup);
app.post("/api/login", userAPI.postLogin);

// Set the user endpoints
app.use("/users/:user/", express.static('public', {index: 'home.html'}));       // serve html file
app.use("/users/:user/profile", express.static('public', {index: 'user-profile.html'}));    // serve html file
app.get("/api/users/:user", userAPI.getData);
app.post("/api/users/:user/edit", userAPI.postEdit);
app.post("/api/users/:user/delete", userAPI.postDelete);

// Set the task endpoints
app.get("/api/users/:user/tasks", taskAPI.getAll);
app.post("/api/users/:user/tasks/create", taskAPI.postCreate);
app.post("/api/users/:user/tasks/edit", taskAPI.postEdit);
app.post("/api/users/:user/tasks/remove", taskAPI.postRemove);

// Set the file endpoints
app.use("/users/:user/files", express.static('public', {index: 'files.html'}));
app.get("/api/users/:user/files", fileAPI.getAll);
app.post("/api/users/:user/files/search", fileAPI.postSearch);

// Set the tag endpoints
app.get("/api/users/:user/tags", tagAPI.getAll);
app.post("/api/users/:user/tags/:tag/create", tagAPI.postCreate);
app.post("/api/users/:user/tags/:tag/remove", tagAPI.postRemove);

// Set the note endpoints
app.use("/users/:user/files/notes/:note", express.static('public', {index: 'notepad.html'}));    // serve html file
app.get("/api/users/:user/files/notes/:note", noteAPI.getNote);
app.post("/api/users/:user/files/notes/:note/create", noteAPI.postCreate);
app.post("/api/users/:user/files/notes/:note/remove", noteAPI.postRemove);
app.post("/api/users/:user/files/notes/:note/edit", noteAPI.postEdit);

// Set the flashcard endpoints
app.use("/users/:user/files/flashcards/:flashcard", express.static('public', {index: 'flashcard.html'}));    // serve html file
app.get("/api/users/:user/files/flashcards/:flashcard", flashcardAPI.getFlashcards);
app.post("/api/users/:user/files/flashcards/:flashcard/create", flashcardAPI.postCreate);
app.post("/api/users/:user/files/flashcards/:flashcard/remove", flashcardAPI.postRemove);
app.post("/api/users/:user/files/flashcards/:flashcard/addFlashcard", flashcardAPI.postAddFlashcard);
app.post("/api/users/:user/files/flashcards/:flashcard/removeFlashcard", flashcardAPI.postRemoveFlashcard);

// Set the default handler
app.get("*", defaultHandler);

// Start the server
app.listen(process.env.PORT || 8080, () => console.log(`Server listening on http://localhost:${process.env.PORT || 8080}`));

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function defaultHandler(request, response) {
    response.end(JSON.stringify({ result: 'error', path: __dirname, request: request.path }));
}
