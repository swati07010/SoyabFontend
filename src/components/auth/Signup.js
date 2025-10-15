import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

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
  const [showTerms, setShowTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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
      const res = await axios.post(
        "http://localhost:5000/send-otp-new",
        {
          mobile: formData.mobile,
        },
        {}
      );
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
          <div className="signup-mobile ">
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

        <div className="mb-3 signup-terms-row">
          <label className="form-label signup-terms-row">
            <input
              type="radio"
              name="terms"
              checked={acceptedTerms}
              onChange={() => setShowTerms(true)}
              className="signup-terms-radio"
            />
            &nbsp;I accept Terms & Conditions
          </label>
        </div>

        {/* Terms Popup */}
        {showTerms && (
          <div className="signup-tcpopup-overlay">
            <div className="signup-tcpopup">
              <h3>Terms And Condition</h3>
              <div className="signup-tcpopup-info">
                <h3>1. Eligibility</h3>
                <p>
                  1.1. The Services are available only to persons who can enter
                  legally binding contracts under Indian Contract Act, 1872 and
                  are above the age of 16+ years, without previous criminal
                  records and without any restrictions on driving due to any
                  medical conditions or any other restrictions imposed under any
                  law including but not limiting to the Motor Vehicles Act,
                  1988, as amended from time to time.
                </p>
                <p>1.2. ORIGINAL Aadhaaris mandatory at the time of pick-up.</p>
                <p>
                  1.3. Local IDs, Students Must carry their
                  Job/Collage/institution ID Card for the Address Proof. Without
                  absence of Institution/Job/College ID, Local IDs are not
                  eligible to rent a scooty under Eko smart drive
                </p>
                <p>
                  1.4. Upload your Adhar Card,Driving license (not mandatory) or
                  Other ID & Live Photo for the Pre-verification of your
                  documents.
                </p>
                <p>
                  1.5. In the absence of any Valid Documents the booking will be
                  treated as Cancelled and Rs.500/- will be deducted from Total
                  amount Paid.
                </p>
                <p>
                  1.6. Minimum 16+ years age is required for Premium Range
                  vehicles.
                </p>
                <p>
                  1.7. Persons who are not-competent to contract within the
                  meaning of the Indian Contract Act, 1872 including minors(less
                  than 16) , un-discharged insolvents, and person of unsound
                  mind are not eligible to use the Platform or avail the
                  Services.
                </p>
                <p>
                  1.8. Any person under the age of 16 shall not register as a
                  User of the Platform and shall not transact on or use the
                  Platform.
                </p>
                <p>
                  1.9. EKO Smart Drive the right to terminate any Users
                  membership and/or refuse to provide such User with access to
                  the Platform and/or initiate appropriate action against any
                  User if it is brought to EKO Smart Drive or if it is
                  discovered that such User is not eligible to use the Platform
                  and/or avail the Services.
                </p>
              </div>

              <div class="tcpopup-info">
                <h3>2. Responsibilities Of The User</h3>
                <p>
                  2.1. The Vehicle shall be self-driven by the User only, and
                  the User shall not assign/subrent/license the Vehicle to any
                  other person whatsoever.
                </p>
                <p>
                  2.2. The User through whose account the Services are availed
                  shall be responsible for compliance with these Terms and
                  Conditions and other laws. Such User shall be liable for all
                  losses, including but not limited to claims, actions, demands,
                  damages, penalties, fines, and liability arising in case of
                  contravention of these Terms and Conditions or any law.
                </p>
                <p>
                  2.3. The User shall present the original photo identity
                  documents uploaded on the Platform while availing the
                  Services, at the time of obtaining delivery of the Vehicle,
                  failing which EKO Smart Drive shall be entitled to refuse the
                  delivery of the Vehicle and cancel the Services. In such an
                  event, both the booking amount and security amount shall be
                  forfeited, and no refund will be made.
                </p>
                <p>
                  2.4. The User will provide contact details of an emergency
                  contact while availing the Services on the Platform.
                </p>
                <p>
                  2.5. Unlimited Kilometers Only applicable on & above 24 Hours
                  Bookings.
                </p>
                <p>2.6. 250 Kms is Limited for 12 Hours Booking.</p>
                <p>
                  2.7. The User will inform EKO Smart Drive about the
                  destination where the Vehicle will be driven and the route
                  taken to reach such destination.
                </p>
                <p>
                  2.8. The User shall return the Vehicle to the agreed return
                  location and on the date and time specified in the Invoice,
                  unless the User requests and EKO Smart Drive agrees to an
                  extension in writing, or sooner upon demand being made by EKO
                  Smart Drive.
                </p>
                <p>
                  2.9. Upon the User’s request, EKO Smart Drive may provide a
                  pick-up facility for the Vehicle from the User. The charges
                  for such a facility will be as mentioned in the Invoice or as
                  intimated by EKO Smart Drive to the User while processing such
                  a request.
                </p>
                <p>
                  2.10. The User shall ensure that the Vehicle at the time of
                  return is in proper operating condition, undamaged, and clean.
                </p>
                <p>
                  2.11. In the event of any damage caused to the Vehicle, other
                  than normal wear thereof, the User agrees to repair and/or
                  replace the damaged Vehicle part at their own expense with a
                  new Vehicle part of the same dimension/branding from an
                  authorized service center for such Vehicle as intimated by EKO
                  Smart Drive and after obtaining prior approval from EKO Smart
                  Drive.
                </p>
                <p>
                  2.12. In case of loss or damage to any of the papers or
                  documents pertaining to the Vehicle during the Rental Period,
                  the User will pay EKO Smart Drive all the expenses incurred by
                  it in applying for such documents, and the User will also be
                  liable to pay a fine of INR 10,000 (Rupees Ten Thousand only)*
                  to EKO Smart Drive upon demand.
                </p>
                <p>
                  2.13. The Vehicle, including the odometer of the Vehicle,
                  shall not be damaged or tampered with, and in case of such
                  damage or tampering, the User shall be liable for the cost of
                  replacement of the same. EKO Smart Drive's judgment on the
                  damage and/or tampering with the Vehicle, the odometer shall
                  be final.
                </p>
                <p>
                  2.14. The User shall not damage, tamper, remove, or make any
                  changes to the registered number plate of the Vehicle. In case
                  of violation of this requirement, the User shall be liable to
                  pay such penalties as imposed by EKO Smart Drive at its sole
                  discretion. Additionally, EKO Smart Drive reserves the right
                  to take legal recourse against the User as deemed fit by EKO
                  Smart Drive.
                </p>
                <p>
                  2.15. No smoking is permitted inside the Vehicle. Failure to
                  comply with this requirement may lead to the immediate
                  cancellation of the Services, without a refund. Moreover, the
                  User may be held liable for the charges related to cleaning
                  the Vehicle, as well as any damage caused by burns to any part
                  of the Vehicle, including without limitation the seats and/or
                  the carpets (flooring).
                </p>
                <p>
                  2.16. The User’s acceptance of delivery of the Vehicle will be
                  considered the User’s acknowledgment of having received the
                  Vehicle in good condition. The User shall be solely liable for
                  the cost of all fuel consumed during the Rental Period.
                </p>
                <p>
                  2.17. The User is permitted a buffer of 30 (Thirty) minutes
                  for returning the Vehicle subject to payment of late returning
                  charges as mentioned in the Invoice and as intimated on the
                  Platform at the time of availing the Services, post which the
                  next hour rental will be applicable, as the case may be.
                </p>
                <p>
                  2.18. The User shall return the Vehicle in the same good order
                  and condition, as had been delivered to the User. The decision
                  of EKO Smart Drive in respect of the order and condition of
                  the Vehicle and Vehicle Parts shall be final.
                </p>
                <p>
                  2.19. The vehicle will be returned to EKO Smart Drive with the
                  same fuel quantity as was provided. In the event the User does
                  not provide the fuel as has been mentioned, EKO Smart Drive
                  shall have the right to charge the User for the deficit
                  quantity of the fuel.
                </p>
                <p>
                  2.20. If the Vehicle requires cleaning or washing after the
                  User has returned it, the User will be held liable for the
                  cleaning or washing expenses. The decision of EKO Smart Drive
                  in respect of the need for cleaning or washing the Vehicle
                  shall be final.
                </p>
                <p>
                  2.21. The User shall take all necessary steps to protect the
                  interest of EKO Smart Drive and its insurance company and
                  shall ensure that the Vehicle is not used for any purpose not
                  permitted by the terms and conditions of the relevant policy
                  of insurance nor do or allow to be done any act or thing
                  whereby any such policy of insurance may be avoided nor taken
                  outside any territorial limit stipulated in such policy of
                  insurance. The User shall further participate as an insured
                  under an automobile insurance policy. The User is bound by and
                  agrees to the terms and conditions thereof. The User agrees
                  further to protect the interests of EKO Smart Drive and its
                  insurance company, at its entire cost and expense, in case of
                  an accident or theft by doing the following, as applicable:
                </p>
                <span>
                  a) Taking reasonable steps to secure medical attention to the
                  injured person and ensuring that a registered medical
                  practitioner immediately attends the injured person and
                  renders medical aid to them.
                </span>
                <span>
                  b) Notifying the police immediately if another party's guilt
                  has to be ascertained, or if any person is injured.
                </span>
                <span>
                  c) Not admitting liability or guilt or giving money to any
                  persons involved in the accident before obtaining the written
                  consent of EKO Smart Drive.
                </span>
                <span>
                  d) Give on demand by a police officer any information required
                  by them or, if no police officer is present, report the
                  circumstances of the occurrence to the nearest police station
                  and in any case within 24 (Twenty Four) hours of the
                  occurrence.
                </span>
                <span>
                  e) Contacting EKO Smart Drive immediately by telephone or
                  e-mail and forwarding a copy of the FIR (if applicable) and/or
                  summons complaint or paper in relation to such loss even in
                  case of slight damage; further completing the EKO Smart Drive
                  accident report, including a diagram as required on return of
                  the Vehicle.
                </span>
                <span>
                  f) Provide all assistance to EKO Smart Drive in claiming
                  insurance from the insurance company by providing all the
                  necessary information and/or documents required by EKO Smart
                  Drive including but not limited to date, time, and place of
                  accident, particulars of the persons injured or killed in the
                  accident and the name of the driver and the particulars of
                  their driving license.
                </span>
                <span>
                  g) Pay EKO Smart Drive on demand, any expense incurred by it
                  in repairing or replacing the car, regardless of the insurance
                  coverage.
                </span>
                <span>
                  h) Obtaining names and addresses of the parties involved in
                  the accident, and of witnesses. i) Not abandoning the Vehicle
                  without prior written approval of EKO Smart Drive.
                </span>
                <p>2.22. The User shall during the Rental Period:</p>
                <span>
                  a) Always lock the Vehicle when not in use and ensure that it
                  is adequately protected against damage due to adverse weather
                  conditions, arson, riot, theft, etc.
                </span>
                <span>
                  b) Not allow any person other than personnel of an authorized
                  service center without the prior authorization of EKO Smart
                  Drive to carry out any work of any nature in any manner on the
                  Vehicle.
                </span>
                <span>
                  c) Not hold him/her out as or purport to act as the agent of
                  EKO Smart Drive for any purpose whatsoever.
                </span>
                <span>
                  d) Be fully responsible for any loss or damage caused to the
                  Vehicle, howsoever occasioned other than normal wear and tear.
                  The User shall give immediate notice to EKO Smart Drive and
                  subsequently confirm in writing by sending through speed
                  post/courier and also e-mail within 24 (Twenty Four) hours of
                  any loss or damage caused to the Vehicle or any breakdown,
                  malfunction, or other failure thereof. The obligations of the
                  User hereunder shall not be prejudiced by the existence of any
                  policy of insurance in respect thereof. The User shall not
                  continue to use the Vehicle in the event of damage to or a
                  breakdown of the Vehicle if to do so would or might cause
                  further damage to the Vehicle.
                </span>
                <span>e) Not permit any pets inside the Vehicle.</span>
                <span>f) Not consume any food inside the Vehicle.</span>
                <span>
                  g) Neither remove nor change or tamper with the number plate,
                  any name, or other mark identifying the ownership of the
                  Vehicle.
                </span>
                <span>
                  h) Neither use nor allow the Vehicle to be used for any
                  illegal purposes or for any purpose for which it is not
                  suitable or desirable.
                </span>
                <span>
                  i) Neither use nor allow anyone to carry passengers more than
                  permitted by the registration paper.
                </span>
                <span>
                  j) Acknowledge that the Vehicle is and shall be throughout the
                  period of its hiring be the sole property of EKO Smart Drive
                  and/or its affiliates and all rights thereto shall vest in EKO
                  Smart Drive and/or its affiliates.
                </span>
                <span>
                  k) Inform EKO Smart Drive about the location of the Vehicle at
                  timely intervals as mentioned in the Invoice.
                </span>
                <p>
                  2.23. The User shall adhere to the following rules while
                  driving the Vehicle:
                </p>
                <span>
                  a) The User shall not drive the Vehicle in any public place at
                  a speed exceeding the maximum speed permitted under the Motor
                  Vehicles Act, 1988.
                </span>
                <span>
                  b) The User shall comply with all obligations under the Motor
                  Vehicles Act, 1988, including compliance with requirements
                  relating to the Driver’s license, vehicle registration,
                  fitness, insurance, permit, emissions, and other matters.
                </span>
                <span>
                  c) The User shall not drive the Vehicle under the influence of
                  alcohol, drugs, or any other toxic or addictive substance, and
                  the decision of EKO Smart Drive in this regard shall be final.
                </span>
                <span>
                  d) The User shall not use the Vehicle for racing, pace-making,
                  reliability trials, speed testing, or driving instruction
                  purposes or propel or tow any vehicle or trailer.
                </span>
                <span>
                  e) The User shall not drive or allow any other person to drive
                  the Vehicle while using a handheld phone, other communication
                  devices, or any other device in any manner whatsoever which
                  might distract the driver.
                </span>
                <span>f) The User shall be 16 years of age or above.</span>

                <div>
                  <div class="tcpopup-info">
                    <h3>3. Disclaimer Regarding Services</h3>
                    <p>
                      3.1. The User acknowledges that using the Services is at
                      their own risk. EKO Smart Drive disclaims all
                      representations and warranties of any kind, whether
                      express or implied, regarding the condition, suitability,
                      quality, merchantability, and fitness of the Services it
                      offers.
                    </p>
                    <p>
                      3.2. EKO Smart Drive shall not be held responsible or
                      liable for any loss or damage, however caused or suffered
                      by the User, arising from the use of the Services or due
                      to EKO Smart Drive's failure to provide the Services,
                      regardless of the reason, whether within or beyond the
                      control of EKO Smart Drive.
                    </p>
                  </div>

                  <div class="tcpopup-info">
                    <h3>4. Roadside Assistance</h3>
                    <p>
                      Roadside assistance may be provided in accessible areas
                      (subject to the availability of resources and a similar
                      vehicle segment in the city) in cases where the Vehicle
                      develops a problem that prevents the User from using it.
                      EKO Smart Drive will make every effort to ensure that the
                      Vehicle manufacturer or a third-party partner of EKO Smart
                      Drive provides roadside assistance to the User in such
                      situations. However, EKO Smart Drive does not guarantee
                      that a replacement vehicle will be available.
                    </p>
                  </div>

                  <div class="tcpopup-info">
                    <h3>5 EKO Smart Drive Rights</h3>
                    <p>
                      5.1. The User acknowledges that EKO Smart Drive reserves
                      the right to disclose any information (including the
                      identity of individuals providing information or materials
                      on the Platform) as necessary to comply with any law,
                      regulation, or valid governmental request. This may
                      include, without limitation, disclosing information
                      related to investigations of alleged illegal activities or
                      in response to a lawful court order or summons.
                      Furthermore, EKO Smart Drive is authorized to disclose any
                      information about the User to law enforcement or other
                      government officials in accordance with laws such as the
                      Information Technology (Procedure and Safeguards for
                      Interception, Monitoring and Decryption of Information)
                      Rules, 2009, the Information Technology (Procedure for
                      Safeguards for Blocking for Access of Information by
                      Public) Rules, 2009, the Information Technology (Procedure
                      and Safeguard for Monitoring and Collecting Traffic Data
                      or Information) Rules, 2009, Information Technology
                      (Reasonable Security Practices and Procedures and
                      Sensitive Personal Data or Information) Rules, 2011, or
                      any other applicable law, as EKO Smart Drive deems
                      necessary or appropriate for the investigation and/or
                      resolution of possible crimes, especially those that may
                      involve personal injury.
                    </p>
                    <p>
                      5.2. The User understands that EKO Smart Drive has the
                      right to track the Vehicle using GPS for security reasons
                      and/or any other reasons deemed necessary by EKO Smart
                      Drive.
                    </p>
                    <p>
                      5.3. In the event of any breach by the User of the terms
                      and conditions, EKO Smart Drive may repossess the Vehicle
                      without notice. For this purpose, EKO Smart Drive may
                      enter the premises where the Vehicle is located and remove
                      it. The User shall be responsible for and indemnify EKO
                      Smart Drive against all actions, claims, costs, and
                      damages arising from such repossession and removal.
                    </p>
                    <p>
                      5.4. The User acknowledges that EKO Smart Drive has the
                      right to retain the User’s credit/debit card, internet
                      banking, or e-wallet details to satisfy any claims that
                      may arise in the future due to any reason attributable to
                      the User.
                    </p>
                  </div>
                  <div class="tcpopup-info">
                    <h3>6. Payments</h3>
                    <p>
                      6.1. The User acknowledges that EKO Smart Drive reserves
                      the right to disclose any information (including the
                      identity of individuals providing information or materials
                      on the Platform) as necessary to comply with any law,
                      regulation, or valid governmental request. This may
                      include, without limitation, disclosing information
                      related to investigations of alleged illegal activities or
                      in response to a lawful court order or summons.
                      Furthermore, EKO Smart Drive is authorized to disclose any
                      information about the User to law enforcement or other
                      government officials in accordance with laws such as the
                      Information Technology (Procedure and Safeguards for
                      Interception, Monitoring and Decryption of Information)
                      Rules, 2009, the Information Technology (Procedure for
                      Safeguards for Blocking for Access of Information by
                      Public) Rules, 2009, the Information Technology (Procedure
                      and Safeguard for Monitoring and Collecting Traffic Data
                      or Information) Rules, 2009, Information Technology
                      (Reasonable Security Practices and Procedures and
                      Sensitive Personal Data or Information) Rules, 2011, or
                      any other applicable law, as EKO Smart Drive deems
                      necessary or appropriate for the investigation and/or
                      resolution of possible crimes, especially those that may
                      involve personal injury.
                    </p>
                    <p>
                      6.2. The User understands that EKO Smart Drive has the
                      right to track the e-scooter using GPS for security
                      reasons and/or any other reasons deemed necessary by EKO
                      Smart Drive.
                    </p>
                    <p>
                      6.3. In the event of any breach by the User of the terms
                      and conditions, EKO Smart Drive may repossess the
                      e-scooter without notice. For this purpose, EKO Smart
                      Drive may enter the premises where the e-scooter is
                      located and remove it. The User shall be responsible for
                      and indemnify EKO Smart Drive against all actions, claims,
                      costs, and damages arising from such repossession and
                      removal.
                    </p>
                    <p>
                      6.4. The User acknowledges that EKO Smart Drive has the
                      right to retain the User’s credit/debit card, internet
                      banking, or e-wallet details to satisfy any claims that
                      may arise in the future due to any reason attributable to
                      the User.
                    </p>
                    <hr />
                    <p>Schedule of Additional Charges</p>
                    <div class="flex space-between paymentcondition gap-10">
                      <p>Sl No.</p>
                      <p>Action / Non-compliance</p>
                      <p>Additional Amounts / Surcharges</p>
                    </div>
                    <div class="flex space-between paymentcondition gap-10">
                      <p>1</p>
                      <p>Failure to return scootey before 9 pm</p>
                      <p>Rs. 1,00/-</p>
                    </div>
                    <div class="flex space-between paymentcondition gap-10">
                      <p>2</p>
                      <p>
                        If there is any damage then accordingly You have to pay
                      </p>
                      <p>Rs. charges According to damage</p>
                    </div>
                  </div>

                  <div class="tcpopup-info">
                    <h3>8. Collection of Personal Data</h3>
                    <p>
                      8.1. By availing the Services through the Platform, the
                      User authorizes EKO Smart Drive to collect personal
                      information (including but not limited to name, contact
                      preferences, telephone number, mailing address, email
                      address, e-scooter use data, location tracking, driver's
                      record, personal identification documents, driver's
                      license, vehicle history report from all applicable
                      entities and authorities) ("Personal Information") and
                      other non-Personal Information about the User. EKO Smart
                      Drive may use and/or disclose this information if it
                      believes that access, use, preservation, or disclosure of
                      such information is reasonably necessary to: (a) satisfy
                      any applicable law, regulation, legal process, or
                      enforceable governmental request, including to law
                      enforcement and in response to a court order; (b) detect,
                      prevent, or otherwise address fraud, technical, or
                      security issues; (c) enforce applicable terms and
                      conditions, including the investigation of potential
                      violations thereof; (d) protect against harm to the rights
                      or safety of the e-scooter or other properties of EKO
                      Smart Drive, its users, or the public as required or
                      permitted by law; or (e) protect EKO Smart Drive against
                      third-party claims. EKO Smart Drive may also provide
                      and/or disclose such information to any other trusted
                      businesses or persons for the purpose of processing
                      personal information on behalf of EKO Smart Drive.
                      However, EKO Smart Drive shall not be liable for any
                      misuse of any personal or non-Personal Information of the
                      User by any third party.
                    </p>

                    <p>
                      8.2. By availing the Services, the User agrees that the
                      information provided on the Platform may be stored,
                      processed, and transmitted manually/electronically by EKO
                      Smart Drive. The User also agrees to provide accurate
                      information on the Platform while availing the Services
                      and shall be liable for any damages and disputes arising
                      due to the inaccuracy of the information.
                    </p>
                    <p>
                      8.3. EKO Smart Drive contracts with third-party vendors,
                      including Google, to display advertisements on behalf of
                      EKO Smart Drive across the internet. These third-party
                      vendors may use information (not including the User's
                      name, address, email address, or telephone number) about
                      the User’s visits to the Platform and interaction with EKO
                      Smart Drive's goods and services on the Platform and use
                      cookies to display such advertisements on behalf of EKO
                      Smart Drive across the internet. Users may opt out of
                      third-party vendors' use of "cookies" by visiting Google’s
                      Ads Settings. By continued use of the Platform, the User
                      accepts and agrees to such information being collected by
                      third-party vendors. EKO Smart Drive shall, however, not
                      be liable for misuse of such information of the User by
                      any third-party vendor.
                    </p>
                  </div>

                  <div class="tcpopup-info">
                    <h3>9. Trademark, Copyright, and Restriction</h3>
                    <p>
                      9.1. The Platform is controlled and operated by EKO Smart
                      Drive. All material on the Platform, including artwork,
                      computer code, design, structure, selection, coordination,
                      expression, the look, feel, and arrangement of the content
                      on the Platform, images, illustrations, audio clips, and
                      video clips, are protected by copyrights, trademarks, and
                      other intellectual property rights. Material on the
                      Platform is solely for the User’s personal, non-commercial
                      use. The User must not copy, reproduce, republish, upload,
                      post, transmit, or distribute such material in any way,
                      including by email or other electronic means, whether
                      directly or indirectly, and must not assist any other
                      person in doing so.
                    </p>
                    <p>
                      9.2. EKO Smart Drive respects the intellectual property of
                      others. If any person feels that their intellectual
                      property has been infringed, they can write to EKO Smart
                      Drive at smartdrive5640@gmail.com.
                    </p>
                  </div>

                  <div class="tcpopup-info">
                    <h3>10. Indemnity</h3>
                    <p>
                      10.1. The User hereby releases and agrees to indemnify EKO
                      Smart Drive from and against any liability for loss or
                      damage to any property (including costs relating thereto)
                      left, stored, or transported by the User or any other
                      person in or upon the e-scooter before or after its
                      return.
                    </p>
                    <p>
                      10.2. The User shall be solely responsible for and shall
                      keep EKO Smart Drive fully indemnified against any loss,
                      theft, damage, costs, accident, or injury (including
                      death) to persons or property, including loss, theft,
                      damage, or accident involving the e-scooter, accruing in
                      connection with the e-scooter or as a result of its
                      negligent use, and against any breach of obligation by the
                      User of the e-scooter.
                    </p>
                    <p>
                      10.3. The User shall keep EKO Smart Drive, including its
                      directors, employees, and shareholders, fully indemnified
                      against all losses, liabilities, costs, actions, claims,
                      fines, or penalties imposed (collectively "Losses") in
                      respect of these Terms and Conditions or arising out of or
                      in connection with the use of the e-scooter, including
                      Losses arising from any thirdparty liability, damage to
                      the e-scooter, accidents, illegal use of the e-scooter,
                      misrepresentation, or breach of obligations by the User.
                    </p>
                    <p>
                      10.4. The User acknowledges that, for the purposes of the
                      Motor Vehicles Act, 1988, the User shall be liable in
                      respect of the e-scooter for any offences committed under
                      applicable law and for any liability with respect to the
                      use of the e-scooter, including but not limited to any
                      challans, penalties, third-party liability, accidents, and
                      the User shall indemnify against any losses, damages,
                      costs, and liabilities in this regard.
                    </p>
                  </div>

                  <div class="tcpopup-info">
                    <h3>11. Limitation of Liability</h3>
                    <p>
                      11.1. In no event shall EKO Smart Drive be liable for any
                      special, incidental, indirect, or consequential damages of
                      any kind in connection with these Terms and Conditions and
                      the Services, even if the User has been informed in
                      advance of the possibility of such damages.
                    </p>
                    <p>
                      11.2. Subject to the above and notwithstanding anything to
                      the contrary contained in these Terms and Conditions, the
                      maximum aggregate liability (whether in contract, tort
                      (including negligence) or equity) of EKO Smart Drive
                      towards any User, regardless of the form of claim, shall
                      be INR [amount].
                    </p>
                    <p>
                      11.3. The foregoing limitations of liability will apply
                      notwithstanding the failure of the essential purpose of
                      any limited remedy herein.
                    </p>
                  </div>

                  <div class="tcpopup-info">
                    <h3>12. Liquidated Damages</h3>
                    <p>
                      The User acknowledges that EKO Smart Drive has agreed to
                      provide the Services based on the representations and
                      warranties set out herein and the covenants provided by
                      the User. In the event that the e-scooter is damaged,
                      stolen, or destroyed due to any of the representations or
                      warranties provided by the User being untrue or due to the
                      breach of any covenants of the User, EKO Smart Drive, at
                      its sole discretion and regardless of any insurance
                      coverage, will be entitled to seek damages in the nature
                      of liquidated damages (not being a penalty) as follows:
                      (a) an amount of INR 10,000 (Rupees Ten Thousand only)* or
                      (b) the sum of the following, (i) 100% of the losses
                      incurred by EKO Smart Drive in repairing and restoring the
                      e-scooter; and (ii) 100% of the value of the e-scooter,
                      whichever is higher**.
                    </p>
                  </div>

                  <div class="tcpopup-info">
                    <h3>13. Applicable Law</h3>
                    <p>
                      The Terms of Use shall be governed by, interpreted, and
                      construed in accordance with the laws of India. The place
                      of jurisdiction shall be exclusively in Pan India.
                    </p>
                  </div>

                  <div class="tcpopup-info">
                    <h3>14. Jurisdiction For Dispute Resolution</h3>
                    <p>
                      14.1. Any dispute or disagreement arising out of these
                      Terms and Conditions, including but not limited to issues
                      relating to the rights and liabilities of both the Users
                      and/or EKO Smart Drive, interpretation of these Terms and
                      Conditions, and all such other issues arising out of these
                      Terms and Conditions, shall be referred to a sole
                      arbitrator appointed by EKO Smart Drive.
                    </p>
                    <p>
                      14.2. The arbitration proceedings will be governed by the
                      Arbitration and Conciliation Act, 1996. The arbitration
                      proceedings shall be held in Bhubaneswar, India, and
                      conducted in English.
                    </p>
                    <p>
                      14.3. The Terms and Conditions will be enforceable, and
                      any arbitration award will be final, and judgment thereon
                      may be entered in any court of competent jurisdiction.
                    </p>
                    <p>
                      14.4. To the extent permitted under the Arbitration and
                      Conciliation Act, 1996, the User agrees that all claims,
                      differences, and disputes arising under or in connection
                      with or in relation to these Terms and Conditions and the
                      Services, or any transaction entered into on or through
                      the Platform or the relationship between the User and EKO
                      Smart Drive shall be subject to the exclusive jurisdiction
                      of the courts at Bhubaneswar. The User hereby accedes to
                      and accepts the jurisdiction of such courts.
                    </p>
                  </div>

                  <div class="tcpopup-info">
                    <h3>15. Contact Us</h3>
                    <p>
                      Please send any questions or comments (including all
                      inquiries related to copyright infringement) regarding
                      this Platform to support@ekosmartdrive.in.
                    </p>
                  </div>

                  <div class="tcpopup-info">
                    <h3>16. More important Terms-</h3>
                    <p>1. Liability Disclaimer</p>
                    <span>
                      EKO Smart Drive is not responsible for any accidents or
                      damages to the customer, driver, or any other person and
                      their vehicle.
                    </span>
                    <p>2. Insurance Information</p>
                    <span>
                      Non-RTO (Regional Transport Office) vehicles are generally
                      not insured.
                    </span>
                    <p>3. Damage Charges</p>
                    <span>
                      In the event of any damage, whether minor or major, the
                      customer is required to pay the corresponding amount for
                      repairs.
                    </span>
                    <p>4. Legal Action for Non-Payment</p>
                    <span>
                      If the customer fails to pay the damage charges, EKO Smart
                      Drive will take legal action against them.
                    </span>
                    <p>5. Aadhaar Card</p>
                    <span>
                      Submission of Aadhaar is mandatory, along with any other
                      ID such as a Student ID, PAN Card, or Driving License.
                    </span>
                    <p>6. Age Requirement</p>
                    <span>A minimum age of 16+ is mandatory for driving.</span>
                    <p>7. Use of Vehicles</p>
                    <span>
                      Vehicles are to be used strictly for lawful purposes. The
                      customer is responsible for adhering to traffic laws and
                      regulations.
                    </span>
                    <p>8. Termination of Agreement</p>
                    <span>
                      EKO Smart Drive reserves the right to terminate the
                      service agreement if the terms and conditions are
                      violated.
                    </span>
                    <p>9. Customer Responsibilities</p>
                    <span>
                      The customer is responsible for ensuring that the vehicle
                      is returned in the same condition as it was rented. Any
                      damages or missing items will be charged to the customer.
                    </span>
                    <p>10. Emergency Contact</p>
                    <span>
                      In case of emergencies, customers should contact the 24/7
                      support line immediately.
                    </span>
                    <p>11. Reservation and Booking</p>
                    <span>
                      All reservations and bookings are subject to availability.
                      EKO Smart Drive reserves the right to cancel or modify
                      bookings as necessary.
                    </span>
                  </div>
                </div>
                {/* ...rest of your terms... */}
              </div>
              <button
                className="signup-accept-btn"
                onClick={() => {
                  setAcceptedTerms(true);
                  setShowTerms(false);
                }}
              >
                Accept
              </button>
              <button
                className="signup-close-btn"
                onClick={() => setShowTerms(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!otpVerified || !acceptedTerms}
        >
          Signup
        </button>
      </form>
    </div>
  );
}
