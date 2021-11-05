'use strict'

const fs = require('fs');
const path = require('path');

let flashcards = [];

/**
 *  return existing flashcard
 */
function get(req, res) {
	const user = req.params.user;
	const userClass = req.params.class;
	const title = req.query.title;

	// console.log(fs.existsSync(`./users/${user}/${userClass}/${title}.txt`))

	// check if flashcard exists in file path
	if (fs.existsSync(`./users/${user}/${userClass}/${title}.json`)) {
		
		res.end(`received GET request from client. flashcard exists!: ${user}, ${userClass}, title of flashcard: ${title}`);
		return;
	}
	res.end('GET request received incorrect, user, class or title')

};


/**
 * receives a JSON file and create, update or delete
 * the flashcard depending on the action in the JSON file
 * JSON file: {action: 'create', path: './path', title:'title'}
 * 			  {action: 'update', path: './path', operation: 'add|delete', flashcard: {term: 't1', desc: 'desc1'} }
 * 			  {action: 'delete', path: './path'}
 * path for create and delete should include the title 
 */
function post(req, res) {
	const action = req.body['action'];
    switch (action) {
		case 'create': {
            createFlashcard(req, res);
            break;
        }
        case 'update': {
            updateFlashcard(req, res);
            break;
        }
        case 'delete': {
            deleteFlashcard(req, res);
            break;
        }
        default: {
            res.end(`unknown command`);
            break;
        }
    }
}

/**
 * create flashcard at the given path
 */
 function createFlashcard(req, res) {
    const path = req.body['path'];
    const title = req.body['title'];

    if (fs.existsSync(`./users/${path}`)) {

		// TODO: create flashcard in given path

        res.end(`created your ${title} flashcard in ${path}`);
    } else {
        res.end(`failed to create flashcard at ${path}`);
    }
}

/**
 * update flashcard at the given path
 */
 function updateFlashcard(req, res) {
    const path = req.body['path'];

    if (fs.existsSync(`./users/${path}`)) {

		// TODO: update flashcard in given path

        res.end(`updated your ${title} flashcard in ${path}`);
    } else {
        res.end(`failed to update flashcard at ${path}`);
    }
}


/**
 * delete flashcard at the given path
 */
 function deleteFlashcard(req, res) {
    const path = req.body['path'];

    if (fs.existsSync(`./users/${path}`)) {

		// TODO: delete flashcard in given path

        res.end(`created your ${title} flashcard in ${path}`);
    } else {
        res.end(`failed to delete flashcard at ${path}`);
    }
}


/* DOM SURGERY
<div class="row d-flex justify-content-center flex-nowrap p-4">
    <div class="col-3 text-center">
        1 of 3
    </div>
    <div class="col-3 text-center">
        2 of 3
    </div>
    <div class="col-1 text-center">
        <i class="bi bi-x hov"></i>
    </div>
</div>
*/


function render(element) {
    console.log('hi')
    element.innerHTML = '';

        for (let i = 0; i < flashcards.length; i++) {
            const main = document.createElement('div');
            main.classList.add('d-flex, justify-content-center, flex-nowrap, p-4');
            
            const term = document.createElement('div');
            term.classList.add('col-3, text-center');
            term.innerText = flashcards[i].term;
            
            const desc = document.createElement('div');
            desc.classList.add('col-3, text-center');
            desc.innerText = flashcards[i].desc;

            const xButton = document.createElement('div');
            xButton.classList.add('col-1, text-center');

            const x = document.createElement('i');
            x.classList.add('bi, bi-x, hov');
            xButton.appendChild(x);

            main.appendChild(term, desc, xButton);

            element.appendChild(main);
        }
}


document.getElementById('add-flashcard-btn').addEventListener('click', () => {
    console.log('btn clicked');
    const term = document.getElementById('term-input').value;
    const desc = parseInt(document.getElementById('flashcard-desc-input').value);
    flashcards.push({term: term, desc: desc});

    render(document.getElementById('edit-flashcard'));
});




module.exports = { get, post };
