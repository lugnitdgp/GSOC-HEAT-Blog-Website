const express = require('express');
const _=require('lodash');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
 
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(morgan('dev'));

app.listen(3000);
app.get('/',(req,res)=>{
res.render('index',{title:'Home'});
});
app.get('/about',(req,res)=>{
    res.render('about',{title:'About Us'});
    });
app.use((req,res)=>{
    res.status(404).render('404',{title:'Error'});
});

