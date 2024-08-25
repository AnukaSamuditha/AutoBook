import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Components/Home";
import SellerDashboard from "./Components/SellerDashboard";
import CreateShop from "./Components/CreateShop";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sellerdashboard" element={<SellerDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}
