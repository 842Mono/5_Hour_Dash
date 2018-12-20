let express = require('express');
let router = express.Router();

// database models
let Employee = require('./Models/Employee');
let User = require('./Models/User');
let Attendance = require('./Models/Attendance');
let Status = require('./Models/Status');

let controller = require("./controller");

router.post('/edit', (req, res) =>
{
    // console.log(req.body);

    if(req.body.edit)
    {
        let newName = req.body["ename" + req.body.edit];
        let newEmail = req.body["eemail" + req.body.edit];
        let newMobileNumber = req.body["emobile" + req.body.edit];
        let newHireDate = req.body["eyear" + req.body.edit];

        Employee.update
        (
            {_id:req.body.edit},
            {
                Name:newName,
                Email:newEmail,
                MobileNumber:newMobileNumber,
                HireDate:newHireDate
            },
            (err, result) =>
            {
                console.log(result);
                CreateAndSendUserTemplate(res);
            }
        );
    }
    else if(req.body.delete)
    {
        Employee.remove
        (
            {_id:req.body.delete},
            (err, done) =>
            {
                if(err)
                    console.log(err);
                
                CreateAndSendUserTemplate(res);
            }
        );
    }
    else if(req.body.view)
    {
        Attendance.find
        (
            {_id:req.body.view},
            (err, attendanceObjects) =>
            {
                if(err)
                    console.log(err);

                res.send(attendanceObjects);
            }
        );
    }
});

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
                CreateAndSendUserTemplate(res);
                // res.send(controller.GetEmployees());
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

router.get('/populateattendance', (req, res) =>
{
    
});

router.post('/addemployee', (req, res) =>
{
    console.log("hena")
    console.log(req.body);

    let NewEmployee = new Employee
    ({
        Name:req.body.newname,
        Email:req.body.newemail,
        MobileNumber:req.body.newmobile,
        HireDate:req.body.newhiredate
    });

    NewEmployee.save(err =>
    {
        CreateAndSendUserTemplate(res);
        if(err) console.log(err)
    });

    

    // Employee.insert
    // (
    //     {
    //         Name:req.body.newname,
    //         Email:req.body.newemail,
    //         Mobile:req.body.newmobile,
    //         HireDate:req.body.newhiredate
    //     },
    //     (err, result) =>
    //     {
    //         if(err)
    //             console.log(err);
    //         console.log(result);
    //         CreateAndSendUserTemplate(res);
    //     }
    // );
});

module.exports = router;

let CreateAndSendUserTemplate = res =>
{
    Employee.find
    (
        {},
        (err, employees) =>
        {
            if(err)
                console.log(err);
            // res.send(employees);

            let Template = `<html>
            <head>
                <title>User Page</title>
            </head>
            <body>
                Welcome to the user page.
        
                <br/>
                <br/>
                Employees:
                <form action="/edit" method="POST">
                <table style="width:100%; border: 1px solid black;">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile Phone</th>
                      <th>Hire Date</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      <th>View Attendance</th>
                    </tr>`;
            
            for(let i = 0; i < employees.length; ++i)
            {
                let dt = new Date(employees[i].HireDate);
                let m = parseInt(dt.getMonth());
                let day = parseInt(dt.getDay());
                let year  = parseInt(dt.getFullYear());
                Template += `            <tr>
                <td><input name="ename${employees[i]._id}" type="text" value="${employees[i].Name}"></td>
                <td><input name="eemail${employees[i]._id}" type="text" value="${employees[i].Email}"></td> 
                <td><input name="emobile${employees[i]._id}" type="text" value="${employees[i].MobileNumber}"></td>
                <td><input name="eyear${employees[i]._id}" type="date" value="${year}-${m}-${day}"></td>
                <td><button name="edit" type="submit" value="${employees[i]._id}">Edit</button></td>
                <td><button name="delete" type="submit" value="${employees[i]._id}">Delete</button></td>
                <td><button name="view" type="submit" value="${employees[i]._id}">View</button></td>
              </tr>`;
            }

            Template += `</form>         <form action="/addemployee" method="POST">
            Name: <input type="text" name="newname"><br/>
            Email: <input type="text" name="newemail"><br/>
            Mobile: <input type="text" name="newmobile"><br/>
            Hire Date: <input type="text" name="newhiredate"><br/>
            <button type="submit">Add</button>
        </form>`;
        
            Template += `         </table>
            </body>
        </html>`
        
            res.send(Template);
        }
    );
}