import React, { useState } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
import searchIco from "../assets/images/search.svg";
import close from "../assets/images/close.svg";
import Cart from "./Cart";
import { connect } from "react-redux";
import { fetchProducts, search, sortByGender } from "../utilities";

function Navbar(props) {
  let [value, setValue] = useState("");
  let [showCart, setShowCart] = useState(false);
  let count = 0;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchQuery();
    }
  };
  const handleChange = (event) => {
    setValue((value = event.target.value));
  };

  const handleSearchQuery = () => {
    if (value === " " || value === "") {
      return;
    }
    let output = search(value, fetchProducts());
    props.data(output);
  };

  const handleShowCart = () => {
    setShowCart((prev) => !prev);
  };

  if (props.cart.length !== 0) {
    props.cart.map((elem) => {
      count = count + elem.count;
    });
  }

  //Filter By Gender
  let [gender, setGender] = useState();

  const handleGenderSearch = (input_gender) => {
    setGender((gender = input_gender));
    let data = sortByGender(gender, fetchProducts());
    props.data(data, input_gender);
  };

  return (
    <>
      <div className="logo-header">
        <Link
          to="/"
          className="logo-name"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "10%",
            fontSize: "0.8rem",
            textDecoration: "none",
            color: "black",
          }}
        >
          <h1>
            Tunic<span style={{ color: "red" }}>.</span>
            <span style={{ fontSize: "15px", paddingTop: "10px" }}>com</span>
          </h1>
        </Link>

        <div className="header-menu">
          <ul className="header-menu-ul">
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleGenderSearch("Men");
              }}
            >
              Men
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleGenderSearch("Women");
              }}
            >
              Women
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleGenderSearch("Boys");
              }}
            >
              Boys
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleGenderSearch("Girls");
              }}
            >
              Girls
            </li>
            <li>Beauty</li>
            <li
              onClick={() => {
                handleGenderSearch();
              }}
            >
              Studio
            </li>
          </ul>
        </div>

        <div className="search-bar">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={{
              backgroundColor: "white",
              height: "70%",
              marginLeft: "14px",
              width: "90%",
              borderColor: "transparent",
            }}
            placeholder="Search..."
          ></input>
          {value != "" ? (
            <img
              style={{
                height: "20px",
                width: "20px",
              }}
              src={close}
              onClick={() => {
                setValue((value = ""));
              }}
            ></img>
          ) : (
            <img
              style={{
                height: "30px",
                width: "30px",
              }}
              src={searchIco}
            ></img>
          )}
        </div>

        <div className="wishlist-btn-d">
          <Link
            to="/wishlist"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/1216/1216575.png"></img>
          </Link>
        </div>

        <div
          className="cart-icon"
          onClick={() => {
            handleShowCart();
          }}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"></img>
          <div className="cart-count">{count}</div>
        </div>
        {showCart ? <Cart data={handleShowCart} /> : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { cart } = state;
  return { cart };
};

export default connect(mapStateToProps, {})(Navbar);
