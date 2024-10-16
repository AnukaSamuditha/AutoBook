import React from 'react';
import { useNavigate } from "react-router-dom";
import '../Styles/DeletePopup.css';
import Axios from 'axios';

export default function DeletePopup(props){

    const navigate=useNavigate();

    function handleNavigate(){
        navigate('/sellerdashboard')
    }

    function deleteShop(){
        if(props.shopID){
            Axios.delete(`http://localhost:3001/delete-shop/${props.shopID}`)
             .then((res)=>{
                console.log("Successfully deleted your shop",res.data);
                alert("Shop Deletion Completed")
                props.deleteToggle()
                navigate("/sellerdashboard")
                window.location.reload()
             }).catch((err)=>{
                console.error("Error deleting the shop",err.message)
             })
        }
        
    }
    
    return(
        <div className='popup--container'>
            <small className='popup--heading'>Are You Sure!</small>
            <div className='button--holder'>
                <button className='popup--delete--button'onClick={deleteShop}>Delete</button>
                <button className='popup--cancel--button' onClick={props.deleteToggle}>Cancel</button>
            </div>
        </div>
    )
}