import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Components/Home";
import SellerDashboard from "./Components/SellerDashboard";

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
