import React from "react";
import "./Profile.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../../features/auth/authSlice";
import damage from "../../assets/damage.svg";
import userImage from "../../assets/user.png";

const Profile = () => {
  // ✅ Use Redux state instead of localStorage
  const user = useSelector((state) => state.auth.user) || {
    name: "Guest",
    email: "guest@example.com",
    mobile: "+91XXXXXXXXXX",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // ✅ Call backend logout route to clear cookie
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );

      // ✅ Clear Redux state (not localStorage anymore)
      dispatch(logout());

      // ✅ Navigate to login
      navigate("/login");
    } catch (err) {
      console.error(
        "Logout error:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div className="wrapper">
      {/* Header */}
      <div className="account-header">
        <Link to="/" className="account-left">
          <i className="bi bi-chevron-left"></i>
        </Link>
        <h1 className="account-title">My Account</h1>
      </div>

      {/* Profile Info */}
      <div className="profile-info">
        <div className="profile-first">
          <img src={user.profileImage || userImage} alt="user" />
        </div>

        <div className="profile-second">
          <h3 className="username">{user.name}</h3>
          <div className="mobile">
            <i className="bi bi-telephone-outbound-fill"></i>
            <span>{user.mobile}</span>
          </div>
        </div>

        <div className="third">
          <Link to="/editprofile">
            <i className="bi bi-pencil-square"></i>
          </Link>
        </div>
      </div>

      {/* Main Links */}
      <div className="profile-main">
        <h3 className="link">QUICK LINKS</h3>

        <Link to="/bookinghistory" className="profile-link">
          <div className="profile-link-left">
            <i className="bi bi-clock profile-icon"></i>
            <p>Booking History</p>
          </div>
          <div className="profile-link-right">
            <i className="bi bi-chevron-right"></i>
          </div>
        </Link>

        <Link to="/wallet" className="profile-link">
          <div className="profile-link-left">
            <i className="bi bi-wallet profile-icon"></i>
            <p>Wallet</p>
          </div>
          <div className="profile-link-right">
            <i className="bi bi-chevron-right"></i>
          </div>
        </Link>

        <Link to="/help" className="profile-link">
          <div className="profile-link-left">
            <i className="bi bi-question-circle profile-icon"></i>
            <p>Support</p>
          </div>
          <div className="profile-link-right">
            <i className="bi bi-chevron-right"></i>
          </div>
        </Link>

        <Link to="/damage-detail" className="profile-link">
          <div className="profile-link-left">
            <img className="profile-icon" src={damage} alt="damage" />
            <p>Damage Reporting</p>
          </div>
          <div className="profile-link-right">
            <i className="bi bi-chevron-right"></i>
          </div>
        </Link>

        <button className="profile-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
