"use strict";

import * as notification from "./notification.js";

const url = window.location.pathname; // reads url
const split = url.split("/");

window.addEventListener("load", function () {
	// GET request to server: asking for the file
	fetch(`/api/users/${split[2]}/files/notes/${split[5]}`)
		.then(response => {
			return response.json();
		}).then(obj => {
			if (obj.status === 0) {
				document.getElementById("notepad-textarea").value = obj.result;

				// sets the file name of the notes
				document.getElementById("notepad-title").innerHTML = split[split.length - 2].replace("%20", " ");
			} else {
				throw new Error("getting the notes from the server failed" + obj.result.replace('Error:',''));
			}
		}).catch(notification.showDangerToast);
});

document.getElementById("save-btn").addEventListener("click", () => {
	// post to server. tell server to save file
	fetch(`/api/users/${split[2]}/files/notes/${split[5]}/edit`, {
		method: "POST",
		body: JSON.stringify({ body: document.getElementById("notepad-textarea").value }),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => response.json())
		.then(obj => {
			if (obj.status !== 0) {
				throw new Error(obj.result.replace('Error:',''));
			}
		}).catch(notification.showDangerToast);
});
