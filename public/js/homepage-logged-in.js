'use strict'

// CONTROL F TO FIND ALL THE TODOS

let currentlyEditingTask = null;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let clickedDay = new Date().getDate();
let clickedMonth = new Date().getMonth();	// months is off by 1, eg. January = 0, December = 11
let clickedYear = new Date().getFullYear();
let allTasks = []; // user tasks
let futureTasks = []; //future tasks

// FOR TESTING PURPOSES. REMOVE LATER
allTasks.push({
	name: 'atask',
	description: 'a VERY LONG DESCRIPTION OF A TASK. THIS IS VERY IMPORTANT. DO ASAP',
	date: '2021-12-10',
	time: '23:10'
}, {
	name: 'aSecondTask',
	description: 'description of task 2',
	date: '2021-11-27',
	time: '23:10'
});

//TODO
//FIGURE OUT BUG WHERE SINGLE DIGIT DATES DONT WORK USE PADSTART
//FILTER OUT FUTURE TASKS

// ON LOAD
window.addEventListener('load', () => {

	const url = window.location.pathname;       // reads url
    const split = url.split('/');
    // console.log(split);

	// Displayed in the Dark Blue part of the Calandar
	// on load, it displays the current day, month and year
	document.getElementById('selectedDay').innerHTML = new Date().getDate();
	document.getElementById('month').innerHTML = months[new Date().getMonth()];
	document.getElementById('year').innerHTML = new Date().getFullYear();

	// renders the days in the calandar
	renderDays(document.getElementById('daysTable'), new Date().getMonth(), new Date().getFullYear());
	
	
	// TODO: GET request to server asking for all the tasks
	// the user currently has, then update the allTasks array

	// grab tasks from server
    fetch(`/api/users/${split[2]}/tasks`)
		.then(response => {
			return response.json();
		}).then(obj => {
			// if we get a status code of 200, set the client-side task set 
			// with task set from server
			// console.log(obj)
			if (obj.status === 0) {
				allTasks = obj.result;
				// after GET request, then we render today's tasks
				renderTask(document.getElementById('selectedDayTasks'), allTasks.filter(day => {
					if (day.date === `${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2, '0')}-${new Date().getDate()}`) {
						return day;
					}
				}));
				// renders the tasks in modal
				renderModalTasks(document.getElementById('modalTasksBody'));
				// includes all tasks, including the tasks from selected tasks 

				//TODO FIGURE OUT HOW TO FILTER OUT EXPIRED TASKS
				//MAYBE SORT FUTURE TASKS IN ORDER OF CLOSENESS TO CURRENT DATE 
				//set future tasks to be greater than current date and also sorted a - b

				renderTask(document.getElementById('futureTasks'), allTasks);	
			} else {
				throw 'something went wrong with getting the tasks from the server: ' + obj.result;
			}
		}).catch(e => {
			// set page to 404 error if there is an error
			document.body.innerHTML = '404' + ' ' + e;
			// console.log(e);
		});
		// console.log(window.location.pathname);

});



// ================ CALENDAR =======================
/* DOM SURGERY
<div class="row text-center">
	<div class="d-flex justify-content-between">
		<div class="col" id="days">1</div>
		<div class="col" id="days">2</div>
		<div class="col" id="days">3</div>
		<div class="col" id="days">4</div>
		<div class="col" id="days">5</div>
		<div class="col" id="days">6</div>
		<div class="col" id="days">7</div>
	</div>
</div>
*/


function renderDays(element, month, year) {
	element.innerHTML = '';

	const firstDay = (new Date(year, month)).getDay();
	const lastDay = 32 - new Date(year, month, 32).getDate()

	let day = 1;

	for (let i = 0; i < 6; i++) {
		const outerWrapper = document.createElement('div');
		outerWrapper.classList.add('row', 'text-center');

		const innerWrapper = document.createElement('div');
		innerWrapper.classList.add('d-flex', 'justify-content-between');
		outerWrapper.appendChild(innerWrapper);


		for (let j = 0; j < 7; j++) {
			const dayDiv = document.createElement('div');
			dayDiv.classList.add('col');
			dayDiv.setAttribute('id', 'days');

			// dayDiv does not display a number if those squares are not days
			if (!(i === 0 && j < firstDay) && day <= lastDay) {
				dayDiv.innerHTML = day.toString();
				day++;
			}
			
			// when a day is clicked on the dayTable
			dayDiv.addEventListener('click', () => {
				// if the dayDiv is an actual day, render new updated day
				if(dayDiv.innerHTML !== '') {
					document.getElementById('selectedDay').innerHTML = dayDiv.innerHTML;
					clickedDay = dayDiv.innerHTML;
					
					const date = `${clickedYear}-${clickedMonth+1}-${clickedDay}`;
					
					// from allTasks array, get all days that matches this day
					//BUG WITH SINGLE DIGIT DAYS MAY BE HERE
					let clickedDayArray = allTasks.filter(task => task.date === date);
					renderTask(document.getElementById('selectedDayTasks'), clickedDayArray);

				}
			})

			innerWrapper.appendChild(dayDiv);
		}
		element.appendChild(outerWrapper);
	}
}

// event listener for previous month arrow button
document.getElementById('prev').addEventListener('click', () => {
	if (clickedMonth === 0) {
		clickedMonth = 11;
		clickedYear--;
	} else {
		clickedMonth--;
	}

	// renders the day, month and year
	document.getElementById('selectedDay').innerHTML = clickedDay;
	document.getElementById('month').innerHTML = months[clickedMonth];
	document.getElementById('year').innerHTML = clickedYear;

	// renders the days in the calandar
	renderDays(document.getElementById('daysTable'), clickedMonth, clickedYear);
});

// event listener for previous month arrow button
document.getElementById('next').addEventListener('click', () => {
	if (clickedMonth === 11) {
		clickedMonth = 0;
		clickedYear++;
	} else {
		clickedMonth++;
	}
	
	// renders the day, month and year
	document.getElementById('selectedDay').innerHTML = clickedDay;
	document.getElementById('month').innerHTML = months[clickedMonth];
	document.getElementById('year').innerHTML = clickedYear;

	// renders the days in the calandar
	renderDays(document.getElementById('daysTable'), clickedMonth, clickedYear);
});




// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ================ TASKS =======================

/* DOM SURGERY to create tasks
<div class="form-check">
	<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
	<label class="form-check-label" for="flexCheckDefault">
		Task 1
		<button class="btn btn-outline-light btn-sm rounded-0" type="button" data-bs-toggle="modal" data-bs-target = "#editTasks" data-placement="top" title="Add"><i class="fa fa-table"></i>Edit</button>
	</label>
</div>
*/

/**
 * Note: only tasks in the selected day's tasks or future tasks(not modals)
 * @param {obj} task task obj{name, description, class, date, time}
 * @returns an element
 */
function createTask(userTask) {
	const taskHolder = document.createElement('div');
	taskHolder.classList.add('form-check');

	const taskInput = document.createElement('input');
	taskInput.classList.add('form-check-input');
	taskInput.setAttribute('type', 'checkbox');
	taskInput.setAttribute('value', '');
	taskInput.setAttribute('id', 'flexCheckDefault');

	const task = document.createElement('label');
	task.classList.add('form-check-label');
	task.setAttribute('for', 'flexCheckDefault');
	task.innerHTML = `${userTask.name}`;

	// space in between the user task and the edit button
	const space = document.createElement('span');
	space.innerHTML = ' ';

	const editButton = document.createElement('button');
	editButton.classList.add('btn', 'btn-outline-light', 'btn-sm', 'rounded', 'border-end');
	editButton.setAttribute('type', 'button');
	editButton.setAttribute('data-bs-toggle', 'modal');
	editButton.setAttribute('data-bs-target', '#tasksModal');
	editButton.setAttribute('data-placement', 'top');
	// editButton.setAttribute('title', 'Edit');		// The title attribute specifies extra information about an element.
	const editButtonText = document.createElement('span');
	editButtonText.innerHTML = ' Edit';
	editButtonText.style.color = 'black';
	
	const i = document.createElement('i');
	i.classList.add('fa', 'fa-table');
	i.style.color = 'black';

	editButton.appendChild(i);
	editButton.appendChild(editButtonText);
	editButton.addEventListener('click', () => {
		// when the edit button is clicked, display submit edit button and delete button
		// then hide the add button
		// this is done with the following 3 if statements
		document.getElementById('tasksTitle').innerHTML = 'Edit Task';
		const addTaskButton = document.getElementById("addTaskButton");
		if (window.getComputedStyle(addTaskButton).display === "block") {
			addTaskButton.style.display = "none";
		}
	
		const submitEditTaskButton = document.getElementById("submitEditTaskButton");
		if (window.getComputedStyle(submitEditTaskButton).display === "none") {
			submitEditTaskButton.style.display = "block";
		}
		const deleteTaskButton = document.getElementById("deleteTaskButton");
		if (window.getComputedStyle(deleteTaskButton).display === "none") {
			deleteTaskButton.style.display = "block";
		}


		// when the user clicks the edit button of a task, in modal, 
		// display the clicked tasks on the left of current tasks
		document.getElementById('taskName').value = userTask.name;
		document.getElementById('taskDate').value = userTask.date;
		document.getElementById('taskTime').value = userTask.time;
		document.getElementById('taskDescription').value = userTask.description;

		//set variable equal to userTask for use in edit button

		currentlyEditingTask = userTask;

	});

	// mouseover and mouseout are the 2 events you need to create a hover effect
	// for the button
	editButton.addEventListener('mouseover', () => {
		editButton.style.backgroundColor = '#0d6efd';
		editButton.style.border = 'none';
		editButtonText.style.color = 'white';
		i.style.color = 'white';
	});
	
	editButton.addEventListener('mouseout', () => {
		editButton.style.backgroundColor = 'transparent';
		editButton.style.borderRight = 'solid 1px black';
		editButtonText.style.color = 'black';
		i.style.color = 'black';
	});

	task.appendChild(space);
	task.appendChild(editButton);

	taskHolder.appendChild(taskInput); //append taskInput, task, and li to the taskHolder parent div
	taskHolder.appendChild(task);

	return taskHolder;
}

/* DOM SURGERY on the tasks in tasks modal
<tr>
    <th scope="row">Class 1</th>
    <td>Project Milestone Due</td>
    <td>3/4/4</td>
    <td>yyyy-MM-dd</td>
</tr>
*/
/**
 * Create tasks in tasks modal
 * @param {string} name name of task
 * @param {string} description description of the task
 * @param {string} date date when the task is due(yyyy-mm-dd)
 * @param {string} time time when the task is due(HH:mm), time is using 24 hour clock system(aka. military time)
 * @returns an element
 */
 function createModalTasks(name, description, date, time) {
	const arr = [description, date, time];

	const row = document.createElement('tr');
	
	const header = document.createElement('th');
	header.setAttribute('scope', 'row');
	header.innerHTML = name;
	row.appendChild(header);
	
	for(let i = 0; i < 3; i++) {
		const col = document.createElement('td');
		col.innerHTML = arr[i];
		col.style.wordBreak = 'break-all';
		row.appendChild(col);
	}

	return row;
}

/* DOM SURGERY for the options inside the select
<select class="form-select" id="taskClass">
	<option selected>Select Class</option>
	<option value="One">One</option>
	<option value="Two">Two</option>
	<option value="Three">Three</option>
</select>
*/

// render the options in the select form(select form
// is the dropdown menu in task modal)
// function renderSelectClassInModalTasks(element, classes) {
// 	element.innerHTML = '';

// 	const initialSelected = document.createElement('option');
// 	initialSelected.setAttribute('selected', '');
// 	initialSelected.innerHTML = 'Select Class';
// 	element.appendChild(initialSelected);
	
// 	for(let i = 0; i < classes.length; i++) {
// 		const option = document.createElement('option');
// 		option.setAttribute('value', classes[i]);
// 		option.innerHTML = classes[i];
// 		element.appendChild(option);
// 	}
// }


// either renders the selected day's tasks or future tasks(not modals)
function renderTask(element, taskArray) {
    element.innerHTML = '';

    for (let i = 0; i < taskArray.length; i++) {
        element.appendChild(createTask(taskArray[i]));
    }
}


// renders all tasks(allTasks variable) in modals
function renderModalTasks(element) {
	element.innerHTML = '';
	
    for (let i = 0; i < allTasks.length; i++) {
		const taskHolder = createModalTasks(allTasks[i].name, allTasks[i].description, allTasks[i].date, allTasks[i].time);
        element.appendChild(taskHolder);
    }
}

document.getElementById('addTaskOpenModal').addEventListener('click', () => {

	// when user clicks the open modal, clear the tasks on the left side
	document.getElementById('taskName').value = '';
	document.getElementById('taskDate').value = '';
	document.getElementById('taskTime').value = '';
	document.getElementById('taskDescription').value = '';

	document.getElementById('tasksTitle').innerHTML = 'Add a Task';
	// if add task button is clicked, only display add button
	const addTaskButton = document.getElementById("addTaskButton");
	if (window.getComputedStyle(addTaskButton).display === "none") {
		addTaskButton.style.display = "block";
	}

	// make submit and edit button invisible
	const submitEditTaskButton = document.getElementById("submitEditTaskButton");
	if (window.getComputedStyle(submitEditTaskButton).display === "block") {
		submitEditTaskButton.style.display = "none";
	}
	const deleteTaskButton = document.getElementById("deleteTaskButton");
	if (window.getComputedStyle(deleteTaskButton).display === "block") {
		deleteTaskButton.style.display = "none";
	}
});

// date is yyyy-MM-dd
// time is HH:mm
document.getElementById('addTaskButton').addEventListener('click', () => {
	const taskName = document.getElementById('taskName').value;
    const taskDate = document.getElementById('taskDate').value;
    const taskTime = document.getElementById('taskTime').value;
    const taskDescription = document.getElementById('taskDescription').value;


	const url = window.location.pathname;       // reads url
    const split = url.split('/');

	// stops user from adding tasks with some empty fields
	if (taskName.length === 0 || taskDate.length === 0 || taskTime === 0 || taskDescription === 0) {
		return;
	}

	const temp = {
		name: taskName,
		description: taskDescription,
		date: taskDate,
		time: taskTime
	};

	// TODO, POST request: tell server to add a task and update allTasks array

	fetch(`/api/users/${split[2]}/tasks/create`, {
        method: 'POST', 
        body: JSON.stringify(temp), 
        headers: {
            'Content-Type': 'application/json',
        }
	}).then(response => {
		return response.json();
	}).then(obj => {
		if(obj.status !== 0) {
			throw obj.result;
		}
		allTasks.push(temp);
		renderModalTasks(document.getElementById('modalTasksBody')); //re render task modal
		renderTask(document.getElementById('futureTasks'), allTasks); //re render future tasks
		renderTask(document.getElementById('selectedDayTasks'), allTasks.filter(day => { //re render selected days tasks
			if (day.date === `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`) {
				return day;
			}
		}));

	}).catch(e => {
		// set page to 404 error if there is an error
		document.body.innerHTML = '404' + ' ' + e;
	});

	// clear all fields in the add tasks(left side of task modal) 
	document.getElementById('taskName').value = '';
	document.getElementById('taskDate').value = '';
	document.getElementById('taskTime').value = '';
	document.getElementById('taskDescription').value = '';
	
});



document.getElementById('submitEditTaskButton').addEventListener('click', () => {
	const taskName = document.getElementById('taskName').value;
    const taskDate = document.getElementById('taskDate').value;
    const taskTime = document.getElementById('taskTime').value;
    const taskDescription = document.getElementById('taskDescription').value;

	const url = window.location.pathname;       // reads url
    const split = url.split('/');

	const temp = {
		name: taskName,
		description: taskDescription,
		date: taskDate,
		time: taskTime
	};

	fetch(`/api/users/${split[2]}/tasks/edit`, { //POST the server with the edited values
        method: 'POST', 
        body: JSON.stringify(temp), 
        headers: {
            'Content-Type': 'application/json',
        }
		}).then(response => {
			return response.json();
		}).then(obj => {
			if(obj.status !== 0) {
				throw obj.result;
			}
		//edit allTasks array
		currentlyEditingTask.name = taskName;
		currentlyEditingTask.date = taskDate;
		currentlyEditingTask.time = taskTime;
		currentlyEditingTask.description = taskDescription;

		renderModalTasks(document.getElementById('modalTasksBody')); //re render tasks
		renderTask(document.getElementById('futureTasks'), allTasks); //re render future tasks
		renderTask(document.getElementById('selectedDayTasks'), allTasks.filter(day => { //re render selected days tasks
			if (day.date === `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`) {
				return day;
			}
		}));

		}).catch(e => {
			// set page to 404 error if there is an error
			document.body.innerHTML = '404' + ' ' + e;
	});

	// after submitting changes, clear all fields in the add tasks(left side of task modal) 
	document.getElementById('taskName').value = '';
	document.getElementById('taskDate').value = '';
	document.getElementById('taskTime').value = '';
	document.getElementById('taskDescription').value = '';
});

document.getElementById('deleteTaskButton').addEventListener('click', () => {
	const taskName = document.getElementById('taskName').value;
    const taskDate = document.getElementById('taskDate').value;
    const taskTime = document.getElementById('taskTime').value;
    const taskDescription = document.getElementById('taskDescription').value;

	const url = window.location.pathname;       // reads url
    const split = url.split('/');

	const temp = {
		name: taskName,
		description: taskDescription,
		date: taskDate,
		time: taskTime
	};

	//TODO console.log to check numbers are accurate, add thens for error handelling

	fetch(`/api/users/${split[2]}/tasks/remove`, { //POST the server and remove task from database
        method: 'POST', 
        body: JSON.stringify(temp), 
        headers: {
            'Content-Type': 'application/json',
        }
		}).then(response => {
			return response.json();
		}).then(obj => {
			if(obj.status !== 0) {
				throw obj.result;
			}
			for(let i = 0; i < allTasks.length; i++) {
				if(allTasks[i] === currentlyEditingTask) { 
					//search through allTasks array, if the values all match, delete the item at said index from client side storage
					allTasks.splice(i, 1);
				}
			}
			renderModalTasks(document.getElementById('modalTasksBody')); //re render task modal
			renderTask(document.getElementById('futureTasks'), allTasks); //re render future tasks
			renderTask(document.getElementById('selectedDayTasks'), allTasks.filter(day => { //re render selected days tasks
				if (day.date === `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`) {
					return day;
				}
			}));

		}).catch(e => {
			// set page to 404 error if there is an error
			document.body.innerHTML = '404' + ' ' + e;
	});

	// after deleting a task, clear all fields in the add tasks(left side of task modal) 
	document.getElementById('taskName').value = '';
	document.getElementById('taskDate').value = '';
	document.getElementById('taskTime').value = '';
	document.getElementById('taskDescription').value = '';
});