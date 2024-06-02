import React, { useState } from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser"; // need to import EmailJS library for sending emails
import {validateForm} from "../lib/data-validation";
import "./Discovery.css";

// the component offers functionality for a home page button that sends a message with 2 inputs from the user along with some predefined data
function Discovery({ onClose }) {
  // below state manage errors from form validation
  const [error, setErrors] = useState({});

  async function sendReq(e) {
    e.preventDefault();

    const formElement = e.target;
    const { email, phoneNumber } = formElement;
    //final format for data to be sent via EmailJS
    const formData = {
      name: "Discovery Request",
      email: email.value,
      subject: "15 Min Discovery Request",
      message: `Please call me at: ${phoneNumber.value}`,
      phoneNumber: phoneNumber.value,
    };

    // using a validation form data function and set errors if any -see "lib" folder for validation function
    const validationErrors = validateForm(formData);

    // function checks for any errors inside the errors object, function is exited  if any validation errors - errors object must be empty to proceed to sending the form
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // send the form data using EmailJS service
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
        //call onClose to close the form
        onClose();
      }
    } catch (error) {
      alert("Error in sending request, please retry or refresh and retry");
    }
  }

  return (
    <div>
      <form className="message-box" onSubmit={sendReq}>
        <p className="p-title">20 Min Discovery Session</p>
        <p>
          People often feel a rainbow of emotions leading up to their first session
          or even pondering if to start going down the road.
          You can now request a 20 minutes discovery session with one of our therapists.
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
