# Milestone 2

## URL

https://cs326-final-kappa.herokuapp.com/

## Project API

The user can send get/post requests to manipulate data on the server. These APIs are not finalized and may change in the future.

For manipulating the profile, a post sends the action the user wants to perform, with the corresponding data.

### JSON Objects
```
task {
    "name": "",
    "description": "",
    "class": "",
    "date": "",
    "time": ""
}

note {
    "tags": [],
    "body": ""
}

flashcards {
    "tags": [],
    "description": "",
    "flashcards": []
}

flashcard {
    "term": "",
    "definition": ""
}
```

### User

```
curl -X POST '{ "name": "John Doe", "email": "example@email.com", "password": "password" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/signup
```
Running the above sends a post request for signing up with a name, email, and password. In the final product, this will create a user if one with the same email does not exist.

```
curl -X POST '{ "email": "example@email.com", "password": "password" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/login
```
Running the above sends a post request for logging in with an email and password.

```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER
```
Running the above will retrieve the data of the specified user "USER" if the user exists. USER will likely end up as an identifier of some sort for uniqueness. This will return a JSON object that has the fields "name", "email", and other data that does not exist at the moment. 

```
curl -X POST '{ "name": "John Doe", "email": "example@email.com", "password": "password" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/edit
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
curl -X POST '{ "name": "Task Name", "Description": "Do something", "Class": "Some class", "Date": "Some date", "Time": "Some time" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/tasks/create
```
Running the above sends a post request to create a task with the specified name and description, scheduled for some time and date, and belonging to a class for the specified user.

```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/tasks/TASKID
```
Get the data of a task with the specified id for the specified user.

```
curl -X POST '{ "name": "Task Name", "Description": "Do something", "Class": "Some class", "Date": "Some date", "Time": "Some time" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/tasks/TASKID/edit
```
Running the above sends a post request to edit a task with the specified id to have the specified name, description, etc. for the specified user.

```
curl -X POST https://cs326-final-kappa.herokuapp.com/api/users/USER/tasks/TASKID/remove
```
Running the above sends a post request to remove a task with the specified id.

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
curl -X POST '{ "Description": "Do something" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/create
```
Running the above sends a post request to create a class of the specified name with a description for the specified user.

```
curl -X POST '{ "Description": "Do something" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/edit
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
curl -X POST '{ "Tags": "[]" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/notes/NOTE/create
```
Create a note.

```
curl -X POST '{ "Tags": "[]", "Body": "This is a note!" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/notes/NOTE/edit
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
Get the flashcards within a set of flashcards.

```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/description
```
Get the description of the set of flashcards.

```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/tags
```
Get the tags of the set of flashcards.

```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/TERM
```
Get the definition of the specified term within the set of flashcards.

```
curl https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/DEFINITION
```
Get the term of the specified term within the set of flashcards.

```
curl -X POST '{ "tags": "[]", "description": "" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/create
```
Create a set of flashcards with the given description and tags.

```
curl -x POST https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/remove
```
Remove a set of flashcards.

```
curl -X POST '{ "description": "" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/editDescription
```
Edit the description of the set of flashcards

```
curl -X POST '{ "tags": "[]" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/addTags
```
Add tags to the set of flashcards

```
curl -X POST '{ "tags": "[]" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/removeTags
```
Remove tags to the set of flashcards

```
curl -X POST '{ "term: "", "definition": "" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/addFlashcard
```
Add a term and definition to the set of flashcards.

```
curl -X POST '{ "term: "", "definition": "" }' -H 'Content-Type: application/json' https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/flashcards/FLASHCARD/removeFlashcard
```
Remove a term and definition to the set of flashcards.
