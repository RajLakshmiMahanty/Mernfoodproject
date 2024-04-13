import React, { useState } from "react"; // Import useState from React
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import Badge from "react-bootstrap/Badge"; // Import Badge component from react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Modal from "../Modal"; // Import Modal component
import Cart from "../screens/Cart"; // Import Cart component
import { useCart } from "./ContextReducer"; // Import custom hook useCart from ContextReducer

// Functional component for Navbar
export default function Navbar() {
  const [cartView, setCartView] = useState(false); // State for cart view
  let data = useCart(); // Use custom hook to access cart data
  const navigate = useNavigate(); // Use navigate hook from react-router-dom

  // Function to handle logout
  const handlelogout = () => {
    localStorage.removeItem("authToken"); // Remove authToken from local storage
    navigate("/login"); // Navigate to login page
  };

  return (
    <div>
      {/* Navbar component */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          {/* Navbar brand */}
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Foodie
          </Link>

          {/* Navbar toggler button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              {/* Home link */}
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {/* My Orders link */}
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {/* Conditional rendering based on authentication */}
            {!localStorage.getItem("authToken") ? (
              // Render login and signup buttons if not authenticated
              <div className="d-flex">
                <Link className="btn bg-white text-secondary mx-1" to="/login">
                  Login
                </Link>

                <Link
                  className="btn bg-white text-danger mx-1"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              // Render cart, logout buttons if authenticated
              <div className="d-flex">
                {/* Cart button */}
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  My Cart <Badge bg="danger">{data.length}</Badge>{" "}
                  {/* Adjusted Badge component */}
                </div>

                {/* Render modal for cart */}
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}

                {/* Logout button */}
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handlelogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
