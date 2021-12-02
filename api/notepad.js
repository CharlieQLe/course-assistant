'use strict';

const { client } = require('./initializeServer.js');

/**
 * Process a get request to retrieve the data of a note.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getNote(request, response) {
    const user = request.params.user;
    const userClass = request.params.class;
    const noteName = request.params.note;

    client.db('final-kappa').listCollections().toArray((error, result) => {
        if (error) {
            response.end(JSON.stringify({ status: 404, result: `Error in noteAPI.getNote: ${error}` }));
        }
        
        // if user is found in the database, then proceed to find the note in the db
        if (result.filter(col => col.name === user).length === 1) {
            client.db('final-kappa').collection(user).find({
                name: noteName,
                class: userClass,
                type: 'note'
            }).toArray((error, result) => {
                if (error) {
                    response.end(JSON.stringify({ status: 404, result: `Error in noteAPI.getNote(after checking for user): ${error}` }));
                }
                
                // if user does not have the requested notes
                if (result.length === 0) {
                    response.end(JSON.stringify({ status: 404, result: `Error in noteAPI.getNote: class(${userClass}) or note(${noteName}) could not be found` }));
                    return;
                } 
                response.end(JSON.stringify({ status: 200, result: result[0].body }));
            });
        } else {
            response.end(JSON.stringify({ status: 404, result: `Error in noteAPI.getNote: user(${user}) could not be found` }));
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
    const user = request.params.user;
    const userClass = request.params.class;
    const noteName = request.params.note;
    const tags = request.body['tags'];

    client.db('final-kappa').listCollections().toArray((error, result) => {
        if (error) {
            response.end(JSON.stringify({ status: 404, result: `Error in noteAPI.postCreate: ${error}` }));
        }
        
        // if user is found in the database, then create the note
        if (result.filter(col => col.name === user).length === 1) {
            const query = {
                name: noteName,
                class: userClass,
                type: 'note',
                tags: tags,
                body: ''
            };
            client.db('final-kappa').collection(user).insertOne(query, (error, result) => {
                if (error) {
                    response.end(JSON.stringify({ status: 404, result: `Error in noteAPI.postCreate: ${error}` }));
                }
                response.end(JSON.stringify({ status: 200, result: "Create notes received!" }));
            });
        } else {
            response.end(JSON.stringify({ status: 404, result: `Error in noteAPI.postCreate: user(${user}) could not be found` }));
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
    const user = request.params.user;
    const userClass = request.params.class;
    const noteName = request.params.note;

    client.db('final-kappa').listCollections().toArray((error, result) => {
        if (error) {
            response.end(JSON.stringify({ status: 404, result: `Error in noteAPI.postRemove: ${error}` }));
        }
        
        // if user is found in the database, then remove the requested note
        if (result.filter(col => col.name === user).length === 1) {
            const query = {
                name: noteName,
                class: userClass,
                type: 'note',
            };
            client.db('final-kappa').collection(user).deleteOne(query, (error, result) => {
                if (error) {
                    response.end(JSON.stringify({ status: 404, result: `Error in noteAPI.postRemove: ${error}` }));
                }
                response.end(JSON.stringify({ status: 200, result: "Remove note received!" }));
            });
        } else {
            response.end(JSON.stringify({ status: 404, result: `Error in noteAPI.postRemove: user(${user}) could not be found` }));
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
    const user = request.params.user;
    const userClass = request.params.class;
    const noteName = request.params.note;
    const body = request.body['body'];

    client.db('final-kappa').listCollections().toArray((error, result) => {
        if (error) {
            response.end(JSON.stringify({ status: 404, result: `Error in noteAPI.postEdit: ${error}` }));
        }
        
        // if user is found in the database, then edit the requested note
        if (result.filter(col => col.name === user).length === 1) {
            const query = {
                name: noteName,
                class: userClass,
                type: 'note',
            };
            const updateDocument = {
                $set: { body: body }
            }
            client.db('final-kappa').collection(user).updateOne(query, updateDocument, (error, result) => {
                if (error) {
                    response.end(JSON.stringify({ status: 404, result: `Error in noteAPI.postEdit: ${error}` }));
                }
                response.end(JSON.stringify({ status: 200, result: "Edit note received!" }));
            });
        } else {
            response.end(JSON.stringify({ status: 404, result: `Error in noteAPI.postEdit: user(${user}) could not be found` }));
        }
    });

}

module.exports = {
    getNote,
    postCreate, postRemove, 
    postEdit,
};

