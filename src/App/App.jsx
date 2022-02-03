import './css/app.css'
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";

import Navbar from "../components/Navbar/Navbar";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import HomePage from "../pages/HomePage/HomePage";
import Footer from "../components/Footer/Footer";
import Product from "../pages/Product/Product";
import Basket from "../pages/Basket/Basket";
import Ordering from "../pages/Ordering/Ordering";
import Delivery from "../pages/Delivery/Delivery";
import Promotion from "../pages/Promotion/Promotion";


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(auth())
  }, [])
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path="/ordering" element={<Ordering />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
