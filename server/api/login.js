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
            profileLogin(request, response);
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

function profileLogin(request, response) {
    
    const email = request.params.email;
    const password = request.params.password;

    if (email !== undefined && password !== undefined) {
        //if a user exists, read the

        // todo: figure out how to authenticate login and load in profile

        response.end(JSON.stringify({ result: `Found account with email ${email} and password ${password}` }));
    } else {
        response.end(JSON.stringify({ result: 'User not found. Please check email and password and try again.  No account? Sign up below.' }));
    }
}

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 async function profileAdd(request, response) {
    const name = request.body['name'];
    const email = request.body['email']; //email would have to be primary key
    const password = request.body['password'];
    
    if (name !== undefined && email !== undefined && password !== undefined) {

        if(fs.existsSync(`/users/${name}`)) {
            response.end(JSON.stringify({result: "Profile already exists."}));
        }
        else{
            fs.mkdir(`/users/${name}`, (err) => {
                if(err) {
                    response.end(JSON.stringify({result: "Failed to create user"}));
                }
                else{
                    response.end(JSON.stringify({result: "Successfully created user"}));
                }
            })

        }
    } else {
        response.end(JSON.stringify({ result: 'Add profile failed.  Please check that all fields are entered and passwords match and try again.' }));
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
        response.end(JSON.stringify({ result: 'Edit profile failed. Please check conditions and try again.' }));
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
}


module.exports = {profilePost };


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







