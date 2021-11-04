'use strict'

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function classGet(request, response) {
    const name = request.query.name;
    if (name !== undefined) {
        response.end(JSON.stringify({ result: `found ${name}` }));

        // todo: send user new class data
    } else {
        response.end(JSON.stringify({ result: 'class not found' }));

        // todo: redirect user to default home page
    }
}

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function classPost(request, response) {
    const action = request.body['action'];
    switch (action) {
        case 'add': {
            classAdd(request, response);
            break;
        }
        case 'edit': {
            classEdit(request, response);
            break;
        }
        case 'remove': {
            classRemove(request, response);
            break;
        }
        default: {
            response.end(JSON.stringify({ result: 'command unknown' }));
            break;
        }
    }
}

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function classAdd(request, response) {
    const name = request.body['name'];
    const description = request.body['description'];
    if (name !== undefined && description !== undefined) {

        // todo: add class

        response.end(JSON.stringify({ result: `Add class ${name} with description "${description}"` }));
    } else {
        response.end(JSON.stringify({ result: 'add class failed' }));
    }
}

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function classEdit(request, response) {
    const name = request.body['name'];
    const description = request.body['description'];
    if (name !== undefined && description !== undefined) {

        // todo: edit class

        response.end(JSON.stringify({ result: `Edit class ${name} description to "${description}"` }));
    } else {
        response.end(JSON.stringify({ result: 'edit class failed' }));
    }
}

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function classRemove(request, response) {
    const name = request.body['name'];
    if (name !== undefined) {

        // todo: remove class

        response.end(JSON.stringify({ result: `Remove class ${name}` }));
    } else {
        response.end(JSON.stringify({ result: 'remove class failed' }));
    }
}

module.exports = { classGet, classPost };