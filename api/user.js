'use strict';

const { client, mc } = require("./initializeServer");

/**
 * Process a post request to sign up.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postSignup(request, response) {
    const name = request.body['name'];
    const email = request.body['email'];
    const password = request.body['password'];

    client.db('final-kappa').collection('authentication').findOne({
        email: email
    })
        .then(existingUser => {
            if (existingUser) {
                throw new Error("Email already in use!");
            } else {
                const [salt, hash] = mc.hash(password);
                return client.db('final-kappa').collection('authentication').insertOne({
                    name: name,
                    email: email,
                    salt: salt,
                    hash: hash
                });
            }
        })
        .then(_ => response.end(JSON.stringify({ status: 0, result: `Success creating user!` })))
        .catch(err => response.end(JSON.stringify({ status: -1, result: `Error creating user: ${err}` })));
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

    client.db('final-kappa').collection('authentication').findOne({
        email: email
    })
        .then(existingUser => {
            if (existingUser) {
                const [salt, hash] = mc.hash(password);
                if (existingUser.salt === salt && existingUser.hash === hash) {

                    // todo: authentiate

                    response.end(JSON.stringify({ status: 0, result: `Success logging in!` }));
                } else {
                    throw new Error("Password doesn't match");
                }
            } else {
                throw new Error("User doesn't exist");
                
            }
        })
        .catch(err => response.end(JSON.stringify({ status: -1, result: `Error logging in: ${err}` })));

}

/**
 * Process a get request to retrieve user data.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getData(request, response) {
    const user = request.params.user;

    client.db('final-kappa').collection('authentication').findOne({
        user: user
    })
        .then(existingUser => {
            if (existingUser) {
                response.end(JSON.stringify({
                    status: 0,
                    result: {
                        name: existingUser.name,
                        email: existingUser.email
                    }
                }));
            } else {
                throw new Error("User doesn't exist");
            }
        })
        .catch(err => response.end(JSON.stringify({ status: -1, result: `Error retrieving data: ${err}` })));
}

/**
 * Process a post request for editing a user.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEdit(request, response) {
    const user = request.params.user;   // get user name from url
    
    const nameToChange = request.body['name'];  // get name from json obj received from fetch
    const emailToChange = request.body['email'];
    const passwordToChange = request.body['password'];
    const [salt, hash] = mc.hash(passwordToChange);
    
    client.db('final-kappa').collection('authentication').updateOne({
        user: user
    }, {
        $set: {
            name: nameToChange,
            email: emailToChange,
            salt: salt,
            hash: hash
        }
    })
        .then(_ => {
            response.end(JSON.stringify({
                status: 0,
                result: "Successfully edited user!"
            }));
        })
        .catch(err => response.end(JSON.stringify({ status: -1, result: `Error editing user: ${err}` })));
}

/**
 * Process a post request for deleting a user.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postDelete(request, response) {
    const user = request.params.user;
    client.db('final-kappa').collection('authentication').deleteOne({
        user: user
    })
        .then(_ => {
            let promises = [];
            promises.push(client.db('final-kappa').collection('collection').deleteMany({
                user: user
            }));
            promises.push(client.db('final-kappa').collection('tasks').deleteMany({
                user: user
            }));
            return Promise.all(promises);
        })
        .then(_ => response.end(JSON.stringify({ status: 0, result: "Successfully deleted user!" })))
        .catch(err => response.end(JSON.stringify({ status: -1, result: `Error retrieving data: ${err}` })));
}

module.exports = { postSignup, postLogin, getData, postEdit, postDelete };