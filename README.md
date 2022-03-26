# Blog Website

![HTML](https://user-images.githubusercontent.com/77445478/160245689-28c5d97a-ba04-45d7-9075-9747f4f16ede.svg) ![CSS](https://user-images.githubusercontent.com/77445478/160245751-77fbeb30-b66d-4cfb-b298-d2943bda5121.svg) ![Node.js](https://user-images.githubusercontent.com/77445478/160245726-365ee7ba-5e86-490c-b028-e554b32ce855.svg) 


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


