import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import Axios from "axios";
import ProductCard from "./ProductCard";
import "../Styles/ShopPage.css";
import "ldrs/grid";

export default function ShopPage() {
  const { shopID } = useParams();
  const navigate = useNavigate();

  console.log(shopID);

  // Default values shown

  const [shop, setShop] = useState(null);
  const [productIDs, setProductIDs] = useState([]);
  const [products, setProducts] = useState([]);

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

  console.log("products here", products);

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
