import React, { useState } from "react";
import axios from "axios";
import "./Signup.css"; // optional custom styles
export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    dob: "",
    gender: "",
    dlNo: "",
    aadharNo: "",
  });

  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Send OTP
  const handleSendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/send-otp", {
        mobile: formData.mobile,
      });
      console.log("OTP sent:", res.data);
      setMessage("OTP sent to your mobile.");
      setOtpSent(true);
      setServerOtp(res.data.otp); // ⚠️ For demo only — don't store OTP on client in real apps
    } catch (err) {
      setMessage("Failed to send OTP.");
    }
  };

  // Submit form (signup)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setMessage("Please verify the OTP before signing up.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", formData);
      setMessage(res.data.message || "Signup successful!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        dob: "",
        gender: "",
        dlNo: "",
        aadharNo: "",
      });
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
      setServerOtp(null);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Signup failed!");
      } else {
        setMessage("Server error. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Signup</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Name *</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email *</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile *</label>
          <div className="d-flex">
            <input
              type="text"
              name="mobile"
              className="form-control me-2"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            {/* <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleSendOtp}
              disabled={!formData.mobile || otpSent}
            >
              {otpSent ? "OTP Sent" : "Send OTP"}
            </button> */}
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleSendOtp}
              disabled={!/^[6-9]\d{9}$/.test(formData.mobile) || otpSent}
            >
              {otpSent ? "OTP Sent" : "Send OTP"}
            </button>
          </div>
        </div>

        {/* OTP Input (visible after OTP is sent) */}
        {otpSent && !otpVerified && (
          <div className="mb-3">
            <label className="form-label">Enter OTP</label>
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  if (otp === serverOtp) {
                    setOtpVerified(true);
                    setMessage("OTP verified successfully.");
                  } else {
                    setMessage("Invalid OTP. Please try again.");
                  }
                }}
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Password *</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="form-control"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            name="gender"
            className="form-control"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Driving License No</label>
          <input
            type="text"
            name="dlNo"
            className="form-control"
            value={formData.dlNo}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Aadhar No</label>
          <input
            type="text"
            name="aadharNo"
            className="form-control"
            value={formData.aadharNo}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!otpVerified}
        >
          Signup
        </button>
      </form>
    </div>
  );
}
