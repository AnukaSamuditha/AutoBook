import React from "react";
import BellIcon from "../Images/bell.svg";
import BellNotification from "../Images/bell-notification.svg";

export default function Shop() {
  return (
    <div className="shop--container">
      <div className="first--half">
         <div className="shop--upper">
          <div className="date--holder">
            <h4 className="date">20 Aug 2024</h4>
          </div>
          <div className="orders--count--holder">
            <img src={BellIcon} className="bell--icon" alt="bell--icon" />
          </div>
         </div>
         <div className="shop--name--container">
          <h5 className="shop--name">The Tire Shop</h5>
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
            <h3 className="sales">$350</h3>
            <small>Sales</small>
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
