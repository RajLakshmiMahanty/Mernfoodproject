import React, { useState } from "react";
import { Link } from "react-router-dom";

// SignUp component
export default function Signup() {
  // State variable to store user credentials
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    console.log(
      JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    );
    // Send a POST request to the server with user credentials
    const response = await fetch("http://localhost:8000/api/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });
    try {
      // Parse the JSON response
      const json = await response.json();
      console.log(json);
      // Display an alert if the registration is unsuccessful
      if (!json.success) {
        alert("Please enter valid credentials");
      }
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
    }
  };

  // Function to handle input changes
  const onChange = (event) => {
    // Update the credentials state with the new input values
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  };

  // Rendering component
  return (
    <>
      <div className="container">
        {/* Sign-up form */}
        <form onSubmit={handleSubmit}>
          {/* Input field for name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          {/* Input field for email */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            {/* Help text for email input */}
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          {/* Input field for password */}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>
          {/* Input field for geolocation */}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="geolocation"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>
          {/* Submit button */}
          <button type="submit" className="m-3 btn btn-sucess">
            Submit
          </button>
          {/* Link to redirect to login page if user is already registered */}
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}
