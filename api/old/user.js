'use strict';

const fs = require('fs');

/**
 * Process a post request to sign up.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postSignup(request, response) {
    response.end(JSON.stringify({ result: "Sign up received!" }));

    /*
    const name = request.body['name'];
    const email = request.body['email']; //email would have to be primary key
    const password = request.body['password'];

    if (name !== undefined && email !== undefined && password !== undefined) {

        if (fs.existsSync(`/users/${name}`)) {
            response.end(JSON.stringify({ result: "Profile already exists." }));
        }
        else {
            fs.mkdir(`/users/${name}`, (err) => {
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
    */
}

/**
 * Process a post request to log in.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postLogin(request, response) {
    response.end(JSON.stringify({ result: "Log in received!" }));

    /*
    const email = request.params.email;
    const password = request.params.password;

    if (email !== undefined && password !== undefined) {
        //if a user exists, read the

        // todo: figure out how to authenticate login and load in profile

        response.end(JSON.stringify({ result: `Found account with email ${email} and password ${password}` }));
    } else {
        response.end(JSON.stringify({ result: 'User not found. Please check email and password and try again.  No account? Sign up below.' }));
    }
    */
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

    /*
    const name = request.body['name'];
    const email = request.body['email']; //primary key
    const password = request.body['password'];

    if (name !== undefined && email !== undefined && password !== undefined) {

        // todo: edit profile --> do this with a bunch of if conditions?
        // If the profile exists (i.e. email in use), make the desired edit
        // Otherwise, respond with an error

        response.end(JSON.stringify({ result: `Edit profile ${name} password to "${password}"` }));
    } else {
        response.end(JSON.stringify({ result: 'Edit profile failed. Please check conditions and try again.' }));
    }
    */
}

/**
 * Process a post request for deleting a user.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postDelete(request, response) {
    response.end(JSON.stringify({ result: "Delete user received!" }));

    /*
    const name = request.body['name'];
    const email = request.body['email']; //primary key

    if (name !== undefined && email !== undefined) {

        // If the class folder exists, delete it
        // Otherwise, respond with an error
        if (fs.existsSync(`./users/${name}`)) {
            fs.rmSync(`./users/${name}`, { recursive: true, force: true });
            response.end(JSON.stringify({ result: `Removed user ${name}` }));
        } else {
            response.end(JSON.stringify({ result: `User ${name} doesn't exist` }));
        }
    } else {
        response.end(JSON.stringify({ result: 'Delete profile failed' }));
    }
    */
}


module.exports = { postSignup, postLogin, getData, postEdit, postDelete };


// COMMENTED LOGIC THAT MIGHT BE HELPFUL FOR NEXT MILESTONE

//HOME PAGE  

//LOG IN CLICKED

//FUNCTION FOR READING USERS PROFILE ON LOGIN

// document.getElementById("loginButton").addEventListener('click', () => {

//     //popup login modal --> already taken care of via bootstrap
//     //Then send a GET request to server for user's profile and read their profile's data
//     //If remember me is clicked, stay logged in?

// })

// //SIGN UP CLICKED

//FUNCTION FOR CREATING USERS PROFILE ON SIGN UP

// document.getElementById("signupButton").addEventListener('click', () => {

//     // popup sign up modal --> already taken care of via bootstrap
//     //CREATE new user on sign up

// })







