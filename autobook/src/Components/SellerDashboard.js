import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import Shop from './Shop';
import CreateShop from './CreateShop';
import Axios from 'axios';
import ShopDashboard from './ShopDashboard';


export default function SellerDashboard(){

    const[shops,setShops]=useState([]);
    const[popupForm,setPopupForm]=useState(false);
    const[seller,setSeller]=useState({});
    const[sellerShops,setSellerShops]=useState([]);
    const[activeShop,setActiveShop]=useState(null);

    let lastColor=null;

    const[sellerID,setSellerID]=useState(()=>{
        const sellerID=localStorage.getItem("currentSeller");
        console.log(sellerID)
        return sellerID ? sellerID : null;
    });

    console.log(sellerID);

    useEffect(()=>{
        Axios.get(`http://localhost:3001/find-seller/${sellerID}`)
        .then((res)=>{
            setSeller(res.data.data.seller)
            console.log("Seller found : ",res.data.data.seller);
        }).catch((err)=>{
            console.error("Seller not found : ",err.message);
        })
    },[sellerID])

    useEffect(()=>{
        setShops(seller.shopIDs)
        console.log(shops);
    },[seller])


    useEffect(()=>{
       if(shops && shops.length>0){
        Axios.post('http://localhost:3001/get-seller-shops',{shopIDs : shops})
        .then((res)=>{
           setSellerShops(res.data)
        }).catch((err)=>{
           console.error("Error fetching seller shop data",err.message)
        })
       }
    },[shops])

    console.log(sellerID);

    
    function createShop(){
        
        setShops((prevShops)=>{
            return[<Shop/>,...prevShops]
        })

    }

    function togglePopupForm(){
        setPopupForm((prevPopupForm)=>!prevPopupForm);
    }

    function toggleClickedShop(shopId){

        setActiveShop(shopId);

    }
    
    function goBackToShops(){
        setActiveShop(null)
    }

    function getRandomColor(colors){
        let randomIndex=Math.floor(Math.random() * colors.length);
  
        while (colors[randomIndex] === lastColor) {
          randomIndex = Math.floor(Math.random() * colors.length);
        }
  
        lastColor = colors[randomIndex];
  
        return colors[randomIndex];
      }

    function colorGenerator(){

        const colorCodes = [
          "rgba(175, 82, 222, 1)",  // Purple
          "rgba(0, 199, 190, 1)",   // Cyan
          "rgba(0, 0, 0, 1)",       // Black
          "rgba(255, 204, 0, 1)",   // Yellow
          "rgba(52, 199, 89, 1)",   // Green
          "rgba(174, 174, 178, 1)"  // Gray
        ];
        const color=getRandomColor(colorCodes);
  
        const styles={
          backgroundColor:color
        }
        return styles;
      }

    const shopArray=sellerShops.map((shop)=>
        <Shop 
        key={shop._id}
         //shopStyle={colorGenerator()}
         shopID={shop._id}
         shopName={shop.shopName}
         shopDescription={shop.shopDescription}
         primaryProduct={shop.primaryProduct}
         contactNumber={shop.contactNumber}
         shopEmail={shop.shopEmail}
         isCreditCardAvailable={shop.isCreditCardAvailable}
         isDebittCardAvailable={shop.isDebittCardAvailable}
         isCODAvailable={shop.isCODAvailable}
         createdDate={shop.createdDate}
         toggleClickedShop={toggleClickedShop}
        />
    );


    return (
        <div className='seller--dashboard--holder'>
            <NavBar/>
            {popupForm === true && 
            <CreateShop 
             toggleForm={togglePopupForm}
             seller={seller}
             />}
            <div className='dashboard--holder'>
                <div className='left--menu'>
                    <div className='seller-profile--holder'>
                        <img src={require("../Images/profilephoto4.png")} className='seller--profile--photo' alt='profile--photo'/>
                    </div>
                    <h2 className='seller--full--name'>{seller && seller.sellerName}</h2>
                    <div className='shops--title'>
                        <img src={require("../Images/shop--icon.svg").default} className='shop--icon' alt='shop--icon'/>
                        <h5 className='shopTitle'>Shops</h5>
                    </div>
                </div>
                <div className='right--menu'>
                    <div className='section--01'>
                      <h3 className='seller--name'>Welcome {seller && seller.sellerName}!</h3>
                      <button className='create--shop--button' onClick={togglePopupForm}>New Shop</button>
                    </div>
                    <hr className='horizontal--rule'/>
                    <div className='section--02'>
                    {activeShop ? (
                            <ShopDashboard activeShop={activeShop} toggleClickedShop={goBackToShops} />
                        ) : (
                            shopArray
                        )}
        
                    </div>
                </div>
            </div>
        </div>
    )
}