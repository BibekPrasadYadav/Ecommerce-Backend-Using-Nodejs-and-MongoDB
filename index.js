
const express=require("express")
const cors=require("cors")
const app=express()
app.use(cors())
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth")
const productRoute=require("./routes/product")
const orderRoute=require("./routes/order")
const cartRoute=require("./routes/cart")
const stripeRoute=require("./routes/stripe")

const bodyParser = require("body-parser");
dotenv.config();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(
    process.env.MONGO_URL)
    .then(()=>console.log("DBconnection Successful")).catch((err)=>{
        console.log(err)});

        app.use("/api/users",userRoute);
        app.use("/api/auth",authRoute);
        app.use("/api/products",productRoute);
        app.use("/api/orders",orderRoute);
        app.use("/api/carts",cartRoute);
        app.use("/api/checkout",stripeRoute)

        
       
app.listen(process.env.PORT || 5000,()=>{
    console.log("Server started at port 5000")
})

