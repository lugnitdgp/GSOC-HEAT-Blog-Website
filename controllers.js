const Blog = require('./schema.js');
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
const Err = (req,res)=>{
    res.status(404).render('404',{title:'Error'});
}

module.exports={
    home,postblog,getblog,about,createblog,getid,deleteid,Err
}