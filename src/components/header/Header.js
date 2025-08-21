import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice"; // ✅ import logout action
import SmartDrive from "../../assets/logo.png"; // ✅ import logo
const Header = () => {
  const dispatch = useDispatch();

  // ✅ Get state from Redux
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo-section" onClick={goHome}>
        <img src={SmartDrive} alt="SmartDrive Logo" className="logo" />
        <h1 className="company-name">SmartDrive</h1>
      </div>

      {/* Navigation */}
      <nav className="nav-section">
        {isLoggedIn ? (
          <>
            <div className="nav-links">
              <div className="nav-link-item">
                <Link to="/profile" className="documents-link">
                  <i className="bi bi-person-circle border-none"></i>
                  <span className="user-info">
                    {user?.name?.trim().split(" ")[0]}
                  </span>
                </Link>
              </div>
              <div className="nav-link-item">
                {/* <button type="logout-button" onClick={handleLogout}>
                  Logout
                </button> */}
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
