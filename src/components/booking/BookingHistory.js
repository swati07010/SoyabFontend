import React, { useState, useEffect } from "react";
import "./BookingHistory.css";
import { Link } from "react-router-dom";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Dummy API simulation
    const fetchMyBookingHistory = () =>
      Promise.resolve([
        {
          id: 1,
          vehicleName: "Okaya ClassIQ",
          vehicleImg: "../assets/images/b22.png",
          location: "Argora, Ranchi",
          price: "₹196/-",
          date: "18-05-2024, 10:30 AM to 19-05-2024, 9:30 AM",
        },
        {
          id: 2,
          vehicleName: "Ola S1 Pro",
          vehicleImg: "../assets/images/b22.png",
          location: "Lalpur, Ranchi",
          price: "₹250/-",
          date: "20-05-2024, 11:00 AM to 21-05-2024, 10:00 AM",
        },
      ]);

    fetchMyBookingHistory().then((data) => {
      setBookings(data);
    });
  }, []);

  return (
    <div className="booking-history-wrapper">
      <div className="booking-history-header">
        <Link to="/profile" className="booking-history-left">
          <i className="bi bi-chevron-left "></i>
        </Link>
        <p className="booking-history-title">Booking History</p>
      </div>
      <br></br>

      <div className="booking-history-grid">
        {bookings.length === 0 ? (
          <p>No booking history found.</p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="booking-history-box mt-20">
              <div className="booking-history-first flex space-between gap-10">
                <div className="flex justify-start gap-5">
                  <img
                    className="booking-history-vehicleimg"
                    src={b.vehicleImg}
                    alt="vehicle"
                  />
                  <p className="booking-history-vehicle-name">
                    {b.vehicleName}
                  </p>
                </div>
                <p className="booking-history-total-amount">Total Amount</p>
              </div>

              <div className="booking-history-picup-location mt-5 flex space-between">
                <div className="flex justify-start gap-10">
                  <i className="ri-map-pin-line"></i>
                  <p>{b.location}</p>
                </div>
                <p className="booking-history-price">{b.price}</p>
              </div>

              <div className="mt-5 booking-history-Pickup-date">
                <p>{b.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
