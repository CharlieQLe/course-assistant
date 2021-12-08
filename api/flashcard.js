"use strict";

const { client } = require("./initializeServer.js");

/**
 * Process a get request to retrieve the data of a set of flashcards.
 *
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request
 * @param {Response<any, Record<string, any>, number>} response
 */
function getFlashcards (request, response) {
	// find if the user is in the database
	client.db("final-kappa").collection("files").findOne({
		user: request.params.user,
		name: request.params.flashcard,
		type: "flashcard"
	}).then(exist => {
		if (!exist) {
			throw "Flashcards could not be found";
		}
		response.end(JSON.stringify({ status: 0, result: exist.flashcards }));
	}).catch(err => {
		response.end(JSON.stringify({ status: -1, result: err.toString() }));
	});
}

/**
 * Process a post request to create a set of flashcards.
 *
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request
 * @param {Response<any, Record<string, any>, number>} response
 */
function postCreate (request, response) {
	client.db("final-kappa").collection("files").findOne({
		user: request.params.user,
		name: request.params.flashcard,
		type: "flashcard"
	}).then(exist => {
		if (exist) {
			throw "Flashcards already exist";
		}
		return client.db("final-kappa").collection("files").insertOne({
			user: request.params.user,
			name: request.params.flashcard,
			type: "flashcard",
			tags: request.body.tags,
			flashcards: []
		});
	}).then(inserted => {
		if (inserted.acknowledged) {
			response.end(JSON.stringify({ status: 0, result: "Create flashcards received!" }));
		} else {
			throw "Could not create flashcards";
		}
	}).catch(err => response.end(JSON.stringify({ status: -1, result: `Error in flashcardAPI.postCreate: ${err}` })));
}

/**
 * Process a post request to remove a set of flashcards.
 *
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request
 * @param {Response<any, Record<string, any>, number>} response
 */
function postRemove (request, response) {
	client.db("final-kappa").collection("files").deleteOne({
		user: request.params.user,
		name: request.params.flashcard,
		type: "flashcard"
	}).then(deleted => {
		if (deleted.acknowledged) {
			response.end(JSON.stringify({ status: 0, result: "Deleted flashcards received!" }));
		} else {
			throw "Could not delete flashcards";
		}
	}).catch(err => response.end(JSON.stringify({ status: -1, result: `Error in flashcardAPI.postRemove: ${err}` })));
}

/**
 * Process a post request to add a flashcard.
 *
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request
 * @param {Response<any, Record<string, any>, number>} response
 */
function postAddFlashcard (request, response) {
	// find a flashcard that has the same term and definition
	client.db("final-kappa").collection("files").findOne({
		user: request.params.user,
		name: request.params.flashcard,
		type: "flashcard",
		flashcards: {
			term: request.body.term,
			definition: request.body.definition
		}
	}).then(exist => {
		// if there is a flashcard with the same term and definition,
		// throw an error, else add the flashcard to the set
		if (exist) {
			throw "duplicate flashcard term or definition";
		}
		return client.db("final-kappa").collection("files").updateOne({
			user: request.params.user,
			name: request.params.flashcard,
			type: "flashcard"
		}, {
			$push: {
				flashcards: {
					term: request.body.term,
					definition: request.body.definition
				}
			}
		});
	}).then(updated => {
		if (updated.acknowledged) {
			response.end(JSON.stringify({ status: 0, result: "Added flashcard to the flashcards set received!" }));
		} else {
			throw "Could not add flashcard to the flashcards set";
		}
	}).catch(err => response.end(JSON.stringify({ status: -1, result: `Error in flashcardAPI.postAddFlashcard: ${err}` })));
}

/**
 * Process a post request to remove a flashcard.
 *
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request
 * @param {Response<any, Record<string, any>, number>} response
 */
function postRemoveFlashcard (request, response) {
	client.db("final-kappa").collection("files").updateOne({
		user: request.params.user,
		name: request.params.flashcard,
		type: "flashcard"
	}, {
		$pull: {
			flashcards: {
				term: request.body.term,
				definition: request.body.definition
			}
		}
	}).then(updated => {
		if (updated.acknowledged) {
			response.end(JSON.stringify({ status: 0, result: "Removed flashcard to the flashcards set received!" }));
		} else {
			throw "Could not remove flashcard to the flashcards set";
		}
	}).catch(err => response.end(JSON.stringify({ status: -1, result: `Error in flashcardAPI.postRemoveFlashcard: ${err}` })));
}

/**
 * Process a get request to retrieve the tags of a set of flashcards.
 *
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request
 * @param {Response<any, Record<string, any>, number>} response
 */
function getTags (request, response) {
	// find if the user is in the database
	client.db("final-kappa").collection("files").findOne({
		user: request.params.user,
		name: request.params.flashcard,
		type: "flashcard"
	}).then(exist => {
		if (!exist) {
			throw "Flashcards could not be found";
		}
		response.end(JSON.stringify({ status: 0, result: exist.tags }));
	}).catch(err => {
		response.end(JSON.stringify({ status: -1, result: err.toString() }));
	});
}

/**
 * Process a post request to add a tag to a flashcard.
 *
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request
 * @param {Response<any, Record<string, any>, number>} response
 */
function postAddTag (request, response) {
	client.db("final-kappa").collection("files").updateOne({
		user: request.params.user,
		name: request.params.flashcard,
		type: "flashcard"
	}, {
		$addToSet: { tags: request.params.tag }
	}).then(updated => {
		if (updated.acknowledged) {
			response.end(JSON.stringify({ status: 0, result: "Flashcard set has been updated" }));
		} else {
			throw "Flashcard set could not be updated";
		}
	}).catch(err => response.end(JSON.stringify({ status: -1, result: `Error in flashcardAPI.postAddTag: ${err}` })));
}

/**
 * Process a post request to remove a tag from a flashcard.
 *
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request
 * @param {Response<any, Record<string, any>, number>} response
 */
function postRemoveTag (request, response) {
	client.db("final-kappa").collection("files").updateOne({
		user: request.params.user,
		name: request.params.flashcard,
		type: "flashcard"
	}, {
		$pull: { tags: request.params.tag }
	}).then(updated => {
		if (updated.acknowledged) {
			response.end(JSON.stringify({ status: 0, result: "Flashcard set has been updated" }));
		} else {
			throw "Flashcard set could not be updated";
		}
	}).catch(err => response.end(JSON.stringify({ status: -1, result: `Error in flashcardAPI.postAddTag: ${err}` })));
}

module.exports = {
	getFlashcards,
	postCreate,
	postRemove,
	postAddFlashcard,
	postRemoveFlashcard,
	getTags,
	postAddTag,
	postRemoveTag
};
