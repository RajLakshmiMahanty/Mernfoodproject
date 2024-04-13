import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Login component
export default function Login() {
  // State for user credentials
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Navigate function from react-router-dom
  let navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logging user credentials
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );

    // Fetching login API
    const response = await fetch("http://localhost:8000/api/loginuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    try {
      // Parsing JSON response
      const json = await response.json();
      console.log(json);

      // Handling success and failure
      if (!json.success) {
        alert("Please enter valid credentials");
      }
      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/"); // Redirect to home page after successful login
      }
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
    }
  };

  // Handle input change
  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="container">
        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Email input */}
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
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          {/* Password input */}
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
          {/* Submit button */}
          <button type="submit" className="m-3 btn btn-sucess">
            Submit
          </button>
          {/* Link to create user */}
          <Link to="/createuser" className="m-3 btn btn-danger">
            I am a new user
          </Link>
        </form>
      </div>
    </>
  );
}
