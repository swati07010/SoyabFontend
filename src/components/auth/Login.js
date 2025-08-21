import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFail } from "../../features/auth/authSlice"; // ✅ import actions
import "./Login.css";

function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoggedIn, message } = useSelector((state) => state.auth); // ✅ get auth state

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        mobile,
        password,
      });

      // Save to localStorage (optional)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Dispatch to Redux store
      dispatch(loginSuccess(res.data));
      console.log("Login successful:", res.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Server error";
      dispatch(loginFail(errorMessage));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/documents");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={handleLogin}>
          <label>Mobile Number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button type="submit">Login</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
