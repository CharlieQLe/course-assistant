# Course Assistant

<p align="center" width="100%">
    <img width="33%" src="./HTML Reference/logo.png">
</p>

Link to application: https://cs326-final-kappa.herokuapp.com/

## Team Members

Our team consists of Charlie Le (https://github.com/CharlieQLe), Jia Hui Yu (https://github.com/jerryy19), and Matt Ferrara (https://github.com/mferrara63).

## Application Description 

Our application is titled "Course Assistant" and is an all in one assistant geared towards students of all ages and grade levels. Upon signing up, users are taken to their profile
homepage where they have the ability to create and manage upcoming tasks to ensure deadlines are met. From the navbar, users can also navigate to their files page where they have
the ability to create new notes and flashcards and easily sort them with our tag system.

"Course Assistant" stands out from other sites like Quizlet and Google Docs by having all the tools necessary to do well in school in one place. Instead of having to make different
accounts on multiple websites, users have the ability to store tasks, notes, and flashcards in our application alone which streamlines the process of course management.

On our homepage, users are presented with a fully interactable calendar that can be navigated through with arrows. Upon adding a task with the "Add Task" button, the task is 
assigned to the desired date and rendered on the right side of the page. If a task is upcoming, it is rendered in the "Future Tasks" section. Any time a user clicks on a particular
day on the calendar, any tasks assigned to that day are rendered under the "Tasks for Selected Day" section. This makes it easy to keep track of any upcoming assignments or other
events in an organized manner. Tasks can be easily edited by clicking on the "Edit" button displayed next to them which opens a modal. All fields from the selected task are 
autofilled into the modal for easy editing. The user can delete tasks from this modal as well. Additionally, there is a button that displays old tasks when clicked in case a 
deadline has passed and the user wants to see what was scheduled.

![homepage](./docs/Final%20Screenshots/homepage.png)

On the files page, users have the ability to create notes and flashcard sets. When creating these files, users can also assign tags to allow for easy sorting and organization. There
is functionality to sort by one or more tags and also sort by excluding one or more tags. Creation of tags can either be done when creating a file, or also by simply clicking
the "Tags" button in the bottom.  Examples of tags could include class names or lecture topics. This page stands out because it allows the user to store all their notes and 
flashcards for their classes in one place while still keeping them all organzied and easily sortable.

![files page](./docs/Final%20Screenshots/filespage.png)

The two utility tools we implemented, as mentioned before are notes and flashcards. Notes work as one would expect. Upon clicking the "Create Note" button, users can enter a title
for their note file and are taken to a page with a text box. From here, they can enter whatever they desire and click the "Save" button when done. Note files appear on the files
page once created. Flashcards work in a similar way. Users can create a set by clicking the "Create Flashcard" button on the files page, which prompts them to enter a name for the
set. They are then taken to a new page where they can add flashcards to a set and also study them by clicking the "Study" button. When studying, the user can mark terms as either
"Correct" or "Incorrect".  Any terms marked as incorrect can be reviewed by clicking the "Review Missed Terms" button. This allows users to easily mark terms that need futher 
studying.

![notepad tool](./docs/Final%20Screenshots/notepadtool.png)

![flashcard study mode](./docs/Final%20Screenshots/flashcardstudymode.png)

"Course Assistant" is a swiss army knife when it comes to course management that stands out from competitors by allowing task management, file management, note creation, and 
flashcard set creation all in one place.

## Installation Guide

### Prerequities: 
- git
- node
- mongodb
- hosting service(Host our application on a website, not required)


### Git Installation
- https://github.com/git-guides/install-git

### Node Installation
- https://nodejs.org/en/download/
- https://nodejs.org/en/download/package-manager/

### MongoDB Installation
##### MongoDB is the required NoSQL Database to manage our application. 
- https://www.mongodb.com/
- create an account.
- create a database. 
- click on connect and add connection IP address and create a Database user
- after doing so, select the driver to be Node.js

### Build
- Clone this repo 
```
git clone https://github.com/CharlieQLe/cs326-final-kappa
```

- go into the folder 
```
cd cs326-final-kappa
```

- create a file called `secrets.json` and add the following
```
{
    "uri": "mongodb+srv://<username>:<password>@cluster0.gofjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
}
```

- change `<username>` to the username of the user you created and change `<password>` to the password of the user you have created 
```
eg. I created a user with the name 'John' and made the password 'Doe'. Then, 

{
    "uri": "mongodb+srv://John:Doe@cluster0.gofjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
}
```

- finally, run our application in terminal
```
node index.js
```

### Hosting
To host our application, add an environment variable to your hosting service platform
with the key as `uri` and value as `mongodb+srv://<username>:<password>@cluster0.gofjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` with respect to the user you have created on MongoDB. 



