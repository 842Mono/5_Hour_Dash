let mongoose = require('mongoose');

let UserSchema = mongoose.Schema
(
    {
        Name:
        {
            type:String
        },
        Email:
        {
            type:String,
            required:true
        },
        Password:
        {
            type:String,
            required:true
        }
    }
);

let User = mongoose.model("User", UserSchema);

module.exports = User;