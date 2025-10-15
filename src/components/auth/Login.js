import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFail } from "../../features/auth/authSlice";
import "./Login.css";
import evimg from "../../assets/ev-img.png";

function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  // 🔹 Normal login flow
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { mobile, password },
        { withCredentials: true } // send & receive cookies
      );

      dispatch(loginSuccess(res.data));
      setMessage("Login successful ✅");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      dispatch(loginFail(errorMessage));
      setMessage(errorMessage);
    }
  };

  // 🔹 Forgot password flow
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/forgot-password/send-otp",
        { mobile }
      );
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/forgot-password/verify-otp",
        { mobile, otp }
      );
      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/forgot-password/reset",
        { mobile, newPassword }
      );
      setMessage(res.data.message);
      setForgotPassword(false);
      setStep(1);
    } catch (err) {
      setMessage(err.response?.data?.message || "Reset failed");
    }
  };

  // 🔹 Redirect after login
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/documents");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={evimg} alt="EV" className="evimg" />
        {!forgotPassword ? (
          <>
            <h2>Welcome Back</h2>
            <form onSubmit={handleLogin}>
              <label>Mobile Number</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Login</button>
            </form>

            <p
              className="forgotpassword"
              onClick={() => setForgotPassword(true)}
            >
              Forgot Password?
            </p>
          </>
        ) : (
          <>
            <h2>Reset Password</h2>
            {step === 1 && (
              <form onSubmit={handleForgotPassword}>
                <label>Enter Mobile</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
                <button type="submit">Send OTP</button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOtp}>
                <label>Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type="submit">Verify OTP</button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleResetPassword}>
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button type="submit">Reset Password</button>
              </form>
            )}
          </>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
