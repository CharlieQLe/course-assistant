'use strict';

// import { client } from '../index.js'

let client = {};

/**
 * Process a post request to add a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postCreate(request, response) {
    response.end(JSON.stringify({ result: "Add note received!" }));
}

/**
 * Process a get request to retrieve the data of a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getNote(request, response) {
    response.end(JSON.stringify({ result: "Get note data received!" }));
}

/**
 * Process a get request to retrieve the tags of a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getTags(request, response) {
    response.end(JSON.stringify({ result: "Get tags received!" }));
}

/**
 * Process a post request to edit a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEdit(request, response) {
    // console.log(request.body['Tags']);
    // console.log(request.body['Body']);
    response.end(JSON.stringify({ result: "Edit note received!" }));
}

/**
 * Process a post request to add tags to note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postAddTags(request, response) {
    // console.log(request.body['Tags']);
    // console.log(request.body['Body']);
    response.end(JSON.stringify({ result: "add tags received!" }));
}

/**
 * Process a post request to remove a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
    response.end(JSON.stringify({ result: "Remove note received!" }));
}

/**
 * Process a post request to remove tags in notes.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemoveTags(request, response) {
    response.end(JSON.stringify({ result: "Remove tag in notes received!" }));
}

module.exports = { postCreate, getNote, getTags, postEdit, postAddTags, postRemove, postRemoveTags };
