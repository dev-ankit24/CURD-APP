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

// search  features
app.get("/search",async(req,res)=>{
   try {
    let search= req.query.search
    const data= await Employee.find({
        $or:[
            {name:{$regex: `/*${search}/*`, $options:"i"}},
            {email:{$regex: `/*${search}/*`,$options:"i"}},
            {city:{$regex: `/*${search}/*`,$options:"i"}},
            {state:{$regex: `/*${search}/*`,$options:"i"}},
            {designation:{$regex: `/*${search}/*`,$options:"i"}}
        ]
    }).sort({_id:1})
    res.render("index",{data:data})
   } catch (error) {
    console.log(error);
    res.render("index",{data:[]})
   }
})

// Add  or validation database
const encoder=new bodyParser.urlencoded()
app.post("/add",encoder, async(req,res)=>{
    try {
        var data = new Employee (req.body)     // data send to Employee model 
        await data.save()
        res.redirect("/")
    } catch (error) {
        console.log(error,data);
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

// delete database
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

// edit database
app.get("/edit/:_id",async(req,res)=>{
   try {
    let data =await Employee.findOne({_id:req.params._id})
    res.render("edit",{errorMessage:{},data:data})
   } catch (error) {
      console.log(error);
       res.redirect("/")
   }
})

app.post("/edit/:_id",encoder,async(req,res)=>{
    try {
    var data= await Employee.findOne({_id:req.params._id})
    data.name=req.body.name ?? data.name
    data.email=req.body.email ?? data.email
    data.phone=req.body.phone ?? data.phone
    data.designation=req.body.designation ?? data.designation
    data.salary=req.body.salary ?? data.salary
    data.city=req.body.city ?? data.city
    data.state=req.body.state ?? data.state
    await data.save()
    res.redirect("/")
    } catch (error) {
        console.log(error);
        errorMessage={}
        error.errors.name?errorMessage["name"]=error.errors.name.message :""
        error.errors.email?errorMessage["email"]=error.errors.email.message :""
        error.errors.phone?errorMessage["phone"]=error.errors.phone.message :""
        error.errors.designation?errorMessage["designation"]=error.errors.designation.message :""
        error.errors.salary?errorMessage["salary"]=error.errors.salary.message :""
        error.errors.city?errorMessage["city"]=error.errors.city.message:""
        error.errors.state?errorMessage["state"]=error.errors.state.message:""
        res.render("edit",{errorMessage:errorMessage, data:data})
    }
    
})

app.listen(8000,console.log("server is run: http://localhost:8000"))