export const validateName = (name) => {
  if (!name.trim()) {
    return "*Name is required.";
  }
  return "";
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    return "*Email is required.";
  } else if (!emailRegex.test(email)) {
    return "*Invalid email format.";
  }
  return "";
};

export const validatePhone = (phone) => {
  if (!phone.trim()) {
    return "*Phone number is required.";
  } else if (isNaN(phone) || phone.length < 7) {
    return "*Phone number must be a valid number with at least 7 digits.";
  }
  return "";
};

export const validateProfilePicture = (profilePicture) => {
  if (!profilePicture) {
    return "*Profile picture is required.";
  } else if (profilePicture.type !== "image/png") {
    return "*Only PNG files are allowed.";
  }
  return "";
};
