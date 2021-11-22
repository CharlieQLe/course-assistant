'use strict'

const { client } = require('../index.js');

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
 * Process a get request to retrieve the data of a set of flashcards.
 * /api/users/:user/class/:class/flashcards/:flashcard
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getFlashcards(request, response) {
    const user = request.params.user;
    const userClass = request.params.class;
    const flashcardSetName = request.params.flashcard;

    // respond with an error if user does not exist
    if (!findUser(user)) {
        response.end(JSON.stringify({
            status: 404,
            result: `user(${user}), 
                                class(${userClass}), or 
                                flashcard(${flashcardSetName}) could not be found`
        })
        )
        return;
    }

    // get the set of flashcards in the database
    client.db('final-kappa').collection(user).find({
        name: flashcardSetName,
        class: userClass,
        type: 'flashcard'
    }).toArray().then(arr => {
        response.end(JSON.stringify({ status: 200, result: arr[0].flashcards }));
    }).catch(e => {
        response.end(JSON.stringify({ status: 404, result: "GET flashcards: Error parsing for flashcards with mongodb" }));
    });

    return;
}


/**
 * Process a post request to create a set of flashcards.
 * /api/users/:user/class/:class/flashcards/:flashcard/create
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postCreate(request, response) {
    const user = request.params.user;
    const userClass = request.params.class;
    const flashcardSetName = request.params.flashcard;
    const tags = request.body['tags'];

    // respond with an error if user does not exist
    if (!findUser(user)) {
        response.end(JSON.stringify({
            status: 404,
            result: `user(${user}), 
                                class(${userClass}), or 
                                flashcard(${flashcardSetName}) could not be found`
        })
        )
        return;
    }
    
    const query = {
        name: flashcardSetName,
        class: userClass,
        type: 'flashcard',
        tags: tags,
        flashcards: []
    };
    client.db('final-kappa').collection(user).insertOne(query);

    response.end(JSON.stringify({ status: 200, result: "Create a set of flashcards received!" }));
}

/**
 * Process a post request to remove a set of flashcards.
 * /api/users/:user/class/:class/flashcards/:flashcard/remove
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
    const user = request.params.user;
    const userClass = request.params.class;
    const flashcardSetName = request.params.flashcard;

    // respond with an error if user does not exist
    if (!findUser(user)) {
        response.end(JSON.stringify({
            status: 404,
            result: `user(${user}), 
                                class(${userClass}), or 
                                flashcard(${flashcardSetName}) could not be found`
        })
        )
        return;
    }
    
    const query = {
        name: flashcardSetName,
        class: userClass,
        type: 'flashcard'
    };
    client.db('final-kappa').collection(user).deleteOne(query);

    response.end(JSON.stringify({ status: 200, result: "Remove set of flashcards received!" }));
}


/**
 * Process a post request to add a flash card.
 * /api/users/:user/class/:class/flashcards/:flashcard/addFlashcard
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postAddFlashcard(request, response) {
    const user = request.params.user;
    const userClass = request.params.class;
    const flashcardSetName = request.params.flashcard;
    const term = request.body['term'];
    const definition = request.body['definition'];

    // respond with an error if user does not exist
    if (!findUser(user)) {
        response.end(JSON.stringify({
            status: 404,
            result: `user(${user}), 
                                class(${userClass}), or 
                                flashcard(${flashcardSetName}) could not be found`
        })
        )
        return;
    }
    
    const query = {
        name: flashcardSetName,
        class: userClass, 
        type: 'flashcard'
    };

    const updateDocument = {
        $push: { "flashcards": {term: term, definition: definition} }
    };

    client.db('final-kappa').collection(user).updateOne(query, updateDocument);

    response.end(JSON.stringify({ status: 200, result: "Add flashcard received!" }));
}

/**
 * Process a post request to remove a flash card.
 * /api/users/:user/class/:class/flashcards/:flashcard/removeFlashcard
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemoveFlashcard(request, response) {
    const user = request.params.user;
    const userClass = request.params.class;
    const flashcardSetName = request.params.flashcard;
    const term = request.body['term'];
    const definition = request.body['definition'];

    // respond with an error if user does not exist
    if (!findUser(user)) {
        response.end(JSON.stringify({
            status: 404,
            result: `user(${user}), 
                                class(${userClass}), or 
                                flashcard(${flashcardSetName}) could not be found`
        })
        )
        return;
    }
    
    const query = {
        name: flashcardSetName,
        class: userClass, 
        type: 'flashcard'
    };

    const updateDocument = {
        $pull: { "flashcards": {term: term, definition: definition} }
    };

    client.db('final-kappa').collection(user).updateOne(query, updateDocument);

    response.end(JSON.stringify({ status: 200, result: "Remove flashcard received!" }));
}

module.exports = {
    getFlashcards,
    postCreate, postRemove, 
    postAddFlashcard, postRemoveFlashcard
};



