'use strict';

const { client, mc } = require("./initializeServer");

/**
 * Process a get request to retrieve user data.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getData(request, response) {
    const user = request.params.user;

    client.db('final-kappa').collection('users').findOne({ userId: user })
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
    const user = request.params.user;
    let nameToChange = request.body['name'].trim();
    let emailToChange = request.body['email'].trim();
    const passwordToChange = request.body['password'];
    let [salt, hash] = mc.hash(passwordToChange);

    client.db('final-kappa').collection('users').findOne({ userId: user })
        .then(existingUser => {
            if (!existingUser) {
                throw "User not found";
            }
            if (nameToChange === '') {
                nameToChange = existingUser.name;
            }
            if (emailToChange === '') {
                emailToChange = existingUser.email;
            }
            if (passwordToChange === '') {
                salt = existingUser.salt;
                hash = existingUser.hash;
            }
            return client.db('final-kappa').collection('users').updateOne({ userId: user }, {
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
        }).catch(err => response.end(JSON.stringify({ status: -1, result: `Error editing user: ${err}` })));
}

/**
 * Process a post request for deleting a user.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postDelete(request, response) {
    const user = request.params.user;
    client.db('final-kappa').collection('users').deleteOne({ userId: user })
        .then(result => {
            if (!result.acknowledged) {
                throw "Could not delete user";
            }
            return Promise.all([
                client.db('final-kappa').collection('files').deleteMany({ user: user }),
                client.db('final-kappa').collection('tasks').deleteMany({ user: user })
            ]);
        })
        .then(_ => response.end(JSON.stringify({ status: 0, result: "Successfully deleted user!" })))
        .catch(err => response.end(JSON.stringify({ status: -1, result: `Error retrieving data: ${err}` })));
}

module.exports = { getData, postEdit, postDelete };