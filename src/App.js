import "./App.css"; // Import CSS file
import Home from "./screens/Home"; // Import Home component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route from react-router-dom
import Login from "./screens/Login"; // Import Login component
import Signup from "./screens/Signup"; // Import Signup component
import MyOrder from "./screens/MyOrder"; // Import MyOrder component
import "bootstrap-dark-5/dist/css/bootstrap-dark.min.css"; // Import Bootstrap Dark CSS
import "bootstrap/dist/js/bootstrap.bundle"; // Import Bootstrap bundle
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap minified bundle
import { CartProvider } from "./components/ContextReducer"; // Import CartProvider from ContextReducer component

// Function component App
function App() {
  return (
    // Provide CartProvider to the entire application
    <CartProvider>
      <Router>
        {" "}
        {/* Router component */}
        <div>
          <Routes>
            {" "}
            {/* Routes component */}
            {/* Route for Home component */}
            <Route exact path="/" element={<Home />} />
            {/* Route for Login component */}
            <Route exact path="/login" element={<Login />} />
            {/* Route for Signup component */}
            <Route exact path="/createuser" element={<Signup />} />
            {/* Route for MyOrder component */}
            <Route exact path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App; // Export App component
