/* SDK VERSION */
import { useState } from "react";
import validateForm from "../lib/data-validation";
import "./ContactForm.css";
import emailjs from "@emailjs/browser";

function ContactForm() {
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState();

  function sendForm(e) {
    e.preventDefault();

    const formElement = e.target;
    const { name, email, subject, message } = formElement;
    const formData = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };

    const validationErrors = validateForm(formData);
    console.log({ validationErrors });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      emailjs
        .sendForm(
          "service_bkdsijs",
          "template_l9qb4c6",
          e.target,
          "BDRrK2lWt0mqQFqYu"
        )
        .then((response) => {
          // console.log("Email successfully sent!", response);
          if (response.status === 200) {
            formElement.reset();
            // clearing any error messages
            setErrors({});
            setSubmitStatus(true);
          }
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          setSubmitStatus(false);
        });
    }
  }

  return (
    <div id="contact">
      <div className="contact-container">
        <h3>Contact Us</h3>
        {!submitStatus? (
            <form className="contact-form" onSubmit={sendForm}>
            <label htmlFor="name">Name</label>
            {errors.name ? <span className="error-message">{errors.name}</span> : ''}
            <input type="text" id="name" placeholder="Name" name="name" />

            <label htmlFor="email">Email Address</label>
            {errors.email ? <span className="error-message">{errors.email}</span> : ''}
            <input type="email" id="email" placeholder="Email Address" name="email" />

            <label htmlFor="subject">Subject</label>
            {errors.subject ? <span className="error-message">{errors.subject}</span> : ''}
            <input type="text" id="subject" placeholder="Subject" name="subject" />

            <label htmlFor="message">Your Message</label>
            {errors.message ? <span className="error-message">{errors.message}</span> : ''}
            <textarea id="message" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
            <input type="submit" className="contact-btn" />
            
            {submitStatus === false && (
              <p className="submit-error">No bueno, retry.</p>
            )}
          </form>
        ) : (     
          <div className="submit-status-cover">
            <p>Contact form was sent. Thank you!</p>
          </div>

        )}
      </div>
    </div>
  );

}

export default ContactForm;

