'use strict';

const { client } = require('./mongo.js');

/**
 * Process a get request to retrieve the data of a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getNote(request, response) {
    client.db('final-kappa').collection("collection").findOne({
        name: request.params.note,
        user: request.params.user
    }, (err, note) => {
        if (err) {
            response.end(JSON.stringify({ status: -1, result: `Error in noteAPI.getNote: ${error}` }));
        } else if (note) {
            response.end(JSON.stringify({
                status: 0,
                result: {
                    name: note.name,
                    body: note.body
                }
            }));
        } else {
            response.end(JSON.stringify({ status: -1, result: `Error in noteAPI.getNote: note does not exist` }));
        }
    });
}

/**
 * Process a post request to add a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postCreate(request, response) {
    client.db('final-kappa').collection("collection").insertOne({
        name: request.params.note,
        user: request.params.user,
        tags: request.body['tags']
    }, (err, result) => {
        if (err) {
            response.end(JSON.stringify({ status: -1, result: `Error in noteAPI.postCreate: ${error}` }));
        } else {

            // todo- handle result

            response.end(JSON.stringify({ status: 0, result: "Create note received!" }));
        }
    });
}

/**
 * Process a post request to remove a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
    client.db('final-kappa').collection("collection").deleteOne({
        name: request.params.note,
        user: request.params.user
    }, (err, result) => {
        if (err) {
            response.end(JSON.stringify({ status: -1, result: `Error in noteAPI.postRemove: ${error}` }));
        } else {

            // todo- handle result

            response.end(JSON.stringify({ status: 0, result: "Remove note received!" }));
        }
    });
}

/**
 * Process a post request to edit a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEdit(request, response) {
    client.db('final-kappa').collection("collection").updateOne({
        name: request.params.note,
        user: request.params.user
    }, {
        $set: {
            body: request.body['body']
        }
    }, (err, result) => {
        if (err) {
            response.end(JSON.stringify({ status: -1, result: `Error in noteAPI.postEdit: ${error}` }));
        } else {

            // todo- handle result

            response.end(JSON.stringify({ status: 0, result: "Edit note received!" }));
        }
    });
}

module.exports = {
    getNote,
    postCreate, postRemove,
    postEdit,
};

