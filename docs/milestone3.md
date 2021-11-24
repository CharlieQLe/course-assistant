# Milestone 3

## URL

https://cs326-final-kappa.herokuapp.com/

## Database Description / Documentation



## Division of Labor

# Milestone 3


## URL

https://cs326-final-kappa.herokuapp.com/

## Database Description / Documentation

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

				date: String /date of task

				time: String //time of task
			}

		USER 2… //next user would have their own collection of documents

			DOCUMENT 1 { //each document has a name, class, and type, type determines what else is stored

				name: String //name of the document

				class: String //class that document corresponds to

				type: String //type of file ex. ‘note’, ‘flashcard’, ‘task’, ‘classDesc’, etc

			}

## Division of Labor

Division of labor has remained mostly the same as in the past two milestones.  Charlie has continued primarily implementing the class page, tag system, and file upload parts of the project.  Jerry has continued mainly working with the notes and flashcard tool implementation.  Matt is also still mainly focused on the website homepage, implementing tasks, and the login/sign up system.  Again though, we ultimately all work together on all parts to some extent whenever we need help.