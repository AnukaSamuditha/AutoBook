import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Components/Home";
import SellerDashboard from "./Components/SellerDashboard";
import MarketPlace from "./Components/MarketPlace";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sellerdashboard" element={<SellerDashboard/>}/>
        <Route path="/marketplace" element={<MarketPlace/>}/>
      </Routes>
    </BrowserRouter>
  );
}
