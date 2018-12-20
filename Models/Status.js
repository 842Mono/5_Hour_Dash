let mongoose = require('mongoose');

let StatusSchema = mongoose.Schema
(
    {
        Type:
        {
            type:String,
            enum:['Present', 'Absent', 'Sick Leave', 'Day Off']
        }
    }
);

let Status = mongoose.model("Status", StatusSchema);

module.exports = Status;