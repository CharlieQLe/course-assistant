'use strict';

// Imports
const { client, mc } = require('./api/initializeServer');
const express = require('express');
const fileAPI = require('./api/files.js');
const userAPI = require('./api/user.js');
const taskAPI = require('./api/tasks.js');
const tagAPI = require('./api/tags.js');
const noteAPI = require('./api/notepad.js');
const flashcardAPI = require('./api/flashcard.js');

// Express
const app = express();
app.use(express.json()); // process json 
app.use(express.static('./public')); // serve public files
app.use(express.urlencoded({ 'extended': true })); // allow URLencoded data

/**
 * Check if the user is authenticated.
 * If so, if the user is trying to access a wrong page, redirect to the correct page. Otherwise, move on.
 * If no authenticated, redirect to the home.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user === req.params.user) {
            next();
        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/');
    }
}

function apiCheckLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user === req.params.user) {
            next();
        } else {
            res.end(JSON.stringify({ status: -1, result: `Error retrieving data: user ids do not match` }));
        }
    } else {
        res.end(JSON.stringify({ status: -1, result: `Error retrieving data: not authenticated` }));
    }
}

/*** PASSPORT CONFIG ***/

const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const session = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
};

const strategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await client.db('final-kappa').collection('users').findOne({ email: email });
        if (!user) {
            throw "Wrong email";
        } else if (!mc.check(password, user.salt, user.hash)) {
            throw "Wrong password";
        }
        return done(null, user.userId);
    } catch (error) {
        await new Promise(r => setTimeout(r, 2000));
        return done(null, false, { 'message': error });
    }
});

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

/***********************/

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => done(null, user));

// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => done(null, uid));

app.post('/signup', async (req, res, next) => {
    const name = req.body['name'];
    const email = req.body['email'];
    const password = req.body['password'];
    try {
        const globalData = await client.db('final-kappa').collection('misc').findOne({});
        if (!globalData) {
            throw "User data not found!";
        }
        const userId = `${globalData.nextUserId}`;
        const updateGlobalResult = await client.db('final-kappa').collection('misc').updateMany({ nextUserId: { $exists: true } }, { $inc: { nextUserId: 1 } }, { multi: true });
        if (!updateGlobalResult.acknowledged) {
            throw "Could not update global user count!";
        }
        const user = await client.db('final-kappa').collection('users').findOne({ email: email });
        if (user) {
            throw "User with email already exists!";
        }
        const [salt, hash] = mc.hash(password);
        const result = await client.db('final-kappa').collection('users').insertOne({
            name: name,
            email: email,
            salt: salt,
            hash: hash,
            userId: userId
        });
        if (!result.acknowledged) {
            throw "Could not create user!";
        }
        next();
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}, passport.authenticate('local', { 'successRedirect': '/users', 'failureRedirect': '/' }));

app.post('/login', passport.authenticate('local', { 'successRedirect': '/users', 'failureRedirect': '/' }));

app.get('/login', (req, res) => res.redirect(`/users/${req.user}`));

// Handle the URL
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Set the user endpoints
app.get('/users', checkLoggedIn, (req, res) => { res.redirect(`/users/${req.user}`)});
app.use("/users/:user/", checkLoggedIn, express.static('public', { index: 'home.html' }));       // serve html file
app.use("/users/:user/profile", checkLoggedIn, express.static('public', { index: 'user-profile.html' }));    // serve html file
app.get("/api/users/:user", apiCheckLoggedIn, userAPI.getData);
app.post("/api/users/:user/edit", apiCheckLoggedIn, userAPI.postEdit);
app.post("/api/users/:user/delete", apiCheckLoggedIn, userAPI.postDelete);

// Set the task endpoints
app.get("/api/users/:user/tasks", apiCheckLoggedIn, taskAPI.getAll);
app.post("/api/users/:user/tasks/create", apiCheckLoggedIn, taskAPI.postCreate);
app.post("/api/users/:user/tasks/edit", apiCheckLoggedIn, taskAPI.postEdit);
app.post("/api/users/:user/tasks/remove", apiCheckLoggedIn, taskAPI.postRemove);

// Set the file endpoints
app.use("/users/:user/files", checkLoggedIn, express.static('public', { index: 'files.html' }));
app.get("/api/users/:user/files", apiCheckLoggedIn, fileAPI.getAll);
app.post("/api/users/:user/files/search", apiCheckLoggedIn, fileAPI.postSearch);

// Set the tag endpoints
app.get("/api/users/:user/tags", apiCheckLoggedIn, tagAPI.getAll);
app.post("/api/users/:user/tags/:tag/create", apiCheckLoggedIn, tagAPI.postCreate);
app.post("/api/users/:user/tags/:tag/remove", apiCheckLoggedIn, tagAPI.postRemove);

// Set the note endpoints
app.use("/users/:user/files/notes/:note", checkLoggedIn, express.static('public', { index: 'notepad.html' }));    // serve html file
app.get("/api/users/:user/files/notes/:note", apiCheckLoggedIn, noteAPI.getNote);
app.post("/api/users/:user/files/notes/:note/create", apiCheckLoggedIn, noteAPI.postCreate);
app.post("/api/users/:user/files/notes/:note/remove", apiCheckLoggedIn, noteAPI.postRemove);
app.post("/api/users/:user/files/notes/:note/edit", apiCheckLoggedIn, noteAPI.postEdit);
app.post("/api/users/:user/files/notes/:note/tags", apiCheckLoggedIn, noteAPI.getTags);
app.post("/api/users/:user/files/notes/:note/tags/:tag/add", apiCheckLoggedIn, noteAPI.postAddTag);
app.post("/api/users/:user/files/notes/:note/tags/:tag/remove", apiCheckLoggedIn, noteAPI.postRemoveTag);

// Set the flashcard endpoints
app.use("/users/:user/files/flashcards/:flashcard", checkLoggedIn, express.static('public', { index: 'flashcard.html' }));    // serve html file
app.get("/api/users/:user/files/flashcards/:flashcard", apiCheckLoggedIn, flashcardAPI.getFlashcards);
app.post("/api/users/:user/files/flashcards/:flashcard/create", apiCheckLoggedIn, flashcardAPI.postCreate);
app.post("/api/users/:user/files/flashcards/:flashcard/remove", apiCheckLoggedIn, flashcardAPI.postRemove);
app.post("/api/users/:user/files/flashcards/:flashcard/addFlashcard", apiCheckLoggedIn, flashcardAPI.postAddFlashcard);
app.post("/api/users/:user/files/flashcards/:flashcard/removeFlashcard", apiCheckLoggedIn, flashcardAPI.postRemoveFlashcard);
app.post("/api/users/:user/files/flashcards/:flashcard/tags", apiCheckLoggedIn, flashcardAPI.getTags);
app.post("/api/users/:user/files/flashcards/:flashcard/tags/:tag/add", apiCheckLoggedIn, flashcardAPI.postAddTag);
app.post("/api/users/:user/files/flashcards/:flashcard/tags/:tag/remove", apiCheckLoggedIn, flashcardAPI.postRemoveTag);

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
