'use strict';

const { client } = require('./initializeServer.js');

/**
 * Process a get request to retrieve all files.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getAll(request, response) {
    // Retrieve all files belonging to a user then mapping it and returning the result
    client.db("final-kappa").collection("files").find({
        user: request.params.user
    })
        .toArray()
        .then(files => response.end(JSON.stringify({
            statusCode: 0,
            data: files.map(file => ({
                name: file.name,
                type: file.type,
                tags: file.tags
            }))
        })))
        .catch(err => response.end(JSON.stringify({ statusCode: -1, data: `Error retrieving files: ${err}` })));
}

/**
 * Process a get request to retrieve files.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postSearch(request, response) {
    // Retrieve all files belonging to a user whose name contains the name search,
    // and filtering the documents that contain ALL of the included tags and NONE of the excluded tags
    client.db('final-kappa').collection('files').find({
        user: request.params.user,
        name: {
            $regex: `.*${request.body['fileName']}.*`,
            $options: 'i'
        }
    })
        .toArray()
        .then(documents => {
            response.end(JSON.stringify({
                statusCode: 0,
                data: documents.filter(document => request.body['includeTags'].every(tag => document.tags.includes(tag)) && request.body['excludeTags'].every(tag => !document.tags.includes(tag)))
                                .map(document => ({ name: document.name, type: document.type, tags: document.tags }))
            }));
        })
        .catch(err => response.end(JSON.stringify({ statusCode: -1, data: `Error searching: ${err}` })));
}

module.exports = { getAll, postSearch }