'use strict';

let url = null;       // reads url
let split = null;

// when user refreshes the page
window.addEventListener('load', () => {
	url = window.location.pathname;       // reads url
	split = url.split('/');
	document.getElementById('name').innerHTML = split[2];
	
	// todo
	// GET request to server: get user data from server
	// specifically, we get email since we can get the username
	// from the url and we do not want to display plain text password
	// fetch(`/api/users/${split[2]}`)
	// .then(response => response.json())
	// .then(obj => {	
	// 	document.getElementById('email').innerHTML = obj.email
	// });
});


document.getElementById('name-change-input').addEventListener('click', () => {
	const name = document.getElementById('name-change-input').innerHTML;

	// POST request: ask server to update password
	// fetch(`/api/users/${split[2]}/edit`, {
	// 	method: 'POST', 
	// 	body: JSON.stringify({ name: name, email: '', password: '' }), 
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	}
	// }).then(response => response.json())
	// .then(obj => {
	// 	// todo
	// 	// either get an error saying server failed to update name
	// 	// or server sucessfully updated name 
	// });

});


document.getElementById('email-change-input').addEventListener('click', () => {

});

document.getElementById('password-change-input').addEventListener('click', () => {

});

document.getElementById('delete-account-btn').addEventListener('click', () => {

});