let express = require('express');
let app = express();
let router = require('./router');

let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/eseedInterview");


app.use('/api', router);
app.listen(5000, function(){console.log("Serving on 5000")});