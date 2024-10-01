const mongoose =require('mongoose');

const OrderSchema=new mongoose.Schema({
    cardName:{
        type:String,
        required:false
    },
    cardNumber:{
        type:String,
        required:false,
    },
    cardExpireDate:{
        type:String,
        required:false
    },
    cvcNumber:{
        type:String,
        required:false
    },
    billingAddress:{
        type:String,
        required:true
    },
    postalCode:{
        type:String,
        required:true
    },
    discountCode:{
        type:String,
        required:false
    },
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        default:""
    },
    userID:{
        type:String,
        required:true
    },
    shopID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shop',
        default:""
    },
    productPrice:{
        type:Number,
        required:true
    },
    discount:{
        type:String,
        required:false
    },
    orderDate:{
        type:String,
        required:true
    },
    orderStatus:{
        type:String,
        required:true
    }


})

const Order=mongoose.model('Order',OrderSchema)
module.exports=Order;