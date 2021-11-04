'use strict'

const fs = require('fs');

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function classGet(request, response) {
    const name = request.query.name;
    if (name !== undefined) {

        // todo: write more specific data- file names, description, etc.

        response.end(JSON.stringify({ result: `found ${name}` }));
    } else {

        // todo: write a better error message

        response.end(JSON.stringify({ result: 'class not found' }));
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
        // If the class folder and description already exists, respond with an error
        // Otherwise, make the folder, description, and respond with success

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
        // If the class folder and description exist, replace the description
        // Otherwise, respond with an error

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
        // If the class folder exists, delete it
        // Otherwise, respond with an error

        response.end(JSON.stringify({ result: `Remove class ${name}` }));
    } else {
        response.end(JSON.stringify({ result: 'remove class failed' }));
    }
}

module.exports = { classGet, classPost };