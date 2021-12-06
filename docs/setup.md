# Set up/Installation Guide

Prerequities: 
- git
- node
- mongodb
- hosting service(if you want to host our application, otherwise it is not required)

MongoDB is the required NoSQL DB needed to help host our application. If you have MongoDB setup, skip this step.
- go to `https://www.mongodb.com/` and create an account.
- creating an account, create a database. 
- click on connect and add connection IP address and create a Database user
- after doing so, select the driver to be Node.js


- Clone the repo
`git clone https://github.com/CharlieQLe/cs326-final-kappa`

- create a file called `secrets.json` and add the following
```
{
    "uri": "mongodb+srv://<user>:<password>@cluster0.gofjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
}
```
- change `<user>` to the username of the user and change `<password>` to the password of the user you have created 

- finally, enter `node index.js` at the root folder to run our application on localhost:8080

To host our application on a hosting service, add the environment variable into the hosting service
with the key as `uri` and value as `mongodb+srv://<user>:<password>@cluster0.gofjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` with respect to the user and password. 