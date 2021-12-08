# Set up/Installation Guide

## Prerequities: 
- git
- node
- mongodb
- hosting service(Host our application on a website, not required)


## Git Installation
- https://github.com/git-guides/install-git

## Node Installation
- https://nodejs.org/en/download/
- https://nodejs.org/en/download/package-manager/

## MongoDB Installation
#### MongoDB is the required NoSQL Database to manage our application. 
- https://www.mongodb.com/
- create an account.
- create a database. 
- click on connect and add connection IP address and create a Database user
- after doing so, select the driver to be Node.js




## Build
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

## Hosting
To host our application, add an environment variable to your hosting service platform
with the key as `uri` and value as `mongodb+srv://<username>:<password>@cluster0.gofjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` with respect to the user you have created on MongoDB. 
