'use strict';

const { client } = require('./initializeServer.js');

/**
 * Process a get request to retrieve the data of a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getNote(request, response) {
    client.db("final-kappa").collection("files").findOne({
        user: request.params.user,
        name: request.params.note,
        type: "note"
    }).then(exist => {
        if (!exist) {
            throw "Note could not be found";
        }
        response.end(JSON.stringify({ status: 0, result: exist.body }))
    }).catch(err => {
        response.end(JSON.stringify({ status: -1, result: err.toString() }))
    });
}

/**
 * Process a post request to add a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postCreate(request, response) {
    client.db("final-kappa").collection("files").findOne({
        user: request.params.user,
        name: request.params.note
    }).then(exist => {
        if (exist) {
            throw "Note already exists";
        }
        return client.db("final-kappa").collection("files").insertOne({
            user: request.params.user,
            name: request.params.note,
            type: "note",
            tags: request.body["tags"],
            body: request.body["body"]
        });
    }).then(inserted => {
        if (inserted.acknowledged) {
            response.end(JSON.stringify({ status: 0, result: "Create note received!" }));
        } else {
            throw "Could not create the note";
        }
    }).catch(err => response.end(JSON.stringify( {status: -1, result: `Error in noteAPI.postCreate: ${err}` })));
}

/**
 * Process a post request to remove a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
    client.db("final-kappa").collection("files").deleteOne({
        user: request.params.user,
        name: request.params.note,
        type: "note"
    }).then(deleted => {
        if (deleted.acknowledged) {
            response.end(JSON.stringify({ status: 0, result: "Deleted note received!" }));
        } else {
            throw "Could not delete the note";
        }
    }).catch(err => response.end(JSON.stringify( {status: -1, result: `Error in noteAPI.postRemove: ${err}` })));
}

/**
 * Process a post request to edit a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEdit(request, response) {
    client.db("final-kappa").collection("files").updateOne({
        user: request.params.user,
        name: request.params.note,
        type: "note"
    }, {
        $set: { body: request.body["body"] }
    }).then(updated => {
        if (updated.acknowledged) {
            response.end(JSON.stringify({ status: 0, result: `Note has been updated` }));
        } else {
            throw "Note could not be updated";
        }
    }).catch(err => response.end(JSON.stringify( {status: -1, result: `Error in noteAPI.postEdit: ${err}` })));
}

/**
 * Process a get request to retrieve the tags of a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function getTags(request, response) {
    client.db("final-kappa").collection("files").findOne({
        user: request.params.user,
        name: request.params.note,
        type: "note"
    }).then(exist => {
        if (!exist) {
            throw "Note could not be found";
        }
        response.end(JSON.stringify({ status: 0, result: exist.tags }))
    }).catch(err => {
        response.end(JSON.stringify({ status: -1, result: err.toString() }))
    });
}

/**
 * Process a post request to add a tag to a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postAddTag(request, response) {
    client.db("final-kappa").collection("files").updateOne({
        user: request.params.user,
        name: request.params.note,
        type: "note"
    }, {
        $addToSet: { tags: request.params.tag }
    }).then(updated => {
        if (updated.acknowledged) {
            response.end(JSON.stringify({ status: 0, result: `Note has been updated` }));
        } else {
            throw "Note could not be updated";
        }
    }).catch(err => response.end(JSON.stringify( {status: -1, result: `Error in noteAPI.postAddTag: ${err}` })));
}

/**
 * Process a post request to remove a tag from a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function postRemoveTag(request, response) {
    client.db("final-kappa").collection("files").updateOne({
        user: request.params.user,
        name: request.params.note,
        type: "note"
    }, {
        $pull: { tags: request.params.tag }
    }).then(updated => {
        if (updated.acknowledged) {
            response.end(JSON.stringify({ status: 0, result: `Note has been updated` }));
        } else {
            throw "Note could not be updated";
        }
    }).catch(err => response.end(JSON.stringify( {status: -1, result: `Error in noteAPI.postRemoveTag: ${err}` })));
}

module.exports = {
    getNote,
    postCreate, postRemove,
    postEdit,
    getTags,
    postAddTag, postRemoveTag
};