import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Components/Home";
import SellerDashboard from "./Components/SellerDashboard";
import MarketPlace from "./Components/MarketPlace";
import SellerRegisterForm from "./Components/SellerRegisterForm";
import AddProductForm from "./Components/AddProductForm";
import ShopDashboard from "./Components/ShopDashboard";
import ShopPage from "./Components/ShopPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sellerdashboard" element={<SellerDashboard/>}/>
        <Route path="/marketplace" element={<MarketPlace/>}/>
        <Route path="/sellerRegister" element={<SellerRegisterForm/>}/>
        <Route path="/addProduct" element={<AddProductForm/>}/>
        <Route path="/shopDashboard/" element={<ShopDashboard/>}/>
        <Route path="/shopPage/:shopID" element={<ShopPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
