const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guserSchema = new Schema({
  email: String,

  googleId: String,

  blog: [
    {
      title: {
        type: String,
      },
      main: {
        type: String,
      },
    },
  ],
});
const User = mongoose.model("gusers", guserSchema);
module.exports = User;
