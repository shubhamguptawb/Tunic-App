import React from "react";
import "../assets/css/cart.css"; //css
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeProductFromCart,
  addProductToCart,
  increaseCount,
  decreaseCount,
} from "../actions";

const Cart = (props) => {
  let data = props.cart.sort((a, b) => a.id - b.id); //sort data on state update
  let TotalMrp = 0;
  let TotalPrice = 0;

  const deleteFromCart = (itemId) => {
    //delete cart item (dispatch action to redux store)
    props.removeProductFromCart(itemId);
  };

  const handleIncreaseQty = (itemId) => {
    props.increaseCount(itemId); //increase count if product is existing (dispatch action to redux store)
  };

  const handleDecreaseQty = (itemId) => {
    for (let elem of props.cart) {
      if (elem.id === itemId) {
        if (elem.count === 1) {
          //check to prevent negative item in cart
          return;
        }
      }
    }
    props.decreaseCount(itemId); //decrease quantity of cart (dispatch action to redux store)
  };

  return (
    <div className="store">
      <div className="store-wrapper">
        {/* Close Button cart  */}
        <div
          className="str-cls-btn"
          onClick={() => {
            props.data();
          }}
        >
          <span>Close</span>
        </div>

        <div
          className="store-details-wrapper"
          style={{
            height: "90%",
            width: "100%",
            display: "flex",
            paddingTop: "3%",
          }}
        >
          {/* cart products  */}
          <section className="left-container-store">
            {props.cart.length != 0 ? (
              data.map((elem) => {
                TotalMrp += elem.product.mrp * elem.count;
                TotalPrice += elem.product.price * elem.count;
                return (
                  <div className="str-prdct">
                    <div className="str-img-cnt">
                      <Link to={`product/${elem.product.productId}`}>
                        <img
                          src={elem.product.searchImage}
                          style={{ height: "100%", width: "100%" }}
                          onClick={() => {
                            props.data();
                          }}
                        />
                      </Link>
                    </div>
                    <div className="str-det-cnt">
                      <div
                        style={{
                          height: "10%",
                          width: "100%",
                          marginTop: "10px",
                          marginBottom: "10px",
                          textTransform: "uppercase",
                        }}
                      >
                        {elem.product.brand}
                      </div>
                      <div
                        style={{
                          height: "5%",
                          width: "100%",
                          fontSize: "12px",
                          fontWeight: "400",
                          marginBottom: "10px",
                          color: "#000",
                          textTransform: "capitalize",
                        }}
                      >
                        {elem.product.productName}
                      </div>

                      <div
                        style={{
                          height: "20%",
                          width: "100%",
                          marginTop: "40px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: "10px",
                            padding: "4px 0px",
                            height: "60%",
                            fontSize: "12px",
                            width: "50%",
                            justifyContent: "center",
                            backgroundColor: "whitesmoke",
                          }}
                        >
                          Size : {elem.size}
                        </span>

                        <span
                          style={{
                            fontSize: "12px",
                            marginLeft: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: "20px",
                            padding: "4px 0px",
                            height: "60%",
                            width: "60%",
                          }}
                        >
                          <span
                            style={{
                              marginRight: "10px",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              border: "2px solid orange",
                              padding: "2px 4px",
                              borderRadius: "50%",
                            }}
                            onClick={() => {
                              handleIncreaseQty(elem.id);
                            }}
                          >
                            +
                          </span>
                          <span style={{ fontSize: "10px" }}>
                            Qty: {elem.count}
                          </span>
                          <span
                            style={{
                              marginLeft: "10px",
                              height: "100%",
                              display: "flex",
                              cursor: "pointer",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "2px solid orange",
                              padding: "2px 4px",
                              borderRadius: "50%",
                            }}
                            onClick={() => {
                              handleDecreaseQty(elem.id);
                            }}
                          >
                            -
                          </span>
                        </span>
                      </div>
                      <div
                        className="bngfnvfghb"
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                            width: "20%",
                            fontSize: "10px",
                            fontWeight: "700",
                          }}
                        >
                          ₹ {elem.product.price}
                        </div>
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            width: "20%",
                            textDecoration: "line-through",
                            fontSize: "10px",
                          }}
                        >
                          ₹ {elem.product.mrp}
                        </div>
                        <div
                          style={{
                            height: "100%",
                            width: "30%",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "10px",
                            color: "orange",
                            fontWeight: "700",
                          }}
                        >
                          {elem.product.discountDisplayLabel}
                        </div>
                      </div>
                    </div>
                    <div
                      className="str-cls-cnt"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        deleteFromCart(elem.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        className="itemContainer-base-closeIcon"
                      >
                        <path
                          fill="#000"
                          fillRule="evenodd"
                          d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Your Bag is empty 🎈
              </h2>
            )}
          </section>
          <hr className="hr-mid"></hr>

          {/* cart price and total amount */}

          <section className="right-container-store">
            <h3
              style={{
                height: "5%",
                width: "100%",
                fontSize: "12px",
                fontWeight: "600",
                fontColor: "gray",
              }}
            >
              PRICE DETAILS
            </h3>
            <div style={{ height: "50%", width: "94%", paddingRight: "6%" }}>
              <div
                style={{
                  marginTop: "20px",
                  height: "10%",
                  width: "100%",
                  fontSize: "12px",
                  fontColor: "gray",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Total MRP</span>
                <span
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {TotalMrp}
                </span>
              </div>

              <div
                style={{
                  height: "10%",
                  width: "100%",
                  fontSize: "12px",
                  fontColor: "gray",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Discount on MRP</span>
                <span
                  style={{
                    fontSize: "10px",
                  }}
                >
                  ₹ {TotalMrp - TotalPrice}
                </span>
              </div>

              <div
                style={{
                  height: "10%",
                  width: "100%",
                  fontSize: "12px",
                  fontColor: "gray",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Coupon Discount</span>
                <span style={{ color: "pink", fontSize: "10px" }}>
                  Apply Coupon
                </span>
              </div>

              <div
                style={{
                  height: "10%",
                  width: "100%",
                  fontSize: "12px",
                  fontColor: "gray",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Convenience Fee</span>
                <span
                  style={{
                    color: "green",
                    fontSize: "10px",
                  }}
                >
                  <span
                    style={{
                      marginRight: "10px",
                      color: "black",
                      textDecoration: "line-through",
                      textDecorationColor: "red",
                    }}
                  >
                    ₹ 99
                  </span>
                  FREE
                </span>
              </div>
            </div>
            <hr></hr>
            <div
              style={{
                height: "10%",
                width: "94%",
                paddingRight: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              <span>Total Amount</span>
              <span
                style={{
                  fontSize: "10px",
                }}
              >
                ₹ {TotalPrice}
              </span>
            </div>
            <div
              style={{
                height: "12%",
                width: "95%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#e84e4e",
                color: "white",
              }}
            >
              PLACE ORDER
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  //add store state to cart component
  const { cart, wishlist } = state;
  return { cart, wishlist };
};

export default connect(mapStateToProps, {
  //react-redux to connect react component with redux store
  addProductToCart,
  removeProductFromCart,
  increaseCount,
  decreaseCount,
})(Cart);
