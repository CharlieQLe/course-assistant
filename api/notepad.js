'use strict';

const { client } = require('../index.js');

/**
 * 
 * @param {string} user the user to check in the database
 * @returns if the user is in the database
 */
function findUser(user) {
    client.db('final-kappa').listCollections().toArray().then(collection => {
        return collection.filter(col => col.name === user).length === 1;
    });
}

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

    // respond with an error if user does not exist
    if (!findUser(user)) {
        response.end(JSON.stringify({
            status: 404,
            result: `user(${user}), 
                                class(${userClass}), or 
                                flashcard(${noteName}) could not be found`
        })
        )
        return;
    }

    // get the notes in the database
    client.db('final-kappa').collection(user).find({
        name: noteName,
        class: userClass,
        type: 'note'
    }).toArray().then(arr => {
        response.end(JSON.stringify({ status: 200, result: arr[0].body }));
    }).catch(e => {
        response.end(JSON.stringify({ status: 404, result: "GET notes: Error parsing for notes with mongodb" }));
    });

    return;
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
    const tags = request['tags'];
    const body = request['body'];

    // respond with an error if user does not exist
    if (!findUser(user)) {
        response.end(JSON.stringify({
            status: 404,
            result: `user(${user}), 
                                class(${userClass}), or 
                                flashcard(${noteName}) could not be found`
        })
        )
        return;
    }

    const query = {
        name: noteName,
        class: userClass,
        type: 'note',
        tags: tags,
        body: body
    };
    client.db('final-kappa').collection(user).insertOne(query);

    response.end(JSON.stringify({ status: 200, result: "Create notes received!" }));
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

    // respond with an error if user does not exist
    if (!findUser(user)) {
        response.end(JSON.stringify({
            status: 404,
            result: `user(${user}), 
                                class(${userClass}), or 
                                flashcard(${noteName}) could not be found`
        })
        )
        return;
    }

    const query = {
        name: noteName,
        class: userClass,
        type: 'note',
    };
    client.db('final-kappa').collection(user).deleteOne(query);

    response.end(JSON.stringify({ status: 200, result: "Remove note received!" }));
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

    // respond with an error if user does not exist
    if (!findUser(user)) {
        response.end(JSON.stringify({
            status: 404,
            result: `user(${user}), 
                                class(${userClass}), or 
                                flashcard(${noteName}) could not be found`
        })
        )
        return;
    }

    const query = {
        name: noteName,
        class: userClass,
        type: 'note',
    };
    const updateDocument = {
        $set: { 'body': body }
    }
    client.db('final-kappa').collection(user).updateOne(query, updateDocument);
    response.end(JSON.stringify({ status: 200, result: "Edit note received!" }));
}

module.exports = {
    getNote,
    postCreate, postRemove, 
    postEdit,
};

