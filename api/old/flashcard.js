'use strict'

const fs = require('fs');
const path = require('path');

/**
 *  @returns flashcard JSON object
 * JSON object is in the form of { flashcards: [{ term: t1, desc: d1}, ..., {}] }
 */
/*function get(req, res) {
    const user = req.params.user;
    const userClass = req.params.class;
    const title = req.query.title;

    // console.log(fs.existsSync(`./users/${user}/${userClass}/${title}.txt`))

    // check if flashcard exists in file path
    if (fs.existsSync(`./users/${user}/${userClass}/${title}.json`)) {
        res.end(`received GET request from client. flashcard exists!: ${user}, ${userClass}, title of flashcard: ${title}`);
        return;
    }
    res.end('GET request received incorrect, user, class or title')

};*/


/**
 * receives a JSON file and create, update or delete
 * the flashcard depending on the action in the JSON file
 * JSON request obj: {action: 'create', path: './path', title:'title'}
 * 			         {action: 'update', path: './path', operation: 'add|delete', flashcard: {term: 't1', desc: 'desc1'} }
 * 		             {action: 'delete', path: './path'}
 */
/*function post(req, res) {
    const action = req.body['action'];
    switch (action) {
        case 'create': {
            createFlashcard(req, res);
            break;
        }
        case 'update': {
            updateFlashcard(req, res);
            break;
        }
        case 'delete': {
            deleteFlashcard(req, res);
            break;
        }
        default: {
            res.end(`unknown command`);
            break;
        }
    }
}*/

/**
 * create flashcard at the given path
 */
/*function createFlashcard(req, res) {
   const path = req.body['path'];
   const title = req.body['title'];

   if (fs.existsSync(`./${path}`)) {

       // TODO: create flashcard in given path

       res.end(`created your ${title} flashcard in ${path}`);
   } else {
       res.end(`failed to create flashcard at ${path}`);
   }
}*/

/**
 * update flashcard at the given path
 */
/* function updateFlashcard(req, res) {
    const path = req.body['path'];

    if (fs.existsSync(`./${path}`)) {

        // TODO: update flashcard in given path

        res.end(`updated your ${title} flashcard in ${path}`);
    } else {
        res.end(`failed to update flashcard at ${path}`);
    }
}*/


/**
 * delete flashcard at the given path
 */
/*function deleteFlashcard(req, res) {
   const path = req.body['path'];

   if (fs.existsSync(`./${path}`)) {

       // TODO: delete flashcard in given path

       res.end(`created your ${title} flashcard in ${path}`);
   } else {
       res.end(`failed to delete flashcard at ${path}`);
   }
}


module.exports = { get, post }*/

/**
 * Process a post request to create a set of flashcards.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postCreate(request, response) {
    response.end(JSON.stringify({ result: "Create flashcards received!" }));
}

/**
 * Process a get request to retrieve the data of a set of flashcards.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getFlashcards(request, response) {
    response.end(JSON.stringify({ result: "Get flashcard data received!" }));
}

/**
 * Process a get request to retrieve the description for a term.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getDescription(request, response) {
    response.end(JSON.stringify({ result: "Get description received!" }));
}

/**
 * Process a post request to add a flashcard.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postAdd(request, response) {
    response.end(JSON.stringify({ result: "Add flashcard received!" }));
}

/**
 * Process a post request to edit a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEdit(request, response) {
    response.end(JSON.stringify({ result: "Edit note received!" }));
}

/**
 * Process a post request to remove a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
    response.end(JSON.stringify({ result: "Get all classes received!" }));
}

module.exports = { postCreate, getFlashcards, getDescription, postAdd, postEdit, postRemove };
