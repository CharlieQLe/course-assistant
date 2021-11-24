'use strict';

/**
 * Process a get request to retrieve every task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */

// TODO GO THROUGH THIS JS AND CHANGE ALL THE FILE WRITING FROM JSON FILE TO MONGO DB

function getAll(request, response) {

    const user = request.params['user'];
    
    if (user !== undefined) {
        if (fs.existsSync(`./users/${user}/tasks.json`)) {
            fs.readFile(`./users/${user}/tasks.json`, (err, data) => {
                if (err) {
                    response.end(JSON.stringify({ result: `Unable to find tasks` }));
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

/**
 * Process a post request to create a task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postCreate(request, response) {

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

/**
 * Process a get request to retrieve every task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
 function getTask(request, response) {

    const user = request.params['user'];
    const taskid = request.params['taskid']; //primary key; //name would be the primary key for identifying tasks
    if (user !== undefined && taskid !== undefined) {
        if (fs.existsSync(`./api/users/${user}/tasks.json/${taskid}`)) {
            fs.readFile(`./api/users/${user}/tasks.json/${taskid}`, (err, data) => {
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

/**
 * Process a post request to edit a task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postEdit(request, response) {

    const user = request.params['user'];
    const taskid = request.params['taskid']; //primary key
    const taskname = request.body['taskname'];
    const description = request.body['description'];
    const date = request.body['date'];
    const time = request.body['time'];
    const classname = request.body['classname'];

    if (user !== undefined && taskid !== undefined && taskname !== undefined && description !== undefined && date !== undefined && time !== undefined && classname !== undefined) {

        if (fs.existsSync(`./api/users/${user}/tasks.json/${taskid}`)) {
            fs.readFileSync(`./api/users/${user}/tasks.json/${taskid}`, (err, data) => {
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
}

/**
 * Process a post request to remove a task.
 * 
 * @param {Request<{}, any, any, qs.ParsedQs, Record<string, any>} request 
 * @param {Response<any, Record<string, any>, number>} response 
 */
function postRemove(request, response) {
   
    const user = request.params['user'];
    const taskid = request.params['taskid']; //primary key

    if (user !== undefined && taskid !== undefined) {

        if (fs.existsSync(`./api/users/${user}/tasks.json/${taskid}`)) {
            const task = fs.readFileSync(`./api/users/${user}/tasks.json/${taskid}`);
            const parsed = JSON.parse(task);
            parsed.remove(parseInt(taskid));
            response.end(JSON.stringify({ result: `Removed task ${taskid}` }));
        } else {
            response.end(JSON.stringify({ result: `Task ${taskid} doesn't exist` }));
        }
    } else {
        response.end(JSON.stringify({ result: 'Remove task failed.  Please check the name exists and try again.' }));
    }
}

module.exports = { getAll, postCreate, getTask, postEdit, postRemove };




