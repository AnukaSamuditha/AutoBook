import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import Shop from './Shop';
import CreateShop from './CreateShop';

export default function SellerDashboard(){

    const[shops,setShops]=useState([]);
    const[popupForm,setPopupForm]=useState(false);

    function createShop(){
        
        setShops((prevShops)=>{
            return[<Shop/>,...prevShops]
        })

    }

    function togglePopupForm(){
        setPopupForm((prevPopupForm)=>!prevPopupForm);
    }

    const shopArray=shops.map((shop)=>shop);


    return (
        <div className='seller--dashboard--holder'>
            <NavBar/>
            {popupForm === true && <CreateShop/>}
            <div className='dashboard--holder'>
                <div className='left--menu'>
                    <div className='seller-profile--holder'>
                        <img src={require("../Images/profilephoto4.png")} className='seller--profile--photo' alt='profile--photo'/>
                    </div>
                    <h2 className='seller--full--name'>Anuka Samuditha</h2>
                    <div className='shops--title'>
                        <img src={require("../Images/shop--icon.svg").default} className='shop--icon' alt='shop--icon'/>
                        <h5 className='shopTitle'>Shops</h5>
                    </div>
                </div>
                <div className='right--menu'>
                    <div className='section--01'>
                      <h3 className='seller--name'>Hi Anuka!</h3>
                      <button className='create--shop--button' onClick={togglePopupForm}>New Shop</button>
                    </div>
                    <div className='section--02'>
                       {shopArray}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}