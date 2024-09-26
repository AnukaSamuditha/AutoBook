import React ,{useState,useEffect,useRef}from 'react';
import Axios from 'axios';
import ProductCard from './ProductCard';
import '../Styles/productDashboard.css';

export default function ProductDashboard(props){

    const[products,setProducts]=useState([]);
    const[shopProducts,setShopProducts]=useState([]);


    useEffect(()=>{
        if(props.shopID){
            Axios.get(`http://localhost:3001/get-shop/${props.shopID}`)
         .then((res)=>{
            setProducts(res.data.data.shop.products);
            console.log("Shop data is fetched successfully",res.data.data);
         }).catch((err)=>{
            console.error("There was an error fetching the shop information",err.message);
         })
        }
    },[props.shopID])

    console.log(products);

    useEffect(()=>{
        if(products && products.length>0){
            Axios.post("http://localhost:3001/get-shop-products",{productIDs : products})
             .then((res)=>{
                console.log(res.data);
                setShopProducts(res.data);
             })
             .catch((err)=>{
                console.error("Error fetching product documents ",err.message);
             })
        }
    },[products])

    const productCardArray=shopProducts.map((product)=>
    
        <ProductCard
         productName={product.productName}
         productCategory={product.productCategory}
         productPrice={product.productPrice}
         productDescription={product.productDescription}
         productCountry={product.productCountry}
         productBrand={product.productBrand}
         productQuantity={product.productQuantity}
         productImage={product.productImage}
         productAddedDate={product.productAddedDate}
         />
    )

    return(
        <div className='productArray--container'>
            {productCardArray}
        </div>
    )
}