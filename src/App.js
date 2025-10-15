import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess, logout } from "./features/auth/authSlice";
import PrivateRoute from "./components/auth/PrivateRoute";

// 🔹 Lazy load page components
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./components/auth/Login"));
const Signup = lazy(() => import("./components/auth/Signup"));
const Documents = lazy(() => import("./components/auth/Documents"));
const Profile = lazy(() => import("./components/profile/Profile"));
const EditProfile = lazy(() => import("./components/profile/EditProfile"));
const Wallet = lazy(() => import("./components/wallet/Wallet"));
const Help = lazy(() => import("./components/help/Help"));

const BookingHistory = lazy(() =>
  import("./components/booking/BookingHistory")
);
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Check login status using cookie
    axios
      .get("http://localhost:5000/me", { withCredentials: true })
      .then((res) => {
        if (res.data && res.data.user) {
          dispatch(loginSuccess({ user: res.data.user }));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [dispatch]);

  return (
    <Router>
      <Header />

      {/* Suspense should wrap all routes */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/documents"
            element={
              <PrivateRoute>
                <Documents />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/editprofile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <PrivateRoute>
                <Wallet />
              </PrivateRoute>
            }
          />
          <Route
            path="/help"
            element={
              <PrivateRoute>
                <Help />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookinghistory"
            element={
              <PrivateRoute>
                <BookingHistory />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </Router>
  );
};

export default App;
