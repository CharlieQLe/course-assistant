'use strict';

function signUp() {
    const nameInput = document.getElementById('signUpNameInput');
    const emailInput = document.getElementById('signUpEmailInput');
    const passwordInput = document.getElementById('signUpPasswordInput');
    const confirmPasswordInput = document.getElementById('signUpConfirmPasswordInput');

    // todo: try to sign up then redirect
}

function logIn() {
    const emailInput = document.getElementById('logInEmailInput');
    const passwordInput = document.getElementById('logInPasswordInput');
    const rememberMe = document.getElementById('rememberMeCheck');

    // todo: try to log in then redirect
}

function initialize() {
    document.getElementById('signupButton').addEventListener('click', signUp);
    document.getElementById('loginButton').addEventListener('click', logIn);
}

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