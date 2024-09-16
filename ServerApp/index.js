const express=require('express');
const app=express();
const {mongoose}=require('mongoose');
const cors=require('cors');
const Shop =require('./Models/ShopModel');
const {sendVerificationCode} =require('./Modules/SendEmails');

app.use(express.json());
app.use(cors());

const DB="mongodb+srv://anukasamuditha:Anuka2000@cluster0.rsjix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database is connected successfully");
}).catch((err)=>{
    console.error("There was an error connecting the database",err);
})

app.get("/api",(req,res)=>{
    res.json({message:"Hello this is from server"});
    res.end();
})

app.post('/create-shop',async(req,res)=>{
    const shop=new Shop(req.body);
    try{
        await shop.save();
        res.status(201).json({
            status:'Success',
            data: {
                shop
            }
        })
    }catch(err){
        res.status(500).json({
            status:'Failed',
            message:err
        })
    }

})
app.get('/get-shops',async(req,res)=>{
    const shops=await Shop.find({})
    try{
        res.status(200).json({
            status:'Success',
            shops:{
                shops
            }
        })
    }catch(err){
        res.status(500).json({
            status:'Failed',
            message:err
        })
    }
})

app.post('/send-verification-email',(req,res)=>{
    const {email} =req.body;

    try{
        const OTPCode=sendVerificationCode(email);

        res.json({otpCode:OTPCode});
    }
    catch(error){
        res.status(500).json({message:"Error sending email"});
    }
})

app.listen(3001,()=>{
    console.log("Server is listening...");
})