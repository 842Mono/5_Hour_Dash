let mongoose = require('mongoose');

let AttendanceSchema = mongoose.Schema
(
    {
        DayDate:
        {
            type:Date,
            required:true
        },
        WorkingHours:
        {
            type:Number,
            default:0
        },
        Employee:{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
        Status:{type: mongoose.Schema.Types.ObjectId, ref: 'Status'}
    }
);

let Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;