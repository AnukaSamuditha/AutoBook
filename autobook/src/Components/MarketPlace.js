import React,{useState,useEffect} from "react";
import "../Styles/marketplace.css";
import NavBar from "./NavBar";
import MarketShop from "./MarketShop";
import Axios from 'axios';
import SellerRegisterForm from "./SellerRegisterForm";

export default function MarketPlace() {
    const [shops,setShops]=useState([])
    const [searchShops,setSearchShops]=useState([])
    const [searchValue,setSearchValue]=useState("");
    const[toggleRegisterForm,setToggleRegisterForm]=useState(false);
    

    useEffect(()=>{
        Axios.get('http://localhost:3001/get-shops').then((res)=>{
          console.log(res)
           setShops(res.data.shops.shops)
           setSearchShops(res.data.shops.shops)
           console.log(res.data.shops.shops)
           console.log("Shop data",searchShops)
           
        })
        
    },[])

    let lastColor=null;

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

    const shopsArray=shops.map((shop)=>{
       return <MarketShop 
          key={shop._id}
          shopID={shop._id}
          shopName={shop.shopName}
          primaryProduct={shop.primaryProduct}
          creditCard={shop.isCreditCardAvailable}
          debitCard={shop.isDebitCardAvailable}
          COD={shop.isCODAvailable}
          styles={colorGenerator()}
          />
    })

    const searchedShopsArray=searchShops.map((shop)=>{
        return <MarketShop
          key={shop._id}
          shopID={shop._id}
          shopName={shop.shopName}
          primaryProduct={shop.primaryProduct}
          creditCard={shop.isCreditCardAvailable}
          debitCard={shop.isDebitCardAvailable}
          COD={shop.isCODAvailable}
          styles={colorGenerator()}
          />
    })

    useEffect(()=>{

        if(searchValue){
            const filteredShops=shops.filter((shop)=>shop.shopName.toLowerCase().includes(searchValue.toLowerCase())||
            shop.primaryProduct.toLowerCase().includes(searchValue.toLowerCase())) 
            setSearchShops(filteredShops)
        }
        else{
            setSearchShops(shops)
        }
    },[searchValue,shops]);

    function handleChange(event){

        setSearchValue(event.target.value);
            
    }
    function ToggleRegisterForm(){
      setToggleRegisterForm((prevValue)=>!prevValue)
    }

  return (
    <div>
      <NavBar />
      <div className="marketPlace--holder">
        <h4 className="main--title">
          Explore the <span className="gradient--texts">Finest Automotive Shops</span> at Your Fingertips.
        </h4>
        <p className="main--para">
          Discover top-quality automotive products from trusted sellers, all
          just a click away.
        </p>
        <div className="register--button--holder">
          <h4 className="join--us--heading">Join with Us Today!</h4>
          <button className="join--us--button" onClick={ToggleRegisterForm}>Start Today</button>
          {toggleRegisterForm && <SellerRegisterForm toggleForm={ToggleRegisterForm}/>}
        </div>
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
