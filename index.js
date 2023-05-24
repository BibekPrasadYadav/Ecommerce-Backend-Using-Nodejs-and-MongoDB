const { error } = require("console");
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth")
const productRoute=require("./routes/product")
const orderRoute=require("./routes/order")
const cartRoute=require("./routes/cart")

const { json } = require("body-parser");
dotenv.config();
app.use(express.json())
mongoose.connect(
    process.env.MONGO_URL)
    .then(()=>console.log("DBconnection Successful")).catch((err)=>{
        console.log(err)});

        app.use("/api/users",userRoute);
        app.use("/api/auths",authRoute);
        app.use("/api/products",productRoute);
        app.use("/api/orders",orderRoute);
        app.use("/api/carts",cartRoute);
app.listen(process.env.PORT || 5000,()=>{
    console.log("Server started at port 5000")
})

