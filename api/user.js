'use strict';

/**
 * Process a post request to sign up.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postSignup(request, response) {
    response.end(JSON.stringify({ result: "Sign up received!" }));
}

/**
 * Process a post request to log in.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postLogin(request, response) {
    response.end(JSON.stringify({ result: "Log in received!" }));
}

/**
 * Process a get request to retrieve user data.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getData(request, response) {
    const user = request.body['user'];
    if (user) {
        response.end(JSON.stringify({ result: `Get data for user ${user} received!` }));
    } else {
        response.end(JSON.stringify({ result: `Error, user is not defined!` }));
    }
}

/**
 * Process a post request for editing a user.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEdit(request, response) {
    response.end(JSON.stringify({ result: "Edit user received!" }));
}

/**
 * Process a post request for deleting a user.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postDelete(request, response) {
    response.end(JSON.stringify({ result: "Delete user received!" }));
}

module.exports = { postSignup, postLogin, getData, postEdit, postDelete };