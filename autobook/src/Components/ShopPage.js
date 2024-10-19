import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import Axios from "axios";
import Swal from 'sweetalert2';
import ProductCard from "./ProductCard";
import "../Styles/ShopPage.css";
import "ldrs/grid";
import StartImage from "../Images/sparks-solid.svg";

export default function ShopPage() {
  const { shopID } = useParams();
  const navigate = useNavigate();

  console.log(shopID);

  const [shop, setShop] = useState(null);
  const [productIDs, setProductIDs] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("currentSeller"));
  const [seller, setSeller] = useState({});
  const [collabs, setCollabs] = useState([]);
  const [sendButton,toggleSendButton]=useState(false);
  const [selectedCollab,setSelectedCollab]=useState("");

  useEffect(() => {
    if (shopID) {
      Axios.get(`http://localhost:3001/get-shop/${shopID}`)
        .then((res) => {
          console.log("response", res);
          setShop(res.data.data.shop);
          console.log("Shop data is fetched successfully", res.data.data);
        })
        .catch((err) => {
          console.error(
            "There was an error fetching the shop information",
            err.message
          );
        });
    }
  }, [shopID]);

  useEffect(() => {
    if (shop) {
      setProductIDs(shop.products);
    }
  }, [shop]);

  useEffect(() => {
    const fetchData = async () => {
      if (productIDs.length > 0) {
        await Axios.post("http://localhost:3001/get-shop-products", {
          productIDs: productIDs,
        })
          .then((res) => {
            console.log("product data", res);
            setProducts(res.data);
          })
          .catch((err) => {
            console.error("Error fetching product documents ", err.message);
          });
      }
    };
    fetchData();
  }, [productIDs]);

  useEffect(() => {
    if (user) {
      Axios.get(`http://localhost:3001/find-seller/${user}`)
        .then((res) => {
          console.log("Seller data fetched successfully", res.data);
          setSeller(res.data.data.seller);
          setCollabs(res.data.data.seller.collaborations);
        })
        .catch((err) => {
          console.error("Error fetching seller data!", err.message);
        });
    }
  }, [user]);

  useEffect(() => {
    if (seller && collabs.length > 0) {
      Axios.post(`http://localhost:3001/get-collab`, {
        collabIDs: seller.collaborations,
      })
        .then((res) => {
          console.log("Collaboration data fetched successfully", res.data);
          setCollabs(res.data)
        })
        .catch((err) => {
          console.log("Error fetching collaboration data", err.message);
        });
    }
  }, [seller]);

  function AlertCollabSuccess(){
    Swal.fire({
      title:"Success!",
      text:"Collaboration Invite sent successfully",
      icon:'success',
      showCloseButton:true
    })
  }

  //console.log("products here", products);

  function handleSendButtton(){
    toggleSendButton((prevValue)=>!prevValue);
  }
  
  function sendCollabRequest(){
    Axios.put(`http://localhost:3001/push-collab-req/${shopID}`,{collaborationID:selectedCollab})
     .then((res)=>{
      console.log("Collab request was pushed successfully",res.data);
      //alert('Collaboration Invitation was sent');
      AlertCollabSuccess()
      handleSendButtton()
     })
     .catch((err)=>{
      console.log("Error pushing collab request",err)
     })
  }

  function handleOption(optionID){
    if(optionID!=""){
      handleSendButtton()
      setSelectedCollab(optionID);
    }

  }


  const productCardArray = products.map((product) => (
    <ProductCard
      key={product._id}
      cardID={product._id}
      shopID={shopID}
      productName={product.productName}
      productCategory={product.productCategory}
      productPrice={product.productPrice}
      productDescription={product.productDescription}
      productCountry={product.productCountry}
      productBrand={product.productBrand}
      productQuantity={product.productQuantity}
      productImage={product.productImage}
      productAddedDate={product.productAddedDate}
      isCODAvailable={shop.isCODAvailable}
      isCreditCardAvailable={shop.isCreditCardAvailable}
      isDebitCardAvailable={shop.isDebitCardAvailable}
    />
  ));

  if (!shop) {
    return <l-grid size="60" speed="1.5" color="black"></l-grid>;
  }

  return (
    <div>
      <NavBar />
      <div className="shop--page--banner--holder">
        <div className="shop--page--banner--container">
          <div className="c-button">
            <img
              src={require("../Images/sparks.svg").default}
              className="star--image"
              alt="collab-button--icon"
            />
            <select className="collab-options" onChange={(e)=>handleOption(e.target.value)}>
              <option >Collaboration</option>
              {collabs.length > 0 ? (
                collabs.map((collab) => (
                  <option key={collab._id} value={collab._id}>{collab.collabName}</option>
                ))
              ) : (
                <option>No collaborations available</option>
              )}
            </select>
            {sendButton && <img src={require('../Images/send.svg').default} alt="send--button" onClick={sendCollabRequest}/>}
          </div>
          <img
            src={require("../Images/back--button--left.svg").default}
            alt="back--button"
            className="back--button--shop--page"
            onClick={() => navigate(-1)}
          />
          <button className="category--label">{shop.primaryProduct}</button>
          <h3 className="shop--title--heading">{shop.shopName}</h3>
          <p className="shop--description--para">{shop.shopDescription}</p>
          <div className="payment--methods--holder">
            {shop.isCreditCardAvailable && (
              <button className="shining-button">Credit</button>
            )}
            {shop.isCODAvailable && (
              <button className="shining-button">COD</button>
            )}
            {shop.isDebitCardAvailable && (
              <button className="shining-button">Debit</button>
            )}
          </div>
          <div className="shop--contact--details">
            <small className="shop--mail--text">{shop.shopEmail}</small>
            <small className="shop--mobile--text">{shop.contactNumber}</small>
          </div>
        </div>
      </div>
      <div className="product--container--shop--page">
        {products.length > 0 ? (
          productCardArray
        ) : (
          <l-grid size="60" speed="1.5" color="black"></l-grid>
        )}
      </div>
    </div>
  );
}
