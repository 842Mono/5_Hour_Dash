let express = require('express');
let router = express.Router();

// database models
let Employee = require('./Models/Employee');
let User = require('./Models/User');
let Attendance = require('./Models/Attendance');
let Status = require('./Models/Status');

router.get('/test', (req, res) =>
{
    res.send("hello");
});

router.get('/populate', (req, res) =>
{
    let TestEmployee = new Employee
    ({
        Name:"user1",
        Email:"user1@user1.com",
        MobileNumber:"1111",
        HireDate:new Date()
    });

    TestEmployee.save(err => {if(err) console.log(err)});

    res.send("done");
});

module.exports = router;