import React, { useState, useEffect } from "react";
import "./Help.css";
import cloud from "../../assets/icon/clouds2.png";
import help from "../../assets/icon/help2.png";
import { Link } from "react-router-dom";

const Help = () => {
  const [contacts, setContacts] = useState({
    phoneNumbers: [],
    whatsapp: "",
    email: "",
  });

  useEffect(() => {
    // Dummy API simulation for contacts
    const fetchContacts = () =>
      Promise.resolve({
        phoneNumbers: ["+91-7849826900"],
        whatsapp: "+91-7849826900",
        email: "smartdrive5640@gmail.com",
      });

    fetchContacts().then((data) => {
      setContacts(data);
    });
  }, []);

  return (
    <div className="help-wrapper">
      <div className="help-header">
        <Link to="/profile" className="help-left">
          <i className="bi bi-chevron-left"></i>
        </Link>
        <h1 className="help-title">Help And Support</h1>
      </div>
      <div className="help-main">
        <div className="help-cloud">
          <img src={cloud} alt="cloud" />
        </div>

        <div className="help-chat">
          <img src={help} alt="help" />
        </div>

        <div className="help-contact">
          <div className="help-headline">
            <p>
              How can we help <br /> you today?
            </p>
          </div>

          {/* Phone Numbers */}
          <div className="help-info phone-numbers">
            <div
              className="info-row"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <i className="bi bi-telephone-fill"></i>
              {contacts.phoneNumbers.map((num, i) => (
                <a key={i} href={`tel:${num}`}>
                  {num}
                </a>
              ))}
            </div>
          </div>

          {/* WhatsApp */}
          <div className="help-info whatsapp">
            <div
              className="info-row"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <i className="bi bi-whatsapp"></i>
              <a
                href={`https://wa.me/${contacts.whatsapp.replace("+91-", "")}`}
              >
                {contacts.whatsapp}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="help-info email">
            <div
              className="info-row"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <i className="bi bi-envelope-at-fill"></i>
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
