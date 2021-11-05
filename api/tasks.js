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

        //figure out how to read in task data

        response.end(JSON.stringify({ result: `Found task ${name}` }));
    } else {
        response.end(JSON.stringify({ result: 'Task not found.  Check name and try again.' }));
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

        if(fs.existsSync(`/users/${name}`)) {
            response.end(JSON.stringify({result: "Task already exists."}));
        }
        else{
            fs.mkdir(`/users/${name}`, (err) => {
                if(err) {
                    response.end(JSON.stringify({result: "Failed to create task"}));
                }
                else{
                    response.end(JSON.stringify({result: "Successfully created task"}));
                }
            })
        }

    } else {
        response.end(JSON.stringify({ result: 'Add task failed.  Please check no fields were left blank and try again.' }));
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

        if (fs.existsSync(`./users/${user}/${className}/`)) {
            fs.writeFile(`./users/${user}/${className}/.description`, description, (err) => {
                if (err) { // Error when unable to write the description.
                    response.end(JSON.stringify({ result: `Failed to add description for class ${className}` }));
                } else { // Success on writing the description
                    response.end(JSON.stringify({ result: `Edited description for class ${className}` }));
                }
            });
        } else {
            response.end(JSON.stringify({ result: `Class ${className} doesn't exist` }));
        }
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

        if (fs.existsSync(`./users/${user}/${className}/`)) {
            fs.rmSync(`./users/${user}/${className}/`, { recursive: true, force: true });
            response.end(JSON.stringify({ result: `Removed class ${className}` }));
        } else {
            response.end(JSON.stringify({ result: `Class ${className} doesn't exist` }));
        }

        response.end(JSON.stringify({ result: `Removed task ${name}` }));
    } else {
        response.end(JSON.stringify({ result: 'Remove task failed.  Please check the name exists and try again.' }));
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





