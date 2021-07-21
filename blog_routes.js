const express=require('express');
const routes=express.Router();
const Blog = require('./Blog_Models/model.js');
const Controllers=require('./Controllers/controllers');


routes.post('/blogs',Controllers.postblog);
routes.get('/blogs', Controllers.getblog);
routes.get('/', Controllers.home);
routes.get('/signup', Controllers.signup_get);
routes.post('/signup', Controllers.signup_post);
routes.get('/login', Controllers.login_get);
routes.post('/login', Controllers.login_post);
routes.get('/about', Controllers.about);
routes.get('/create', Controllers.createblog);
routes.get('/blogs/:id', Controllers.getid);
routes.delete('/blogs/:id',Controllers.deleteid );
routes.use(Controllers.Err);

module.exports=routes;