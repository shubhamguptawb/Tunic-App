import React, { useState } from "react";
import "../assets/css/wishlist.css";
import Product from "./Product";
import { connect } from "react-redux";
import ViewSimilar from "./ViewSimilar";

function Wishlist(props) {
  const { wishlist } = props;
  let [similar, showSimilar] = useState(false);
  let [prodId, setProdId] = useState();

  const handleshowSimilar = (id) => {
    setProdId((prodId = id));
    showSimilar((prev) => !prev);
  };

  const closeShowSm = () => {
    showSimilar((similar = false));
  };
  return (
    <div className="wishlist-container">
      {similar ? <ViewSimilar data={[prodId, closeShowSm]} /> : null}
      <h1>My Wishlist</h1>
      <div className="wishlist-wrapper" style={{ overflowY: "scroll" }}>
        {wishlist.length != 0 ? (
          wishlist.map((elem) => {
            return <Product data={[elem, handleshowSimilar]} />;
          })
        ) : (
          <h2
            style={{
              height: "40%",
              width: "70%",
              display: "flex",
              justifyContent: "center",
              paddingTop: "15%",
            }}
          >
            Your List is empty 🎈
          </h2>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { wishlist } = state;
  return { wishlist };
};

export default connect(mapStateToProps, {})(Wishlist);
