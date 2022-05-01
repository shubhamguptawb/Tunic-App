import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../assets/css/app.css"; //css
import Main from "./Main"; //landing Page component
import Navbar from "./Navbar"; //navbar component
import ProductPage from "./ProductPage"; //product detail
import Wishlist from "./Wishlist"; // wishlist
import { fetchProducts } from "../utilities"; //function to fetch products from data

function App() {
  let [data, setData] = useState(fetchProducts());
  let [gender, setGender] = useState();
  const handleData = (input, gender_in) => {
    setData((data = input));
    if (gender_in) {
      setGender((gender = gender_in));
    }
  };

  return (
    <>
      <BrowserRouter>
        <Navbar data={handleData} />
        <Routes>
          <Route
            path="/"
            element={<Main data={[data, handleData, gender]} />}
          ></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/wishlist/product/:id" element={<ProductPage />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
