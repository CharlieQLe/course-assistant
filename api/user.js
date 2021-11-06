'use strict';

/**
 * Process a post request to sign up.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postSignup(request, response) {
    const name = request.body['name'];
    const email = request.body['email']; //email would have to be primary key
    const password = request.body['password'];

    if (name !== undefined && email !== undefined && password !== undefined) {

        if (fs.existsSync(`./api/users/${name}`)) {
            response.end(JSON.stringify({ result: "Profile already exists." }));
        }
        else {
            fs.mkdir(`./api/users/${name}`, (err) => {
                if (err) {
                    response.end(JSON.stringify({ result: "Failed to create user" }));
                }
                else {
                    response.end(JSON.stringify({ result: "Successfully created user" }));
                }
            })

        }
    } else {
        response.end(JSON.stringify({ result: 'Add profile failed.  Please check that all fields are entered and passwords match and try again.' }));
    }
}

/**
 * Process a post request to log in.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postLogin(request, response) {

    const email = request.params.email;
    const password = request.params.password;

    if (email !== undefined && password !== undefined) {
        //if a user exists, read their user folder in

        // todo: figure out how to authenticate login and load in profile

        response.end(JSON.stringify({ result: `Found account with email ${email} and password ${password}` }));
    } else {
        response.end(JSON.stringify({ result: 'User not found. Please check email and password and try again.  No account? Sign up below.' }));
    }
 
}

/**
 * Process a get request to retrieve user data.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getData(request, response) {
    const user = request.params['user'];
    if (user !== undefined) {
        if (fs.existsSync(`./api/users/${user}`)) {
            fs.readFile(`./api/users/${user}`, (err, data) => {
                if (err) {
                    response.end(JSON.stringify({ result: `Unable to find user ${user}` }));
                } else {
                    response.end(JSON.stringify(data));
                }
            });
        } else {
            response.end(JSON.stringify({ result: `User ${user} not found` }));
        }
    } else {
        response.end(JSON.stringify({ result: 'User not found.  Check name and try again.' }));
    }
}

/**
 * Process a post request for editing a user.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEdit(request, response) {

    const user = request.params['user'];
    const name = request.body['name'];
    const email = request.body['email']; //primary key
    const password = request.body['password'];

    if (user !== undefined && name !== undefined && email !== undefined && password !== undefined) {

        if (fs.existsSync(`./api/users/${user}`)) {
            fs.readFileSync(`./api/users/${user}`, (err, data) => {
                if (err) { // Error when unable to write the description.
                    response.end(JSON.stringify({ result: `Failed to edit for ${user}` }));
                } else { // Success on writing the description
                    const parsed = JSON.parse(data);
                    const profiletoedit = parsed[parseInt(user)];
                    profiletoedit.name = name;
                    profiletoedit.email = email;
                    profiletoedit.password = password;

                    response.end(JSON.stringify({ result: `Edit successful for ${user}` }));
                }
            });
        } else {
            response.end(JSON.stringify({ result: `${user} doesn't exist` }));
        }
    } else {
        response.end(JSON.stringify({ result: 'edit profile failed' }));
    }
}

/**
 * Process a post request for deleting a user.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postDelete(request, response) {
    
    const user = request.params['user'];

    if (user !== undefined) {

        // If the class folder exists, delete it
        // Otherwise, respond with an error
        if (fs.existsSync(`./api/users/${user}`)) {
            fs.rmSync(`./api/users/${user}`, { recursive: true, force: true });
            response.end(JSON.stringify({ result: `Removed user ${user}` }));
        } else {
            response.end(JSON.stringify({ result: `User ${user} doesn't exist` }));
        }
    } else {
        response.end(JSON.stringify({ result: 'Delete profile failed' }));
    }
}

module.exports = { postSignup, postLogin, getData, postEdit, postDelete };