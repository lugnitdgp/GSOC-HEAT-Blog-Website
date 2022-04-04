const express = require('express');
const _=require('lodash');
const fs = require('fs');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./blog_routes');
const cookie = require('cookie-parser');



app.set('view engine','ejs');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>app.listen(3000)).catch((err)=>console.log(err));


app.use(blogRoutes);
