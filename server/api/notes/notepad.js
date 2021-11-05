'use strict'

const fs = require('fs');
const path = require('path');


/**
 *  return existing note
 */
function get(req, res) {
	const user = req.params.user;
	const userClass = req.params.class;
	const title = req.query.title;

	// console.log(req.params.user);
	// console.log(req.params.class);
	// console.log(req.query.title);

	// console.log(fs.existsSync(`./users/${user}/${userClass}/${title}.txt`))

	// check if note already exists in file path
	if (fs.existsSync(`./users/${user}/${userClass}/${title}.txt`)) {
		
		// return JSON file with notes in body
		// res.sendFile(path.join(__dirname, '../../public/notepad.html'));
		// res.end('html sent successfully');
		
		res.end(`received GET request from client. note already exists!: ${user}, ${userClass}, title of note: ${title}`);
		return;
	}
	res.end('GET request received incorrect, user, class or title')

};



// // check if user exist and if class exist
// } else if (fs.existsSync(`./users/${user}`) && fs.existsSync(`./users/${user}${userClass}`)) {
		
// 	// TODO: CREATE NOTE IN GIVEN DIRECTORY
// 	res.end(`received GET request from client. create note, ${title}, at: ${user}/${userClass}/`);



/**
 * receives a JSON file and parse accordingly
 * to action given in JSON file
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

    if (fs.existsSync(`./users/${path}`)) {

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

    if (fs.existsSync(`./users/${path}`)) {

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

    if (fs.existsSync(`./users/${path}`)) {

		// TODO: delete note in given path

        res.end(`created your ${title} note in ${path}`);
    } else {
        res.end(`failed to delete note at ${path}`);
    }
}


module.exports = { get, post };
