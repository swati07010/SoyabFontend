import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left: Brand & Copyright */}
        <div className="mb-3 mb-md-0">
          <h5 className="mb-1">SmartDrive</h5>
          <small>© {new Date().getFullYear()} All rights reserved</small>
        </div>
        <div className="d-flex justify-content-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-light me-3"
          >
            <i className="bi bi-instagram fs-5"></i>
          </a>
          <a href="mailto:support@smartdrive.com" className="text-light">
            <i className="bi bi-envelope-fill fs-5"></i>
          </a>
        </div>
        <div className="footer-links mb-3 mb-md-0">
          <Link to="/" className="text-light me-3 text-decoration-none">
            Home
          </Link>
          <Link to="/about" className="text-light me-3 text-decoration-none">
            About
          </Link>
          <Link to="/contact" className="text-light text-decoration-none">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
