'use strict';

const fs = require('fs');


// Task Data - {name, date, time, class, description}
// -Create for creating task
// -Read for showing current tasks
// -Update for updating a specific task
// -Delete for removing a specific task

//use this for reading a task?

function taskGet () {

    const name = request.query.name; //name would be the primary key for identifying tasks
    if (name !== undefined) {

        // todo: write more specific data- file names, description, etc.

        response.end(JSON.stringify({ result: `found ${name}` }));
    } else {

        // todo: write a better error message

        response.end(JSON.stringify({ result: 'class not found' }));
    }

}

//use this for a variety of actions

function taskPost () {

    const action = request.body['action'];
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

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function taskAdd(request, response) {
    const name = request.body['name']; //primary key
    const description = request.body['description'];
    const date = request.body['date'];
    const time = request.body['time'];
    const classname = request.body['classname'];
    
    if (name !== undefined && description !== undefined && date !== undefined && time !== undefined && classname !== undefined) {

        // todo: create task
        // If any fields are left blank, respond with an error
        // Otherwise, create the task with entered conditions, and respond with success

        response.end(JSON.stringify({ result: `Add task ${name} with description "${description}"` }));
    } else {
        response.end(JSON.stringify({ result: 'add task failed' }));
    }
}

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function taskEdit(request, response) {
    const name = request.body['name']; //primary key
    const description = request.body['description'];
    const date = request.body['date'];
    const time = request.body['time'];
    const classname = request.body['classname'];
    
    if (name !== undefined && description !== undefined && date !== undefined && time !== undefined && classname !== undefined) {

        // todo: edit task --> do this with a bunch of if conditions?
        // If the task exists, make the desired edit
        // Otherwise, respond with an error

        response.end(JSON.stringify({ result: `Edit task ${name} description to "${description}"` }));
    } else {
        response.end(JSON.stringify({ result: 'edit task failed' }));
    }
}

/**
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function taskDelete(request, response) {
    const name = request.body['name']; //primary key
    const description = request.body['description'];
    const date = request.body['date'];
    const time = request.body['time'];
    const classname = request.body['classname'];
    
    if (name !== undefined && description !== undefined && date !== undefined && time !== undefined && classname !== undefined) {

        // todo: remove task
        // If the task exists, delete it
        // Otherwise, respond with an error

        response.end(JSON.stringify({ result: `Remove task ${name}` }));
    } else {
        response.end(JSON.stringify({ result: 'remove task failed' }));
    }
}


module.exports = { taskGet, taskPost };



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





