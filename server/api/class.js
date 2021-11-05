'use strict'

const fs = require('fs');

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function get(request, response) {
    const user = request.body['user'];
    const name = request.query.name;
    if (user !== undefined && name !== undefined) {
        if (fs.existsSync(`./users/${user}/${name}/`)) {
            fs.readdir(`./users/${user}/${name}/`, (err, files) => {
                if (err) {
                    response.end(JSON.stringify({ result: `Unable to find files for class ${name}` }));
                } else {
                    response.end(JSON.stringify({ fileNames: files }));
                }
            });    
        } else {
            response.end(JSON.stringify({ result: `Class ${name} not found` }));    
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
    const name = request.body['name'];
    const description = request.body['description'];
    if (name !== undefined && description !== undefined) {
        // If the class folder and description already exists, respond with an error
        // Otherwise, make the folder, description, and respond with success
        if (fs.existsSync(`./users/${user}/${name}/`)) {
            response.end(JSON.stringify({ result: `Class ${name} already exists` }));
        } else {
            fs.mkdir(`./users/${user}/${name}/`, (err) => {
                if (err) { // Error when unable to make the directory. 
                    response.end(JSON.stringify({ result: `Failed to add class ${name}` }));
                } else { // Write description if successful
                    fs.writeFile(`./users/${user}/${name}/.description`, description, (err) => {
                        if (err) { // Error when unable to write the description.
                            response.end(JSON.stringify({ result: `Added class ${name}, but failed to add description` }));
                        } else { // Success on writing the description
                            response.end(JSON.stringify({ result: `Added class ${name} and description` }));
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
function editClass(user, request, response) {
    const name = request.body['name'];
    const description = request.body['description'];
    if (name !== undefined && description !== undefined) {
        // If the class folder and description exist, replace the description
        // Otherwise, respond with an error
        if (fs.existsSync(`./users/${user}/${name}/`)) {
            fs.writeFile(`./users/${user}/${name}/.description`, description, (err) => {
                if (err) { // Error when unable to write the description.
                    response.end(JSON.stringify({ result: `Failed to add description for class ${name}` }));
                } else { // Success on writing the description
                    response.end(JSON.stringify({ result: `Edited description for class ${name}` }));
                }
            });
        } else {
            response.end(JSON.stringify({ result: `Class ${name} doesn't exist` }));
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
    const name = request.body['name'];
    if (name !== undefined) {

        // If the class folder exists, delete it
        // Otherwise, respond with an error
        if (fs.existsSync(`./users/${user}/${name}/`)) {
            fs.rmSync(`./users/${user}/${name}/`, { recursive: true, force: true });
            response.end(JSON.stringify({ result: `Removed class ${name}` }));
        } else {
            response.end(JSON.stringify({ result: `Class ${name} doesn't exist` }));
        }
        
    } else {
        response.end(JSON.stringify({ result: 'remove class failed' }));
    }
}

module.exports = { get, post };