const express = require("express")
const hbs= require("hbs")
const app = express()
const bodyParser =require("body-parser")

const encoder=new bodyParser.urlencoded()

app.set("view engine","hbs")

app.use(express.static("./views/public"))
hbs.registerPartials("./views/partials")
app.get("",(req,res)=>{
    res.render("index")
})
app.get("/add",(req,res)=>{
    res.render("add")
})
app.post("/add",encoder,(req,res)=>{
    console.log(req.body);
    
    res.render("add")
})
app.listen(8000,console.log("server is run: http://localhost:8000"))