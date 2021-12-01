'use strict'

const { client } = require('./mongo.js');

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

 function getAll(request, response) {
    client.db('final-kappa').collection("tasks").find({ user: request.params.user })
        .toArray()
        .then(tasks => response.end(JSON.stringify({ status: 0, result: tasks })))
        .catch(err => response.end(JSON.stringify({ status: -1, result: `Error on tasksAPI.getAll: ${err}` })));
}

/**
 * Process a get request to retrieve a specific task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function getTask(request, response) {
    client.db('final-kappa').collection("tasks").find({
        name: request.params.task,
        user: request.params.user
    })
        .then(task => response.end(JSON.stringify({ status: 0, result: task })))
        .catch(err => response.end(JSON.stringify({ status: -1, result: `Error on tasksAPI.getAll: ${err}` })));
}

/**
 * Process a post request to create a task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function postCreate(request, response) {
    
    // atm, no tag or class field
    
    client.db('final-kappa').collection("tasks").findOne({
        name: request.params.task,
        user: request.params.user
    })
        .then(existingTask => {
            if (existingTask) {
                response.end(JSON.stringify({ status: -1, result: "Error in tasksAPI.postCreate: task with the same name already exists" }));
            } else {
                client.db('final-kappa').collection("tasks").insertOne({
                    name: request.params.task,
                    user: request.params.user,
                    description: request.body['description'],
                    date: request.body['date'],
                    time: request.body['time'],
                    class: request.body['class']
                })
                    .then(_ => response.end(JSON.stringify({ status: 0, result: "Create task received!" })))
                    .catch(err => response.end(JSON.stringify({ status: -1, result: `Error in tasksAPI.postCreate: ${err}` })));
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
 function postEdit(request, response) {
    client.db('final-kappa').collection("tasks").updateOne({
        name: request.params.task,
        user: request.params.user
    }, {
        $set: {
            name: request.params.task,
            description: request.body['description'],
            date: request.body['date'],
            time: request.body['time'],
            class: request.body['class'] 
        }
    })
        .then(_ => response.end(JSON.stringify({ status: 0, result: "Edit task received!" })))
        .catch(err =>  response.end(JSON.stringify({ status: -1, result: `Error in tasksAPI.postEdit: ${err}` })));
}

/**
 * Process a post request to remove a task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function postRemove(request, response) {
    client.db('final-kappa').collection("tasks").deleteOne({
        name: request.params.task,
        user: request.params.user
    })
        .then(_ => response.end(JSON.stringify({ status: 0, result: "Remove task received!" })))
        .catch(err =>  response.end(JSON.stringify({ status: -1, result: `Error in tasksAPI.postRemove: ${err}` })));
}

// ==============================================================
// ==============================================================
// =======================OLD STUFF==============================
// ==============================================================
// ==============================================================

// /**
//  * 
//  * @param {string} user the user to check in the database
//  * @returns a promise<boolean> that tells us if the user is in the database or not
//  */

// function findUser(user) {
//     let found = client.db('final-kappa').listCollections().toArray().then(collection => {
//         return collection.filter(col => col.name === user).length === 1;
//     });
//     return found;
// }  

// /**
//  * Process a get request to retrieve every task.
//  * 
//  * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
//  * @param {Response<any, Record<string, any>, number>} response 
//  */

// function getAll(request, response) {

//     const user = request.params.user;

//     // respond with an error if user does not exist
//     findUser(user).then(found => {
//         if(found) {
//             // get all tasks from database for specific user
//             client.db('final-kappa').collection(user).find({
//                 type: 'task' //only check based on the type being task to return all tasks
//             }).toArray().then(arr => {
//                 if (arr.length === 0) {
//                     response.end(JSON.stringify({ status: 404, result: `No tasks found. Try creating a task.` }));
//                     return;
//                 } 
//                 response.end(JSON.stringify({ status: 200, result: arr.body })); //return the full array of tasks
//             }).catch(e => {
//                 response.end(JSON.stringify({ status: 404, result: "GET tasks: Error parsing for tasks with mongodb" }));
//                 return;
//             });
//         }
//         else if(!found) {
//             response.end(JSON.stringify({
//                         status: 404,
//                         result: `user(${user}) could not be found`
//                     })
//             )
//             return;
//         }
//     });

    

// }

// /**
//  * Process a get request to retrieve a specific task.
//  * 
//  * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
//  * @param {Response<any, Record<string, any>, number>} response 
//  */
//  function getTask(request, response) {

//     const user = request.params.user;
//     const taskname = request.params.task; //primary key

//     // respond with an error if user does not exist
//     findUser(user).then(found => {
//         if(!found) {
//             response.end(JSON.stringify({
//                         status: 404,
//                         result: `user(${user}) could not be found`
//                     })
//             )
//             return;
//         }
//     });

//     // get task from database
//     client.db('final-kappa').collection(user).find({
//         name: taskname, //taskid is unique, so it can be used on its own to locate a specific task
//         type: 'task'
//     }).toArray().then(arr => {
//         if (arr.length === 0) {
//             response.end(JSON.stringify({ status: 404, result: `Task (${taskname}) could not be found` }));
//             return;
//         } 
//         response.end(JSON.stringify({ status: 200, result: arr[0].body })); //return the first index from array so that the specified task is returned
//     }).catch(e => {
//         response.end(JSON.stringify({ status: 404, result: "GET tasks: Error parsing for tasks with mongodb" }));
//         return;
//     });

// }

// /**
//  * Process a post request to create a task.
//  * 
//  * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
//  * @param {Response<any, Record<string, any>, number>} response 
//  */
// function postCreate(request, response) {

//     const user = request.params.user;
//     const taskname = request.params.task;
//     //const taskid = request.params.taskid; //primary key
//     const classname = request.body['class'];
//     const description = request.body['description'];
//     const date = request.body['date'];
//     const time = request.body['time'];

//     // respond with an error if user does not exist
//     findUser(user).then(found => {
//         if(!found) {
//             response.end(JSON.stringify({
//                         status: 404,
//                         result: `user(${user}) could not be found`
//                     })
//             )
//             return;
//         }
//     });

//     const query = { //create a query to be inserted in the database with all task attributes
//         type: 'task',
//         user: user,
//         //taskID: taskid,
//         class: classname,
//         name: taskname,
//         description: description,
//         date: date,
//         time: time,
//     };

//     client.db('final-kappa').collection(user).insertOne(query); //insert the query from above into the database

//     response.end(JSON.stringify({ status: 200, result: "Create task received!" })); //Success, task added to database
// }


// /**
//  * Process a post request to edit a task.
//  * 
//  * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
//  * @param {Response<any, Record<string, any>, number>} response 
//  */
// function postEdit(request, response) {

//     const user = request.params.user;
//     const taskname = request.params.task;
//     //const taskid = request.params.taskid; //primary key
//     const classname = request.body['class'];
//     const description = request.body['description'];
//     const date = request.body['date'];
//     const time = request.body['time'];
    

//     // respond with an error if user does not exist
//     findUser(user).then(found => {
//         if(!found) {
//             response.end(JSON.stringify({
//                         status: 404,
//                         result: `user(${user}) could not be found`
//                     })
//             )
//             return;
//         }
//     });

//     // check if task is found
//     client.db('final-kappa').collection(user).find({
//         name: taskname,
//         type: 'task'
//     }).toArray().then(arr => {
//         if (arr.length === 0) {
//             response.end(JSON.stringify({ status: 404, result: `Task(${taskname}) could not be found` }));
//             return;
//         }
//     }).catch(e => {
//         response.end(JSON.stringify({ status: 404, result: "GET tasks: Error parsing for tasks with mongodb" }));
//         return;
//     });

//     const query = { //create a query with taskID and type task to hold specific task
//         name: taskname,
//         type: 'task'
//     };

//     const updateTask = { //set all fields to param and body values for use in update
//         $set: { name: taskname },
//         $set: { class: classname },
//         $set: { description: description },
//         $set: { date: date },
//         $set: { time: time },
//     }
//     client.db('final-kappa').collection(user).updateOne(query, updateTask); //update the task identified by query with fields from updateTask

//     response.end(JSON.stringify({ status: 200, result: "Edit task received!" })); //Success, task edited
// }

// /**
//  * Process a post request to remove a task.
//  * 
//  * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
//  * @param {Response<any, Record<string, any>, number>} response 
//  */
// function postRemove(request, response) {
   
//     const user = request.params.user; 
//     const taskname = request.params.task;
//     //const taskid = request.params.taskid; //primary key

//     // respond with an error if user does not exist
//     findUser(user).then(found => {
//         if(!found) {
//             response.end(JSON.stringify({
//                         status: 404,
//                         result: `user(${user}) could not be found`
//                     })
//             )
//             return;
//         }
//     });

//     // check if class or task is found
//     client.db('final-kappa').collection(user).find({
//         name: taskname,
//         type: 'task'
//     }).toArray().then(arr => {
//         if (arr.length === 0) {
//             response.end(JSON.stringify({ status: 404, result: `Task (${taskname}) could not be found` }));
//             return;
//         } 
//     }).catch(e => {
//         response.end(JSON.stringify({ status: 404, result: "GET tasks: Error parsing for tasks with mongodb" }));
//         return;
//     });

//     const query = { //create a query with taskID and type task to hold specific task
//         name: taskname,
//         type: 'task'
//     };

//     client.db('final-kappa').collection(user).deleteOne(query); //delete the task from user collection based on taskID

//     response.end(JSON.stringify({ status: 200, result: "Remove task received!" })); //Success, task removed

// }

module.exports = { getAll, postCreate, getTask, postEdit, postRemove };




