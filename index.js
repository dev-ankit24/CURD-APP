const express = require("express")
const hbs= require("hbs")
const app = express()
const bodyParser =require("body-parser")

require("./db_connect")

const Employee = require("./model/Employee")

app.set("view engine","hbs")
app.use(express.static("./views/public"))
hbs.registerPartials("./views/partials")
app.get("",async(req,res)=>{
    try {
        const data = await Employee.find().sort({_id:-1})
        res.render("index",{data:data})
    } catch (error) {
        res.render("index",{data:[]})
    }
})
app.get("/add",(req,res)=>{
    res.render("add",{error:{}, data:{}})
})
const encoder=new bodyParser.urlencoded()
app.post("/add",encoder, async(req,res)=>{
    try {
        var data = new Employee (req.body)     // data send to Employee model 
        await data.save()
        res.redirect("/")
    } catch (error) {
        console.log(error);
        errorMessage={}
        error.errors.name ?(errorMessage["name"]=error.errors.name.message):""
        error.errors.email? (errorMessage["email"]=error.errors.email.message):""
        error.errors.phone? (errorMessage["phone"]=error.errors.phone.message):""
        error.errors.designation? (errorMessage["designation"]=error.errors.designation.message):""
        error.errors.salary? (errorMessage["salary"]=error.errors.salary.message):""
        error.errors.city?(errorMessage["city"]=error.errors.city.message):""
        error.errors.state?(errorMessage["state"]=error.errors.state.message):""
        res.render("add",{errorMessage:errorMessage, data:data})

    }
})

app.get("/delete/:_id",async(req,res)=>{
    try {
        const data= await Employee.findOne({_id:req.params._id})
        await data.deleteOne()
        res.redirect("/")
    } catch (error) {
        console.log(error);
        res.redirect("/")
        
    }
})

app.listen(8000,console.log("server is run: http://localhost:8000"))