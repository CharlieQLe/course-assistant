'use strict';

const { client } = require('./initializeServer.js');

/**
 * Process a get request to retrieve all files.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getAll(request, response) {
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
    const user = request.params.user;
    const fileName = request.body['fileName'];
    const includeTags = request.body['includeTags'];
    const excludeTags = request.body['excludeTags'];

    client.db('final-kappa').collection('files').find({
        user: user,
        name: {
            $regex: `.*${fileName}.*`,
            $options: 'i'
        }
    })
        .toArray()
        .then(documents => {
            response.end(JSON.stringify({
                statusCode: 0,
                data: documents.reduce((documents, document) => {
                    if (!includeTags.every(tag => document.tags.includes(tag)) || !excludeTags.every(tag => !document.tags.includes(tag))) {
                        return documents;
                    }
                    
                    if (document.type === 'note') {
                        documents.push({
                            name: document.name,
                            type: document.type,
                            tags: document.tags
    
                            // TODO: Add other data
                        });
                    } else if (document.type === 'flashcard') {
                        documents.push({
                            name: document.name,
                            type: document.type,
                            tags: document.tags
    
                            // TODO: Add other data
                        });
                    }
                    return documents;
                }, [])
            }));
        })
        .catch(err => response.end(JSON.stringify({ statusCode: -1, data: `Error searching: ${err}` })));
}

module.exports = { getAll, postSearch }