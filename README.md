# Readme

Full stack application utilizing the PERN Stack (PostgreSQL, Express, React, Node).
JPFP is a platform listing campuses and students - allowing users to add, view, edit and delete individual campuses and students.

# Architecture for JPFP

At the highest level, JPFP is split into three parts:

- Public
- Server
- Src

## Public

The public folder holds all the code being served to the client. Including a webpack compiled bundle.js file from our server and src folders.
Server and source communicate with each other and represent our frontend and backend functionality.

## Server

The server files are written in Javascript and run on Node.js, utilizing Express routes, and Sequelize to communicate with our PostgreSQL database.

Its entry point is server/index.js, which launches our syncAndSeed function and sets our seed.js and app.js imports:

- app.js pulls together our Express routes and loads our Middleware
- seed.js holds all our seed data for the database

- server/db -- entrypoint index.js: holds our database integration, here we set our model association and export our modules for use in our api routes
- server/db/models: holds our Sequelize models for campuses and students
- server/api -- entrypoint index.js: making our API routes available, imports our routes for our student (students.js) and campus (campuses.js) endpoints

## Src

The src files are written in JavaScript, with React components, utilizing Redux and React Router libraries.
Its entry point is src/index.js.

The src folder is split into three main pieces:

- src/components -- entrypoint index.js: all front-end React components for campuses, students, home, loading and error screens
- src/features: all Redux slices exported to the store - utilizing AJAX requests to the database
- src/store -- entrypoint index.js: Redux store, importing all the Redux slices from features and making them available to our react components through our src/index.js
