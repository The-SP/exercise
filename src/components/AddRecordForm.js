// src/components/Form.js
import { useState } from "react";
import Input from "./Input";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateProfilePicture,
} from "../utils/formValidation";

const AddRecordForm = ({ entries, setEntries }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDOB] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("Nepal");
  const [profilePicture, setProfilePicture] = useState(null);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dobError, setDOBError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [profilePictureError, setProfilePictureError] = useState("");

  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
    setNameError(validateName(name));
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setEmailError(validateEmail(email));
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    setPhone(phone);
    setPhoneError(validatePhone(phone));
  };

  const handleDOBChange = (e) => {
    const dob = e.target.value;
    setDOB(dob);
    // setDOBError(validateDOB(dob));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "city":
        setCity(value);
        break;
      case "district":
        setDistrict(value);
        break;
      case "province":
        setProvince(value);
        break;
      case "country":
        setCountry(value);
        break;
      default:
        break;
    }
    // setAddressError(validateAddress(city, district, province, country));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setProfilePictureError(validateProfilePicture(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const profilePictureError = validateProfilePicture(profilePicture);

    if (
      nameError === "" &&
      emailError === "" &&
      phoneError === "" &&
      dobError === "" &&
      addressError === "" &&
      profilePictureError === ""
    ) {
      // Form is valid, perform submission logic here

      // Generate id for new entry
      const newId = entries.length > 0 ? entries[entries.length - 1].id + 1 : 0;

      const formData = {
        id: newId,
        name,
        email,
        phone,
        dob,
        address: {
          city,
          district,
          province,
          country,
        },
        profilePicture,
      };

      // Save the form data to local storage
      const entries = JSON.parse(localStorage.getItem("entries")) || [];
      entries.push(formData);
      localStorage.setItem("entries", JSON.stringify(entries));

      // Add the new entry to the entries state
      setEntries([...entries, formData]);

      // Reset the form fields
      setName("");
      setEmail("");
      setPhone("");
      setDOB("");
      setCity("");
      setDistrict("");
      setProvince("");
      setCountry("Nepal");
      setProfilePicture(undefined);

      // Reset the error states
      setNameError("");
      setEmailError("");
      setPhoneError("");
      setProfilePictureError("");

      // Display a success message or redirect to another page
      console.log("Form submitted successfully!");
    } else {
      // Set the error states
      setNameError(nameError);
      setEmailError(emailError);
      setPhoneError(phoneError);
      setProfilePictureError(profilePictureError);
    }
  };

  return (
    <div className="container">
      <h1>Add New Entry</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          id="name"
          value={name}
          onChange={handleNameChange}
          type="text"
          error={nameError}
        />
        <Input
          label="Email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          type="email"
          error={emailError}
        />
        <Input
          label="Phone Number"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          type="tel"
          error={phoneError}
        />
        <Input
          label="Date of Birth"
          id="dob"
          value={dob}
          onChange={handleDOBChange}
          type="date"
          error={dobError}
        />
        <div className="form-group">
          <label className="lead">Address</label>
          <Input
            label="City"
            id="city"
            name="city"
            value={city}
            onChange={handleAddressChange}
            type="text"
          />
          <Input
            label="District"
            id="district"
            name="district"
            value={district}
            onChange={handleAddressChange}
            type="text"
          />
          <Input
            label="Province"
            id="province"
            name="province"
            value={province}
            onChange={handleAddressChange}
            type="text"
          />
          <Input
            label="Country"
            id="country"
            name="country"
            value={country}
            onChange={handleAddressChange}
            type="text"
          />
          {addressError && <div className="text-danger">{addressError}</div>}
        </div>

        {/* Profile Picture */}
        <div className="form-group mb-3">
          <label htmlFor="profilePicture">
            Profile Picture:{" "}
            {!profilePicture && (
              <div>
                <small>(Image must be in .png format)</small>
              </div>
            )}
          </label>

          <input
            type="file"
            className="form-control"
            id="profilePicture"
            accept="image/png"
            onChange={handleProfilePictureChange}
            required
          />
          {profilePictureError && (
            <div className="text-danger">{profilePictureError}</div>
          )}
        </div>
        <button type="submit" className="btn btn-lg btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRecordForm;
