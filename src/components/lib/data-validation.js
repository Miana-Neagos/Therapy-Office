export function validateForm(formData) {
  console.log('this is VALIDATE');
  console.log({formData});

  const { name, email, subject, message, password, phoneNumber } = formData;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errors = {};

  if ('name' in formData && !name) {
    errors.name = "Please enter your name";
  }

  if ('email' in formData) {
    if (!email) {
      errors.email = "Please enter your email address";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }
  }

  if ('subject' in formData) {
    if (!subject) {
      errors.subject = "Please enter the subject";
    } else if (subject.length < 3 || subject.length > 50) {
      errors.subject = "Subject must be between 3 and 50 characters";
    }
  }

  if ('message' in formData) {
    if (!message) {
      errors.message = "Please enter your message";
    } else if (message.length < 10 || message.length > 500) {
      errors.message = "Message must be between 10 and 500 characters";
    }
  }

  if ('password' in formData && !password) {
    errors.password = "Please enter a password";
  }

  if ('phoneNumber' in formData) {
    if (!phoneNumber) {
      errors.phoneNumber = "Please enter your phone number";
    } else if (phoneNumber.length < 10 || phoneNumber.length > 15) {
      errors.phoneNumber = "Phone number must be between 10 and 15 characters";
    }
  }

  return errors;
}


// export function validateForm(formData) {
//   console.log('this is VALIDATE');
//   console.log({formData});

//   const { name, email, subject, message, password, phoneNumber } = formData;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const errors = {};

//   if (!name) {
//     errors.name = "Please enter your name";
//   }

//   if (!email) {
//     errors.email = "Please enter your email address";
//   } else if (!emailRegex.test(email)) {
//     errors.email = "Please enter a valid email address";
//   }

//   if (!subject) {
//     errors.subject = "Please enter the subject";
//   } else if (subject.length < 3 || subject.length > 50) {
//     errors.subject = "Subject must be between 3 and 50 characters";
//   }

//   if (message && !message) {
//     errors.message = "Please enter your message";
//   } else if (message.length < 10 || message.length > 500) {
//     errors.message = "Message must be between 10 and 500 characters";
//   }

//   if (!password) {
//     errors.pass = "Please enter a password";
//   }

//   // if (signUpMode && (!retypePassword || password !== retypePassword)) {
//   //   errors.retypePassword = "Passwords don't match";
//   // }

//   if (!phoneNumber) {
//     errors.phoneNumber = "Please enter your phone number";
//   } else if (phoneNumber.length < 10 || phoneNumber.length > 15) {
//     errors.phoneNumber = "Phone number must be between 10 and 15 characters";
//   }

//   return errors;
// }

// export function validateSignUp(formData) {
//   const { name, email, password } = formData;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const errors = {};

//   if (!name) {
//     errors.name = "Please enter your name";
//   }

//   if (!email) {
//     errors.email = "Please enter your email address";
//   } else if (!emailRegex.test(email)) {
//     errors.email = "Please enter a valid email address";
//   }

//   if (!password) {
//     errors.pass = "Please enter a password";
//   }

//   return errors;
// }
