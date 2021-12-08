"use strict";

const { client } = require("./initializeServer.js");

// tasks {
//      "name": "",
//      "description": ""
//      "date": ""
//      "time": ""
//      "class": ""
// }
// ==============================================================

/**
 * Process a get request to retrieve every task.
 *
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request
 * @param {Response<any, Record<string, any>, number>} response
 */

function getAll (request, response) { // return all tasks by searching tasks collection of data base based on who the user is
	client.db("final-kappa").collection("tasks").find({ user: request.params.user })
		.toArray()
		.then(tasks => response.end(JSON.stringify({ status: 0, result: tasks })))
		.catch(err => response.end(JSON.stringify({ status: -1, result: `Error on tasksAPI.getAll: ${err}` })));
}

/**
 * Process a post request to create a task.
 *
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request
 * @param {Response<any, Record<string, any>, number>} response
 */
function postCreate (request, response) {
	client.db("final-kappa").collection("tasks").findOne({ // search through database first to check if task already exists based off its name
		name: request.body.name,
		user: request.params.user
	})
		.then(existingTask => {
			if (existingTask) { // if the task already exists, respond with an error message that the task with same name already exists
				response.end(JSON.stringify({ status: -1, result: "Error in tasksAPI.postCreate: task with the same name already exists" }));
			} else {
				client.db("final-kappa").collection("tasks").insertOne({ // if name is not duplicate, insert the task and it's fields into the data base
					name: request.body.name,
					user: request.params.user,
					description: request.body.description,
					date: request.body.date,
					time: request.body.time
				})
					.then(_ => response.end(JSON.stringify({ status: 0, result: "Create task received!" }))) // respond with 0 for success
					.catch(err => response.end(JSON.stringify({ status: -1, result: `Error in tasksAPI.postCreate: ${err}` }))); // respond with 1 for error
			}
		})
		.catch(err => response.end(JSON.stringify({ status: -1, result: `Error in tasksAPI.postCreate: ${err}` })));
}

/**
 * Process a post request to edit a task.
 *
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request
 * @param {Response<any, Record<string, any>, number>} response
 */
function postEdit (request, response) {
	client.db("final-kappa").collection("tasks").updateOne({ // seach through database and update task based on name
		name: request.params.task,
		user: request.params.user
	}, {
		$set: { // set the new values for each field
			name: request.body.name,
			description: request.body.description,
			date: request.body.date,
			time: request.body.time
		}
	})
		.then(_ => response.end(JSON.stringify({ status: 0, result: "Edit task received!" }))) // respond with 0 for success
		.catch(err => response.end(JSON.stringify({ status: -1, result: `Error in tasksAPI.postEdit: ${err}` }))); // respond with -1 for error
}

/**
 * Process a post request to remove a task.
 *
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request
 * @param {Response<any, Record<string, any>, number>} response
 */
function postRemove (request, response) {
	client.db("final-kappa").collection("tasks").deleteOne({ // serach through the database and delete the specified task based on name
		name: request.body.name,
		user: request.params.user
	})
		.then(_ => response.end(JSON.stringify({ status: 0, result: "Remove task received!" }))) // respond with 0 for success
		.catch(err => response.end(JSON.stringify({ status: -1, result: `Error in tasksAPI.postRemove: ${err}` }))); // respond with -1 for error
}

module.exports = { getAll, postCreate, postEdit, postRemove };
