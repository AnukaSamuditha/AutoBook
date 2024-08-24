const express=require('express');
const app=express();
const {mongoose}=require('mongoose');
const cors=require('cors');

app.use(express.json());
app.use(cors());

app.get("/api",(req,res)=>{
    res.json({message:"Hello this is from server"});
    res.end();
})
app.listen(3001,()=>{
    console.log("Server is listening...");
})