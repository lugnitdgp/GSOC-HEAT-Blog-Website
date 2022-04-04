const User = require("../Blog_Models/guser.js");


const home = (req,res) =>{
    res.render("index", { title: "Home" });
}

const about = (req, res) => {
  res.render("about", { title: "About Us" });
};

const getBlog = (req,res) =>{
    User.findById(req.user._id)
      .then((result) => {
        res.render("view-blogs", { title: "Blogs", data: result.blog });
      })
      .catch((err) => {
        console.log(err);
      });
}

const postBlog = async (req,res) =>{
    const { title, main } = req.body;
    const blog = { title: title, main: main };
    let user = await User.findById(req.user._id);
      User.updateOne(
        {
          email: user.email,
        },
        {
          $push: { blog: blog },
        }
      )
        .then((result) => {
          res.redirect("/guser/blogs");
        })
        .catch((err) => {
          console.log(err);
        });
}
const createblog = (req, res) => {
  res.render("create", { title: "Create Blog" });
};
const getId = (req,res) => {
    const id = req.params.id;
    const query = User.findOne({ _id: req.user._id });
    query.select("blog -_id");
    query.exec(function (err, data) {
      let i = 0;
      for (i = 0; i < data.blog.length; i++) {
        if (data.blog[i]._id == id) {
          break;
        }
      }
      res.render("details", { title: "Blog Details", data: data.blog[i] });
    });
}
const deleteId = (req,res) =>{
    const id = req.params.id;
    User.findByIdAndUpdate(
      req.user._id,
      { $pull: { blog: { _id: id } } },
      function (err, node) {
        if (err) {
          console.log(err);
        }
        res.json({ redirect: "/guser/blogs" });
        //res.redirect("/guser/blogs");
      }
    );
}

module.exports = {home,about,getBlog,postBlog,createblog,getId,deleteId};
