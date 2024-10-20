import React,{useState,useEffect} from 'react';
import '../Styles/UpdateShop.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateShop(props){

    const navigate=useNavigate();

    const[shop,setShop]=useState({});
    const[shopData,setShopData]=useState({
        shopName:shop.shopName,
        shopDescription:shop.shopDescription,
        primaryProduct:shop.primaryProduct,
        contactNumber:shop.contactNumber,
        shopEmail:shop.shopEmail,
        isCreditCardAvailable:shop.isCreditCardAvailable,
        isDebittCardAvailable:shop.isDebittCardAvailable,
        isCODAvailable:shop.isCODAvailable
    })

    useEffect(()=>{
        if(props.shopID){
            Axios.get(`http://localhost:3001/get-shop/${props.shopID}`)
         .then((res)=>{
            console.log("Data Fetched",res.data.data.shop)
            setShop(res.data.data.shop)
            console.log("Shop data is fetched successfully",res.data.data.shop);

         }).catch((err)=>{
            console.error("There was an error fetching the shop information",err.message);
         })
        }
    },[props.shopID]);


    useEffect(()=>{
        if(shop){
            setShopData({
             shopName:shop.shopName,
             shopDescription:shop.shopDescription,
             primaryProduct:shop.primaryProduct,
             contactNumber:shop.contactNumber,
             shopEmail:shop.shopEmail,
             isCreditCardAvailable:shop.isCreditCardAvailable,
             isDebittCardAvailable:shop.isDebittCardAvailable,
             isCODAvailable:shop.isCODAvailable
            })
        }
    },[shop])

    function handleFormData(event){
        const {name,value,type,checked}=event.target;

        setShopData((prevData)=>{
            return{
                ...prevData,
                [name]:type==='checkbox' ? checked:value
            }
        })

    }
    function handleSubmit(event){
        event.preventDefault();

        Axios.put(`http://localhost:3001/update-shop-data/${props.shopID}`,shopData)
         .then((res)=>{
            //setShopData(res.data.data);
            console.log("Shop data updated successfully",res.data)
            //alert("Shop data updated successfully");
            props.toggleForm()
            window.location.reload()
           
            //window.location.reload()
            //navigate('/sellerdashboard')
         }).catch((err)=>{
            console.error("Error occured while updating the shop!",err.message)
         })
    }

    return(
        <div className='shop--update--form-container'>
            <h4 className='update--shop--form--title'>Update Shop Information</h4>
            <form className='shop--update--form' onSubmit={handleSubmit}>
                <label className='shop--update--form--label' htmlFor='shopName'>Shop Name</label><br/>
                <input 
                 type='text' 
                 id='shopName' 
                 name='shopName'
                 value={shopData.shopName}
                 onChange={handleFormData}
                 className='shop--update--form--input'/><br/>

                 <label className='shop--update--form--label' htmlFor='shopDescription'>Shop Description</label><br/>
                <input 
                 type='text' 
                 id='shopDescription' 
                 name='shopDescription'
                 value={shopData.shopDescription}
                 onChange={handleFormData}
                 className='shop--update--form--input'/><br/>

                 <label className='shop--update--form--label' htmlFor='primaryProduct'>Primary Product</label><br/>
                <input 
                 type='text' 
                 id='primaryProduct' 
                 name='primaryProduct'
                 value={shopData.primaryProduct}
                 onChange={handleFormData}
                 className='shop--update--form--input'/><br/>

                 <label className='shop--update--form--label' htmlFor='contactNumber'>Contact Number</label><br/>
                <input 
                 type='text' 
                 id='contactNumber' 
                 name='contactNumber'
                 value={shopData.contactNumber}
                 onChange={handleFormData}
                 className='shop--update--form--input'/><br/>

                <label className='shop--update--form--label' htmlFor='shopEmail'>Shop Email</label><br/>
                <input 
                 type='text' 
                 id='shopEmail' 
                 name='shopEmail'
                 value={shopData.shopEmail}
                 onChange={handleFormData}
                 className='shop--update--form--input'/><br/>

                <label className='shop--update--form--label' htmlFor='creditCard'>Credit Card</label>
                <input 
                 type='checkbox' 
                 id='creditCard' 
                 checked={shopData.isCreditCardAvailable}
                 onChange={handleFormData}
                 name='isCreditCardAvailable'
                 className='shop--update--form--input--checkbox'/><br/>

                <label className='shop--update--form--label' htmlFor='debitCard'>Debit Card</label>
                <input 
                 type='checkbox' 
                 id='debitCard' 
                 name='isDebittCardAvailable'
                 checked={shopData.isDebittCardAvailable}
                 onChange={handleFormData}
                 className='shop--update--form--input--checkbox'/><br/>

                <label className='shop--update--form--label' htmlFor='cashOnDelivery'>Cash On Delivery</label>
                <input 
                 type='checkbox' 
                 id='cashOnDelivery' 
                 name='isCODAvailable'
                 onChange={handleFormData}
                 checked={shopData.isCODAvailable}
                 className='shop--update--form--input--checkbox'/><br/>
                 
                 <button type='submit' id='update--shop--submit'>Update</button>
                 <button type='button'id='update--shop--cansel' onClick={props.toggleForm}>Cansel</button>
            </form>
        </div>
    )
}