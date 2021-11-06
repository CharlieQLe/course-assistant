'use strict';

/**
 * Process a get request to retrieve every class.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getAll(request, response) {
    response.end(JSON.stringify({ result: "Get all classes received!" }));
}

/**
 * Process a post request to add a class.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postAdd(request, response) {
    response.end(JSON.stringify({ result: "Add a class received!" }));
}

/**
 * Process a get request to retrieve the data of a class.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getClass(request, response) {
    response.end(JSON.stringify({ result: "Get class data received!" }));
}

/**
 * Process a post request to edit a specific class.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function postEdit(request, response) {
    response.end(JSON.stringify({ result: "Edit class received!" }));
}

/**
 * Process a post request to remove a specific class.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function postRemove(request, response) {
    response.end(JSON.stringify({ result: "Remove class received!" }));
}

module.exports = { getAll, postAdd, getClass, postEdit, postRemove };