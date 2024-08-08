const mongoose = require("mongoose")

const EmployeeSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name Field is Mendatory"]
    },
    email:{
        type:String,
        required:[true, "Email Field is Mendatory"]
    },
    phone:{
        type:Number,
        required:[true, "Phone Number Field is Mendatory"]
    },
    designation:{
        type:String,
        required:[true, "Desiganation  Field is Mendatory" ]
    },
    salary:{
        type:Number,
        required:[true, "Salary  Field is Mendatory"]
    },
    city:{
        type:String
    },
    state:{
        type:String
    }
})

const Employee =new mongoose.model("Employee", EmployeeSchema)
// Employee : Employee Ek model hai. or Employee.js file ek module hai

module.exports=Employee
