# Blog Website

<img src="https://img.shields.io/badge/HTML-88888?style=for-the-badge&logo=html5&logoColor=white"></img> <img src="https://img.shields.io/badge/CSS-509383?&style=for-the-badge&logo=css3&logoColor=white"></img> <img src="https://img.shields.io/badge/NODE.JS-236120?style=for-the-badge&logo=node.js&logoColor=white"></img>

## Description

A Simple Blog Website where users can create as well as delete Blogs of their own.

## Features

- User Authentication
- Create and Delete Blogs
- Route Protection using Web Tokens

## Getting Started

If you do not have <b>npm</b> and <b>node</b> installed, visit :

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

https://nodejs.org/en/download/

- Clone this Repository

   ```
   $ git clone https://github.com/srijan2002/Blog-Website.git
   ```
- Install all the dependencies by running this command

   ```
   $ npm install
   ```

- Create an .env file in the main directory and fill it up with your MongoDb Atlas Credentials:

   ```
   DB = '<Your MongoDb Cluster link to connect>'
   SECRET = '<Your secret key>'
   ```

- To run the project , type the following command :
   ```
   $ nodemon blog
   ```
You have your project up and running at <b>https://localhost:3000</b>


