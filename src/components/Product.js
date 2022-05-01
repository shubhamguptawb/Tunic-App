import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/product.css";
import heart from "../assets/images/heart.svg";
import { connect } from "react-redux";
import { fetchProductFromid } from "../utilities";
import { addProductToWishlist, removeProductFromWishlist } from "../actions";
function Product(props) {
  let [isWishlist, setIsWishlist] = useState(false);
  useEffect(() => {
    props.wishlist.map((elem) => {
      if (props.data[0].productId === elem.productId) {
        setIsWishlist((isWishlist = true));
      }
    });
  }, []);
  const addToWishList = (id) => {
    let a = { id: id };
    let item = fetchProductFromid(a)[0];
    props.addProductToWishlist(item);
  };

  const removeWishList = (id) => {
    let a = { id: id };
    let item = fetchProductFromid(a)[0];
    props.removeProductFromWishlist(item);
  };

  const handleSetWishlist = (id) => {
    if (isWishlist === true) {
      removeWishList(id);
    } else {
      addToWishList(id);
    }
    setIsWishlist((prev) => !prev);
  };

  return (
    <div className="product-container">
      <div className="product-wrapper">
        <div className="image-container">
          <Link to={`product/${props.data[0].productId}`}>
            <img src={props.data[0].images[0].src}></img>
          </Link>

          <div className="add-wishlist-btn">
            {!isWishlist ? (
              <img
                src={heart}
                onClick={() => {
                  handleSetWishlist(props.data[0].productId);
                }}
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                onClick={() => {
                  handleSetWishlist(props.data[0].productId);
                }}
              ></img>
            )}
          </div>

          <div
            className="vs-btn"
            onClick={() => {
              props.data[1](props.data[0].productId);
            }}
          >
            View Similar
          </div>
        </div>
        <div className="prod-desc">
          <div className="prod-price-desc">
            <span className="prod-price">₹{props.data[0].price}</span>
            {props.data[0].mrp != props.data[0].price ? (
              <span className="mrp">₹{props.data[0].mrp}</span>
            ) : null}
            <span className="prod-discount">
              {props.data[0].discountDisplayLabel}
            </span>
          </div>
          <div className="prod-name">{props.data[0].brand}</div>
          <div className="prod-genre">{props.data[0].additionalInfo}</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { cart, wishlist } = state;
  return { cart, wishlist };
};

export default connect(mapStateToProps, {
  addProductToWishlist,
  removeProductFromWishlist,
})(Product);
