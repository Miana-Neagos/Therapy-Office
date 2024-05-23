function validateForm(formData) {
  const { name, email, subject, message } = formData;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errors = {};

  // Check if any field is empty
  if (!name) {
    errors.name = "Please enter your name";
  }

  if (!email) {
    errors.email = "Please enter your email address";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!subject) {
    errors.subject = "Please enter the subject";
  } else if (subject.length < 3 || subject.length > 50) {
    errors.subject = "Subject must be between 3 and 50 characters";
  }

  if (!message) {
    errors.message = "Please enter your message";
  } else if (message.length < 10 || message.length > 500) {
    errors.message = "Message must be between 10 and 500 characters";
  }

  return errors;
}

export default validateForm;
