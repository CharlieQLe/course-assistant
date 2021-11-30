'use strict';

const userAPI = require('./api/user.js');
const taskAPI = require('./api/tasks.js');
const classAPI = require('./api/class.js');
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

// send user to profile page when url is entered
// user types this url or is sent to this url
app.get("/users/:user/", (req, res) => {
    res.sendFile(process.cwd() + '/public/user-profile.html')
});
// Set the user endpoints
app.get("/api/users/:user", userAPI.getData);
app.post("/api/users/:user/edit", userAPI.postEdit);
app.post("/api/users/:user/delete", userAPI.postDelete);

//NOT SURE IF THIS IS RIGHT SO COMMENTED FOR NOW
// // serving task files at the given url 
// // user types this url or is sent to this url
// app.get("/api/users/:user/tasks/:taskid", (req, res) => {
//     res.sendFile(process.cwd() + '/public/home.html')
// });

// Set the task endpoints
app.get("/api/users/:user/tasks", taskAPI.getAll);
app.post("/api/users/:user/tasks/create", taskAPI.postCreate);
app.post("/api/users/:user/tasks/:task", taskAPI.getTask);
app.post("/api/users/:user/tasks/:task/edit", taskAPI.postEdit);
app.post("/api/users/:user/tasks/:task/remove", taskAPI.postRemove);

// Set the tag endpoints
app.get("/api/users/:user/tags", tagAPI.getAll);
app.post("/api/users/:user/tags/:tag/create", tagAPI.postCreate);
app.post("/api/users/:user/tags/:tag/remove", tagAPI.postRemove);

// serving note files at the given url
// user types this url or is sent to this url
app.get("/users/:user/notes/:note", (req, res) => {
    res.sendFile(process.cwd() + '/public/notepad.html')
});
// Set the note endpoints
app.get("/api/users/:user/notes/:note", noteAPI.getNote);
app.post("/api/users/:user/notes/:note/create", noteAPI.postCreate);
app.post("/api/users/:user/notes/:note/remove", noteAPI.postRemove);
app.post("/api/users/:user/notes/:note/edit", noteAPI.postEdit);

// serving flashcard files at the given url
// user types this url or is sent to this url
app.get("/users/:user/flashcards/:flashcard", (req, res) => {
    res.sendFile(process.cwd() + '/public/flashcard.html')
});
// Set the flashcard endpoints
app.get("/api/users/:user/flashcards/:flashcard", flashcardAPI.getFlashcards);
app.post("/api/users/:user/flashcards/:flashcard/create", flashcardAPI.postCreate);
app.post("/api/users/:user/flashcards/:flashcard/remove", flashcardAPI.postRemove);
app.post("/api/users/:user/flashcards/:flashcard/addFlashcard", flashcardAPI.postAddFlashcard);
app.post("/api/users/:user/flashcards/:flashcard/removeFlashcard", flashcardAPI.postRemoveFlashcard);

/*
the regEx, /.*\.css$/, reads anything with .css at the end

the regEx, /(?:.(?!\/))+$/, reads only the ending of the url
eg. url: https://somewebsite.com/others/flashcard.js, the regEx gets /flashcard.js

*********** TODO: check if the something.css file exists ***********
*/
// the following 3 gets is to get css/js/png files
app.get(/.*\.css$/, (req, res) => {
    res.sendFile(process.cwd() + `/public/css${req.url.match(/(?:.(?!\/))+$/)}`)
});
app.get(/.*\.js$/, (req, res) => {
    res.sendFile(process.cwd() + `/public/js/${req.url.match(/(?:.(?!\/))+$/)}`)
});
app.get(/.*\.png$/, (req, res) => {
    res.sendFile(process.cwd() + `/public/images/${req.url.match(/(?:.(?!\/))+$/)}`)
});

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