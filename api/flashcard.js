'use strict'

const { client } = require('./initializeServer.js');

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
 * /api/users/:user/class/:class/flashcards/:flashcard
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getFlashcards(request, response) {
    const user = request.params.user;
    const userClass = request.params.class;
    const flashcardSetName = request.params.flashcard;


    client.db('final-kappa').listCollections().toArray((error, result) => {
        if (error) {
            response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.getFlashcards: ${error}` }));
        }
        
        // if user is found in the database, then get the set of flashcards
        if (result.filter(col => col.name === user).length === 1) {
            // get the set of flashcards in the database
            client.db('final-kappa').collection(user).find({
                name: flashcardSetName,
                class: userClass,
                type: 'flashcard'
            }).toArray((error, result) => {
                if (error) {
                    response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.getFlashcards(after checking for user): ${error}` }));
                }
                
                // if the set of flashcards could not be found
                if (result.length === 0) {
                    response.end(JSON.stringify({ status: 404, result: `class(${userClass}), or flashcard(${flashcardSetName}) could not be found` }));
                    return;
                }
                response.end(JSON.stringify({ status: 200, result: result[0].flashcards }));
            });
        } else {
            response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.getFlashcards: user(${user}) could not be found` }));
        }
    });


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
    
    client.db('final-kappa').listCollections().toArray((error, result) => {
        if (error) {
            response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.postCreate: ${error}` }));
        }
        
        // if user is found in the database, then create the set of flashcard
        if (result.filter(col => col.name === user).length === 1) {
            const query = {
                name: flashcardSetName,
                class: userClass,
                type: 'flashcard',
                tags: tags,
                flashcards: []
            };
            client.db('final-kappa').collection(user).insertOne(query, (error, result) => {
                if (error) {
                    response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.postCreate: ${error}` }));
                }
                response.end(JSON.stringify({ status: 200, result: "Create a set of flashcards received!" }));
            });
        } else {
            response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.postCreate: user(${user}) could not be found` }));
        }
    });

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

    client.db('final-kappa').listCollections().toArray((error, result) => {
        if (error) {
            response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.postRemove: ${error}` }));
        }
        
        // if user is found in the database, then remove the set of flashcard
        if (result.filter(col => col.name === user).length === 1) {
            const query = {
                name: flashcardSetName,
                class: userClass,
                type: 'flashcard'
            };
            client.db('final-kappa').collection(user).deleteOne(query, (error, result) => {
                if (error) {
                    response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.postRemove: ${error}` }));
                }
                response.end(JSON.stringify({ status: 200, result: "Remove set of flashcards received!" }));
            });
        } else {
            response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.postRemove: user(${user}) could not be found` }));
        }
    });
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

    client.db('final-kappa').listCollections().toArray((error, result) => {
        if (error) {
            response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.postAddFlashcard: ${error}` }));
        }
        
        // if user is found in the database, then add the flashcard in the set
        if (result.filter(col => col.name === user).length === 1) {
            const query = {
                name: flashcardSetName,
                class: userClass, 
                type: 'flashcard'
            };
            
            const updateDocument = {
                $push: { "flashcards": {term: term, definition: definition} }
            };
            
            client.db('final-kappa').collection(user).updateOne(query, updateDocument, (error, result) => {
                if (error) {
                    response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.postAddFlashcard: ${error}` }));
                }
                response.end(JSON.stringify({ status: 200, result: "Add flashcard received!" }));
            });           
        } else {
            response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.postAddFlashcard: user(${user}) could not be found` }));
        }
    });
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

    client.db('final-kappa').listCollections().toArray((error, result) => {
        if (error) {
            response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.postRemoveFlashcard: ${error}` }));
        }
        
        // if user is found in the database, then
        if (result.filter(col => col.name === user).length === 1) {
            const query = {
                name: flashcardSetName,
                class: userClass, 
                type: 'flashcard'
            };
            
            const updateDocument = {
                $pull: { "flashcards": {term: term, definition: definition} }
            };
            
            client.db('final-kappa').collection(user).updateOne(query, updateDocument, (error, result) => {
                if (error) {
                    response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.postRemoveFlashcard: ${error}` }));
                }
                response.end(JSON.stringify({ status: 200, result: "Remove flashcard received!" }));
            });
        } else {
            response.end(JSON.stringify({ status: 404, result: `Error in flashcardAPI.postRemoveFlashcard: user(${user}) could not be found` }));
        }
    });
}

module.exports = {
    getFlashcards,
    postCreate, postRemove, 
    postAddFlashcard, postRemoveFlashcard
};



