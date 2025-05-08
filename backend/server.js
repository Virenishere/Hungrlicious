const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const connectCloudinary = require("./config/cloudinary.js");
const foodRouter = require("./routes/foodRoute.js");
require("dotenv").config();


//app configuration
const app = express();
const PORT = 3000;

//Middlewares
app.use(express.json())
app.use(cors());


// DB connection
connectDB();
connectCloudinary();

// API endpoints
app.use("/api/food" , foodRouter);

app.get("/", (req,res)=>{
    res.send("API Working")
})

// Start the server
app.listen(PORT, ()=>{
    console.log(`Server Started on http://localhost:${PORT}`);  
})
