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

// TODO GO THROUGH THIS JS AND CHANGE ALL THE FILE WRITING FROM JSON FILE TO MONGO DB

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
        type: 'task'
    }).toArray().then(arr => {
        if (arr.length === 0) {
            response.end(JSON.stringify({ status: 404, result: `Task (${taskid}) could not be found` }));
            return;
        } 
        response.end(JSON.stringify({ status: 200, result: arr }));
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
        taskID: taskid,
        type: 'task'
    }).toArray().then(arr => {
        if (arr.length === 0) {
            response.end(JSON.stringify({ status: 404, result: `Task (${taskid}) could not be found` }));
            return;
        } 
        response.end(JSON.stringify({ status: 200, result: arr[0].body }));
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

    const query = {
        user: user,
        taskID: taskid,
        classname: classname,
        taskname: taskname,
        description: description,
        date: date,
        time: time,
        type: 'task'
    };

    client.db(db).collection(user).insertOne(query);

    response.end(JSON.stringify({ status: 200, result: "Create task received!" }));
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

    const query = {
        taskID: taskid,
        type: 'task'
    };

    const updateTask = {
        $set: { taskname: taskname },
        $set: { classname: classname },
        $set: { description: description },
        $set: { date: date },
        $set: { time: time },
    }
    client.db(db).collection(user).updateOne(query, updateTask);
    response.end(JSON.stringify({ status: 200, result: "Edit task received!" }));
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

    const query = {
        taskID: taskid,
        type: 'task'
    };

    client.db(db).collection(user).deleteOne(query);

    response.end(JSON.stringify({ status: 200, result: "Remove task received!" }));

}

module.exports = { getAll, postCreate, getTask, postEdit, postRemove };




