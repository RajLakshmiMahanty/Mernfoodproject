import React from "react";

// Carousel component
export default function Carousal() {
  return (
    <div>
      {/* Bootstrap carousel */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }} // Inline style for object-fit property
      >
        {/* Carousel indicators */}
        <div className="carousel-indicators">
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
        {/* Carousel inner container */}
        <div className="carousel-inner" id="carousel">
          {/* Carousel search bar */}
          <div className="carousel-caption" style={{ zIndex: "5" }}>
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            {/* Apply inline style to change background color */}
            <button
              type="button"
              className="btn btn-outline-primary"
              data-mdb-ripple-init
              style={{ backgroundColor: "pink" }} // Inline style to change background color
            >
              search
            </button>
          </div>
          {/* Carousel items */}
          <div className="carousel-item active">
            {/* Image slide 1 */}
            <img
              src="https://source.unsplash.com/random/900×700/?burger"
              className="d-block w-100"
              style={{ filter: "brightness(50%)" }} // Inline style for image brightness
              alt="..."
            />
          </div>
          <div className="carousel-item">
            {/* Image slide 2 */}
            <img
              src="https://source.unsplash.com/random/900×700/?pizza"
              className="d-block w-100"
              style={{ filter: "brightness(50%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            {/* Image slide 3 */}
            <img
              src="https://source.unsplash.com/random/900×700/?cupcake"
              className="d-block w-100"
              style={{ filter: "brightness(50%)" }}
              alt="..."
            />
          </div>
        </div>
        {/* Carousel control buttons */}
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
  );
}
