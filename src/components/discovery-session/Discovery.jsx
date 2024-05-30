import React, { useState } from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";
import {validateForm} from "../lib/data-validation";
import "./Discovery.css";

function Discovery({ onClose }) {
  const [error, setErrors] = useState({});

  async function sendReq(e) {
    e.preventDefault();

    const formElement = e.target;
    console.log({ formElement });

    const { email, phoneNumber } = formElement;
    const formData = {
      name: "Discovery Request",
      email: email.value,
      subject: "15 Min Discovery Request",
      message: `Please call me at: ${phoneNumber.value}`,
      phoneNumber: phoneNumber.value,
    };

    console.log({ formData });

    const validationErrors = validateForm(formData);
    console.log({ validationErrors });

    //Object,keys() - get the number of keys present in the object -make use of the length of the object
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await emailjs.send(
        "service_bkdsijs",
        "template_l9qb4c6",
        formData,
        "BDRrK2lWt0mqQFqYu"
      );
      if (response.status === 200) {
        alert("Request successfully sent!");
        formElement.reset();
        onClose();
      }
    } catch (error) {
      alert("Error in sending request, please retry or refresh and retry");
    }
  }

  return (
    <div>
      <form className="message-box" onSubmit={sendReq}>
        <p className="p-title">15 Min Discovery Session</p>
        <p>
          Please fill in your email and phone number to request a 15 minutes
          discovery session with one of our therapists.
        </p>
        <p>
          We will contact you, provided your phone number and email are correct.
        </p>

        <label htmlFor="phoneNumber">Phone Number</label>
        {error.phoneNumber && (
          <span className="error-message">{error.phoneNumber}</span>
        )}
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="type here"
        />

        <label htmlFor="email">Email</label>
        {error.email && <span className="error-message">{error.email}</span>}
        <input type="email" id="email" name="email" placeholder="type here" />

        <button type="submit">Send Request</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Discovery;

Discovery.propTypes = {
  onClose: PropTypes.func.isRequired,
};
