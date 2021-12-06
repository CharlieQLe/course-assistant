'use strict';

const { client } = require('./initializeServer.js');

/**
 * Process a get request to retrieve all the tags.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getAll(request, response) {
    // Find all tags belonging to a user, then convert them to an array and  
    client.db("final-kappa").collection('tags').find({ 
        user: request.params.user
    }).toArray()
        .then(tags => response.end(JSON.stringify({ status: 0, result: tags.map(tag => tag.name) })))
        .catch(err => response.end(JSON.stringify({ status: -1, result: `Error retrieving every tag: ${err}`})));
}

/**
 * Process a post request to create a tag.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postCreate(request, response) {
    // Trim desired tag name for validity
    let trimmed = request.params.tag.trim();
    if (trimmed === '') {
        response.end(JSON.stringify({
            status: -1,
            result: "Error adding tag: invalid tag name."
        }));
        return;
    }

    // Start a promise to find an existing tag and:
    //  - If the tag exists, throw an error.
    //  - Otherwise, insert the tag. 
    client.db("final-kappa").collection('tags').findOne({
        name: trimmed,
        user: request.params.user
    })
        .then(existingTag => {
            if (existingTag) {
                throw new Error("tag already exists!");
            }
            return client.db("final-kappa").collection("tags").insertOne({
                name: trimmed,
                user: request.params.user
            }).then(_ => response.end(JSON.stringify({
                status: 0,
                result: "Added tag"
            })));
        })
        .catch(err => response.end(`Error adding tag: ${err}`));
}

/**
 * Process a post request to remove a tag.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
    // Start a promise to delete a tag and remove the tag from every file.
    client.db("final-kappa").collection('tags').deleteOne({
        name: request.params.tag,
        user: request.params.user
    })
        .then(_ => client.db("final-kappa").collection('files').updateMany({ user: request.params.user }, { $pull: { tags: request.params.tag } }, { multi: true })
            .then(_ => response.end(JSON.stringify({ status: 0, result: "Deleted tag" }))))
        .catch(err => response.end(JSON.stringify({ status: -1, result: `Error deleting tag: ${err}` })));
}

module.exports = { getAll, postCreate, postRemove };
