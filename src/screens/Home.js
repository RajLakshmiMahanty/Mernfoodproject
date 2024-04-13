import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import Footer from "../components/Footer"; // Import Footer component
import Navbar from "../components/Navbar"; // Import Navbar component
import Card from "../components/Card"; // Import Card component

// Functional component for Home
export default function Home() {
  const [search, setsearch] = useState(""); // State for search input
  const [foodCat, setFoodCat] = useState([]); // State for food categories
  const [foodItem, setFoodItem] = useState([]); // State for food items

  // Function to load data from backend
  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:8000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      response = await response.json();
      setFoodItem(response[0]); // Set food items state
      setFoodCat(response[1]); // Set food categories state
      // console.log(response[0], response[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect hook to load data when component mounts
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar /> {/* Render Navbar component */}
      </div>
      <div>
        {/* Carousel */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-indicators">
            {/* Carousel indicators */}
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "5" }}>
              {/* Search input */}
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value); // Update search state
                }}
              />
              {/* Search button */}
              <button
                type="button"
                className="btn btn-outline-primary"
                data-mdb-ripple-init
              >
                search
              </button>
            </div>
            {/* Carousel items */}
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900×700/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?cupcake"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
          </div>
          {/* Carousel navigation buttons */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {/* Map through food categories */}
        {foodCat.map((data) => {
          return (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {/* Conditional rendering based on search and food items */}
              {foodItem !== [] ? (
                foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                  )
                  .map((filterItems) => {
                    return (
                      <div
                        key={filterItems._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <Card
                          foodItem={filterItems}
                          options={filterItems.options[0]}
                        ></Card>
                      </div>
                    );
                  })
              ) : (
                <div>No such data found</div>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <Footer /> {/* Render Footer component */}
      </div>
    </div>
  );
}
