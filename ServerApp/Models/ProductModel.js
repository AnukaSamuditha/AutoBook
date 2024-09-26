

const mongoose=require('mongoose');

const ProductSchema = new mongoose.Schema({

    productName:{
        type:String,
        required:true
    },
    productCategory:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDescription:{
        type:String,
        requried:true
    },
    productCountry:{
        type:String,
        required:true
    },
    productBrand:{
        type:String,
        required:true
    }
    ,
    productQuantity:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    productAddedDate:{
        type:String,
        required:true
    }
})

const Product=mongoose.model('Product',ProductSchema);

module.exports=Product;