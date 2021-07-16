const express = require('express');
const _=require('lodash');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const db = "mongodb+srv://srijan:srijan2002@node.k0wc1.mongodb.net/sample?retryWrites=true&w=majority";
const Blog = require('./schema.js');
 

 
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>app.listen(3000)).catch((err)=>console.log(err));

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);
    blog.save().then((result)=>{res.redirect('/blogs');}).catch((err)=>{console.log(err);})
});
app.get('/blogs',(req,res)=>{
    Blog.find().then((result)=>{res.render('view-blogs',{title:'Blogs', data:result})}).catch((err)=>{console.log(err);})
});


app.get('/',(req,res)=>{
res.render('index',{title:'Home'});
});
app.get('/about',(req,res)=>{
    res.render('about',{title:'About Us'});
    });
app.get('/create',(req,res)=>{
    res.render('create',{title:'Create Blog'});
    });
app.get('/blogs/:id',(req,res)=>{
    const id=req.params.id;
    Blog.findById(id).then((result)=>{res.render('details',{title:'Blog Details', data:result})}).catch((err)=>{console.log(err);})
    });
app.delete('/blogs/:id',(req,res)=>{
const id=req.params.id;
Blog.findByIdAndDelete(id).then((result)=>{
    res.json({redirect:'/blogs'})
})
});
app.use((req,res)=>{
    res.status(404).render('404',{title:'Error'});
});

