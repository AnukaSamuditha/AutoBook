import React, { useState, useEffect } from "react";
import BellIconWhite from "../Images/bell--white.svg";
import BellNotifyWhite from "../Images/bell--notify--white.svg";

export default function Shop(props) {
  const [notification, setNotification] = useState(false);
  const [shopID, setShopID] = useState(null);

  useEffect(()=>{
    setShopID(props.ShopID);
  },[props.shopID])

  function toggleBellIcon() {
    setNotification((preValue) => !preValue);
  }
  return (
    <div className="shop--container">
      <div className="first--half" style={props.shopStyle}>
        <div className="shop--upper">
          <h5 className="city">Colombo</h5>
          <div className="bell--holder">
            <img
              src={notification ? BellNotifyWhite : BellIconWhite}
              className="bell--icon"
              alt="bell--icon"
              onClick={toggleBellIcon}
            />
          </div>
        </div>
        <div className="shop--name--container">
          <h5 className="shop--name">{props.shopName}</h5>
        </div>
        <div className="product--category--container">
          <h4 className="product--category">{props.primaryProduct}</h4>
        </div>
        <div className="payment--methods--container">
          {props.isCreditCardAvailable && <div className="method">Credit</div>}
          {props.isDebitCardAvailable && <div className="method">Debit</div>}
          {props.isCODAvailable && <div className="method">COD</div>}
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
        <button
          className="manage--button"
          onClick={()=>props.toggleClickedShop(props.shopID)}
        >
          Manage
        </button>
      </div>
    </div>
  );
}
