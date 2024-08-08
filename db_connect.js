const mongoose= require("mongoose")

// *** first type connect database
// mongoose.connect("mongodb://localhost:27017/Employee")
// .then(()=>{
//     console.log("Database is connect");
// }) 
// .catch((error)=>{
//    console.log(error)
// })

// **** Second type connect database

async function getConnect(){
    try {
        await mongoose.connect("mongodb://localhost:27017/Employee")
        console.log("connect");
        
    } catch (error) {
        console.log(error);
    }
}
getConnect()