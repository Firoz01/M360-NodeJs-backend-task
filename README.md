### M360-NodeJs-backend-task

# Product Management System
This project is a NodeJS-based Product Management System with MySQL database using Query Builder Knex, Typescript, ExpressJS and REST APIs. It allows CRUD operations for categories and attributes, with the ability to nest categories and deactivate categories and their products. Products can have nested categories and attributes, and can be searched, updated, and retrieved with all their details.

# Getting Started
***

## Prerequisites

* Node.js and npm (Node Package Manager) installed on your system.

## Installation

Clone this repository and navigate to the project directory:

```
git clone https://github.com/Firoz01/M360-NodeJs-backend-task.git
cd M360-NodeJs-backend-task

```
Install the required packages using npm:
```
npm install
```

## Usage

Change with your database configuration in ENV file

Run the database migration using 
```
knex migrate:up
```

Start the server by running the following command:

```
npm run start
OR
development Mode
npm run dev

```
The server will be started at http://localhost:5000 by default. You can change the port number by setting the PORT environment variable.



Thanks
Md Firoz Mia
