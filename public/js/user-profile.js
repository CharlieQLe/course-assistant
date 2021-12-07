'use strict';

let url = null;       // reads url
let split = null;

// when user refreshes the page
window.addEventListener('load', () => {
    url = window.location.pathname;       // reads url
    split = url.split('/');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    name.innerHTML = 'no name found';
    email.innerHTML = 'no email found';
    fetch(`/api/users/${split[2]}`)
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                name.innerHTML = '';
                name.appendChild(document.createTextNode(response.result.name));
                email.innerHTML = '';
                email.appendChild(document.createTextNode(response.result.email));
            }
        })
        .catch(console.log);
});


document.getElementById('save-name-btn').addEventListener('click', () => {
    fetch(`/api/users/${split[2]}/edit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: document.getElementById('name-change-input').value, email: '', password: '' })
    }).then(response => response.json())
        .then(response => location.reload())
        .catch(console.log);
});


document.getElementById('save-email-btn').addEventListener('click', () => {
    fetch(`/api/users/${split[2]}/edit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: '', email: document.getElementById('email-change-input').value, password: '' })
    }).then(response => response.json())
        .then(response => location.reload())
        .catch(console.log);
});

document.getElementById('save-password-btn').addEventListener('click', () => {
    fetch(`/api/users/${split[2]}/edit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: '', email: '', password: document.getElementById('password-change-input').value })
    }).then(response => response.json())
        .then(response => location.reload())
        .catch(console.log);
});

document.getElementById('delete-account-btn').addEventListener('click', () => {

});