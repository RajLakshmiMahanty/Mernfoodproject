import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// MyOrder component
export default function MyOrder() {
  // State variable to store order data
  const [orderData, setOrderData] = useState("");

  // Function to fetch user's order data
  const fetchMyOrder = async () => {
    // Fetching user's order data from the server
    await fetch("http://localhost:8000/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"), // Retrieving user's email from localStorage
      }),
    }).then(async (res) => {
      // Parsing JSON response
      let response = await res.json();
      // Setting order data state
      await setOrderData(response);
    });
  };

  // Effect hook to fetch order data on component mount
  useEffect(() => {
    fetchMyOrder();
  }, []);

  // Rendering component
  return (
    <div>
      {/* Navbar component */}
      <div>
        <Navbar />
      </div>

      {/* Container to display order data */}
      <div className="container">
        <div className="row">
          {/* Conditional rendering based on order data */}
          {orderData !== {}
            ? Array(orderData).map((data) => {
                return data.orderData
                  ? // Mapping over order data and displaying each order
                    data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          return (
                            <div key={arrayData._id}>
                              {/* Checking if it's an order date or an item */}
                              {arrayData.Order_date ? (
                                // Displaying order date
                                <div className="m-auto mt-5">
                                  {(data = arrayData.Order_date)}
                                  <hr />
                                </div>
                              ) : (
                                // Displaying order item
                                <div className="col-12 col-md-6 col-lg-3">
                                  <div
                                    className="card mt-3"
                                    style={{
                                      width: "16rem",
                                      maxHeight: "360px",
                                    }}
                                  >
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        {arrayData.name}
                                      </h5>
                                      <div
                                        className="container w-100 p-0"
                                        style={{ height: "38px" }}
                                      >
                                        <span className="m-1">
                                          {arrayData.qty}
                                        </span>
                                        <span className="m-1">
                                          {arrayData.size}
                                        </span>
                                        <span className="m-1">{data}</span>
                                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                                          ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })
                  : "";
              })
            : ""}
        </div>
      </div>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
