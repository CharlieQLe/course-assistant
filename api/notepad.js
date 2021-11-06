'use strict'

const fs = require('fs');
const path = require('path');


/**
 *  @returns JSON obj back to client
 * 
 */
function get(req, res) {
	const user = req.params.user;
	const userClass = req.params.class;
	const title = req.query.title;

	// check if note exists in file path
	if (fs.existsSync(`./users/${user}/${userClass}/${title}.txt`)) {
		
		// return JSON file with notes in body
        // console.log(__dirname)
        // console.log(req.path)

		res.end(`received GET request from client. note exists!: ${user}, ${userClass}, title of note: ${title}`);
		return;
	}
	res.end('GET request received incorrect, user, class or title')

};



// // check if user exist and if class exist
// } else if (fs.existsSync(`./users/${user}`) && fs.existsSync(`./users/${user}${userClass}`)) {
		
// 	// TODO: CREATE NOTE IN GIVEN DIRECTORY
// 	res.end(`received GET request from client. create note, ${title}, at: ${user}/${userClass}/`);



/**
 * receives a JSON file and create, update or delete
 * the flashcard depending on the action in the JSON file
 * JSON request obj: {action: 'create', path: './path', title:'title'}
 *                   {action: 'update', path: './path', body: 'body12345678'}
 *          		 {action: 'delete', path: './path'} 
 */
function post(req, res) {
	const action = req.body['action'];
    switch (action) {
		case 'create': {
            createNote(req, res);
            break;
        }
        case 'update': {
            updateNote(req, res);
            break;
        }
        case 'delete': {
            deleteNote(req, res);
            break;
        }
        default: {
            res.end(`unknown command`);
            break;
        }
    }
}

/**
 * create note at the given path
 */
 function createNote(req, res) {
    const path = req.body['path'];
    const title = req.body['title'];

    if (fs.existsSync(`./${path}`)) {

		// TODO: create note in given path

        res.end(`created your ${title} note in ${path}`);
    } else {
        res.end(`failed to create note at ${path}`);
    }
}

/**
 * update note at the given path
 */
 function updateNote(req, res) {
    const path = req.body['path'];

    if (fs.existsSync(`./${path}`)) {

		// TODO: update note in given path

        res.end(`updated your ${title} note in ${path}`);
    } else {
        res.end(`failed to update note at ${path}`);
    }
}


/**
 * delete note at the given path
 */
 function deleteNote(req, res) {
    const path = req.body['path'];

    if (fs.existsSync(`./${path}`)) {

		// TODO: delete note in given path

        res.end(`created your ${title} note in ${path}`);
    } else {
        res.end(`failed to delete note at ${path}`);
    }
}


module.exports = { get, post };
