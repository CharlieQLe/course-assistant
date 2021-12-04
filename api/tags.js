'use strict';

const { client } = require('./initializeServer.js');

/**
 * Process a get request to retrieve all the tags.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getAll(request, response) {
    client.db("final-kappa").collection('tags').find({ 
        user: request.params.user
    }).toArray((err, tags) => {
        if (err) {
            response.end(JSON.stringify({
                statusCode: -1,
                data: "Failed to search for every tag"
            }));
        } else {
            response.end(JSON.stringify({
                statusCode: 0,
                data: tags.map(x => x.name)
            }));
        }
    })
}

/**
 * Process a post request to create a tag.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postCreate(request, response) {
    client.db("final-kappa").collection('tags').findOne({
        name: request.params.tag,
        user: request.params.user
    })
        .then(existingTag => {
            if (existingTag) {
                throw new Error("tag already exists!");
            }
            return client.db("final-kappa").collection("tags").insertOne({
                name: request.params.tag,
                user: request.params.user
            }).then(_ => response.end(JSON.stringify({
                statusCode: 0,
                data: "Added tag"
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
    client.db("final-kappa").collection('tags').deleteOne({
        name: request.params.tag,
        user: request.params.user
    })
        .then(_ => client.db("final-kappa").collection('files').updateMany({ user: request.params.user }, { $pull: { tags: request.params.tag } }, { multi: true })
            .then(_ => response.end(JSON.stringify({ statusCode: 0, data: "Deleted tag" }))))
        .catch(err => response.end(JSON.stringify({ statusCode: -1, data: `Error deleting tag: ${err}` })));
}

module.exports = { getAll, postCreate, postRemove };
