import React, { useState } from "react";
import "../Styles/PaymentForm.css";
import Axios from "axios";


export default function PaymentForm(props) {
  console.log(props.shopID);
  console.log(localStorage.getItem("currentSeller"));
  console.log(props.cardID);

  const [showConfetti, setShowConfetti] = useState(false);

  const [paymentFormData, setPaymentFormData] = useState({
    cardName: "",
    cardNumber: "",
    cardExpireDate: "",
    cvcNumber: "",
    billingAddress: "",
    postalCode: "",
    productID: "",
    userID: "",
    productPrice: 0,
    discount: "",
    orderDate: "",
    orderStatus: "",
    shopID: "",
  });

  function handleChange(event) {
    setPaymentFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("http://localhost:3001/create-order", {
      cardName: paymentFormData.cardName,
      cardNumber: paymentFormData.cardNumber,
      cardExpireDate: paymentFormData.cardExpireDate,
      cvcNumber: paymentFormData.cvcNumber,
      billingAddress: paymentFormData.billingAddress,
      postalCode: paymentFormData.postalCode,
      discount: paymentFormData.discount,
      productID: props.cardID,
      userID: localStorage.getItem("currentSeller"),
      productPrice: props.productPrice,
      discount: paymentFormData.discount,
      orderDate: new Date(),
      orderStatus: "New",
      shopID: props.shopID,
    })
      .then((res) => {
        console.log("Your produdct is successfully ordered");
        console.log(res.data);
        
        alert("Order is successful");
      })
      .catch((err) => {
        console.error("Error making the order", err.message);
      });

    setPaymentFormData({
      cardName: "",
      cardNumber: "",
      cardExpireDate: "",
      cvcNumber: "",
      billingAddress: "",
      postalCode: "",
      discount: "",
      productPrice: 0,
      discount: "",
      orderDate: "",
      orderStatus: "",
    });

    props.togglePaymentForm()
  }

  return (
    <div className="payment--form--container">
      <div className="payment--holder">
        <h5 className="payment--form--title">Payment Information</h5>
        <img
          src={require("../Images/xmark.svg").default}
          alt="close--form--icon"
          className="payment--form--close"
          onClick={props.togglePaymentForm}
        />
      </div>
      <form className="payment--form" onSubmit={handleSubmit}>
        {(props.isCreditCardAvailable || props.isDebitCardAvailable) && (
          <div>
            <label id="card--name" className="payment--form--label">
              Name on Card
            </label>
            <br />
            <input
              type="text"
              name="cardName"
              className="payment--form--input"
              placeholder="Name on Card"
              value={paymentFormData.cardName}
              onChange={handleChange}
            />
            <br />
            <label id="card--number" className="payment--form--label">
              Card Number
            </label>
            <br />
            <input
              type="text"
              name="cardNumber"
              className="payment--form--input"
              placeholder="1234 5678 9012 3456"
              inputMode="numeric"
              value={paymentFormData.cardNumber}
              onChange={handleChange}
            />
            <br />
            <label id="expiry--date" className="payment--form--label">
              Expiry Date
            </label>
            <br />
            <input
              type="text"
              name="cardExpireDate"
              className="payment--form--input"
              placeholder="MM//YY"
              value={paymentFormData.cardExpireDate}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="cvcNumber" className="payment--form--label">
              CVC
            </label>
            <br />
            <input
              type="text"
              name="cvcNumber"
              className="payment--form--input"
              value={paymentFormData.cvcNumber}
              onChange={handleChange}
              placeholder="123"
            />
            <br />
          </div>
        )}
        <h5 className="payment--form--title">Billing Address</h5>
        <label htmlFor="billing--address" className="payment--form--label">
          Address
        </label>
        <br />
        <input
          id="billing--address"
          type="text"
          name="billingAddress"
          value={paymentFormData.billingAddress}
          onChange={handleChange}
          className="payment--form--input"
          placeholder="123"
        />
        <br />
        <label htmlFor="postal--code" className="payment--form--label">
          Postal Code
        </label>
        <br />
        <input
          type="text"
          name="postalCode"
          value={paymentFormData.postalCode}
          onChange={handleChange}
          className="payment--form--input"
          placeholder="10200"
        />
        <br />
        <label htmlFor="discount--code" className="payment--form--label">
          Discount Code
        </label>
        <br />
        <input
          type="text"
          name="discount"
          value={paymentFormData.discount}
          onChange={handleChange}
          className="payment--form--input"
          placeholder="123456"
        />
        <br />
        <div className="product--price--div">
          <h5 className="final--price">Final Price :</h5>
          <h6 className="item--price">Rs.{props.productPrice}</h6>
        </div>

        <input type="submit" id="payment--form--submit--button" />
      </form>
    </div>
  );
}
