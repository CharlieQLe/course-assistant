# Team Kappa Fall 2021 Course Assistant Application

## Application Link

https://cs326-final-kappa.herokuapp.com/

## Overview

Our application is called "Course Assistant" and is designed to help students of all grade levels better manage their class files and upcoming assignments as well as provide 
study tools. Upon logging in, the user is presented with a home page consisting of a calendar and the ability to add upcoming tasks. They can assign these tasks to specific 
days. Future tasks, which are based on the current date, render in the bottom right. Once a date of a task has passed, they will no longer render in this section. Additionally, 
in the top right, there is a section titled "Tasks for Selected Day", which as the name suggests, renders all tasks for whatever day the user selects on the calendar. By 
default, the current date is selected. There is also, of course, the ability to edit and delete tasks as desired. The next part of our application is our file upload and tag 
system.  From this page, the user is able to upload any files that they desire to have everything all in one place. They also have the ability to create tags and assign them
to files for sorting purposes.  This way, if looking for a file for a specific class or type of file like a note, the user can simply sort by the desired tag and find their
file quickly.  Finally, we also added two tools, flashcards and notepads, to better assist our application users. To open up a new notepad, the user simply selects, "create
new note" from the file upload page which will then take them to the notepad page. Here, they can assign a title and write freely instead of having to open up a separate
application to take notes. Additionally, our flashcards tool works in a similar manner. To create a new set, the user simply clicks the "create new flashcard set" button and
will be taken to the flashcard creation page. The user can enter new terms as desired and then enter study mode. In study mode, the user can select whether or not they got
the term right or wrong. Any wrong terms will be added to a new set and can be restudied. What makes our application so innovative is that it really is an all-in-one 
assistant. In the past, there have been applications for uploading files, keeping track of tasks, and creating notes and flashcards. However, the ability to have all these
tools in one spot is extremely helpful in our opinion and streamlines the organization of school courses. 

## Team Members

Our team consists of Charlie Le (CharlieQLe), Jia Hui Yu (jerryy19), and Matt Ferrara (mferrara63).

## User Interface

### Log In / Sign Up Page

Upon entering the URL of our application, users are presented with this page where they can choose to either log in or sign up. The respective modals appear when buttons are 
clicked.

![homepage when not logged in](./Final%20Screenshots/homepagenotloggedin.png)

Sign Up Modal

![sign up modal](./Final%20Screenshots/signupmodal.png)

Log In Modal

![log in modal](./Final%20Screenshots/loginmodal.png)

### User Profile Edit Page

This page is for editing the user's profile fields. Here they can change their name, email, or password.

![user profile edit page](./Final%20Screenshots/userprofileedit.png)

### Homepage

This page is used to manage and schedule tasks for the user. The user can add a task by clicking the respective button which pops up the add class modal. Similarly, clicking
the edit button next to a task will also pop up a modal that allows the user to either edit fields or delete the task entirely. There is also a button to view old tasks in
case a date has passed but the user still wants to see their previous scheduled tasks. The calendar can be interacted with and if a day is selected where tasks have been
assigned, they will render under "Tasks for Selected Day".

Homepage Upon Logging In

![homepage](./Final%20Screenshots/homepage.png)

Add Task Modal

![add task modal](./Final%20Screenshots/addtaskmodal.png)

Edit or Delete Task Modal

![edit delete modal](./Final%20Screenshots/editdeletemodal.png)

Old Tasks Modal

![old tasks modal](./Final%20Screenshots/oldtasksmodal.png)

### Files Page

On the files page, the user has the ability to manage all their note and flashcard files and keep them organized with our tag system. Users can create tags when creating a 
new note or flashcard set or do so separately. They can also create new notes and flashcard sets from this page. They can sort via specific tags to easily locate files.

Files Main Page

![files page](./Final%20Screenshots/filespage.png)

Create a Tag Modal

![create tag modal](./Final%20Screenshots/createtagmodal.png)

Add a Tag to a File Modal

![add tag to file modal](./Final%20Screenshots/addtagtofile.png)

Create a Note Modal

![create note modal](./Final%20Screenshots/createnotemodal.png)

Create a Flashcard Set Modal

![create flashcard set modal](./Final%20Screenshots/createflashcardmodal.png)

### Notepad Tool

The notepad tool allows the user to create and save notes that are then stored in the file page.

Example Notepad

![notepad tool](./Final%20Screenshots/notepadtool.png)

### Flashcard Tool

The flashcard tool allows for the creation of flashcard sets for the user. Here, they can also study sets and mark terms as correct or incorrect. Upon completion of a study
session, users can review all their missed terms in a single spot.

Add Flashcard Modal

![add flashcard modal](./Final%20Screenshots/addflashcardmodal.png)

Flashcard Study Mode

![flashcard study mode](./Final%20Screenshots/flashcardstudymode.png)

Review Missed Terms

![review missed terms](./Final%20Screenshots/reviewmissedterms.png)

## Project API (Finalize This)

The user can send get/post requests to manipulate data on the server.

For manipulating the profile, a post sends the action the user wants to perform, with the corresponding data.

### JSON Objects
```
task {
    "name": "",
    "description": "",
    "date": "",
    "time": ""
}

note {
    "tags": [],
    "body": ""
}

flashcards {
    "tags": [],
    "flashcards": []
}

flashcard {
    "term": "",
    "definition": ""
}
```

### User

```
curl -X POST -d '{ "name": "John Doe", "email": "example@email.com", "password": "password" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/signup
```
Running the above sends a post request for signing up with a name, email, and password. In the final product, this will create a user if one with the same email does not exist.

```
curl -X POST -d '{ "email": "example@email.com", "password": "password" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/login
```
Running the above sends a post request for logging in with an email and password.

```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER
```
Running the above will retrieve the data of the specified user "USER" if the user exists. USER will likely end up as an identifier of some sort for uniqueness. This will return a JSON object that has the fields "name", "email", and other data that does not exist at the moment. 

```
curl -X POST -d '{ "name": "John Doe", "email": "example@email.com", "password": "password" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/edit
```
Running the above sends a post request to edit the data of the specified user. It can change names, emails, and passwords.

```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/remove
```
Running the above sends a post request to remove the specified user.

### Tasks

```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/tasks
```
Running the above retrieves all of the tasks the specified user has as a stringified array.

```
curl -X POST -d '{ "name": "Task Name", "description": "Do something", "class": "Some class", "date": "Some date", "time": "Some time" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/tasks/create
```
Running the above sends a post request to create a task with the specified name and description, scheduled for some time and date for the specified user.

```
curl -X POST -d '{ "name": "Task Name", "description": "Do something", "date": "Some date", "time": "Some time" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/tasks/edit
```
Running the above sends a post request to edit a task with the specified id to have the specified name, description, etc. for the specified user.

```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/tasks/remove
```
Running the above sends a post request to remove a task with the specified name.

### Class

```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/class
```
Running the above retrieves a list of the classes the user has.

```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS
```
Running the above retrieves the data of the specified class that belongs to the user. It retrieves the class description and the files that belong to the class.

```
curl -X POST -d '{ "description": "Do something" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/create
```
Running the above sends a post request to create a class of the specified name with a description for the specified user.

```
curl -X POST -d '{ "description": "Do something" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/edit
```
Running the above sends a post request to edit the description of the specified class for the user.

```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/remove
```
Running the above sends a post request to remove the specified class.

```
curl '{ "name": "File name", "IncludeTags": "[]", "ExcludeTags": "[]" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/search
```
Running the above sends a get request to retrieve the files for the specified class with the specified name, included tags, and excluded tags.

### Tags
```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/tags
```
Running the above retrieves all of the tags the user has created.

```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/tags/TAG/create
```
Running the above sends a post request to create a tag.

```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/tags/TAG/remove
```
Running the above sends a post request to remove a tag.

### Notes
```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/notes/NOTE
```
Retrieve the data of a note.

```
curl -X POST -d '{ "tags": ["tag1", "tag2"] }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/notes/NOTE/create
```
Create a note.

```
curl -X POST -d '{ "body": "This is a note!" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/notes/NOTE/edit
```
Edit a note.

```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/notes/NOTE/remove
```
Remove a note.


### Flashcards

```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD
```
Get the set of flashcards.


```
curl -X POST -d '{ "tags": ["tag1", "tag2"] }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/create
```
Create a set of flashcards.

```
curl -x POST https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/remove
```
Remove a set of flashcards.

```
curl -X POST -d '{ "term: "", "definition": "" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/addFlashcard
```
Add a term and definition to the set of flashcards.

```
curl -X POST -d '{ "term: "", "definition": "" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/removeFlashcard
```
Remove a term and definition to the set of flashcards.


## Database Documentation

	DB ('final-kappa') // Database

		AUTHENTICATION('authentication') // One collection stores all authentication information

			User 1 { // Each user has their authentication information stored in this collection

				_id: String // Unique id assigned to every item in the database

				user: String // User that the authentication info belongs to

				name: String // Name of user

				email: String // Email associated with user's accont. Treated like a username for logging in.

				password: String // Password to user's account

			}

		FILES('files') // Another collection holds all files associatied with a specific user 

			File 1 (Note file) { // Each file has a unique id, user, name, tags, and type. Type determines what else is stored.

				_id: String // Unique id assigned to every item in the database

				user: String // User that the file belongs to

				name: String // Name of file

				type: String('note') // Type of file --> Determines what other fields are stored. In this example, it is a note file.
				
				tags: Array of strings // Tags associatied with file
				
				body: String // Body of note file

			}

			File 2 (Flashcard file) { // Each file has a unique id, user, name, tags, and type. Type determines what else is stored.

				_id: String // Unique id assigned to every item in the database

				user: String // User that the file belongs to

				name: String // Name of file

				type: String('flashcard') // Type of file --> Determines what other fields are stored. In this example, it is a flashcard file.
				
				tags: Array of strings // Tags associatied with file
				
				flashcards: Array of flashcard objecst // Flashcards in flashcard file

			}


		TAGS('tags') // Another collection holds all tags created by a specific user

			Tag 1 { // Each tag has a unique id, user, and name

				_id: String // Unique id assigned to every item in the database

				user: String // User that the tag belongs to

				name: String // Name of the tag

			}

		TASKS('tasks') // Another collection holds all tasks created by a specific user

			Task 1 { // Each task has a unique id, name, user, description, date, time

				_id: String // Unique id assigned to every item in the database
 
				name: String // Name of task

				user: String // User that the task belongs to

				description: String // Description of specific task

				date: String // Date associated with specific task

				time: String // Time associated with specific task

			}

## URL Routes / Mappings

## Authentication/Authorization

## Division of Labor

Division of labor remained roughly the same for each stage of our project, but the breakdown for each stage is below. We all helped each other on certain phases when needed, but below lists who was the main contributor on each part.

### HTML / CSS

Matt Ferrara wrote most of the HTML and CSS for the application homepage before log in, sign up modal, and log in modal, as well as created the logo. He also wrote the HTML and CSS for the homepage upon logging in including the 
calendar, tasks, and the add task and edit task modals. Jia Hui Yu (Jerry) was wrote the HTML and CSS for the notepad page, flashcard tool, as well as the create flashcard and notes modals. He also wrote HTML and CSS for user profile 
page used to edit profile information. Charlie Le wrote the HTML and CSS for the file upload page, as well as created modals for tag creation/assignment and file upload. He also wrot HTML and CSS for the navbar at the top of the page.

### Front-End Javascript

Matt Ferrara wrote most of the front end Javascript for the logged in homepage. This included the calendar, task creation, task editing, task deletion, rendering of current and future tasks, and syncing everything up to the backend. 
Jerry also assisted with DOM surgery for this part as well and getting everything connected to the backend properly. Jerry wrote most of the front end Javascript for the notepad and flashcard tools. This included creating new note 
files, creating new flashcard sets, as well as rendering the flashcard study mode and syncing everything up to the backend. Charlie wrote most of the front end Javascript for the file upload and tag system. This included uploading 
files, tag creation, tag assignment, rendering uploaded files, and syncing everything up to the backend.

### Back-End Node.js and Authentication

Matt Ferrara wrote the inital backend for the logged in homepage. This mostly consisted of getting the tasks to upload to the database. Jerry wrote the intial backend for the notepad and flashcard tools. This consisted of uploading 
flashcards and note files to the database. Charlie wrote the intial backend for the tag and file upload page. This consisted of uploading the tags and files to the server. We ended up completely refactoring our backend database in
favor of a more simplistic structure. Charlie played a large role in leading this refactoring and coming up with the idea, but all members were involved in the implementation. Authentication was a team effort that heavily relied on
in class examples of authentication implementation.

## Conclusion

In working on this project, our team learned a lot about what goes into building a web application from scratch. As a team, we feel we worked very well together and were in consistent contact throughout the semester. Creation of these
teams so early helped establish this relationship as we worked together in class on exercises as well. The writing of HTML and CSS was quite easy for our team and Bootstrap really helped streamline the process. Once we decided on a 
structure, the backend implementation of our project was also quite simple (it got even simpler with our refactoring). The hardest stage of the project was definitely the front end Javascript and getting it all synced up to the backend.
There was a lot of troubleshooting getting things to render properly and other bugs that had to be fixed one by one. Of all parts, our front end also definitely evolved the most compared to our intial submission in Milestone 2. As far
as what would have been nice to know before the project, in general, some concepts were taught too close to the deadlines for milestones. For example, we had a lab on Bootstrap the day before the HTML and CSS Milestone was due, which
resulted in us teaching Bootstrap to ourselves. Even things like using MongoDB and backend implementation were taught pretty close to the due date for Milestone 3. It may have just been the way the course schedule worked out this 
semester, but learning this concepts a little sooner would have been beneficial. Despite that, we would say we had most of the skills necessary taught to us at one point or another, so there is not anything specific we would have liked
to know before hand.

## Grading Rubric

**Authentication           ___ / 15 pts**

• Successfully create a user through sign up\
• Authentication is secure and bug free\
• Successfully login a user\
• User profile page allows for edits and is fully functional

**Overall Polish           ___ / 10 pts**

• Application is user friendly, appears professional, and functions well without bugs for optimal user experience\
• Application accomplishes most of what it set out to do in the design phase\
• Navbar is functional to allow for easy navigation\
• File names make sense, code is easy to follow, linted, and commented

**Homepage           ___ / 25 pts**

• Add task modal accurately allows for the creation of tasks\
• Editing and deleting tasks is fully functional\
• Calendar renders properly, defaults to current date, and is functional without bugs\
• Tasks for currently selected day render properly when specified day is clicked\
• Future tasks render properly and only displays upcoming tasks (not ones on current date or ones that have passed)\
• Old tasks properly render in modal when button is clicked

**File Upload Page/Tags           ___ / 25 pts**

• Tag creation and assignment is fully functional\
• Sorting by tags is fully functional and accurate\
• File list renders properly\
• All modals render properly

**Flashcard and Note Tool           ___ / 20 pts**

• Flashcard sets are able to be created through create flashcard set button and are fully functional\
• Flashcard study mode is fully functional, terms marked incorrect properly are added to missed term set for later review\
• Notes can be created through create note button on file page\
• Saving of notes is properly implemented to allow for future access and edits

**Video Presentation and Final.md           ___ / 5 pts**

• Final video presentation covers all bases defined in specifications and is uploaded to YouTube\
• Final.md file includes all necessary documentation and write up materials as specified


                              **Total: ___ / 100 points**

