import React,{useState,useEffect} from "react";
import "../Styles/AddProductForm.css";
import Axios from 'axios';


export default function AddProductForm(props) {

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
    const[shopID,setShopID]=useState("");

    useEffect(()=>{

      setShopID(props.shopId);

    },[props.shopId])
    
    function handleChange(event){
        const{name,value,type}=event.target;
        setProduct((prevData)=>{

                return{
                    ...prevData,
                [name]:value
                }
        })
    }
    function updateShop(productID){
       Axios.put(`http://localhost:3001/update-shop/${shopID}`,{
        productID:productID
       })
       .then((res)=>{

         console.log("The new product added successfully",res.data);

       }).catch((err)=>{

        console.error("Failure occured in adding the new product!",err.message);

       })
    }
    function handlePhoto(event){
        setProduct((prevData)=>{
            return{
                ...prevData,
                productImage:event.target.files[0]
            }
        })
        console.log(event.target.files[0]);
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
            console.log("New Product stored successfully",res.data.data);
            updateShop(res.data.data.newProduct._id)
            window.alert("The product added successfully");

         }).catch((err)=>{
          console.error("Failure occured in product storing!",err.error);
         })

         setProduct(({
          productName:"",
          productCategory:"",
          productPrice:0,
          productDescription:"",
          productCountry:"",
          productBrand:"",
          productQuantity:0,
          productImage:"",
          productAddedDate:""
         }));

    }

  return (
    <div className="add--product--form--holder">
      <div className="add--product--form--container">
        <div className="banner--heading--holder">
          <h5 className="banner--heading">Add Product</h5>
        </div>
        <form className="add--product--form" onSubmit={handleSubmit} encType="multipart/form-data">
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
            onChange={handleChange}
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
        <img src={require('../Images/xmark-circle-white.svg').default} alt="form--closer" className="closer--sign" onClick={props.toggleForm}/>
        <img src={require('../Images/porche--background.jpeg')} alt="addProductBanner" className="addProductBanner"/>
      </div>
    </div>
  );
}
