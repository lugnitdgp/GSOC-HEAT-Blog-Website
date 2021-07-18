const express = require('express');
const _=require('lodash');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const db = "mongodb+srv://srijan:srijan2002@node.k0wc1.mongodb.net/sample?retryWrites=true&w=majority";
const blogRoutes = require('./models');
 

 
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>app.listen(3000)).catch((err)=>console.log(err));


app.use(blogRoutes);
