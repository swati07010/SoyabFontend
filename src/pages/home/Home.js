// src/pages/Home.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import data from "../../data/bikes.json";
import "./Home.css"; // optional custom styles
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="container home-container mt-5">
      <div className="text-center mb-5 home-hero">
        <h1 className="display-4">Welcome to SmartDrive</h1>
        <p className="lead">
          Rent premium electric bikes at affordable prices.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-center mb-4">🚴 Featured Bikes</h2>
        <div className="row">
          {data.map((bike) => (
            <div key={bike.id} className="col-md-4 col-sm-6 mb-4">
              <div className="card h-100 shadow-sm p-4">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="card-img-top img-fluid"
                  style={{
                    height: "100px",
                    objectFit: "contain",
                    padding: "10px",
                    paddingBlock: "15px",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{bike.name}</h5>
                  <p className="card-text">Type: {bike.type}</p>
                  <p className="card-text">Price: ₹{bike.pricePerHour}/hr</p>
                  <p className="card-text">Available: {bike.available}</p>
                  <Link
                    to={`/bikes/${bike.id}`}
                    className="btn btn-primary mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
