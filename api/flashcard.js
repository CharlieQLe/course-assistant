'use strict'

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
 * Process a post request to edit a set of flashcards.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEdit(request, response) {
    response.end(JSON.stringify({ result: "Edit note received!" }));
}

/**
 * Process a post request to remove a set of flashcards.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
    response.end(JSON.stringify({ result: "Get all classes received!" }));
}

/**
 * Process a post request to add a flash card.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postAddTerm(request, response) {
    response.end(JSON.stringify({ result: "Add flashcard received!" }));
}

/**
 * Process a post request to edit a flash card.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function postEditTerm(request, response) {
    response.end(JSON.stringify({ result: "Edit flashcard received!" }));
}

/**
 * Process a post request to remove a flash card.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemoveTerm(request, response) {
    response.end(JSON.stringify({ result: "Remove flashcard received!" }));
}

module.exports = { postCreate, getFlashcards, getDescription, postEdit, postRemove, postAddTerm, postEditTerm, postRemoveTerm };
