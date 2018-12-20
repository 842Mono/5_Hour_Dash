let Employee = require('./Models/Employee');

module.exports = 
{
    GetEmployees:() =>
    {
        Employee.find
        (
            {},
            (err, employees) =>
            {
                // return emplo
            }
        );
        return "e";
    }
}