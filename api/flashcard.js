'use strict'

const { client } = require('./mongo.js');

// flashcards {
//     "tags": [],
//     "description": "",
//     "flashcards": []
// }

// flashcard {
//     "term": "",
//     "definition": ""
// }
// ==============================================================


/**
 * Process a get request to retrieve the data of a set of flashcards.
 * /api/users/:user/flashcards/:flashcard
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getFlashcards(request, response) {
    client.db('final-kappa').collection("collection").find({
        user: request.params.user,
        name: request.params.flashcard,
        type: "flashcards"
    }, (err, flashcardSet) => {
        if (err) {
            response.end(JSON.stringify({ status: -1, result: `Error retrieving flashcards: ${error}` }));
        } else if (flashcardSet) {
            response.end(JSON.stringify({ status:  0, result: flashcardSet }));
        } else {
            response.end(JSON.stringify({ status: -1, result: `Error retrieving flashcards: set does not exist` }));
        }
    });
}

/**
 * Process a post request to create a set of flashcards.
 * /api/users/:user/flashcards/:flashcard/create
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postCreate(request, response) {
    client.db('final-kappa').collection("collection").findOne({
        name: request.params.flashcard,
        user: request.params.user
    }, (err, existingFlashcardSet) => {
        if (err) {
            response.end(JSON.stringify({ status: -1, result: `Error creating flashcards: ${err}` }));
        } else if (existingFlashcardSet) {
            response.end(JSON.stringify({ status: -1, result: `Error creating flashcards: set already exists` }));
        } else {
            client.db('final-kappa').collection("collection").insertOne({
                name: request.params.flashcard,
                user: request.params.user,
                tags: request.body['tags']
            }, (err, result) => {
                if (err) {
                    response.end(JSON.stringify({ status: -1, result: `Error creating flashcards: ${err}` }));
                } else {

                    // todo- handle result opcode

                    response.end(JSON.stringify({ status: 0, result: "Create a set of flashcards received!" }));
                }
            });
        }
    });
}

/**
 * Process a post request to remove a set of flashcards.
 * /api/users/:user/flashcards/:flashcard/remove
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
    client.db('final-kappa').collection("collection").deleteOne({
        name: request.params.flashcard,
        user: request.params.user
    }, (err, result) => {
        if (err) {
            response.end(JSON.stringify({ status: -1, result: `Error removing flashcards: ${err}` }));
        } else {

            // todo- handle result opcode

            response.end(JSON.stringify({ status: 0, result: "Remove a set of flashcards received!" }));
        }
    });
}


/**
 * Process a post request to add a flash card.
 * /api/users/:user/flashcards/:flashcard/addFlashcard
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postAddFlashcard(request, response) {
    client.db('final-kappa').collection("collection").updateOne({
        name: request.params.flashcard,
        user: request.params.user
    }, {
        $push: {
            "flashcards": {
                term: request.body['term'], 
                definition: request.body['definition']
            }
        }
    }, (err, result) => {
        if (err) {
            response.end(JSON.stringify({ status: -1, result: `Error adding flashcard into set of flashcards: ${err}` }));
        } else {

            // todo- handle result opcode

            response.end(JSON.stringify({ status: 0, result: "Adding flashcard into a set of flashcards received!" }));
        }
    });
}

/**
 * Process a post request to remove a flash card.
 * /api/users/:user/flashcards/:flashcard/removeFlashcard
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemoveFlashcard(request, response) {
    client.db('final-kappa').collection("collection").updateOne({
        name: request.params.flashcard,
        user: request.params.user
    }, {
        $pull: {
            "flashcards": {
                term: request.body['term'], 
                definition: request.body['definition']
            }
        }
    }, (err, result) => {
        if (err) {
            response.end(JSON.stringify({ status: -1, result: `Error removing flashcard in flashcards: ${err}` }));
        } else {

            // todo- handle result opcode

            response.end(JSON.stringify({ status: 0, result: "Removing flashcard from a set of flashcards received!" }));
        }
    });
}

module.exports = {
    getFlashcards,
    postCreate, postRemove, 
    postAddFlashcard, postRemoveFlashcard
};



