const router=require("express").Router();
const User=require("../models/User")
const CryptoJS=require("crypto-js")
const jwt=require("jsonwebtoken")

//Register
router.post("/register", async(req,res)=>{
    const newUser=new User({
        fullname:req.body.fullname,
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        img:req.body.img,
        phone:req.body.phone,
        address:req.body.address
    });

    try{
        const savedUser=await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
})

//Login
router.post("/login",async(req,res)=>{
    try{
    const user=await User.findOne({username:req.body.username});
    !user && res.status(401).json("Wrong Credential!")

    const hashedPassword=CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword=hashedPassword.toString(CryptoJS.enc.Utf8)
    originalPassword!==req.body.password && res.status(401).json("Wrong Credential!")

    //verify using JWT
     const accessToken=jwt.sign({
         id:user._id,
         isAdmin:user.isAdmin,
     },
     process.env.JWT_SEC,
     {expiresIn:"3d"}
     )
    //To hide the password while login
    const {password,...others}=user._doc;
    res.status(200).json({...others,accessToken})
    //res.status(200).json(...others)
    }catch(err){
        res.status(500).json(err)
    }
})




module.exports=router;