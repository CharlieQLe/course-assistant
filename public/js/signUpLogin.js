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