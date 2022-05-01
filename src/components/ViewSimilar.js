import React from "react";
import { Link } from "react-router-dom";
import { fetchProductFromid, fetchProductFromBrand } from "../utilities";
import "../assets/css/viewSimilar.css";

function ViewSimilar(props) {
  let sizes;
  function getSize(item) {
    let sizeArray = [];
    let a = "";
    for (let i of item) {
      if (i == ",") {
        sizeArray.push(a);
        a = "";
        continue;
      }
      a = a + i;
    }
    return sizeArray;
  }

  let id = { id: props.data[0] };
  let productForSimilar = fetchProductFromid(id)[0];

  let resultProducts = fetchProductFromBrand(
    productForSimilar.brand,
    productForSimilar.gender
  );

  return (
    <div className="view-similar">
      <div
        style={{
          height: "5%",
          width: "98%",
          paddingRight: "2%",
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "20px",
          cursor: "pointer",
        }}
        onClick={() => {
          props.data[1]();
        }}
      >
        <h4
          style={{
            paddingLeft: "10px",
          }}
        >
          {" "}
          View Similar
        </h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          class="itemContainer-base-closeIcon"
        >
          <path
            fill="#000"
            fill-rule="evenodd"
            d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z"
          ></path>
        </svg>
      </div>
      {resultProducts.map((elem) => {
        return (
          <Link
            to={`product/${elem.productId}`}
            style={{
              textDecoration: "none",
              color: "black",
              paddingLeft: "10px",
            }}
          >
            <div className="prod-vs">
              <div className="vs-left-container">
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  src={elem.searchImage}
                ></img>
              </div>
              <div className="vs-right-container">
                <h3>{elem.brand}</h3>
                <h5>{elem.productName}</h5>

                <div className="vs-price">
                  <span className="price-a">Rs. {elem.price}</span>
                  <span className="price-b">Rs. {elem.mrp}</span>
                  <span className="price-c">{elem.discountDisplayLabel}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ViewSimilar;
