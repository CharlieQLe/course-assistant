'use strict';

const fs = require('fs');


// User data for log in - {name, email, password}
// -Create for making new user
// -Read for displaying current user data
// -Update for editing user profile
// -Delete for potential deletion of account?

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */

//Need to use this to retrieve a profile

 function profileGet(request, response) {
    const name = request.query.name;
    if (name !== undefined) {

        // todo: write more specific data- file names, description, etc.

        response.end(JSON.stringify({ result: `found ${name}` }));
    } else {

        // todo: write a better error message

        response.end(JSON.stringify({ result: 'class not found' }));
    }
}


//Need to for variety of actions

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function profilePost(request, response) {
    const action = request.body['action'];
    switch (action) {
        case 'signup': {
            profileAdd(request, response);
            break;
        }
        case 'login': {
            profileGet(request, response);
            break;
        }
        case 'remove': {
            profileDelete(request, response);
            break;
        }
        case 'edit': {
            profileEdit(request, response);
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
 function profileAdd(request, response) {
    const name = request.body['name'];
    const email = request.body['email']; //email would have to be primary key
    const password = request.body['password'];
    const confirmedpassword = request.body['confirmpassword'];
    
    if (name !== undefined && email !== undefined && password !== undefined && confirmedpassword !== undefined) {

        // todo: create profile
        // If the email already exists, respond with an error
        // Otherwise, create the profile with entered conditions, and respond with success

        response.end(JSON.stringify({ result: `Add profile ${name} with email "${email}" and with password "${password}"` }));
    } else {
        response.end(JSON.stringify({ result: 'add class failed' }));
    }
}

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function profileEdit(request, response) {
    const name = request.body['name'];
    const email = request.body['email']; //primary key
    const password = request.body['password'];
    
    if (name !== undefined && email !== undefined && password !== undefined) {

        // todo: edit profile --> do this with a bunch of if conditions?
        // If the profile exists (i.e. email in use), make the desired edit
        // Otherwise, respond with an error

        response.end(JSON.stringify({ result: `Edit profile ${name} password to "${password}"` }));
    } else {
        response.end(JSON.stringify({ result: 'edit profile failed' }));
    }
}

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function profileDelete(request, response) {
    const name = request.body['name'];
    const email = request.body['email']; //primary key
    
    if (name !== undefined && email !== undefined) {

        // todo: remove class
        // If the user exists (via email?), delete it
        // Otherwise, respond with an error

        response.end(JSON.stringify({ result: `Remove profile ${email}` }));
    } else {
        response.end(JSON.stringify({ result: 'remove profile failed' }));
    }
}


module.exports = { profileGet, profilePost };


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







