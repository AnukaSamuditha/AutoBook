const express = require("express");
const app = express();
const { mongoose } = require("mongoose");
const cors = require("cors");
const Shop = require("./Models/ShopModel");
const { sendVerificationCode } = require("./Modules/SendEmails");
const Seller = require("./Models/SellerModel");
const multer = require("multer");
const Product = require("./Models/ProductModel");
const path = require("path");
const Order=require('./Models/OrderModel');
const Collaboration=require('./Models/Collaboration');
const { v4: uuidv4 } = require("uuid");

app.use(express.json());
app.use(cors());

const DB =
  "mongodb+srv://anukasamuditha:Anuka2000@cluster0.rsjix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((err) => {
    console.error("There was an error connecting the database", err);
  });

app.get("/api", (req, res) => {
  res.json({ message: "Hello this is from server" });
  res.end();
});

app.use('/Images/',express.static(path.join(__dirname,'Images')));

app.post("/create-shop", async (req, res) => {
  const shop = new Shop(req.body);
  try {
    await shop.save();
    res.status(201).json({
      status: "Success",
      data: {
        shop,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

app.post('/create-order',async (req,res)=>{
  const order=new Order(req.body);

  try{
    await order.save();
    res.status(200).json({
      status:"Success",
      data:{
        order
      }
    });
    
  }catch(err) {
    res.status(500).json({
      status:"Failure",
      message:err
    });
  }
});

app.post("/create-seller-account", async (req, res) => {
  const seller = new Seller(req.body);

  try {
    await seller.save();
    res.status(201).json({
      status: "Success",
      data: {
        seller,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

app.post("/create-collab",async (req,res)=>{
  
  try{
    const { collabName, sellerCount, product, shopID, createdDate, createdSeller, discountedPrice } = req.body;

    if (!mongoose.Types.ObjectId.isValid(product)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(shopID)) {
      return res.status(400).json({ error: "Invalid shop ID format" });
    }

    const productObjectID=new mongoose.Types.ObjectId(product)
    const shopObjectID=new mongoose.Types.ObjectId(shopID)

    const newCollab = new Collaboration({
      collabName,
      sellerCount,
      products: [productObjectID], 
      shopIDs:[shopObjectID],
      createdDate,
      createdSeller,
      discountedPrice
  });

  await newCollab.save();
  res.status(201).json({ message: 'Collaboration created successfully', data: newCollab });

  }catch(err){
    console.error("Error creating collaboration: ", err);
    res.status(500).json({ error: "Failed to create collaboration" });
  }

  
})

app.get("/get-shops", async (req, res) => {
  const shops = await Shop.find({});
  try {
    res.status(200).json({
      status: "Success",
      shops: {
        shops,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

app.post("/get-seller-shops", async (req, res) => {
  const { shopIDs } = req.body;

  try {
    const sellerShops = await Shop.find({ _id: { $in: shopIDs } });

    res.status(200).json(sellerShops);
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: "Error receiving seller shops",
      error: error.message,
    });
  }
});

app.post("/get-shop-orders", async (req, res) => {
  const { ordersIDs } = req.body;

  try {
    const shopOrders = await Order.find({_id: { $in: ordersIDs } });

    res.status(200).json(shopOrders);
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: "Error receiving shop Orders",
      error: error.message
    });
  }
});

app.post("/get-shop-products", async(req,res)=>{
  const {productIDs} = req.body;

  try{
    const shopProducts= await Product.find({_id :{$in:productIDs}});

    res.status(200).json(shopProducts);
  }catch(error){

    res.status(500).json({
      status:"Failure",
      message:"Failure occured in fetching product details",
      error:error.message
    });
  }
});

app.get("/find-seller/:sellerId", async (req, res) => {
  const sellerID = req.params.sellerId;

  try {
    const seller = await Seller.findById(sellerID);

    if (seller) {
      res.status(200).json({
        status: "Success",
        data: {
          seller,
        },
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Seller not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: "Seller not found",
    });
  }
});
app.get("/get-shop/:shopId", async (req, res) => {
  const shopID = req.params.shopId;

  try {
    const shop = await Shop.findById(shopID);

    if (shop) {
      res.status(200).json({
        status: "Success",
        data: {
          shop,
        },
      });
    } else {
      res.status(500).json({
        status: "Failed",
        message: "Requested shop did not found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

app.put("/update-seller/:id", async (req, res) => {
  const updatedSeller = await Seller.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  try {
    res.status(200).json({
      status: "Success",
      data: {
        updatedSeller,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: "Seller update failure occured!",
      error: err.message,
    });
  }
});

app.put("/update-shop/:shopID", async (req, res) => {
  const { productID } = req.body;
  const { shopID } = req.params;

  try {
    const updatedShop = await Shop.findByIdAndUpdate(
      shopID,
      { $push: { products: productID } },
      { new: true }
    );

    if (updatedShop) {
      res.status(200).json({
        status: "Success",
        data: {
          updatedShop,
        },
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Shop not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failure occurred in updating the shop",
      error,
    });
  }
});

app.put("/update-shop-orders/:shopID",async(req,res)=>{
  const {orders} =req.body;
  const {shopID} = req.params;

  try{
    const updatedShop= await Shop.findByIdAndUpdate(shopID,
      {$push : {orders: orders}},
      {new : true}
    );
    if (updatedShop) {
      res.status(200).json({
        status: "Success",
        data: {
          updatedShop,
        },
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Shop not found!",
      });
    }
  }catch(err){
    res.status(500).json({
      message:"Failure updating the shop with orders",
      error:err
    });
  }
});
app.put('/update-shop-data/:shopID',async (req,res)=>{
  try{
    const updatedShop=await Shop.findByIdAndUpdate(req.params.shopID,req.body,{new:true})

    if(!updatedShop){
      return res.status(404).json({
        error:'Shop not found!'
      })
    }
    res.status(200).json({
      message:"Shop updated Successfully",
      data:updatedShop
    })
  }catch(error){
    res.status(500).json({
      error:error.message
    })
  }
});
app.delete('/delete-shop/:shopID',async (req,res)=>{
  await Shop.findByIdAndDelete(req.params.shopID);

  try{
    res.status(204).json({
      status:"Success",
      data:{}
    })
  }catch(err){
    res.status(500).json({
      status:'Failed',
      error:err
    })
  }
})

app.post("/send-verification-email", (req, res) => {
  const { email } = req.body;

  try {
    const OTPCode = sendVerificationCode(email);

    res.json({ otpCode: OTPCode });
  } catch (error) {
    res.status(500).json({ message: "Error sending email" });
  }
});

//Storing the image files in the backend
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

app.post("/add-product", upload.single("productImage"), async (req, res) => {
  const productName = req.body.productName;
  const productCategory = req.body.productCategory;
  const productPrice = req.body.productPrice;
  const productDescription = req.body.productDescription;
  const productCountry = req.body.productCountry;
  const productBrand = req.body.productBrand;
  const productQuantity = req.body.productQuantity;
  const productImage = req.file.filename;
  const productAddedDate = req.body.productAddedDate;

  const newProductData = {
    productName,
    productCategory,
    productPrice,
    productDescription,
    productCountry,
    productBrand,
    productQuantity,
    productImage,
    productAddedDate,
  };

  const newProduct = new Product(newProductData);

  try {
    await newProduct.save();
    res.status(201).json({
      status: "Success",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "Failure occured in product adding!",
      error: err.message,
    });
  }
});

app.listen(3001, () => {
  console.log("Server is listening...");
});
