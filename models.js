const express=require('express');
const routes=express.Router();
const Blog = require('./schema.js');
const Controllers=require('./controllers');


routes.post('/blogs',Controllers.postblog);
routes.get('/blogs', Controllers.getblog);
routes.get('/', Controllers.home);
routes.get('/about', Controllers.about);
routes.get('/create', Controllers.createblog);
routes.get('/blogs/:id', Controllers.getid);
routes.delete('/blogs/:id',Controllers.deleteid );
routes.use(Controllers.Err);

module.exports=routes;