const mongoose=require('mongoose');

const SellerSchema = new mongoose.Schema({
    sellerName:{
        type:String,
        required:true
    },
    sellerPassword:{
        type:String,
        required:true
    },
    sellerEmail:{
        type:String,
        required:true
    },
    createdDate:{
        type:String,
        required:true
    },
    shopIDs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shop',
        default:[]
    }],
    collaborations:[{
        type:mongoose.Schema.ObjectId,
        ref:'Collaboration',
        default:[]

    }]
})

const Seller=mongoose.model('Seller',SellerSchema);
module.exports=Seller;