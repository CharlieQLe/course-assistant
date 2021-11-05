'use strict'

const fs = require('fs');

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
async function get(request, response) {
    const user = request.body['user'];
    const className = request.query.class;
    if (user !== undefined && className !== undefined) {
        if (fs.existsSync(`./users/${user}/${className}/`)) {
            fs.readdir(`./users/${user}/${className}/`, (err, files) => {
                if (err) {
                    response.end(JSON.stringify({ result: `Unable to find files for class ${className}` }));
                } else {
                    response.end(JSON.stringify({ fileNames: files }));
                }
            });    
        } else {
            response.end(JSON.stringify({ result: `Class ${className} not found` }));    
        }
    } else {
        response.end(JSON.stringify({ result: 'class not found' }));
    }
}

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function post(request, response) {
    const user = request.body['user'];
    const action = request.body['action'];
    if (user === undefined) {
        response.end(JSON.stringify({ result: 'user unknown' }));
        return;
    }
    switch (action) {
        case 'add': {
            addClass(user, request, response);
            break;
        }
        case 'edit': {
            editClass(user, request, response);
            break;
        }
        case 'remove': {
            removeClass(user, request, response);
            break;
        }
        default: {
            response.end(JSON.stringify({ result: 'command unknown' }));
            break;
        }
    }
}

/**
 * @param {string} user
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
async function addClass(user, request, response) {
    const className = request.body['class'];
    const description = request.body['description'];
    if (className !== undefined && description !== undefined) {
        // If the class folder and description already exists, respond with an error
        // Otherwise, make the folder, description, and respond with success
        if (fs.existsSync(`./users/${user}/${className}/`)) {
            response.end(JSON.stringify({ result: `Class ${className} already exists` }));
        } else {
            fs.mkdir(`./users/${user}/${className}/`, (err) => {
                if (err) { // Error when unable to make the directory. 
                    response.end(JSON.stringify({ result: `Failed to add class ${className}` }));
                } else { // Write description if successful
                    fs.writeFile(`./users/${user}/${className}/.description`, description, (err) => {
                        if (err) { // Error when unable to write the description.
                            response.end(JSON.stringify({ result: `Added class ${className}, but failed to add description` }));
                        } else { // Success on writing the description
                            response.end(JSON.stringify({ result: `Added class ${className} and description` }));
                        }
                    });
                }
            });
        }
    } else {
        response.end(JSON.stringify({ result: 'add class failed' }));
    }
}

/**
 * @param {string} user
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 async function editClass(user, request, response) {
    const className = request.body['class'];
    const description = request.body['description'];
    if (className !== undefined && description !== undefined) {
        // If the class folder and description exist, replace the description
        // Otherwise, respond with an error
        if (fs.existsSync(`./users/${user}/${className}/`)) {
            fs.writeFile(`./users/${user}/${className}/.description`, description, (err) => {
                if (err) { // Error when unable to write the description.
                    response.end(JSON.stringify({ result: `Failed to add description for class ${className}` }));
                } else { // Success on writing the description
                    response.end(JSON.stringify({ result: `Edited description for class ${className}` }));
                }
            });
        } else {
            response.end(JSON.stringify({ result: `Class ${className} doesn't exist` }));
        }
    } else {
        response.end(JSON.stringify({ result: 'edit class failed' }));
    }
}

/**
 * @param {string} user
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 async function removeClass(user, request, response) {
    const className = request.body['class'];
    if (className !== undefined) {

        // If the class folder exists, delete it
        // Otherwise, respond with an error
        if (fs.existsSync(`./users/${user}/${className}/`)) {
            fs.rmSync(`./users/${user}/${className}/`, { recursive: true, force: true });
            response.end(JSON.stringify({ result: `Removed class ${className}` }));
        } else {
            response.end(JSON.stringify({ result: `Class ${className} doesn't exist` }));
        }
        
    } else {
        response.end(JSON.stringify({ result: 'remove class failed' }));
    }
}

module.exports = { get, post };