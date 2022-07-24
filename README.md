# Developer Connector Social Media Web App

## Introduction

Social media app that allows users to connect with other developers. Built using MongoDB, Express.js, React.js, Redux, and Node.js (MERN stack).

This project was built while taking a [Udemy](https://www.udemy.com/course/mern-stack-front-to-back/) course.

### Setup

* In the root directory, rename .env.example to .env and add your mongoURI, jwtSecret, and githubToken.


* Install dependencies

```
# Backend dependencies
npm install

# Frontend dependencies
cd client
npm install
```

### Run development environment

In the project root directory

```
npm run dev
```

### Deploy to Heroku

Setup repository

```
git init

git add .

git commit -m "initial commit"

git branch -M main
```

Create a new empty application on heroku and push code

```
heroku create

git push heroku main:master
```

Set heroku environment variables

```
heroku config:set mongoURI=YOUR_MONGO_URL

heroku config:set jwtSecret=YOUR_JWT_SECRET

heroku config:set githubToken=YOUR_GITHUB_TOKEN
```

Open application

```
heroku open
```

### Demo

https://developer-connector-mern.herokuapp.com/