"use strict";

// Toast
const dangerToastBody = document.getElementById("dangerToastBody");
const dangerToast = new bootstrap.Toast(document.getElementById("dangerToast"));

/**
 * Remove the children of an HTMLElement.
 *
 * @param {HTMLElement} element
 */
function removeChildren (element) {
	while (element.firstChild) {
		element.firstChild.remove();
	}
}

/**
 * Show a danger toast with the specified message.
 *
 * @param {string} message
 */
function showDangerToast (message) {
	removeChildren(dangerToastBody);
	dangerToastBody.appendChild(document.createTextNode(message));
	dangerToast.show();
}

export {
	showDangerToast
};
