import React, { useState } from "react";
import "../assets/css/lightbox.css"; //css

//Component to display different views of product

function LightBox(props) {
  let i = 0;
  let [fullImg, setFullImg] = useState(props.data[1]); //state to get full size of  the selected image
  let newImageArray = []; //array to get all views from selected product

  function handleFullImage(id) {
    //function to show full size img

    for (let elem of newImageArray) {
      if (elem.id === id) {
        setFullImg((fullImg = elem.src));
      }
    }
  }

  for (let elem of props.data[0]) {
    //adding id to the different views of image
    if (elem.view === "search") {
      //skip search view of image
      continue;
    }
    let obj = {
      ...elem,
      id: i,
    };
    newImageArray.push(obj);
    i++;
  }

  return (
    <div className="lightbox-container">
      <div className="img-thumb">
        {newImageArray.map((elem) => {
          return (
            <div className="thumb-container" style={{ cursor: "pointer" }}>
              <img
                src={elem.src}
                onClick={() => {
                  handleFullImage(elem.id);
                }}
              ></img>
              <h2>{elem.view}</h2>
            </div>
          );
        })}
      </div>
      <div className="img-full">
        <div className="img-full-container">
          <img src={fullImg}></img>
        </div>
      </div>

      {/* Close button for image container */}
      <div
        className="close-btn"
        style={{ cursor: "pointer" }}
        onClick={() => {
          props.data[2](false, "");
        }}
      >
        X
      </div>
    </div>
  );
}

export default LightBox;
