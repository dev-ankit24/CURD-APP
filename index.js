const express = require("express")
const hbs= require("hbs")
const app = express()
const bodyParser =require("body-parser")

require("./db_connect")

const Employee = require("./model/Employee")

app.set("view engine","hbs")
app.use(express.static("./views/public"))
hbs.registerPartials("./views/partials")
app.get("",(req,res)=>{
    res.render("index")
})
app.get("/add",(req,res)=>{
    res.render("add")
})
const encoder=new bodyParser.urlencoded()
app.post("/add",encoder, async(req,res)=>{
    try {
        const data = new Employee (req.body)     // data send to Employee model 
        await data.save()
        res.redirect("/")
    } catch (error) {
        console.log(error);
        res.redirect("/")

    }
   

})
app.listen(8000,console.log("server is run: http://localhost:8000"))