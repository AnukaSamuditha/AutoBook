import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../Styles/CollaborationForm.css";

export default function CollaborationForm(props) {
  const [collab, setCollab] = useState({
    collabName: "",
    sellerCount: 0,
    product: "",
    shopID: "",
    createdDate: "",
    createdSeller: "",
    discountedPrice: "",
    createdShopName:"",
    createdShop:""
  });
  const [products, setProducts] = useState([]);
  const [shopProducts, setShopProducts] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [sellerID,setSellerID]=useState(localStorage.getItem('currentSeller'));

  useEffect(() => {
    if (props.shopID) {
      Axios.get(`http://localhost:3001/get-shop/${props.shopID}`)
        .then((res) => {
          setProducts(res.data.data.shop.products);
          console.log("Shop data is fetched successfully", res.data.data);
        })
        .catch((err) => {
          console.error(
            "There was an error fetching the shop information",
            err.message
          );
        });
    }
  }, [props.shopID]);

  //console.log(products);

  useEffect(() => {
    if (products && products.length > 0) {
      Axios.post("http://localhost:3001/get-shop-products", {
        productIDs: products,
      })
        .then((res) => {
          console.log(res.data);
          setShopProducts(res.data);
        })
        .catch((err) => {
          console.error("Error fetching product documents ", err.message);
        });
    }
  }, [products]);

  function handleFormData(event) {
    setCollab((prevValue) => {
      return {
        ...prevValue,
        [event.target.name]: event.target.value,
      };
    });
  }
  function handleProductChange(event) {
    const selectedProduct = shopProducts.find(
      (product) => product._id === event.target.value
    );
    if (selectedProduct) {
      setCurrentPrice(selectedProduct.productPrice);
      setCollab((prevValue) => ({
        ...prevValue,
        product: event.target.value,
        discountedPrice: selectedProduct.productPrice,
      }));
    }
  }

  function calculateDiscount() {
    const finalProduct = shopProducts.find(
      (product) => product._id === collab.product
    );
    
    if(finalProduct){
        let discount = finalProduct.productPrice - collab.discountedPrice;
        return discount
    }
  }

  const ProductsArray = shopProducts.map((product) => (
    <option key={product._id} value={product._id}>
      {product.productName}
    </option>
  ));

  function pushCollab(collabID){
    Axios.put(`http://localhost:3001/push-collab/${sellerID}`,{collaborationID:collabID})
     .then((res)=>{
      console.log("Collab pushed successfully",res.data)
     })
     .catch((err)=>{
      console.error("Error pushing the collaboration Id!",err);
     })
  }
  
  function UpdateShop(collabID){
    Axios.put(`http://localhost:3001/push-shop-collab/${props.shopID}`,{collaborationID:collabID})
     .then((res)=>{
      console.log("Collab pushed into the shop successfully",res.data)
     })
     .catch((err)=>{
      console.error("Error pushing the collaboration Id!",err);
     })
  }

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("http://localhost:3001/create-collab", {
      collabName: collab.collabName,
      sellerCount: collab.sellerCount,
      product: collab.product,
      shopID: props.shopID,
      createdDate: new Date().toISOString(),
      createdSeller: props.sellerID,
      discountedPrice: calculateDiscount(),
      createdShop:props.shopID,
      createdShopName:props.shopName
    })
      .then((res) => {
        alert("The collaboration created successfully");
        console.log("Collab was created",res.data.data._id);
        pushCollab(res.data.data._id);
        UpdateShop(res.data.data._id);
        setCollab({
          collabName: "",
          sellerCount: 0,
          product: "",
          shopID: "",
          createdDate: "",
          createdSeller: "",
          discountedPrice: "",
        });
        props.toggleForm();
      })
      .catch((err) => {
        console.error("Error creating the collaboration request", err.message);
      });
  }

  return (
    <div className="shop--collab--form-container">
      <h4 className="collab--shop--form--title">Create a Collaboration</h4>
      <form className="shop--collab--form" onSubmit={handleSubmit}>
        <label className="shop--collab--form--label" htmlFor="collabName">
          Collab Name
        </label>
        <br />
        <input
          type="text"
          id="collabName"
          name="collabName"
          value={collab.collabName}
          onChange={handleFormData}
          className="shop--collab--form--input"
        />
        <br />

        <label className="shop--collab--form--label" htmlFor="sellerCount">
          Seller Count
        </label>
        <br />
        <input
          type="number"
          id="sellerCount"
          name="sellerCount"
          value={collab.sellerCount}
          onChange={handleFormData}
          className="shop--collab--form--input"
        />
        <br />

        <label className="shop--collab--form--label" htmlFor="products">
          Offering Product
        </label>
        <br />
        <select
          id="products"
          name="product"
          value={collab.product}
          onChange={handleProductChange}
          className="shop--collab--form--input"
        >
          <option value="">Select a product</option>
          {ProductsArray}
        </select>
        <br />

        <label className="shop--collab--form--label" htmlFor="discountedPrice">
          Discounted Price
        </label>
        <br />
        <input
          type="text"
          id="discountedPrice"
          name="discountedPrice"
          value={collab.discountedPrice}
          placeholder={currentPrice}
          onChange={handleFormData}
          className="shop--collab--form--input"
        />
        <br />

        <button type="submit" id="collab--shop--submit">
          Complete
        </button>
        <button
          type="button"
          id="collab--shop--cansel"
          onClick={props.toggleForm}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
