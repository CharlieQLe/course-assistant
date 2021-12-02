'use strict';

const { client } = require('./initializeServer.js');

/**
 * Process a get request to retrieve files.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getSearch(request, response) {
    const user = request.params.user;
    const fileName = request.body['fileName'];
    const includeTags = request.body['includeTags'];
    const excludeTags = request.body['excludeTags'];

    client.db('final-kappa').collection('collection').find({
        user: user,
        fileName: {
            $regex: `/^${fileName}/`,
            $options: 'im'
        },
        tags: {
            $all: includeTags,
            $not: {
                $all: excludeTags
            }
        }
    })
        .toArray()
        .then(documents => {
            let found = documents.reduce((documents, document) => {
                if (document.type === 'note') {
                    documents.push({
                        name: document.name,
                        type: document.type,

                        // TODO: Add other data
                    });
                } else if (document.type === 'flashcard') {
                    documents.push({
                        name: document.name,
                        type: document.type,

                        // TODO: Add other data
                    });
                }
                return documents;
            }, []);
            response.end(JSON.stringify({
                status: 0,
                result: found
            }));
        })
        .catch(err => response.end(JSON.stringify({ status: -1, result: `Error searching: ${err}` })));
}