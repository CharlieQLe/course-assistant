'use strict'

const { client } = require('./mongo.js');

const db = 'final-kappa';

// tasks {
//      "taskid": "",
//      "taskname": "",
//      "description": ""
//      "date": ""
//      "time": ""
//      "classname": ""
// }
// ==============================================================

/**
 * 
 * @param {string} user the user to check in the database
 * @returns a promise<boolean> that tells us if the user is in the database or not
 */
 function findUser(user) {
    let found = client.db(db).listCollections().toArray().then(collection => {
        return collection.filter(col => col.name === user).length === 1;
    });
    return found;
}  

/**
 * Process a get request to retrieve every task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */

function getAll(request, response) {

    const user = request.params.user;

    // respond with an error if user does not exist
    findUser(user).then(found => {
        if(!found) {
            response.end(JSON.stringify({
                        status: 404,
                        result: `user(${user}) could not be found`
                    })
            )
            return;
        }
    });

    // get all tasks from database for specific user
    client.db(db).collection(user).find({
        type: 'task' //only check based on the type being task to return all tasks
    }).toArray().then(arr => {
        if (arr.length === 0) {
            response.end(JSON.stringify({ status: 404, result: `No tasks found. Try creating a task.` }));
            return;
        } 
        response.end(JSON.stringify({ status: 200, result: arr.body })); //return the full array of tasks
    }).catch(e => {
        response.end(JSON.stringify({ status: 404, result: "GET tasks: Error parsing for tasks with mongodb" }));
        return;
    });

}

/**
 * Process a get request to retrieve a specific task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function getTask(request, response) {

    const user = request.params.user;
    const taskid = request.params.taskid; //primary key

    // respond with an error if user does not exist
    findUser(user).then(found => {
        if(!found) {
            response.end(JSON.stringify({
                        status: 404,
                        result: `user(${user}) could not be found`
                    })
            )
            return;
        }
    });

    // get task from database
    client.db(db).collection(user).find({
        taskID: taskid, //taskid is unique, so it can be used on its own to locate a specific task
        type: 'task'
    }).toArray().then(arr => {
        if (arr.length === 0) {
            response.end(JSON.stringify({ status: 404, result: `Task (${taskid}) could not be found` }));
            return;
        } 
        response.end(JSON.stringify({ status: 200, result: arr[0].body })); //return the first index from array so that the specified task is returned
    }).catch(e => {
        response.end(JSON.stringify({ status: 404, result: "GET tasks: Error parsing for tasks with mongodb" }));
        return;
    });

}

/**
 * Process a post request to create a task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postCreate(request, response) {

    const user = request.params.user;
    const taskid = request.params.taskid; //primary key
    const classname = request.body['classname'];
    const taskname = request.body['taskname'];
    const description = request.body['description'];
    const date = request.body['date'];
    const time = request.body['time'];

    // respond with an error if user does not exist
    findUser(user).then(found => {
        if(!found) {
            response.end(JSON.stringify({
                        status: 404,
                        result: `user(${user}) could not be found`
                    })
            )
            return;
        }
    });

    const query = { //create a query to be inserted in the database with all task attributes
        user: user,
        taskID: taskid,
        classname: classname,
        taskname: taskname,
        description: description,
        date: date,
        time: time,
        type: 'task'
    };

    client.db(db).collection(user).insertOne(query); //insert the query from above into the database

    response.end(JSON.stringify({ status: 200, result: "Create task received!" })); //Success, task added to database
}


/**
 * Process a post request to edit a task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEdit(request, response) {

    const user = request.params.user;
    const taskid = request.params.taskid; //primary key
    const classname = request.body['classname'];
    const taskname = request.body['taskname'];
    const description = request.body['description'];
    const date = request.body['date'];
    const time = request.body['time'];
    

    // respond with an error if user does not exist
    findUser(user).then(found => {
        if(!found) {
            response.end(JSON.stringify({
                        status: 404,
                        result: `user(${user}) could not be found`
                    })
            )
            return;
        }
    });

    // check if task is found
    client.db(db).collection(user).find({
        taskID: taskid,
        type: 'task'
    }).toArray().then(arr => {
        if (arr.length === 0) {
            response.end(JSON.stringify({ status: 404, result: `Task(${taskid}) could not be found` }));
            return;
        } 
    }).catch(e => {
        response.end(JSON.stringify({ status: 404, result: "GET tasks: Error parsing for tasks with mongodb" }));
        return;
    });

    const query = { //create a query with taskID and type task to hold specific task
        taskID: taskid,
        type: 'task'
    };

    const updateTask = { //set all fields to param and body values for use in update
        $set: { taskname: taskname },
        $set: { classname: classname },
        $set: { description: description },
        $set: { date: date },
        $set: { time: time },
    }
    client.db(db).collection(user).updateOne(query, updateTask); //update the task identified by query with fields from updateTask

    response.end(JSON.stringify({ status: 200, result: "Edit task received!" })); //Success, task edited
}

/**
 * Process a post request to remove a task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
   
    const user = request.params.user; 
    const taskid = request.params.taskid; //primary key

    // respond with an error if user does not exist
    findUser(user).then(found => {
        if(!found) {
            response.end(JSON.stringify({
                        status: 404,
                        result: `user(${user}) could not be found`
                    })
            )
            return;
        }
    });

    // check if class or task is found
    client.db(db).collection(user).find({
        taskID: taskid,
        type: 'task'
    }).toArray().then(arr => {
        if (arr.length === 0) {
            response.end(JSON.stringify({ status: 404, result: `Task (${taskid}) could not be found` }));
            return;
        } 
    }).catch(e => {
        response.end(JSON.stringify({ status: 404, result: "GET tasks: Error parsing for tasks with mongodb" }));
        return;
    });

    const query = { //create a query with taskID and type task to hold specific task
        taskID: taskid,
        type: 'task'
    };

    client.db(db).collection(user).deleteOne(query); //delete the task from user collection based on taskID

    response.end(JSON.stringify({ status: 200, result: "Remove task received!" })); //Success, task removed

}

module.exports = { getAll, postCreate, getTask, postEdit, postRemove };




