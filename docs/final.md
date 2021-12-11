# Team Kappa Fall 2021 Course Assistant Application

## Application Link

https://cs326-final-kappa.herokuapp.com/

## Overview

Our application is called "Course Assistant" and is designed to help students of all grade levels better manage their files and upcoming assignments, as well as provide study
tools. Upon log in, the user is presented with the home page consisting of a calendar on the left and the ability to add upcoming tasks on the right. Once a task has passed
its designated date, they will no longer appear in the Future Tasks section. Overdue Tasks can once again be viewed through the old task button. Additionally, the section titled 
"Tasks for Selected Day" displays all tasks for whatever day the user selects on the calendar. By default, the current date is selected. There is also, of course, the ability to 
edit and delete tasks as desired. The next part of our application is our file system. From this page, the user is able to create notes and flashcards. They
also have the ability to tag files for their respective purposes. This way, if looking for a file for a specific class or type of file, the user can simply sort by the desired tags and find their files quickly. As mentioned previously, the users can create notes and flashcards. They function as their name implies and flashcards also include a study mode. Any
mistakes made to a flashcard can be reviewed and restudied. What makes our application so innovative is that it really is an all-in-one 
assistant. In the past, there have been applications for creating notes and flashcards and keeping track of tasks. However, the ability to have all these
tools in one spot is extremely helpful in our opinion and streamlines the organization of school courses. 

## Team Members

Our team consists of Charlie Le (CharlieQLe), Jia Hui Yu (jerryy19), and Matt Ferrara (mferrara63).

## User Interface

### Log In / Sign Up Page

Upon entering the URL of our application, users are presented with this page where they can sign up and log in. The respective modals appear when buttons are 
clicked.

![homepage when not logged in](./Final%20Screenshots/homepagenotloggedin.png)

Sign Up Modal

![sign up modal](./Final%20Screenshots/signupmodal.png)

Log In Modal

![log in modal](./Final%20Screenshots/loginmodal.png)

### User Profile Edit Page

This page is for editing the user's profile fields. Here they can change their name, email, or password. They may also delete their account.

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

On the files page, the user has the ability to manage all their note and flashcard files and keep them organized with our tag system via the search system. Users can add exiting tags or new create tags when creating a 
new note or flashcard set.

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

## Project API

The user sends GET/POST requests to our database when interacting with our application. 

The server will respond with a JSON object of the following:
```
{
	status: <Number> 0 for success, -1 for failure
	result: <any>
}
```

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

Send a post request for signing up with a name, email, and password if and only if the email is not in use. 
```
curl -X POST -d '{ "name": "John Doe", "email": "example@email.com", "password": "password" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/signup
```

Send a post request for logging in with an email and password.
```
curl -X POST -d '{ "email": "example@email.com", "password": "password" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/login
```

Sends a get request for retrieving the data of the "USER" if the user exists. This will return the USER's name and the USER's email in the results field of the JSON object.
```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER
```

Sends a post request to edit the data of the "USER". It can change names, emails, and passwords.
```
curl -X POST -d '{ "name": "John Doe", "email": "example@email.com", "password": "password" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/edit
```

Sends a post request to remove the specified user.
```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/remove
```

### Tasks

Sends a get request to retrieve all of the tasks of the "USER".
```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/tasks
```

Sends a post request to create a task with the specified name and description, scheduled for some time and date for the "USER" if and only of the task name is unique.
```
curl -X POST -d '{ "name": "Task Name", "description": "Do something", "date": "Some date", "time": "Some time" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/tasks/create
```

Sends a post request to edit the "TASK" for the "USER".
```
curl -X POST -d '{ "name": "Task Name", "description": "Do something", "date": "Some date", "time": "Some time" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/tasks/TASK/edit
```

Sends a post request to remove a task for the "USER".
```
curl -X POST -d '{ "name": "Task Name", "description": "Do something", "date": "Some date", "time": "Some time" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/tasks/remove
```

### Files

Sends a get request to retrieve a list of the files the "USER" has.
```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/files
```

Sends a post request to retrieve all files belonging to the "USER" whose name contains the name search, and filtering the documents that contain ALL of the included tags and NONE of the excluded tags
```
curl '{ "name": "File name", "includeTags": ["tag1"], "excludeTags": ["tag2"] }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/files/search
```

### Tags

Sends a get request to retrieve all of the tags the "USER" has created.
```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/tags
```

Sends a post request to create a "TAG" for the "USER".
```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/tags/TAG/create
```

Sends a post request to remove a "TAG" for the "USER.
```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/tags/TAG/remove
```

### Notes

Sends a get request to retrieve the data of a "NOTE" for the user.
```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/files/notes/NOTE
```

Sends a post request to create a "NOTE for the "USER" if it does not exist.
```
curl -X POST -d '{ "tags": ["tag1", "tag2"], "body": "some text" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/files/notes/NOTE/create
```

Sends a post request to edit the "NOTE" of the "USER".
```
curl -X POST -d '{ "body": "This is a note!" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/files/notes/NOTE/edit
```

Sends a post request to remove the "NOTE" of the "USER".
```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/files/notes/NOTE/remove
```

Sends a get request to get the tags of the "NOTE" of the "USER".
```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/files/notes/NOTE/tags
```

Sends a post request to add a "TAG" to the "NOTE" of the "USER".
```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/files/notes/NOTE/tags/TAG/add
```

Sends a post request to remove a "TAG" to the "NOTE" of the "USER".
```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/files/notes/NOTE/tags/TAG/remove
```

### Flashcards

Sends a get request to get the set of flashcards of the "USER".
```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/files/flashcards/FLASHCARD
```

Sends a post request to create a set of flashcards for the "USER" if it does not exist.
```
curl -X POST -d '{ "tags": ["tag1", "tag2"], "flashcards": [ {"term": "t1", "definition": "d1"} ] }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/create
```

Sends a post request to remove a set of flashcards of the "USER".
```
curl -x POST https://cs326-final-kappa.herokuapp.com/api/users/USER/files/flashcards/FLASHCARD/remove
```

Sends a post request to add a term and definition to the set of flashcards of the "USER".
```
curl -X POST -d '{ "term: "", "definition": "" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/files/flashcards/FLASHCARD/addFlashcard
```

Sends a post request to remove a term and definition from the set of flashcards of the "USER".
```
curl -X POST -d '{ "term: "", "definition": "" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/files/flashcards/FLASHCARD/removeFlashcard
```

Sends a get request to get the tags of the "FLASHCARD" of the "USER".
```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/files/flashcards/FLASHCARD/tags
```

Sends a post request to add a "TAG" to the "FLASHCARD" of the "USER".
```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/files/flashcards/FLASHCARD/tags/TAG/add
```

Sends a post request to remove a "TAG" to the "FLASHCARD" of the "USER".
```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/files/flashcards/FLASHCARD/tags/TAG/remove
```


## Database Documentation

	DB ('final-kappa') // Database
	
		MISCELLANEOUS('misc') // Another collection holds information needed to assign user IDs

			Misc 1 { // Miscellaneous items have a unique id, and a nextUserId

				_id: String // Unique id assigned to every item in the database
 
				nextUserId: Integer // ID assigned to next user that signs up
			}

		AUTHENTICATION('users') // One collection stores all authentication information

			User 1 { // Each user has their authentication information stored in this collection

				_id: String // Unique id assigned to every item in the database

				name: String // Name of user

				email: String // Email associated with user's accont. Treated like a username for logging in.

				salt: String //
				
				hash: String //
				
				userId: String // the id of the user(obtained from nextUserId)

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

Sign up/Log in Page
```
http://cs326-final-kappa.herokuapp.com/
```

Homepage displaying a Calandar and the tasks for a selected day(today when login) and future tasks for the USER
```
http://cs326-final-kappa.herokuapp.com/users/USER
```

Profile/Setting page for the USER
```
http://cs326-final-kappa.herokuapp.com/users/USER/profile
```

Files of the USER
```
http://cs326-final-kappa.herokuapp.com/users/USER/files
```

The NOTE of the user
```
http://cs326-final-kappa.herokuapp.com/users/USER/files/notes/NOTE
```

The FLASHCARD set of the user
```
http://cs326-final-kappa.herokuapp.com/users/USER/files/flashcards/FLASHCARD
```

## Authentication/Authorization
During the sign up process, sers created and are authenticated as soon as they sign up. This allows the user to be instantly redirected to the home page. Log in also functions the same way. For each user interaction which requires communication to the server, the server first checks if it is the correct user, then processes the request from the user. This includes URL Routing and API calls. 


## Division of Labor

Division of labor remained roughly the same for each stage of our project, but the breakdown for each stage is below. We all helped each other on certain phases when needed; below lists the main contributor on each part.

### HTML / CSS

Matt Ferrara wrote the HTML and CSS for the application homepage before log in, sign up modal, and log in modal, as well as created the logo. He also wrote the HTML and CSS for the homepage upon logging in including the 
calendar, tasks, and the add task and edit task modals. Jia Hui Yu (Jerry) wrote the HTML and CSS for the notepad page, flashcard tool, as well as the create flashcard and notes modals. He also wrote HTML and CSS for user profile 
page used to edit user information. Charlie Le wrote the HTML and CSS for the file upload page, as well as created modals for tag creation/assignment and file upload. He also wrote HTML and CSS for the navbar at the top of the page.

### Front-End Javascript

Matt Ferrara wrote the front-end Javascript for the logged in homepage. This included the calendar, task creation, task editing, task deletion, rendering of current and future tasks, and syncing everything up to the back-end. 
Jerry assisted with DOM surgery for this part and getting everything connected to the backend properly. Jerry wrote the front-end Javascript for the notepad and flashcard tools. This included creating new note 
files, creating new flashcard sets, as well as rendering the flashcard study mode and syncing everything up to the back-end. Charlie wrote the front-end Javascript for the file upload and tag system. This included uploading 
files, tag creation, tag assignment, and syncing everything up to the back-end.

### Back-End Node.js and Authentication

Matt Ferrara wrote the inital back-end for the logged in homepage. This mostly consisted of getting the tasks to upload to the database. Jerry wrote the intial back-end for the notepad and flashcard tools. This consisted of uploading 
flashcards and note files to the database. Charlie wrote the intial back-end for the tag and file upload page. This consisted of uploading the tags and files to the server. We ended up completely refactoring our backend database in
favor of a more api-centered structure. Charlie played a large role in leading this refactoring and coming up with the idea, but all members were involved in the implementation. Authentication was a team effort that heavily relied on
in class examples of authentication implementation.

## Conclusion

In working on this project, our team learned a lot about what goes into building a web application from scratch. As a team, we feel we worked very well together and were in consistent contact throughout the semester. Creation of our
teams early on helped us establish this relationship as we worked together in class and outside of class. The writing of HTML and CSS was quite easy for our team and Bootstrap really helped streamline the process. Rendering of HTML 
elements(DOM Surgery) was a hassle but simple. Once we decided on a structure, the back-end implementation of our project was also quite simple (it got even simpler with our refactoring). Despite the simplicity, it was still 
quite a challenge because each task at hand was time consuming. The hardest stage of the project was undoubtedly getting the front-end and back-end javascript to get along. Even the most minor of changes to either front-end or 
back-end development produced bugs. Of all the aspects of our web development, the front-end evolved the most. We are most very proud of our webpage design and implementations. A hurdles that we constantly encountered for our 
project was the proximity between homework and milestone deadlines. Concepts were applied to milestone before homework which may have just been the way the course schedule worked out this semester but it has taught us to better 
manage our time and learn more efficiently. 

## Grading Rubric

**Authentication           ___ / 15 pts**

• Successfully create a user through sign up\
• Authentication is secure and bug free\
• Successfully login a user\
• User profile page allows for edits and is fully functional\
• User can only access their data

**Overall Polish           ___ / 10 pts**

• Application is user friendly, professional, and functions without bugs for optimal user experience\
• Application accomplishes most of what it set out to do in the design phase\
• File names make sense, code is readable, linted, and commented

**Homepage           ___ / 25 pts**

• Add task modal accurately allows for the creation of tasks\
• Editing and deleting tasks is fully functional\
• Calendar renders properly, defaults to current date, and is functional without bugs\
• Tasks for currently selected day render properly when specified day is clicked\
• Future tasks render properly and only displays upcoming tasks (not ones on current date or ones that have passed)\
• Old tasks properly render in modal when button is clicked

**File Page/Tags           ___ / 25 pts**

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
• final.md file includes all necessary documentation and write up materials as specified


                              **Total: ___ / 100 points**

