let mongoose = require('mongoose');

let EmployeeSchema = mongoose.Schema
(
    {
        Name:
        {
            type:String,
            required:true
        },
        Email:
        {
            type:String,
            required:true
        },
        MobileNumber:
        {
            type:String,
            required:true
        },
        // MobileNumbers:
        // [
        //     {
        //         MobileNumber:
        //         {
        //             type:String
        //         }
        //     }
        // ],
        HireDate:
        {
            type:Date,
            required:true
        }
    }
);

let Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;