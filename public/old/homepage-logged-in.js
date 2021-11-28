'use strict';

//TODO FINISH IMPLEMENTATION OF DOM SURGERY FOR DELETE AND EDIT
//ASSIGN A TASK ID BASED ON A NEW CONSTANT CALLED NEXTTASKID WHICH WILL START AT 0
//PROBABLY SIMPLIFY MODALS FOR ADDING AND EDITING TASKS SO LESS DOM SURGERY IS REQUIRED


/*DOM SURGERY
need dom surgery for creating tasks and adding them to the array --> then sort them by date --> somehow check date and add tasks on current date to todayTasks
        create and outside div with id=tasks for dom surgery to insert tasks
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Task 1
              <li class="list-inline-item">
                <button class="btn btn-outline-light btn-sm rounded-0" type="button" data-bs-toggle="modal" data-bs-target = "#edittask" data-placement="top" title="Add"><i class="fa fa-table"></i>Edit</button>
              </li>
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Task 2
              <li class="list-inline-item">
                <button class="btn btn-outline-light btn-sm rounded-0" type="button" data-bs-toggle="modal" data-bs-target = "#edittask" data-placement="top" title="Add"><i class="fa fa-table"></i>Edit</button>
              </li>
            </label>
          </div>
*/
let allTasks = []; //where do these get appended? via post?
//let todayTasks = [];

//renders a new task on side bar when added

function createTask() { //taskName, taskDate, taskTime, taskClass, taskDesc maybe pass these in using getElementById.value?

    
    const taskHolder = document.createElement('div');
    taskHolder.classList.add("form-check");
    taskHolder.setAttribute('id', 'task') //CREATE THE TASK FOR THE SIDEBAR

    const taskInput = document.createElement('input');
    taskInput.classList.add("form-check-input");
    taskInput.setAttribute('type', 'checkbox');
    taskInput.setAttribute('value', '');
    //taskInput.innerHTML = '';
    taskInput.setAttribute('id', 'flexCheckDefault');

    const task = document.createElement('label');
    task.classList.add("form-check-label");
    task.setAttribute('for', 'flexCheckDefault');
    task.innerHTML = document.getElementById("taskName").value;

    const li = document.createElement('li');
    li.classList.add("list-inline-item");

    const editButton = document.createElement('button')
    editButton.classList.add("btn btn-outline-light btn-sm rounded-0");
    editButton.setAttribute('id', 'editbutton');
    editButton.setAttribute('type', 'button');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#edittask');
    editButton.setAttribute('title', 'Edit');
    editButton.innerHTML = "Edit"

    const i = document.createElement('i');
    i.classList.add("fa fa-table");

    editButton.appendChild(i); //append i to edit button
    li.appendChild(editButton); //append edit button to li

    taskHolder.appendChild(taskInput); //append taskInput, task, and li to the taskHolder parent div
    taskHolder.appendChild(task);
    taskHolder.appendChild(li);

    taskHolderParent = document.getElementById('taskholdercol'); //set parent equal to col-sm div that holds all tasks
    taskHolderParent.appendChild(taskHolder);
    return taskHolder;
}

// function editTask() {

// }

// function deleteTask() {

// }

function renderTask(element) {
    element.innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        let taskHolder = createTask(allTasks[i]);
        taskHolder.appendChild(element);
    }
}

// function renderTodayTask(element) { //USE THIS TO RENDER TOP DIV, SORTING BY RECENCY (5 OR 6 MOST RECENT OR JUST BY DAY)
    
//     element.innerHTML = '';

//     for (let i = 0; i < allTasks.length; i++) {
//         const main = createTask(allTasks[i]);
//         element.appendChild(main);

//     }

// }
// // //ADD TASK CLICKED

document.getElementById("addtaskbutton").addEventListener('click', () => { //when add task is clicked inside add task modal
    //popup add task modal --> already taken care of via bootstraps
    //add task to the side (using renderTask?)
    //add to calendar

    //TODO NEED TO FIGURE OUT HOW TO INDEX THEM (TASKID) / OR IF IT WILL JUST BE AUTOMATIC

    const n = document.getElementById('taskName').value;
    const d = document.getElementById('taskDate').value;
    const t = document.getElementById('taskTime').value;
    const c = document.getElementById('taskClass').value;
    const desc = document.getElementById('taskDescription').value;

    if (n.length === 0 || d.length === 0 || t.length === 0 || c.length === 0 || desc.length === 0) {
        return;
    }

    let temp = {
        name: n,
        date: d,
        time: t,
        class: c,
        description: desc
    }

    fetch('/api/users/dummy/tasks/create', {
        method: 'POST', 
        body: JSON.stringify(temp), 
        headers: {
            'Content-Type': 'application/json',
        }
        
    // }).then(function(response) {
    //     return response.text()
    // }).then(function(text) {
    //     console.log(text)
    // }).catch(function(error) {
    //     console.log(error)
    });

    // TODO GRAB TASKS FROM SERVER
    // FETCH 

    // client side storage
    allTasks.push(temp);


    // clear name, time, date, class, description input box after every added term
    document.getElementById('taskName').value = '';
    document.getElementById('taskDate').value = '';
    document.getElementById('taskTime').value = '';
    document.getElementById('taskClass').value = '';
    document.getElementById('taskDescription').value = '';
    
    renderTask(document.getElementById('task')); //RENDER THE TASKS ON THE SIDEBAR
    
});


// // //EDIT BUTTON NEXT TO TASK CLICKED

document.getElementById("edittaskbutton").addEventListener('click', () => { //when edit task is clicked inside edit task modal

    //pop up edit task modal --> already taken care of via bootstrap
    //read task data into edit task modal
    //update task data when update is clicked

    //post the server edit endpoint with all the values from the edit task modal

    const n = document.getElementById('taskName').value;
    const d = document.getElementById('taskDate').value;
    const t = document.getElementById('taskTime').value;
    const c = document.getElementById('taskClass').value;
    const desc = document.getElementById('taskDescription').value;

    if (n.length === 0 || d.length === 0 || t.length === 0 || c.length === 0 || desc.length === 0) {
        return;
    }

    let temp = {
        name: n,
        date: d,
        time: t,
        class: c,
        description: desc
    }

    fetch('https://cs326-final-kappa.herokuapp.com/api/users/:user/tasks/:taskid/edit', { //send a post to edit endpoint to edit the task
        method: 'POST', 
        body: JSON.stringify(temp), 
        headers: {
            'Content-Type': 'application/json',
        }
    });

    renderTask(document.getElementById('task')); //RE-RENDER THE TASKS ON THE SIDEBAR TO TAKE INTO ACCOUNT EDIT

});

// // //DELETE TASK CLICKED 
//GET THE TASK ID AND USE THAT TO DELETE FROM SERVER --> POST WITH JUST TASKID?

document.getElementById("deletetaskbutton").addEventListener('click', () => { //when delete task is clicked inside edit task modal

//delete task from tasks on side

// for(let i = 0; i < allTasks.length; i++) {

// }

//post the server endpoint with the values from the delete task modal
//HAVE TO PASS IN TASKID --> STILL FIGURING OUT WHERE TO ASSIGN THAT
    fetch('https://cs326-final-kappa.herokuapp.com/api/users/:user/tasks/:taskid/remove', {
        method: 'POST', 
        body: JSON.stringify(temp), 
        headers: {
            'Content-Type': 'application/json',
        }
        
    // }).then(function(response) {
    //     return response.text()
    // }).then(function(text) {
    //     console.log(text)
    // }).catch(function(error) {
    //     console.log(error)
    });

    renderTask(document.getElementById('task')); //RE-RENDER THE TASKS ON THE SIDEBAR TO TAKE INTO ACCOUNT DELETION


});

// // //DAY ON CALENDER CLICKED, IDEALLY THIS WOULD FETCH THE TASKS FOR THAT DAY AND RENDER THEM IN THE INNER HTML IN THE TOP OF THE CALENDAR

// document.getElementById("day").addEventListener('click', () => {

//     //read events from selected day
//     //update list events on side under events for selected day

// })




//GETTING CALENDAR TO RENDER AND RESPOND TO CLICKS

document.addEventListener('DOMContentLoaded', function(){
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth(),
        monthTag =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        day = today.getDate(),
        days = document.getElementsByTagName('td'),
        selectedDay,
        setDate,
        daysLen = days.length;
// options should like '2014-01-01'
    function Calendar(selector, options) {
        this.options = options;
        this.draw();
    }
    
    Calendar.prototype.draw  = function() {
        this.getCookie('selected_day');
        this.getOptions();
        this.drawDays();
        var that = this,
            reset = document.getElementById('reset'),
            pre = document.getElementsByClassName('pre-button'),
            next = document.getElementsByClassName('next-button');
            
            pre[0].addEventListener('click', function(){that.preMonth(); });
            next[0].addEventListener('click', function(){that.nextMonth(); });
            reset.addEventListener('click', function(){that.reset(); });
        while(daysLen--) {
            days[daysLen].addEventListener('click', function(){that.clickDay(this); });
        }
    };
    
    Calendar.prototype.drawHeader = function(e) {
        var headDay = document.getElementsByClassName('head-day'),
            headMonth = document.getElementsByClassName('head-month');

            e?headDay[0].innerHTML = e : headDay[0].innerHTML = day;
            headMonth[0].innerHTML = monthTag[month] +" - " + year;        
     };
    
    Calendar.prototype.drawDays = function() {
        var startDay = new Date(year, month, 1).getDay(),

            nDays = new Date(year, month + 1, 0).getDate(),
    
            n = startDay;

        for(var k = 0; k <42; k++) {
            days[k].innerHTML = '';
            days[k].id = '';
            days[k].className = '';
        }

        for(var i  = 1; i <= nDays ; i++) {
            days[n].innerHTML = i; 
            n++;
        }
        
        for(var j = 0; j < 42; j++) {
            if(days[j].innerHTML === ""){
                
                days[j].id = "disabled";
                
            }else if(j === day + startDay - 1){
                if((this.options && (month === setDate.getMonth()) && (year === setDate.getFullYear())) || (!this.options && (month === today.getMonth())&&(year===today.getFullYear()))){
                    this.drawHeader(day);
                    days[j].id = "today";
                }
            }
            if(selectedDay){
                if((j === selectedDay.getDate() + startDay - 1)&&(month === selectedDay.getMonth())&&(year === selectedDay.getFullYear())){
                days[j].className = "selected";
                this.drawHeader(selectedDay.getDate());
                }
            }
        }
    };
    
    Calendar.prototype.clickDay = function(o) {
        var selected = document.getElementsByClassName("selected"),
            len = selected.length;
        if(len !== 0){
            selected[0].className = "";
        }
        o.className = "selected";
        selectedDay = new Date(year, month, o.innerHTML);
        this.drawHeader(o.innerHTML);
        this.setCookie('selected_day', 1);
        
    };
    
    Calendar.prototype.preMonth = function() {
        if(month < 1){ 
            month = 11;
            year = year - 1; 
        }else{
            month = month - 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.nextMonth = function() {
        if(month >= 11){
            month = 0;
            year =  year + 1; 
        }else{
            month = month + 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.getOptions = function() {
        if(this.options){
            var sets = this.options.split('-');
                setDate = new Date(sets[0], sets[1]-1, sets[2]);
                day = setDate.getDate();
                year = setDate.getFullYear();
                month = setDate.getMonth();
        }
    };
    
     Calendar.prototype.reset = function() {
         month = today.getMonth();
         year = today.getFullYear();
         day = today.getDate();
         this.options = undefined;
         this.drawDays();
     };
    
    Calendar.prototype.setCookie = function(name, expiredays){
        if(expiredays) {
            var date = new Date();
            date.setTime(date.getTime() + (expiredays*24*60*60*1000));
            var expires = "; expires=" +date.toGMTString();
        }else{
            var expires = "";
        }
        document.cookie = name + "=" + selectedDay + expires + "; path=/";
    };
    
    Calendar.prototype.getCookie = function(name) {
        if(document.cookie.length){
            var arrCookie  = document.cookie.split(';'),
                nameEQ = name + "=";
            for(var i = 0, cLen = arrCookie.length; i < cLen; i++) {
                var c = arrCookie[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1,c.length);
                    
                }
                if (c.indexOf(nameEQ) === 0) {
                    selectedDay =  new Date(c.substring(nameEQ.length, c.length));
                }
            }
        }
    };
    var calendar = new Calendar();
    
        
}, false);