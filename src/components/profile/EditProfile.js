import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFail,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFail,
} from "../../features/auth/authSlice";
import "./EditProfile.css";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, profile, loading, message } = useSelector(
    (state) => state.auth
  );

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      dispatch(fetchProfileStart());
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/edit-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(fetchProfileSuccess(data.data));
      } catch (err) {
        dispatch(
          fetchProfileFail(
            err.response?.data?.message || "Failed to fetch profile"
          )
        );
      }
    };
    fetchProfile();
  }, [dispatch]);

  // Populate local state when profile loads
  useEffect(() => {
    if (profile) {
      setUserName(profile.name || user.name || "");
      setUserEmail(profile.email || "");
      setUserPhone(profile.mobile || "");
      setProfileImg(profile.profileImage || "");
    }
  }, [profile]);

  const isMobileChanged = userPhone !== profile?.mobile;

  // Handle image change
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImg(URL.createObjectURL(file));
  };

  // const handleImgChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("profileImage", file);

  //   try {
  //     const token = localStorage.getItem("token");
  //     const { data } = await axios.post(
  //       "http://localhost:5000/upload-profile-image",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setProfileImg(data.imageUrl); // store the URL returned by server
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to upload image");
  //   }
  // };

  // Send OTP
  const handleSendOtp = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/send-otp",
        { mobile: userPhone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setServerOtp(res.data.otp); // ⚠️ Only for testing
      setOtpSent(true);
      alert("OTP sent successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    if (otp === serverOtp) {
      setOtpVerified(true);
      alert("OTP verified successfully!");
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  // Update profile
  const updateMyProfile = async () => {
    if (isMobileChanged && !otpVerified) {
      alert("Please verify OTP before changing mobile number.");
      return;
    }

    const payload = {
      name: userName,
      email: userEmail,
      profileImage: profileImg,
      newMobile: isMobileChanged ? userPhone : undefined,
      otp: isMobileChanged ? otp : undefined,
    };

    dispatch(updateProfileStart());
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        "http://localhost:5000/edit-profile",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(updateProfileSuccess(data.data));
      alert("Profile updated successfully!");

      // Reset OTP state
      setOtp("");
      setServerOtp(null);
      setOtpSent(false);
      setOtpVerified(false);
    } catch (err) {
      dispatch(
        updateProfileFail(
          err.response?.data?.message || "Profile update failed"
        )
      );
      alert(err.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="editprofile-wrapper">
      <div className="editprofile-header">
        <div className="editprofile-back" onClick={() => window.history.back()}>
          <i className="bi bi-arrow-left"></i>
        </div>
        <p className="editprofile-title">Edit Profile</p>
      </div>

      <div className="editprofile-profile-img">
        <img src={profileImg || "/default-profile.png"} alt="user" />
        <div className="editprofile-file">
          <label htmlFor="imgurl">
            <i className="bi bi-camera-fill editprocamera"></i>
          </label>
          <input type="file" id="imgurl" hidden onChange={handleImgChange} />
        </div>
      </div>

      <div className="editprofile-main">
        <div className="editprofile-field">
          <i className="bi bi-person"></i>
          <input
            type="text"
            value={userName}
            placeholder="Enter Name"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="editprofile-field">
          <i className="bi bi-envelope"></i>
          <input
            type="email"
            value={userEmail}
            placeholder="Enter Email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <div className="editprofile-field">
          <i className="bi bi-telephone"></i>
          <input
            type="text"
            value={userPhone}
            placeholder="Enter Mobile"
            onChange={(e) => {
              setUserPhone(e.target.value);
              setOtpSent(false);
              setOtpVerified(false);
              setOtp("");
              setServerOtp(null);
            }}
          />
          {isMobileChanged && !otpVerified && (
            <button
              type="button"
              className="btn btn-outline-secondary mt-2"
              onClick={handleSendOtp}
              disabled={!/^[6-9]\d{9}$/.test(userPhone) || otpSent}
            >
              {otpSent ? "OTP Sent" : "Send OTP"}
            </button>
          )}
        </div>

        {otpSent && !otpVerified && (
          <div className="editprofile-field mt-2">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-success mt-2"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </div>
        )}

        <button
          className="editprofile-btn mt-3"
          onClick={updateMyProfile}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

        {message && <p className="editprofile-message">{message}</p>}
      </div>
    </div>
  );
};

export default EditProfile;
