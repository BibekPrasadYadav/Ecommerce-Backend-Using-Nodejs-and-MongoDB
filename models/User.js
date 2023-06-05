const mongoose=require("mongoose")


const UserSchema=new mongoose.Schema(
    {
        username:{type:String,required:true,unique:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        isAdmin:{
            type:Boolean,
            default:false,
        },
        fullname:{type:String},
        img:{type:String },
        phone:{type:Number},
        address:{type:String}

    },
    {timestamps:true}
);

module.exports=mongoose.model("User",UserSchema)