import React, { useState, useEffect } from "react";
import "./Documents.css";
import axios from "axios";

const Documents = () => {
  const [formData, setFormData] = useState({
    aadhaarFront: null,
    aadhaarBack: null,
    idFront: null,
    idBack: null,
    licenseOrProof: null,
    address: "",
  });

  const [mobile, setMobile] = useState(null);

  // Fetch user info from backend (cookies will be sent automatically with `withCredentials: true`)
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/me", {
  //         withCredentials: true, // important for cookies
  //       });
  //       setMobile(response.data.mobile);
  //     } catch (error) {
  //       console.error(
  //         "Failed to fetch user:",
  //         error.response?.data || error.message
  //       );
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const handleChange = (e) => {
    const { name, files, value } = e.target;

    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobile) {
      alert("User not logged in");
      return;
    }

    const data = new FormData();
    data.append("mobile", mobile);
    data.append("address", formData.address);

    for (const key in formData) {
      if (key !== "address" && formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/upload-documents",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // include cookies
        }
      );

      console.log("Upload success:", response.data);
      alert("Documents uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Upload failed!");
    }
  };

  return (
    <div className="documents-container">
      <h2 className="documents-title">Upload Your Documents</h2>
      <form onSubmit={handleSubmit} className="documents-form">
        <div className="form-group">
          <label>Aadhaar Card (Front)</label>
          <input
            type="file"
            name="aadhaarFront"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Aadhaar Card (Back)</label>
          <input
            type="file"
            name="aadhaarBack"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>ID Card (Front)</label>
          <input type="file" name="idFront" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>ID Card (Back)</label>
          <input type="file" name="idBack" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Driving License or Address Proof</label>
          <input
            type="file"
            name="licenseOrProof"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Your Address</label>
          <textarea
            name="address"
            className="form-control"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Documents;
