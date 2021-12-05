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

## User Interface

## APIs

## Database Documentation

	DB (‘final-kappa’) // database

		USER 1 //each user has a collection of documents

			DOCUMENT 1 { //each document has structure based on it's type --> examples below

				name: String //name of the document

				class: String //class that document corresponds to

				type: String //type of file ex. ‘note’, ‘flashcard’, ‘task’, ‘classDesc’, etc

			}

			 Here are some examples of what certain additions would look like…

			 DOCUMENT 2 (note) {
				
				name: ‘derivative notes’ //name of the document

				class: ‘math’ //class that document corresponds to

				type: ‘note’ //type of file → in this case note

				tags: String //tag if assigned, ex. “Homework”, “Lecture”, etc

				body: String // body of note file

			}

			DOCUMENT 3 (task) {
				type: ‘task’ //type of file → in this case task
				
				classname: ‘math’ //class that document corresponds to

				taskname: ‘hw task’ //name of the task

				description: String // description of task

				date: String //date of task

				time: String //time of task
			}

		USER 2… //next user would have their own collection of documents

			DOCUMENT 1 { //each document has a name, class, and type, type determines what else is stored

				name: String //name of the document

				class: String //class that document corresponds to

				type: String //type of file ex. ‘note’, ‘flashcard’, ‘task’, ‘classDesc’, etc

			}

## URL Routes / Mappings

## Authentication/Authorization

## Division of Labor

Division of labor has remained mostly the same as in the past two milestones.  Charlie has continued primarily implementing the class page, tag system, and file upload parts of the project.  Jerry has continued mainly working with the notes and flashcard tool implementation.  Matt is also still mainly focused on the website homepage, implementing tasks, and the login/sign up system.  Again though, we ultimately all work together on all parts to some extent whenever we need help.

## Conclusion