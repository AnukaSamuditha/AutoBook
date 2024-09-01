import React,{useState,useEffect} from "react";
import "../Styles/marketplace.css";
import NavBar from "./NavBar";
import MarketShop from "./MarketShop";
import Axios from 'axios';

export default function MarketPlace() {
    const [shops,setShops]=useState([])
    const [searchShops,setSearchShops]=useState([])
    const [searchValue,setSearchValue]=useState("")


    useEffect(()=>{
        Axios.get('http://localhost:3001/get-shops').then((res)=>{
           setShops(res.data.shops.shops)
           setSearchShops(res.data.shops.shops)
           console.log(res.data.shops.shops)
           console.log(shops)
        })
        
    },[])

    

    const shopsArray=shops.map((shop)=>{
       return <MarketShop 
          key={shop.id}
          shopName={shop.shopName}
          primaryProduct={shop.primaryProduct}
          creditCard={shop.isCreditCardAvailable}
          debitCard={shop.isDebitCardAvailable}
          COD={shop.isCODAvailable}
          />
    })

    const searchedShopsArray=searchShops.map((shop)=>{
        return <MarketShop
          key={shop.id}
          shopName={shop.shopName}
          primaryProduct={shop.primaryProduct}
          creditCard={shop.isCreditCardAvailable}
          debitCard={shop.isDebitCardAvailable}
          COD={shop.isCODAvailable}
          />
    })

    useEffect(()=>{

        if(searchValue){
            const filteredShops=shops.filter((shop)=>shop.shopName.toLowerCase().includes(searchValue.toLowerCase()));
            setSearchShops(filteredShops)
        }
        else{
            setSearchShops(shops)
        }
    },[searchValue,shops]);

    function handleChange(event){

        setSearchValue(event.target.value);
            
    }

    

  return (
    <div>
      <NavBar />
      <div className="marketPlace--holder">
        <h4 className="main--title">
          Explore the Finest Automotive Shops at Your Fingertips.
        </h4>
        <p className="main--para">
          Discover top-quality automotive products from trusted sellers, all
          just a click away.
        </p>
        <form className="search--form" >
            <div className="search--bar--holder">
                <img src={require('../Images/search.svg').default} className="search--icon"/>
                <input 
                type="search" 
                className="input--field" 
                name="shop--name"
                placeholder="Search for shops by name, category, or, location"
                onChange={handleChange}
                
                />
            </div>
        </form>
        <div className="recent--search--holder">
            <h6 className="recent--title">Trending Searches</h6>
            <ul className="search--items">
                <li className="item">Engine repairing shops</li>
                <li className="item">Vehicle modification</li>
                <li className="item">Tire selling</li>
                <li className="item">Hybrid battery selling</li>
            </ul>
        </div>
        <div className="filter--section">
            <ul className="filters">
                <li className="filter">Top Rated</li>
                <li className="filter">Free Shipping</li>
                <li className="filter">Newest Shops</li>
                <li className="filter">Best Deals</li>
                <li className="filter">EV Parts</li>
                <li className="filter">Interior</li>
            </ul>
        </div>
        <div className="shops--holder">
            {searchShops.length > 0 ? searchedShopsArray : shopsArray}
        </div>
      </div>
    </div>
  );
}
