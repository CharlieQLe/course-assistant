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
curl -X POST -d '{ "tags": [""] }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/notes/NOTE/create
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
curl -X POST -d '{ "tags": [""] }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/create
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

	DB (‘final-kappa’) // Database

		AUTHENTICATION // One collection stores all authentication information

			User 1 { // Each user has their authentication information stored in this collection

				_id: String // Unique id assigned to every item in the database

				user: String // User that the authentication info belongs to

				name: String // Name of user

				email: String // Email associated with user's accont. Treated like a username for logging in.

				password: String // Password to user's account

			}

		FILES // Another collection holds all files associatied with a specific user 

			File 1 (Note file) { // Each file has a unique id, user, name, tags, and type. Type determines what else is stored.

				_id: String // Unique id assigned to every item in the database

				user: String // User that the file belongs to

				name: String // Name of file

				type: String // Type of file --> Determines what other fields are stored. In this example, it is a note file.
				
				tags: Array of strings // Tags associatied with file
				
				body: String // Body of note file

			}

			File 2 (Flashcard file) { // Each file has a unique id, user, name, tags, and type. Type determines what else is stored.

				_id: String // Unique id assigned to every item in the database

				user: String // User that the file belongs to

				name: String // Name of file

				type: String // Type of file --> Determines what other fields are stored. In this example, it is a flashcard file.
				
				tags: Array of strings // Tags associatied with file
				
				flashcards: Array of flashcard objecst // Flashcards in flashcard file

			}

			File 3 (Normal file) { // Each file has a unique id, user, name, tags, and type. Type determines what else is stored. UPDATE THIS LATER NOT EXACTLY SURE YET

				_id: String // Unique id assigned to every item in the database

				user: String // User that the file belongs to

				name: String // Name of file

				type: String // Type of file --> Determines what other fields are stored. In this example, it is a note file.
				
				tags: Array of strings // Tags associatied with file
				
				body: String // Body of note file

			}

		TAGS // Another collection holds all tags created by a specific user

			Tag 1 { // Each tag has a unique id, user, and name

				_id: String // Unique id assigned to every item in the database

				user: String // User that the tag belongs to

				name: String // Name of the tag

			}

		TASKS // Another collection holds all tasks created by a specific user

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

Division of labor has remained mostly the same as in the past two milestones.  Charlie has continued primarily implementing the class page, tag system, and file upload parts of the project.  Jerry has continued mainly working with the notes and flashcard tool implementation.  Matt is also still mainly focused on the website homepage, implementing tasks, and the login/sign up system.  Again though, we ultimately all work together on all parts to some extent whenever we need help.

## Conclusion