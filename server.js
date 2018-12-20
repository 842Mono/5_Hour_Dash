let express = require('express');
let portal = express();
let router = require('./router');
let bodyparser = require('body-parser');

var session = require('express-session');

let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/eseedInterview");


portal.use(bodyparser.json());
portal.use(bodyparser.urlencoded({extended:false}));
portal.use(session({ resave:true, saveUninitialized:true, secret:'randomstring'}));
portal.use(router);
portal.listen(5000, function(){console.log("Serving on 5000")});