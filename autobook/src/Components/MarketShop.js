import React from 'react';


export default function MarketShop(props){

    console.log(props.shopName)

    
    return(
        <div className="shop--container">
      <div className="first--half">
         <div className="shop--upper">
          <h5 className="city">Colombo</h5>
          <div className="bell--holder">
          <img src={require('../Images/bookmark.svg').default} className='bell--icon'/>
          </div>
         </div>
         <div className="shop--name--container">
          <h5 className="shop--name">{props.shopName}</h5>
         </div>
         <div className="product--category--container">
          <h4 className="product--category">{props.primaryProduct}</h4>
         </div>
         <div className="payment--methods--container">
          {props.creditCard && <div className="method">Credit</div>}
          {props.debitCard && <div className="method">Debit</div>}
          {props.COD && <div className="method">COD</div>}
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
        <h1 className="second--title">Explore products</h1>
        <button className="manage--button">Manage</button>
      </div>
    </div>
    )
}