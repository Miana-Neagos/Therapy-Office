/* SDK VERSION */
import { useState } from "react";
import validateForm from "../lib/data-validation"
import "./ContactForm.css";
import emailjs from '@emailjs/browser';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  function handleInputChange(e){
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim() // need to trim input value
    });

    // clear error message when user starts typing
    setErrors({
      ...errors,
      [name]: ""
    });
  }

  function sendForm(e){
    e.preventDefault();
    console.log({e});
    const validationErrors = validateForm(formData);
    console.log(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    else{
      emailjs.sendForm('service_bkdsijs','template_l9qb4c6', e.target,'BDRrK2lWt0mqQFqYu')
      .then(response => {
        console.log('Email successfully sent!', response);
        alert('Form was submitted./n Thank you!')
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        // clear any error messages
        setErrors({});
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
    }
  }

  return (
    <div id="contact">
      <div className="contact-form">
        <h4>Contact Us</h4>
        <form onSubmit={sendForm}>
            <label htmlFor="name"></label>
            {errors.name && <span className="error-message">{errors.name}</span>}
            <input type="text" id="name" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} className={errors.name ? "error" : ""} />
            <label htmlFor="email"></label>
            {errors.email && <span className="error-message">{errors.email}</span>}
            <input type="email" id="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleInputChange} className={errors.email ? "error" : ""}/>
            <label htmlFor="subject"></label>
            {errors.subject && <span className="error-message">{errors.subject}</span>}
            <input type="text" id="subject" placeholder="Subject" name="subject" value={formData.subject} onChange={handleInputChange} className={errors.subject ? "error" : ""} />
            <label htmlFor="message"></label>
            {errors.message && <span className="error-message">{errors.message}</span>}
            <textarea id="message" cols="30" rows="8" placeholder="Your message" name="message" value={formData.message} onChange={handleInputChange} className={errors.message ? "error" : ""}></textarea>
          <input type="submit" className="contact-btn" value="Send Message" />
        </form>
      </div>
    </div>
  );
}

export default ContactForm;

/* REST API VERSION */
// import React, { useState } from "react";
// import validateForm from "../../data-validation"
// import "./ContactForm.css";
// import emailjs from '@emailjs/browser';

// function ContactForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: ""
//   });

//   const [errors, setErrors] = useState({});
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   function handleInputChange(e){
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value.trim()
//     });

//     setErrors({
//       ...errors,
//       [name]: ""
//     });
//   }

//   function sendForm(e){
//     e.preventDefault();
  
//     const validationErrors = validateForm(formData);
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
  
//     fetch("https://api.emailjs.com/api/v1.0/email/send-form", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         service_id: "service_bkdsijs",
//         template_id: "template_l9qb4c6",
//         user_id: "BDRrK2lWt0mqQFqYu",
//         template_params: {
//           name: formData.name,
//           email: formData.email,
//           subject: formData.subject,
//           message: formData.message
//         }
//       })
//     })
//     .then((response) => {
//       if (response.ok) {
//         console.log(response.status);
//         setFormSubmitted(true); 
//         setFormData({
//           name: "",
//           email: "",
//           subject: "",
//           message: ""
//         });
//       } else {
//         console.error("Error:", response.status);
//       }
//     })
//     .catch(error => {
//       console.error("Error:", error);
//     });
//   }

//   return (
//     <div>
//       <div className="contact-form">
//         <h4>Contact Us</h4>
//         <form onSubmit={sendForm}>
//             <label htmlFor="name"></label>
//             {errors.name && <span className="error-message">{errors.name}</span>}
//             <input type="text" id="name" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} className={errors.name ? "error" : ""} />
//             <label htmlFor="email"></label>
//             {errors.email && <span className="error-message">{errors.email}</span>}
//             <input type="email" id="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleInputChange} className={errors.email ? "error" : ""} />
//             <label htmlFor="subject"></label>
//             {errors.subject && <span className="error-message">{errors.subject}</span>}
//             <input type="text" id="subject" placeholder="Subject" name="subject" value={formData.subject} onChange={handleInputChange} className={errors.subject ? "error" : ""} />
//             <label htmlFor="message"></label>
//             {errors.message && <span className="error-message">{errors.message}</span>}
//             <textarea id="message" cols="30" rows="8" placeholder="Your message" name="message" value={formData.message} onChange={handleInputChange} className={errors.message ? "error" : ""}></textarea>
//           <input type="submit" className="contact-btn" value="Send Message" />
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ContactForm;

