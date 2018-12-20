let express = require('express');
let router = express.Router();

// database models
let Employee = require('./Models/Employee');
let User = require('./Models/User');
let Attendance = require('./Models/Attendance');
let Status = require('./Models/Status');

let controller = require("./controller");

router.post('/plainlogin', (req, res) =>
{
    console.log(req.body.usernamein);
    console.log(req.body.passwordin);
    
    User.findOne
    (
        {Name:req.body.usernamein, Password:req.body.passwordin},
        (err, user) =>
        {
            console.log(user);
            if(err || user == null)
                res.sendFile("/Views/index.html", {root: __dirname });
            else
            {
                res.send("success");
            }
        }
    );
});

router.get('/', (req, res) =>
{
    res.sendFile("/Views/index.html", {root: __dirname });
});

router.get('/test', (req, res) =>
{
    res.send("working");
});

router.get('/populate', (req, res) =>
{
    // let TestEmployee = new Employee
    // ({
    //     Name:"user1",
    //     Email:"user1@user1.com",
    //     MobileNumber:"1111",
    //     HireDate:new Date()
    // });

    // TestEmployee.save(err => {if(err) console.log(err)});

    let TestUser = new User
    ({
        Name:"U1",
        Email:"U1@U1.U1",
        Password:"passU1"
    });

    TestUser.save(err => {if(err) console.log(err)});

    res.send("done");
});

router.get('/testsession', function(req, res)
{
    console.log(res.session);
    console.log(req.session);
    // res.send(req.session);
    // if(req.session)
    //     console.log(req.session.test);
    if(!req.session || req.session.test == null)
        req.session.test = 0
    else
        req.session.test = parseInt(req.session.test) + 1;
    res.send(req.session);
});

module.exports = router;