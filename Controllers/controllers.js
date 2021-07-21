const Blog = require('../Blog_Models/model.js');
const User = require('../Blog_Models/user.js');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const bcrypt =require('bcrypt');
const maxAge= 24*3*60*60;

const createToken = (id)=>{
    return jwt.sign({id},'i drink and i know things', {
     expiresIn:maxAge
    });
}

const handle = (err)=>{
    let error = {email:'',password:''};
    if(err.message==='*Email not registered'){
        error.email=err.message;
    }
    if(err.message==='*Incorrect Password'){
        error.password=err.message;
    }   
    if(err.code===11000){
        error.email="*Already Taken";
        return error;
    }
     if(err.message.includes('users validation failed')){
       Object.values(err.errors).forEach(({properties})=>{
        error[properties.path]=properties.message;
       });
     }
     return error;
}


const home = (req,res)=>{
    res.render('index',{title:'Home'});
}
const postblog = (req,res)=>{
    const blog = new Blog(req.body);
    blog.save().then((result)=>{res.redirect('/blogs');}).catch((err)=>{console.log(err);})
}
const getblog = (req,res)=>{
    Blog.find().then((result)=>{res.render('view-blogs',{title:'Blogs', data:result})}).catch((err)=>{console.log(err);})
}
const about = (req,res)=>{
    res.render('about',{title:'About Us'});
}
const createblog = (req,res)=>{
    res.render('create',{title:'Create Blog'});
}
const getid = (req,res)=>{
    const id=req.params.id;
    Blog.findById(id).then((result)=>{res.render('details',{title:'Blog Details', data:result})}).catch((err)=>{console.log(err);})
}
const deleteid = (req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id).then((result)=>{
        res.json({redirect:'/blogs'})
    })
}
const signup_get = (req,res)=>{
    res.render('signup',{title:'Sign-Up'});
}
const signup_post = async(req,res)=>{
    const {email,password}=req.body;
       
    try{
        const user = await User.create({email,password});
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:1000*maxAge});
        res.status(201).json({user:user._id});
    }catch(err){
        const errors=handle(err);
        res.status(400).json({errors});
}
    }
    
const login_get = (req,res)=>{
    res.render('login',{title:'Login'});
}

const login_post = async (req,res)=>{
const{email,password}=req.body;
try{
    const user = await User.login(email,password);

    const token = createToken(user._id);
    res.cookie('jwt',token,{httpOnly:true,maxAge:1000*maxAge});
    res.status(200).json({user:user._id});
}
catch(err){
    const errors=handle(err);
    res.status(400).json({errors});
} 
}
const Err = (req,res)=>{
    res.status(404).render('404',{title:'Error'});
}

module.exports={
    home,postblog,getblog,about,createblog,getid,deleteid,Err,signup_get,login_get,signup_post,login_post
}