const validator = require("validator").default;

function validateUserDetails(user) {
  const errors = [];
  const {FirstName, LastName, Email, Password, UserName} = user;

  if (!validator.isEmail(Email)) {
    errors.push({
      errorType: "Email",
      error: "Invalid Email",
    });
  }

  if (validator.isEmpty(FirstName) || !validator.isAlpha(FirstName)) {
    errors.push({
      errorType: "FirstName",
      error:
        "First Name should not be empty, and should only contain alphabets",
    });
  }

  if (validator.isEmpty(LastName) || !validator.isAlpha(LastName)) {
    errors.push({
      errorType: "LastName",
      error: "Last Name should not be empty, and should only contain alphabets",
    });
  }

  if (validator.isEmpty(UserName)) {
    errors.push({
      errorType: "UserName",
      error: "User Name should not be empty, and should only contain alphabets",
    });
  }

  if (!validator.isAlphanumeric(Password)) {
    errors.push({
        errorType: "Password",
        error: "Password should not be empty, and should contain both alphabets and numbers",
      });
  }

    return errors.length > 0? errors:true; 
}

module.exports = validateUserDetails;