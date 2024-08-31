const mongoose=require('mongoose');

const ShopSchema= new mongoose.Schema({
    shopName: {
        type:String,
        required:true
    },
    shopDescription: {
        type:String,
        required:true
    },
    primaryProduct: {
        type:String,
        required:true
    },
    contactNumber :{
        type:String,
        required:true
    },
    shopEmail : {
        type:String,
        required:true
    },
    isCreditCardAvailable:{
        type:Boolean,
        required:true
    },
    isDebittCardAvailable:{
        type:Boolean,
        required:true
    },
    isCODAvailable:{
        type:Boolean,
        required:true
    },
    createdDate:{
        type:String,
        required:true
    }

})

const Shop= mongoose.model('Shop',ShopSchema);

module.exports=Shop;