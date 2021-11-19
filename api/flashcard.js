'use strict'

const fs = require('fs');
const path = require('path');


// flashcards {
//     "tags": [],
//     "description": "",
//     "flashcards": []
// }

// flashcard {
//     "term": "",
//     "definition": ""
// }

// { tags: tags,
//     description: description,
//     flashcards: flashcards
// }



const db = 'db_name';
const userCollection = 'users_collection';

// function addToDB(collection, doc) {
//     client.db(db)
//     .collection(collection)
//     .insertOne(doc);
// }

// function updateInDB(collection, doc) {
//     client.db(db)
//     .collection(userCollection)
//     .updateOne()
// }


// db.collection.update({
//     "title": "1984"
//   },
//   {
//     $inc: {
//       "available": 1
//     }
//   })


/**
 * Process a get request to retrieve the data of a set of flashcards.
 * /api/users/:user/class/:class/flashcards/:flashcard
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getFlashcards(request, response) {
    const user = req.params.user;
    const userClass = req.params.class;
    const flashcardSet = req.params.flashcard;

    // somehow access get to the user and the user's class, 
    // then access the set of flashcards
    // client.db(db)
    // .collection(col)
    // .findOne({user: user}).then(doc => {
    //     const queryInUserClasses = doc.classes.filter(cl => cl.name === userClass);
    //     // const flashcards = (queryInUserClasses.length === 0) ? 
    //     doc.classes.filter(cl => cl.name === userClass);
    //     response.end(JSON.stringify({ result: "Get flashcard received" }));
    // })
    
    response.end(JSON.stringify({ result: "Get flashcard received" }));
}


/**
 * Process a get request to retrieve the tags for the set of flashcards.
 * /api/users/:user/class/:class/flashcards/:flashcard/tags
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function getTags(request, response) {
    response.end(JSON.stringify({ result: "Get tags received!" }));
}


/**
 * Process a post request to create a set of flashcards.
 * /api/users/:user/class/:class/flashcards/:flashcard/create
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postCreate(request, response) {
    // const user = req.params.user;
    // const userClass = req.params.class;
    // const filename = req.params.flashcard + '.json';
    // const tags = req.body['tags'];
    // const description = req.body['description'];

    // if (fs.existsSync(`../users/${user}/${userClass}/${filename}`)) {
    //     res.status(301).send("Your flashcards already exists");
    //     return;
    // }

    // let flashcards = {
    //     tags: tags,
    //     description: description,
    //     flashcards: []
    // }

    // fs.writeFile(filename, JSON.stringify(flashcards), (err) => { });

    // res.status(200).send("Create flashcards received!")

    response.end(JSON.stringify({ result: "Create a set of flashcards received!" }));
}

/**
 * Process a post request to remove a set of flashcards.
 * /api/users/:user/class/:class/flashcards/:flashcard/remove
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
    response.end(JSON.stringify({ result: "Remove set of flashcards received!" }));
}

/**
 * Process a post request to add tags.
 * /api/users/:user/class/:class/flashcards/:flashcard/addTags
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postAddTags(request, response) {
    response.end(JSON.stringify({ result: "Add tags received!" }));
}

/**
 * Process a post request to remove tags.
 * /api/users/:user/class/:class/flashcards/:flashcard/removeTags
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemoveTags(request, response) {
    response.end(JSON.stringify({ result: "remove tags received!" }));
}

/**
 * Process a post request to add a flash card.
 * /api/users/:user/class/:class/flashcards/:flashcard/addFlashcard
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postAddFlashcard(request, response) {
    response.end(JSON.stringify({ result: "Add flashcard received!" }));
}

/**
 * Process a post request to remove a flash card.
 * /api/users/:user/class/:class/flashcards/:flashcard/removeFlashcard
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemoveFlashcard(request, response) {
    response.end(JSON.stringify({ result: "Remove flashcard received!" }));
}

module.exports = { getFlashcards, getTags, 
                    postCreate, postRemove, postAddTags, postRemoveTags,
                    postAddFlashcard, postRemoveFlashcard};

