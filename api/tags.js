'use strict';

const { client } = require('./mongo.js');

/**
 * Process a get request to retrieve all the tags.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getAll(request, response) {
    client.db("final-kappa").collection(request.query.user).find({ type: "tag" }).toArray((err, tags) => {
        if (err) {
            response.end(JSON.stringify({
                statusCode: -1,
                data: "Failed to search for every tag"
            }));
        } else {
            response.end(JSON.stringify({
                statusCode: 0,
                data: tags.map(x => {
                    return {
                        name: x.name,
                        type: x.type
                    };
                })
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
    client.db("final-kappa").collection(request.params.user).findOne({
        name: request.params.tag,
        type: "tag"
    }, (err, existingTag) => {
        if (err || existingTag) {
            response.end(JSON.stringify({
                statusCode: -1,
                data: "Failed to add tag"
            }));
        } else {
            client.db("final-kappa").collection(request.params.user).insertOne({
                name: request.params.tag,
                type: "tag"
            }, (err, res) => {
                if (err) {
                    response.end(JSON.stringify({
                        statusCode: -1,
                        data: "Failed to add tag"
                    }));
                } else {
                    response.end(JSON.stringify({
                        statusCode: 0,
                        data: "Added tag"
                    }));
                }
            });
        }
    });
}

/**
 * Process a post request to remove a tag.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
    client.db("final-kappa").collection(request.params.user).deleteOne({
        name: request.params.tag,
        type: "tag"
    }, (err, res) => {
        if (err) {
            response.end(JSON.stringify({
                statusCode: -1,
                data: "Failed to delete tag"
            }));
        } else {
            response.end(JSON.stringify({
                statusCode: 0,
                data: "Deleted tag"
            }));
        }
    });
}

module.exports = { getAll, postCreate, postRemove };
