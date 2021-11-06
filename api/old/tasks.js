'use strict';

const fs = require('fs');


// Task Data - {name, date, time, class, description}
// -Create for creating task
// -Read for showing current tasks
// -Update for updating a specific task
// -Delete for removing a specific task

//check if task exists, send it over

/**
 * Process a get request to retrieve every task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function getAll(request, response) {
    response.end(JSON.stringify({ result: "Get all tasks received!" }));
}

/**
 * Process a post request to add a task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postAdd(request, response) {
    response.end(JSON.stringify({ result: "Add task received!" }));
}

/**
 * Process a get request to retrieve every task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function getTask(request, response) {
    response.end(JSON.stringify({ result: "Get task received!" }));
}

/**
 * Process a post request to edit a task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEdit(request, response) {
    response.end(JSON.stringify({ result: "Add task received!" }));
}

/**
 * Process a post request to remove a task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
    response.end(JSON.stringify({ result: "Add task received!" }));
}

/*
async function taskGet() {
    const user = request.params['user'];
    const taskid = request.body['taskid']; //primary key; //name would be the primary key for identifying tasks
    if (user !== undefined && taskid !== undefined) {
        if (fs.existsSync(`./users/${user}/task.json`)) {
            fs.readFile(`./users/${user}/task.json`, (err, data) => {
                if (err) {
                    response.end(JSON.stringify({ result: `Unable to find task at ID ${taskid}` }));
                } else {
                    response.end(JSON.stringify(data));
                }
            });
        } else {
            response.end(JSON.stringify({ result: `User ${user} tasks not found` }));
        }
    } else {
        response.end(JSON.stringify({ result: 'Task not found.  Check name and try again.' }));
    }

}
*/

//use this for a variety of actions

/*
function taskPost() {

    const action = request.body['action'];
    const user = request.params['user'];

    if (user === undefined) {
        response.end(JSON.stringify({ result: 'user unknown' }));
        return;
    }

    switch (action) {
        case 'add': {
            taskAdd(request, response);
            break;
        }
        case 'edit': {
            taskEdit(request, response);
            break;
        }
        case 'remove': {
            taskDelete(request, response);
            break;
        }
        default: {
            response.end(JSON.stringify({ result: 'command unknown' }));
            break;
        }
    }

}
*/

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
/*function taskAdd(request, response) {
    const user = request.params['user'];
    const taskid = request.body['taskid']; //primary key
    const taskname = request.body['taskname'];
    const description = request.body['description'];
    const date = request.body['date'];
    const time = request.body['time'];
    const classname = request.body['classname'];

    if (user !== undefined && taskid !== undefined && description !== undefined && date !== undefined && time !== undefined && classname !== undefined && taskname !== undefined) {

        if (fs.existsSync(`/users/${user}/task.json/${taskid}`)) {
            response.end(JSON.stringify({ result: "Task already exists." }));
        }
        else {
            fs.mkdir(`/users/${user}/task.json/${taskid}`, (err) => {
                if (err) {
                    response.end(JSON.stringify({ result: "Failed to create task" }));
                }
                else {
                    response.end(JSON.stringify({ result: "Successfully created task" }));
                }
            })
        }

    } else {
        response.end(JSON.stringify({ result: 'Add task failed.  Please check no fields were left blank and try again.' }));
    }
}*/

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
/*function taskEdit(request, response) {
    const user = request.params['user'];
    const taskid = request.body['taskid']; //primary key
    const taskname = request.body['taskname'];
    const description = request.body['description'];
    const date = request.body['date'];
    const time = request.body['time'];
    const classname = request.body['classname'];

    if (user !== undefined && taskid !== undefined && taskname !== undefined && description !== undefined && date !== undefined && time !== undefined && classname !== undefined) {

        if (fs.existsSync(`./users/${user}/task.json/${taskid}`)) {
            fs.readFileSync(`./users/${user}/task.json/${taskid}`, (err, data) => {
                if (err) { // Error when unable to write the description.
                    response.end(JSON.stringify({ result: `Failed to edit for ${taskid}` }));
                } else { // Success on writing the description
                    const parsed = JSON.parse(data);
                    const tasktoedit = parsed[parseInt(taskid)];
                    tasktoedit.taskname = taskname;
                    tasktoedit.description = description;
                    tasktoedit.date = date;
                    tasktoedit.time = time;
                    tasktoedit.classname = classname;

                    response.end(JSON.stringify({ result: `Edit successful for ${taskid}` }));
                }
            });
        } else {
            response.end(JSON.stringify({ result: `Task ${taskid} doesn't exist` }));
        }
    } else {
        response.end(JSON.stringify({ result: 'edit task failed' }));
    }
}*/

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
/*function taskDelete(request, response) {
    const user = request.params['user'];
    const taskid = request.body['taskid']; //primary key

    if (user !== undefined && taskid !== undefined) {

        if (fs.existsSync(`./users/${user}/task.json`)) {
            const task = fs.readFileSync(`./users/${user}/task.json`);
            const parsed = JSON.parse(task);
            parsed.remove(parseInt(taskid));
            response.end(JSON.stringify({ result: `Removed task ${taskid}` }));
        } else {
            response.end(JSON.stringify({ result: `Task ${taskid} doesn't exist` }));
        }
    } else {
        response.end(JSON.stringify({ result: 'Remove task failed.  Please check the name exists and try again.' }));
    }
}*/


module.exports = { getAll, postAdd, getTask, postEdit, postRemove };



//COMMENTED LOGIC THAT MAY BE USEFUL FOR NEXT MILESTONE

// //somehow have to sort events by recency and add first 4/5 to future tasks
// //Maybe do this onload?

// //ADD TASK CLICKED

// document.getElementById("addclass").addEventListener('click', () => {

//     //popup add task modal --> already taken care of via bootstrap
//     //create task
//     //add to calendar

// })

// //EDIT BUTTON NEXT TO CLASS CLICKED

// document.getElementById("editclass").addEventListener('click', () => {

//     //pop up edit task modal --> already taken care of via bootstrap
//     //read task data into edit task modal
//     //update task data when update is clicked


// })

// //DELETE CLASS CLICKED

// document.getElementById("deleteclass").addEventListener('click', () => {

//     //delete task from tasks on side

// })

// //DAY ON CALENDER CLICKED

// document.getElementById("day").addEventListener('click', () => {

//     //read events from selected day
//     //update list events on side under events for selected day

// })





