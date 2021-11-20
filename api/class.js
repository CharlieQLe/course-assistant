'use strict';

const { client } = require('../index.js');

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
    client.db("final-kappa").collection(request.body["user"]).findOne({
        type: request.body["class"]
    }, (error, result) => {
        if (error) {
            console.log(`Error on class.postCreate: ${err}`);
        } else {

            // todo: create a class

            console.log(result);
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

            // todo: respond with class data

            response.end("CLASS DATA HERE");
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
    client.db("final-kappa").collection(request.body["user"]).findOne({
        type: request.body["class"]
    }, (error, result) => {
        if (error) {
            console.log(`Error on class.postRemove: ${err}`);
        } else {

            // todo: remove class

            console.log(result);
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

    client.db("final-kappa").collection(request.body["user"]).find({
        $or: [
            {
                class: request.body["class"],
                type: "note",
                tags: {
                    $all: includeTags,
                    $ne: excludeTags
                }
            }

            // todo: add more file types
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