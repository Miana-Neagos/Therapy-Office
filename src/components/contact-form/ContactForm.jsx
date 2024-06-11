import { useState } from "react";
import {validateForm} from "../lib/data-validation";
import "./ContactForm.css";
import emailjs from "@emailjs/browser"; // need to import EmailJS library for sending emails

// Contact Form component does what it's name actually says and uses a service called EmailJS to manage incoming messages from users/visitors
function ContactForm() {
  // below states manage errors from form validation and form submission status
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);

  // function to handle form submission
  async function sendForm(e) {
    e.preventDefault();

    const formElement = e.target;
    const { name, email, subject, message } = formElement;

    //final format for data to be sent via EmailJS
    const formData = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };

    // using a validation form data function and set errors if any -see "lib" folder for validation function
    const validationErrors = validateForm(formData);
    
    /**
    * function checks for any errors inside the errors object, function is exited  if any validation errors 
    * errors object must be empty to proceed to sending the form 
    */
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    } 

    // send the form data using EmailJS service
    try {
      const response = await emailjs.sendForm(
          "service_bkdsijs",
          "template_l9qb4c6",
          e.target,
          "BDRrK2lWt0mqQFqYu"
        )
        if(response.status === 200) {
            formElement.reset();
            // clearing any error messages and updating submission status
            setErrors({});
            setSubmitStatus(true);
          }
    }
      catch(error) {
          alert('Error in sending contact form, please retry or refresh and retry');
          //will not reset/clear the form as user might want to copy the content of the message box before refreshing
          setSubmitStatus(false);
        }
    }
  
  return (
    <div id="contact">
      <div className="contact-container">
        <h3>Contact Us</h3>
        {!submitStatus? (
            <form className="contact-form" onSubmit={sendForm}>
              <div className="fieldset-container">
                <fieldset className="fieldset1">
                  <label htmlFor="name">Name:</label>
                  {errors.name ? <span className="error-message">{errors.name}</span> : ''}
                  <input type="text" id="name" placeholder="type here" name="name" />

                  <label htmlFor="email">Email Address:</label>
                  {errors.email ? <span className="error-message">{errors.email}</span> : ''}
                  <input type="email" id="email" placeholder="type here" name="email" />

                  <label htmlFor="subject">Subject:</label>
                  {errors.subject ? <span className="error-message">{errors.subject}</span> : ''}
                  <input type="text" id="subject" placeholder="type here" name="subject" />
                </fieldset>
                <fieldset className="fieldset2">
                  <label htmlFor="message">Your Message:</label>
                  {errors.message ? <span className="error-message">{errors.message}</span> : ''}
                  <textarea id="message" cols="30" rows="8" placeholder="type here" name="message"></textarea>
                </fieldset>
              </div>
              <input type="submit" id="contact-btn" />
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

