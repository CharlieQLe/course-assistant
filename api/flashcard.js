'use strict'

const fs = require('fs');
const path = require('path');


// flashcards {
//     "tags": [],
//     "description": "",
//     "flashcards": []
// }

// flashcard {
//     "term": "",
//     "definition": ""
// }


/**
 * Process a get request to retrieve the data of a set of flashcards.
 * /api/users/:user/:class/flashcards/:flashcard
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getFlashcards(request, response) {
    // const user = req.params.user;
    // const userClass = req.params.class;
    // const filename = req.params.flashcard + '.json';
    
    // if (fs.existsSync(`../users/${user}/${userClass}/${filename}.json`)) {
    //         response.end(JSON.stringify({ result: "Get flashcard received" }));
    //         return;
    //     }
        
    // response.end(JSON.stringify({ result: "flashcards does not exist" }));

    response.end(JSON.stringify({ result: "Get flashcard received" }));
}

/**
 * Process a get request to retrieve the description for the set of flashcards.
 * /api/users/:user/:class/flashcards/:flashcard/description
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getDescription(request, response) {
    // const user = req.params.user;
    // const userClass = req.params.class;
    // const filename = req.params.flashcard + '.json';

    // if (fs.existsSync(`../users/${user}/${userClass}/${filename}.json`)) {
    //     response.end(JSON.stringify({ result: "Get description received!" }));
    //     return;
    // }

    // response.end(JSON.stringify({ result: "Get description error!" }));
    response.end(JSON.stringify({ result: "Get description received!" }));
}

/**
 * Process a get request to retrieve the tags for the set of flashcards.
 * /api/users/:user/:class/flashcards/:flashcard/tags
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function getTags(request, response) {
    response.end(JSON.stringify({ result: "Get tags received!" }));
}

/**
 * Process a get request to retrieve the deinfition for a term.
 * /api/users/:user/:class/flashcards/:flashcard/:term
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getDefinition(request, response) {
    response.end(JSON.stringify({ result: "Get definition received!" }));
}
/**
 * Process a get request to retrieve the term for a definition.
 * /api/users/:user/:class/flashcards/:flashcard/:definition
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getTerm(request, response) {
    response.end(JSON.stringify({ result: "Get term received!" }));
}


/**
 * Process a post request to create a set of flashcards.
 * /api/users/:user/:class/flashcards/:flashcard/create
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postCreate(request, response) {
    // const user = req.params.user;
    // const userClass = req.params.class;
    // const filename = req.params.flashcard + '.json';
    // const tags = req.body['tags'];
    // const description = req.body['description'];

    // if (fs.existsSync(`../users/${user}/${userClass}/${filename}`)) {
    //     res.status(301).send("Your flashcards already exists");
    //     return;
    // }

    // let flashcards = {
    //     tags: tags,
    //     description: description,
    //     flashcards: []
    // }

    // fs.writeFile(filename, JSON.stringify(flashcards), (err) => { });

    // res.status(200).send("Create flashcards received!")

    response.end(JSON.stringify({ result: "Create a set of flashcards received!" }));
}

/**
 * Process a post request to remove a set of flashcards.
 * /api/users/:user/:class/flashcards/:flashcard/remove
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
    response.end(JSON.stringify({ result: "Remove set of flashcards received!" }));
}

/**
 * Process a post request to edit the description of the set of flashcards.
 * /api/users/:user/:class/flashcards/:flashcard/editDescription
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEditDescription(request, response) {
    response.end(JSON.stringify({ result: "Edit description received!" }));
}

/**
 * Process a post request to add tags.
 * /api/users/:user/:class/flashcards/:flashcard/addTags
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postAddTags(request, response) {
    response.end(JSON.stringify({ result: "Add tags received!" }));
}

/**
 * Process a post request to remove tags.
 * /api/users/:user/:class/flashcards/:flashcard/removeTags
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemoveTags(request, response) {
    response.end(JSON.stringify({ result: "remove tags received!" }));
}

/**
 * Process a post request to add a flash card.
 * /api/users/:user/:class/flashcards/:flashcard/addFlashcard
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postAddFlashcard(request, response) {
    response.end(JSON.stringify({ result: "Add flashcard received!" }));
}

/**
 * Process a post request to remove a flash card.
 * /api/users/:user/:class/flashcards/:flashcard/removeFlashcard
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemoveFlashcard(request, response) {
    response.end(JSON.stringify({ result: "Remove flashcard received!" }));
}

module.exports = { postCreate, getFlashcards, getDescription, postEdit, postRemove, postAddTerm, postEditTerm, postRemoveTerm };
