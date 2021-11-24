'use strict';

const { client } = require('./mongo.js');

/**
 * Process a get request to retrieve every class.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getAll(request, response) {
    client.db("final-kappa").collection(request.body["user"]).find({
       type: "class" 
    }).toArray((err, classes) => {
        if (err) {
            console.log(`Error on class.getAll: ${err}`);
            response.end(JSON.stringify('[]'));
        } else {
            response.end(JSON.stringify(classes));
        }
    });
}

/**
 * Process a post request to create a class.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postCreate(request, response) {
    let user = request.body["user"];
    client.db("final-kappa").collection(user).findOne({
        type: request.body["class"]
    }, (error, result) => {
        if (error) {
            client.db("final-kappa").collection(user).insertOne({
                name: request.params.class,
                class: request.params.class,
                type: "class"
            });
        } else {
            
        }
        response.end();
    });
}

/**
 * Process a get request to retrieve the data of a class.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getClass(request, response) {
    client.db("final-kappa").collection(request.body["user"]).findOne({
        class: request.body["class"],
        type: "classData"
    }, (error, result) => {
        if (error) {
            console.log(`Error on class.getClass: ${err}`);
            response.end("ERROR ON CLASS DATA");
        } else {
            response.end(JSON.stringify(result));
        }
    });
}

/**
 * Process a post request to edit a specific class.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEdit(request, response) {
    client.db("final-kappa").collection(request.body["user"]).updateOne({
        class: request.body["class"],
        type: "classData"
    }, (error, result) => {
        if (error) {
            console.log(`Error on class.postEdit: ${err}`);
        } else {
            console.log(result);
        }
        response.end();
    });
}

/**
 * Process a post request to remove a specific class.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
    let user = request.body["user"];
    let className = request.body["class"];
    client.db("final-kappa").collection(user).findOne({
        class: className
    }, (error, result) => {
        if (error) {
            console.log(`Error on class.postRemove: ${err}`);
        } else {
            client.db("final-kappa").collection(user).deleteMany({
                class: className
            });
        }
        response.end();
    });
}


/**
 * Process a get request to search for files with tags.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getSearch(request, response) {
    let includeTags = (request.query.includeTags || '').split('+');
    let excludeTags = (request.query.excludeTags || '').split('+');
    let className = request.body["class"];

    client.db("final-kappa").collection(request.body["user"]).find({
        $or: [
            {
                class: className,
                type: "note",
                tags: {
                    $all: includeTags,
                    $ne: excludeTags
                }
            },
            {
                class: className,
                type: "flashcards",
                tags: {
                    $all: includeTags,
                    $ne: excludeTags
                }
            }
        ]
    }).toArray((error, found) => {
        if (error) {
            console.log(`Error on class.postRemove: ${err}`);
            response.end(JSON.stringify('[]'));
        } else {
            response.end(JSON.stringify(found));
        }
    });
}

module.exports = { getAll, postCreate, getClass, postEdit, postRemove, getSearch };