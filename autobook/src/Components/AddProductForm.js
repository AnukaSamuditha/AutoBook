import React,{useState,useEffect} from "react";
import "../Styles/AddProductForm.css";
import Axios from 'axios';



export default function AddProductForm() {

    const [product,setProduct]=useState({
        productName:"",
        productCategory:"",
        productPrice:0,
        productDescription:"",
        productCountry:"",
        productBrand:"",
        productQuantity:0,
        productImage:"",
        productAddedDate:""
    })
    
    function handleChange(event){
        const{name,value,type}=event.target;
        setProduct((prevData)=>{

                return{
                    ...prevData,
                [name]:value
                }
        })
    }
    function handlePhoto(event){
        setProduct((prevData)=>{
            return{
                ...prevData,
                productImage:event.target.files[0]
            }
        })
        console.log(product.productImage)
    }
    function handleSubmit(event){
        event.preventDefault();

        const formData=new FormData();
        formData.append("productName",product.productName);
        formData.append("productCategory",product.productCategory);
        formData.append("productPrice",product.productPrice);
        formData.append("productDescription",product.productDescription);
        formData.append("productCountry",product.productCountry);
        formData.append("productBrand",product.productBrand);
        formData.append("productQuantity",product.productQuantity);
        formData.append("productImage",product.productImage);
        formData.append("productAddedDate",new Date());

        Axios.post("http://localhost:3001/add-product",formData)
         .then((res)=>{
            
         })
    }
  return (
    <div className="add--product--form--holder">
      <div className="add--product--form--container">
        <div className="banner--heading--holder">
          <h5 className="banner--heading">Add Product</h5>
        </div>
        <form className="add--product--form">
          <label htmlFor="productName" className="add--product--label">Product Name:</label>
          <br />
          <input 
          type="text" 
          name="productName" 
          className="add-product-input" 
          placeholder="Enter product name"
          onChange={handleChange}
          value={product.productName}
          />
          <br />
          <label htmlFor="productCategory" className="add--product--label">
            Product Category
          </label>
          <br />
          <select
            id="productCategory"
            name="productCategory"
            className="product--category--selector"
            onSubmit={handleChange}
            value={product.productCategory}
          >
            <option value="">--Select the product category--</option>
            <option value="EngineParts">Engine Parts</option>
            <option value="Tires">Tires</option>
            <option value="Batteries">Batteries</option>
            <option value="Bodykit">Body Kit</option>
            <option value="Other">Other</option>
          </select>
          <br />
          <label htmlFor="productPrice" className="add--product--label">
            Product price
          </label>
          <br />
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            className="add-product-input"
            placeholder="Enter product price"
            onChange={handleChange}
            value={product.productPrice}
          />
          <br />
          <label htmlFor="productDescription" className="add--product--label">
            Product description
          </label>
          <br />
          <input
            type="text"
            id="productDescription"
            name="productDescription"
            className="add-product-input"
            placeholder="Briefly describe your product here."
            onChange={handleChange}
            value={product.productDescription}
          />
          <br />
          <label htmlFor="productCountry" className="add--product--label">
            Made in country
          </label>
          <br />
          <input
            type="text"
            id="productCountry"
            name="productCountry"
            className="add-product-input"
            placeholder="Enter product made in country"
            onChange={handleChange}
            value={product.productCountry}
          />
          <br />
          <label htmlFor="productBrand" className="add--product--label">
            Product brand
          </label>
          <br />
          <input
            type="text"
            name="productBrand"
            className="add-product-input"
            placeholder="Enter the product brand here"
            onChange={handleChange}
            value={product.productBrand}
          />
          <br />
          <label htmlFor="productQuantity" className="add--product--label">
            Product Quantity
          </label>
          <br />
          <input
            type="number"
            name="productQuantity"
            className="add-product-input"
            placeholder="Enter the product quantity"
            onChange={handleChange}
            value={product.productQuantity}
          />
          <label htmlFor="add--product--image" id="add--product--label--image">
          <input 
           type="file"
           name="productImage"
           id="add--product--image"
           onChange={handlePhoto}
           accept=".png, .jpg, .jpeg"

           />Upload Product Images</label><br/>
           <button type="submit" id="add--product--form--submit">Complete</button>
        </form>
      </div>
      <div className="add--product--banner--container">
        <img src={require('../Images/porche--background.jpeg')} alt="addProductBanner" className="addProductBanner"/>
      </div>
    </div>
  );
}
