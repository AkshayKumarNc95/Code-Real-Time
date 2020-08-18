const validator = require("validator").default;

function validateUserDetails(user) {
  const errors = [];
  const {first_name, last_name, email, password, user_name} = user;

  if (!validator.isEmail(email)) {
    errors.push({
      errorType: "Email",
      error: "Invalid Email",
    });
  }

  if (validator.isEmpty(first_name) || !validator.isAlpha(first_name)) {
    errors.push({
      errorType: "First_Name",
      error:
        "First Name should not be empty, and should only contain alphabets",
    });
  }

  if (validator.isEmpty(last_name) || !validator.isAlpha(last_name)) {
    errors.push({
      errorType: "Last_Name",
      error: "Last Name should not be empty, and should only contain alphabets",
    });
  }

  if (validator.isEmpty(user_name)) {
    errors.push({
      errorType: "User_Name",
      error: "User Name should not be empty, and should only contain alphabets",
    });
  }

  if (!validator.isAlphanumeric(password)) {
    errors.push({
        errorType: "Password",
        error: "Password should not be empty, and should contain both alphabets and numbers",
      });
  }

    return errors.length > 0? errors:true; 
}

module.exports = validateUserDetails;