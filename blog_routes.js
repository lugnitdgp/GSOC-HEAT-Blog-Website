const express=require('express');
const routes=express.Router();
const Controllers=require('./Controllers/controllers');
const requireAuth = require('./Middlewares/middleware');
const checkUser = require('./Middlewares/middleware');

// routes.get('*',checkUser.checkUser);
routes.post('/blogs',requireAuth.requireAuth,Controllers.postblog);
routes.get('/blogs',requireAuth.requireAuth, checkUser.checkUser,Controllers.getblog);
routes.get('/',requireAuth.requireAuth, checkUser.checkUser,Controllers.home);
routes.get('/signup',checkUser.checkUser, Controllers.signup_get);
routes.post('/signup', Controllers.signup_post);
routes.get('/login',checkUser.checkUser, Controllers.login_get);
routes.post('/login', Controllers.login_post);
routes.get('/logout',Controllers.logout_get);
routes.get('/about',requireAuth.requireAuth,checkUser.checkUser, Controllers.about);
routes.get('/create',requireAuth.requireAuth, checkUser.checkUser,Controllers.createblog);
routes.get('/blogs/:id',requireAuth.requireAuth,checkUser.checkUser, Controllers.getid);
routes.delete('/blogs/:id',requireAuth.requireAuth,Controllers.deleteid );
routes.use(checkUser.checkUser,Controllers.Err);

module.exports=routes;