const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("password must be at least 8 characters");
  }
  if (
    !value.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/
    )
  ) {
    return helpers.message(
      "password must contain at least one lowercase letter, one uppercase letter, one digit and one special character and 8 characters long"
    );
  }
  return value;
};

module.exports = {
  password,
};

// The message method of helpers is used to return a custom error message when the validation fails.
