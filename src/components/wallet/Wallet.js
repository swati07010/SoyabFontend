import React, { useState, useEffect } from "react";
import "./Wallet.css";
import { Link } from "react-router-dom";

const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [withdrawOption, setWithdrawOption] = useState(null);

  useEffect(() => {
    // Dummy API simulation
    const fetchWalletnSecurityAmt = () =>
      Promise.resolve({ walletBalance: 1200 });

    fetchWalletnSecurityAmt().then((data) => {
      setWalletBalance(data.walletBalance);
    });
  }, []);

  const handleWithdraw = () => {
    setWithdrawOption("options");
  };

  const handleSubmit = () => {
    if (withdrawOption === "upi") {
      alert("Withdraw requested via UPI");
    } else if (withdrawOption === "bank") {
      alert("Withdraw requested via Bank");
    }
  };

  return (
    <div className="wallet-wrapper">
      {/* Reuse account-header style */}
      <div className="wallet-header">
        <Link to="/profile" className="wallet-left">
          <i className="bi bi-chevron-left"></i>
        </Link>
        <h1 className="wallet-title">Wallet</h1>
      </div>

      <div className="wallet-grid">
        <div className="wallet-box mt-20">
          <div className="wallet-first flex gap-10">
            <p className="wallet-total-amount">Rs. {walletBalance}</p>
          </div>
        </div>

        <div className="wallet-withdraw-container">
          <button onClick={handleWithdraw}>Withdraw</button>

          {withdrawOption === "options" && (
            <div className="wallet-withdraw-options">
              <button onClick={() => setWithdrawOption("upi")}>UPI</button>
              <button onClick={() => setWithdrawOption("bank")}>Bank</button>
            </div>
          )}

          {/* UPI field */}
          {withdrawOption === "upi" && (
            <div className="wallet-inputs">
              <input type="text" placeholder="UPI Id" />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}

          {/* Bank fields */}
          {withdrawOption === "bank" && (
            <div className="wallet-inputs">
              <input type="text" placeholder="Bank Name" />
              <input type="text" placeholder="Account Number" />
              <input type="text" placeholder="IFSC CODE" />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
