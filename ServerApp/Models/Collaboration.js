const mongoose=require('mongoose');

const CollabSchema=new mongoose.Schema({
    collabName:{
        type:String,
        required:true
    },
    sellerCount:{
        type:Number,
        required:true
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        default:[]
    }],
    shopIDs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shop',
        default:[]
    }],
    createdDate:{
        type:String,
        required:true
    },
    createdSeller:{
        type:String,
        required:true
    },
    discountedPrice:{
        type:Number,
        required:true
    },
    createdShop:{
        type:String,
        required:true
    },
    createdShopName:{
        type:String,
        required:true
    }
})

const Collaboration=mongoose.model('Collaboration',CollabSchema)

module.exports=Collaboration;