require('dotenv').config()

const router=require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY)
//const stripe=require("stripe")(process.env.STRIPE_KEY);
// router.post("/payment",async (req,res)=>{
//     await stripe.payIntents.create({
//         source:req.body.tokenId,
//         amount:req.body.amount,
//         currency:"usd",
//     },(stripeErr,stripeRes)=>{ 
//         if(stripeErr){
//             res.status(500).json(stripeErr)
//         }else{
//             res.status(200).json(stripeRes)
//         }
//     })
// })

router.post('/payment',async(req,res,next)=>{
    let paymentMethod=await stripe.paymentMethods.create({
        type:'card',
        card:{
            number:'4242424242424242',
            exp_month:9,
            exp_year:2024,
            cvc:'314',
        }
    })
    paymentIntent=await stripe.paymentIntents.create({
        payment_method:paymentMethod.id,
        amount:500,
        currency:'inr',
        confirm:true,
        payment_method_types:['card']
    })
    res.send(paymentIntent)
})



module.exports=router;
