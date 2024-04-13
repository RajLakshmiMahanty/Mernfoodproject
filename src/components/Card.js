import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer"; // Importing custom hooks from ContextReducer.js

export default function Card(props) {
  // Using custom hooks from ContextReducer.js
  let dispatch = useDispatchCart(); // Dispatch function for updating the cart
  let data = useCart(); // Accessing cart data from the context
  const priceRef = useRef(); // Reference to the select element for size
  let options = props.options; // Options for the food item
  let priceOptions = Object.keys(options); // Extracting keys (sizes) from options
  const [qty, setQty] = useState(1); // State for quantity of the item
  const [size, setSize] = useState(""); // State for selected size of the item
  let finalPrice = qty * parseInt(options[size]); // Calculating final price based on quantity and selected size

  // Function to handle adding item to the cart
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    // setBtnEnable(true)
  };

  // useEffect to set the initial size state when component mounts
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "120px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name} </h5>

            <div className="container w-100">
              {/* Dropdown for selecting quantity */}
              <select
                className="m-2 h-100  bg-danger rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              {/* Dropdown for selecting size */}
              <select
                className="m-2 h-100  bg-danger rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-5">Rs{finalPrice}/-</div>
            </div>
            <hr />
            {/* Button to add item to the cart */}
            <button
              className={"btn btn-danger justify-center ms-2"}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
