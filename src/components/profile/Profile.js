import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import damage from "../../assets/damage.svg";
import image from "../../assets/user.png";
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Guest",
    email: "guest@example.com",
    mobile: "+91XXXXXXXXXX",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // localStorage.removeItem("user");
    // window.location.href = "/";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="wrapper">
      <div className="account-header">
        <Link to="/" className="account-left">
          <i class="bi bi-chevron-left"></i>
        </Link>
        <h7 className="account-title">My Account</h7>
      </div>

      <div className="profile-info flex space-between gap-10">
        <div className="profile-first">
          <img src={image} alt="user" />
        </div>
        <div className="profile-second">
          <h3 className="username">{user.name}</h3>
          <div className="flex justify-start gap-2 mobile">
            <p style={{ font: "15px", fontWeight: "bold", color: "black" }}>
              <i
                class="bi bi-telephone-outbound-fill"
                style={{ color: "green", fontSize: "15px" }}
              ></i>
            </p>
            <p style={{ font: "15px", fontWeight: "bold", color: "black" }}>
              {user.mobile}
            </p>
          </div>
        </div>
        <div
          className="third flex"
          onClick={() => (window.location.href = "/editprofile")}
        >
          <i class="bi bi-pencil-square"></i>
        </div>
      </div>

      <div className="profile-main">
        <h3 className="link mt-20">QUICK LINKS</h3>

        <div
          className="link-box flex gap-10 mt-20 profile-link"
          onClick={() => (window.location.href = "/booking-history")}
        >
          <div className="profile-link-left">
            <i className="bi bi-clock profile-icon"></i>
            <p>Booking History</p>
          </div>
          <div className="profile-link-right">
            <i class="bi bi-chevron-right"></i>
          </div>
        </div>

        <div
          className="link-box flex gap-10 mt-20 profile-link"
          onClick={() => (window.location.href = "/wallet")}
        >
          <div className="profile-link-left">
            <i className="bi bi-wallet profile-icon"></i>
            <p>Wallet</p>
          </div>
          <div className="profile-link-right">
            <i class="bi bi-chevron-right"></i>
          </div>
        </div>

        <div
          className="link-box flex gap-10 mt-20 profile-link"
          onClick={() => (window.location.href = "/help")}
        >
          <div className="profile-link-left">
            <i className="bi bi-question-circle profile-icon"></i>
            <p>Support</p>
          </div>
          <div className="profile-link-right">
            <i class="bi bi-chevron-right"></i>{" "}
          </div>
        </div>

        <div
          className="link-box flex gap-10 mt-20 profile-link"
          onClick={() => (window.location.href = "/damage-detail")}
        >
          <div className="profile-link-left">
            <img className="profile-icon" src={damage} alt="damage" />
            <p>Damage Reporting</p>
          </div>
          <div className="profile-link-right">
            <i class="bi bi-chevron-right"></i>{" "}
          </div>
        </div>

        <div className="profile-btn" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Profile;
