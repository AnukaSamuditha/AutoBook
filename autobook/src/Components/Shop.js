import React,{useState} from "react";
import BellIconWhite from '../Images/bell--white.svg'
import BellNotifyWhite from '../Images/bell--notify--white.svg';

export default function Shop() {
  const [notification,setNotification]= useState(false)

  function toggleBellIcon(){

    setNotification((preValue)=>!preValue)
  }
  return (
    <div className="shop--container">
      <div className="first--half">
         <div className="shop--upper">
          <h5 className="city">Colombo</h5>
          <div className="bell--holder">
          <img src={notification ? BellNotifyWhite : BellIconWhite} className="bell--icon" alt="bell--icon" onClick={toggleBellIcon}/>
          </div>
         </div>
         <div className="shop--name--container">
          <h5 className="shop--name">The Tire Shop</h5>
         </div>
         <div className="product--category--container">
          <h4 className="product--category">Tire</h4>
         </div>
         <div className="payment--methods--container">
          <div className="method">Credit</div>
          <div className="method">Debit</div>
          <div className="method">COD</div>
         </div>
         <div className="analytic--section">
          <div className="sales--box">
            <h3 className="sales">$350</h3>
            <small>Sales</small>
          </div>
          <div className="sales--box">
            <h3 className="visitors">170</h3>
            <small>Visitors</small>
          </div>
          <div className="sales--box">
            <div className="rating--image--holder">
              <h5 className="rating--count--value">40+</h5>
            </div>
            <small>Ratings</small>
          </div>
        </div>
      </div>
      <div className="second--half">
        <h1 className="second--title">Manage the shop</h1>
        <button className="manage--button">Manage</button>
      </div>
    </div>
  );
}
