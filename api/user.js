'use strict';

const { client, mc } = require("./initializeServer");

/**
 * Process a post request to sign up.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postSignup(request, response) {
    client.db('final-kappa').collection('users').findOne({
        name: request.body['name'],
        email: request.body['email']
    })
        .then(found => {
            if (found) {
                response.end(JSON.stringify({ status: -1, result: "Error on signup: user already exists" }))
            } else {
                const [salt, hash] = mc.hash(request.body['password']);
                client.db('final-kappa').collection('users').insertOne({
                    name: request.body['name'],
                    email: request.body['email'],
                    salt: salt,
                    hash: hash
                })
                    .then(_ => {
                        response.end(JSON.stringify({ status: -1, result: "Sign up successful!" }))

                        // todo: redirect user to home page!
                    })
                    .catch(err => response.end(JSON.stringify({ status: -1, result: `Error on signup: ${err}` })));
            }
        })
        .catch(err => response.end(JSON.stringify({ status: -1, result: `Error on signup: ${err}` })));
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
    const user = request.params.user;   // get user name from url

    const name = request.body['name'];  // get name from json obj received from fetch
    const email = request.body['email'];
    const password = request.body['password'];

    // respond with an error if user does not exist
    findUser(user).then(found => {
        if (!found) {
            response.end(JSON.stringify({
                status: 404,
                result: `user(${user}) could not be found`
            })
            )
            return;
        }
    });

    // get task from database
    client.db(db).collection(user).find({
        name: name, //taskid is unique, so it can be used on its own to locate a specific task
        email: email,
        password: password
    }).toArray().then(arr => {
        if (arr.length === 0) {
            response.end(JSON.stringify({ status: 404, result: `User with name (${name}) or email (${email}) could not be found` }));
            return;
        }
        response.end(JSON.stringify({ status: 200, result: arr[0].body })); //return user information
    }).catch(e => {
        response.end(JSON.stringify({ status: 404, result: "GET tasks: Error parsing for user information with mongodb" }));
        return;
    });
}

/**
 * Process a post request for editing a user.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEdit(request, response) {
    const name = request.params.user;   // get user name from url

    const nameToChange = request.body['name'];  // get name from json obj received from fetch
    const emailToChange = request.body['email'];
    const passwordToChange = request.body['password'];


    // respond with an error if user does not exist
    findUser(name).then(found => {
        if (!found) {
            response.end(JSON.stringify({
                status: 404,
                result: `user(${user}) could not be found`
            })
            )
        }
    });


    const query = {
        name: name,
    };

    // change collection name to the nameToChange
    if (nameToChange.length !== 0) {
        client.db('final-kappa').collection(user).rename(nameToChange);
        user = nameToChange;
    }

    const toUpdate = {};
    if (emailToChange.length !== 0) {
        toUpdate['email'] = emailToChange;
    }

    if (passwordToChange.length !== 0) {
        toUpdate['password'] = passwordToChange;
    }

    const updateDocument = {
        $set: toUpdate
    };

    client.db('final-kappa').collection(user).updateOne(query, updateDocument);

    response.end(JSON.stringify({ status: 200, result: "Changed name, email, or password" }));
}

/**
 * Process a post request for deleting a user.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postDelete(request, response) {

    const user = request.params.user;

    // respond with an error if user does not exist
    findUser(user).then(found => {
        if (!found) {
            response.end(JSON.stringify({
                status: 404,
                result: `user(${user}) could not be found`
            })
            )
        }
    });

    const query = {
        user: user,
    };

    client.db(db).collection(user).deleteOne(query); //delete the user from the database

    response.end(JSON.stringify({ status: 200, result: "User profile removed!" })); //Success, user removed
}

module.exports = { postSignup, postLogin, getData, postEdit, postDelete };