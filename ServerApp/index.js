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
