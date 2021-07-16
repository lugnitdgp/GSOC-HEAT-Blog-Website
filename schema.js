const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    main:{
        type:String,
        required:true
    },
     
},
    {timestamps:true
    }
);

const Blog=mongoose.model('users',blogSchema);
module.exports=Blog;