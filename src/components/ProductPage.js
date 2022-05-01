import React, { useState, useEffect } from "react";
import "../assets/css/productDetails.css";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductFromid } from "../utilities";
import truck from "../assets/images/truck.svg";
import heart from "../assets/images/heart.svg";
import bag from "../assets/images/bag.svg";
import tag from "../assets/images/tag.svg";
import { Toaster, toast } from "react-hot-toast";
import Slider from "react-touch-drag-slider";
import LightBox from "./LightBox";
import {
  addProductToWishlist,
  removeProductFromWishlist,
  addProductToCart,
  increaseCount,
} from "../actions";

function ProductPage(props) {
  let [size, setSize] = useState(0);

  let [viewImg, setViewImg] = useState({
    value: false,
    src: "",
  });

  const handleViewImage = (value, src) => {
    setViewImg((viewImg = { value: value, src: src }));
  };
  const addToCart = (item) => {
    if (size == 0) {
      toast.error("Please Select a Size");
    } else {
      if (props.cart.length != 0) {
        for (let elem of props.cart) {
          if (elem.product.productId === item.productId && elem.size === size) {
            props.increaseCount(elem.id);
            return;
          }
        }
        let id = Date.now();
        props.addProductToCart(item, size, 1, id);
      } else {
        let id = Date.now();
        props.addProductToCart(item, size, 1, id);
      }
    }
  };

  const handleChange = (event) => {
    //set size of the item
    setSize((size = event.target.value));
  };

  let [addWish, setAddWish] = useState(true);
  let id = useParams();
  const item = fetchProductFromid(id)[0];
  let sizeArray = [];
  let a = "";

  for (let i of item.sizes) {
    if (i == ",") {
      sizeArray.push(a);
      a = "";
      continue;
    }
    a = a + i;
  }

  let itemArray = [];
  item.images.map((elem, index) =>
    elem.src != "" && elem.view != "default" ? itemArray.push(elem) : null
  );

  useEffect(() => {
    props.wishlist.map((elem) => {
      if (item.productId === elem.productId) {
        setAddWish((addWish = false));
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
    if (addWish === false) {
      removeWishList(id);
    } else {
      addToWishList(id);
    }
    setAddWish((prev) => !prev);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="product-page-wrapper">
        {viewImg.value ? (
          <LightBox data={[itemArray, viewImg.src, handleViewImage]} />
        ) : null}

        <div className="product-details-section">
          <div className="m-prod-image">
            <Slider
              activeIndex={0}
              threshHold={100}
              transition={0.5}
              scaleOnDrag={true}
            >
              {itemArray.map((elem, index) => (
                <img
                  src={elem.src}
                  alt={elem.view}
                  key={index}
                  onClick={() => {
                    handleViewImage(true, elem.src);
                  }}
                ></img>
              ))}
            </Slider>
          </div>
          <div className="prod-image">
            <div className="prod-image-container">
              {itemArray.map((elem) => {
                return (
                  <div className="p-image" key={elem.view}>
                    <img
                      src={elem.src}
                      alt={elem.view}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleViewImage(true, elem.src);
                      }}
                    ></img>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="product-details-wrapper">
            <div className="product-details">
              <div
                style={{
                  height: "5%",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                  fontWeight: "bolder",
                  paddingTop: "20px",
                  textTransform: "uppercase",
                }}
              >
                {item.brand}
              </div>
              <div
                style={{
                  color: "gray",
                  height: "3%",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  textTransform: "capitalize",
                }}
              >
                {item.productName}
              </div>
              <hr
                style={{ marginTop: "15px", width: "80%", marginLeft: "0px" }}
              ></hr>
              <div
                style={{
                  height: "5%",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#353434",
                  }}
                >
                  ₹{item.price}
                </span>

                {item.mrp != item.price ? (
                  <span
                    style={{
                      marginLeft: "15px",
                      fontSize: "17px",
                      fontWeight: "500",
                      color: "#161414",
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{item.mrp}
                  </span>
                ) : null}
                <span
                  style={{
                    marginLeft: "15px",
                    fontWeight: 700,
                    fontSize: "17px",
                    color: "orange",
                  }}
                >
                  {item.discountDisplayLabel}
                </span>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  height: "2%",
                  color: "#005733",
                }}
              >
                Inclusive of all taxes
              </div>
              <div
                style={{
                  height: "5%",
                  fontSize: "16px",
                  fontWeight: "700",
                  marginTop: "20px",
                  textTransform: "uppercase",
                }}
              >
                Select Size
              </div>
              <div
                style={{
                  alignItems: "center",
                  height: "15%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {sizeArray.map((elem) => {
                  return (
                    <div
                      className="size-input-fdsf"
                      style={{
                        height: "50%",
                        width: "50px",
                        position: "relative",
                        display: "flex",
                        marginRight: "20px",
                        borderRadius: "50%",
                        justifyContent: "center",
                      }}
                      id={elem}
                    >
                      <input
                        id={elem}
                        type="radio"
                        name="size"
                        value={elem}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        style={{
                          height: "100%",
                          width: "100%",
                          top: 0,
                          right: 0,
                          cursor: "pointer",
                          position: "absolute",
                          opacity: "0",
                        }}
                      ></input>
                      <label
                        htmlFor={elem}
                        style={{
                          height: "100%",
                          width: "100%",
                          cursor: "pointer",
                          border: "solid 2px orange",
                          borderRadius: "50%",
                          fontWeight: "700",

                          cursor: "pointer",
                          display: "flex",
                          fontSize: "10px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {elem}
                      </label>
                    </div>
                  );
                })}
              </div>

              {size ? (
                <div
                  style={{
                    marginTop: "25px",
                    height: "2%",
                    width: "100%",
                    color: "red",
                    fontSize: "14px",
                  }}
                >
                  Selected Size: {size}
                </div>
              ) : null}

              <div
                className="bmnnmn"
                style={{
                  marginTop: "20px",
                  height: "5%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  className="fdasfafds"
                  onClick={() => {
                    addToCart(item);
                    if (size != 0) {
                      toast.success(
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Added to Bag{" "}
                          <img
                            src={bag}
                            style={{
                              height: "20px",
                              width: "20px",
                              marginLeft: "20px",
                            }}
                          ></img>
                        </div>
                      );
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    background: "#fa3b5b",
                    height: "80%",
                    width: "40%",
                    fontSize: "14px",
                    color: "white",
                    fontWeight: "700",
                    marginTop: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "20px",
                  }}
                >
                  <img
                    src={bag}
                    style={{
                      height: "30px",
                      width: "30px",
                      marginRight: "10px",
                    }}
                  ></img>
                  <span>ADD TO BAG</span>
                </div>

                <div
                  className="fdasfafds"
                  style={{
                    height: "80%",
                    width: "44%",
                    border: "solid 2px whitesmoke",
                    fontSize: "14px",
                    marginTop: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {addWish ? (
                    <>
                      <img
                        src={heart}
                        style={{
                          height: "30px",
                          width: "30px",
                        }}
                      ></img>

                      <span
                        style={{ cursor: "pointer", fontSize: "12px" }}
                        onClick={() => {
                          handleSetWishlist(item.productId);
                        }}
                      >
                        ADD TO WISHLIST
                      </span>
                    </>
                  ) : (
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "12px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        handleSetWishlist(item.productId);
                      }}
                    >
                      REMOVE FROM WISHLIST
                    </span>
                  )}
                </div>
              </div>
              <div
                style={{
                  height: "7%",
                  width: "100%",
                  display: "flex",
                  marginTop: "30px",
                  fontSize: "14px",
                  alignItems: "center",
                  fontWeight: "700",
                }}
              >
                <span
                  style={{
                    color: "#3a3a3a",
                  }}
                >
                  DELIVERY OPTIONS
                </span>
                <img
                  src={truck}
                  style={{
                    marginLeft: "10px",
                    height: "25px",
                    width: "25px",
                  }}
                ></img>
              </div>
              <div>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "4px 0px",
                    width: "55%",
                    display: "flex",
                    border: "solid 2px whitesmoke",
                  }}
                >
                  <input
                    style={{
                      padding: "5px 0px",
                      height: "100%",
                      width: "60%",
                      borderColor: "transparent",
                      placeholder: "Enter Pincode",
                    }}
                    type="text"
                  ></input>
                  <span
                    style={{
                      marginLeft: "10px",
                      color: "#e35169",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    Check
                  </span>
                </div>
              </div>
              <div
                style={{
                  height: "2%",
                  width: "100%",
                  marginTop: "10px",
                  fontSize: "10px",
                }}
              >
                Please enter PIN code to check delivery time & Pay on Delivery
                Availability
              </div>
              <div
                style={{
                  height: "5%",
                  width: "100%",
                  marginTop: "30px",
                  fontSize: "16px",
                  fontFamily: "poppins,sans-serif",
                }}
              >
                100% Original Products
              </div>
              <div
                style={{
                  fontFamily: "poppins,sans-serif",

                  height: "5%",
                  width: "100%",
                  marginTop: "10px",
                  fontSize: "16px",
                }}
              >
                Pay on delivery might be available
              </div>
              <div
                style={{
                  fontFamily: "poppins,sans-serif",

                  height: "5%",
                  width: "100%",
                  marginTop: "10px",
                  fontSize: "16px",
                }}
              >
                Easy 30 days returns and exchanges
              </div>
              <div
                style={{
                  fontFamily: "poppins,sans-serif",

                  height: "5%",
                  width: "100%",
                  marginTop: "10px",
                  fontSize: "16px",
                }}
              >
                Try &amp; Buy might be available
              </div>
              <div
                style={{
                  height: "10%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontWeight: "700",
                    marginRight: "10px",
                  }}
                >
                  BEST OFFERS
                </span>
                <span>
                  <img
                    src={tag}
                    style={{
                      paddingTop: "10px",
                      height: "20px",
                      width: "20px",
                    }}
                  ></img>
                </span>
              </div>
              <div
                style={{
                  height: "5%",
                  width: "100%",
                  fontFamily: "poppins",
                  fontSize: "12px",
                }}
              >
                This product is already at its best price
              </div>
              <div
                style={{
                  height: "5%",
                  width: "100%",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                EMI option available
              </div>
              <li
                style={{
                  height: "5%",
                  width: "100%",
                  fontSize: "12px",
                  fontFamily: "poppins",
                }}
              >
                x EMI starting from ₹76/month
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { cart, wishlist } = state;
  return { cart, wishlist };
};

export default connect(mapStateToProps, {
  addProductToWishlist,
  removeProductFromWishlist,
  addProductToCart,
  increaseCount,
})(ProductPage);
