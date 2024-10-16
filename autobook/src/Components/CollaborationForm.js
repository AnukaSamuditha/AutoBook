import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import '../Styles/CollaborationForm.css';

export default function CollaborationForm(props){

    const[collab,setCollab]=useState({
        collabName:"",
        sellerCount:0,
        product:"",
        sellerID:"",
        shopIDs:"",
        createdDate:"",
        createdSeller:"",
        discountedPrice:""
    })
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
    
    function handleFormData(event){
        setCollab((prevValue)=>{
            return{
                ...prevValue,
                [event.target.name]:event.target.value
            }
        })
    }

    const ProductsArray=shopProducts.map((product)=>
        <option key={product._id} value={product._id}>{product.productName}</option>
    )

    return(
        <div className='shop--collab--form-container'>
            <h4 className='collab--shop--form--title'>Create a Collaboration</h4>
            <form className='shop--collab--form'>
                <label className='shop--collab--form--label' htmlFor='collabName'>Collab Name</label><br/>
                <input 
                 type='text' 
                 id='collabName' 
                 name='collabName'
                 value={collab.collabName}
                 onChange={handleFormData}
                 className='shop--collab--form--input'/><br/>

                 <label className='shop--collab--form--label' htmlFor='sellerCount'>Seller Count</label><br/>
                <input 
                 type='number' 
                 id='sellerCount' 
                 name='sellerCount'
                 value={collab.sellerCount}
                 onChange={handleFormData}
                 className='shop--collab--form--input'/><br/>

                 <label className='shop--collab--form--label' htmlFor='product'>Offering Product</label><br/>
                 <select 

                 id='product' 
                 name='product'
                 value={collab.product}
                 onChange={handleFormData}
                 className='shop--collab--form--input'>
                    {ProductsArray}
                 </select><br/>
                
                 <label className='shop--collab--form--label' htmlFor='discountedPrice'>Discounted Price</label><br/>
                <input 
                 type='text' 
                 id='discountedPrice' 
                 name='discountedPrice'
                 value={collab.discountedPrice}
                 onChange={handleFormData}
                 className='shop--collab--form--input'/><br/>

                 
                 <button type='submit' id='collab--shop--submit'>Complete</button>
                 <button type='button'id='collab--shop--cansel' >Cansel</button>
            </form>
        </div>
    )
}