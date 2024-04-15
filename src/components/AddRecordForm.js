// src/components/Form.js
import { useState, useEffect } from "react";
import Input from "./Input";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateProfilePicture,
} from "../utils/formValidation";

const AddRecordForm = ({ selectedEntry, setEntries }) => {
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
  const [profilePictureError, setProfilePictureError] = useState("");

  useEffect(() => {
    if (selectedEntry) {
      setName(selectedEntry.name || "");
      setEmail(selectedEntry.email || "");
      setPhone(selectedEntry.phone || "");
      setDOB(selectedEntry.dob || "");
      setCity(selectedEntry.city || "");
      setDistrict(selectedEntry.district || "");
      setProvince(selectedEntry.province || "");
      setCountry(selectedEntry.country || "Nepal");
      setProfilePicture(selectedEntry.profilePicture || null);

      resetError();
    }
  }, [selectedEntry]);

  const resetError = () => {
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setProfilePictureError(null);
  };

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
      profilePictureError === ""
    ) {
      // Form is valid, perform submission logic here

      // Retrieve entries from localStorage
      let storedEntries = JSON.parse(localStorage.getItem("entries")) || [];

      const formData = {
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

      if (selectedEntry) {
        // Update the existing entry in localStorage
        const updatedEntries = storedEntries.map((entry) => {
          if (entry.id === selectedEntry.id) {
            return { id: entry.id, ...formData };
          }
          return entry;
        });

        localStorage.setItem("entries", JSON.stringify(updatedEntries));
        setEntries(updatedEntries);
      } else {
        // Add a new entry to localStorage with an appropriate id
        const newId =
          storedEntries?.length > 0
            ? storedEntries[storedEntries.length - 1].id + 1
            : 0;

        const newFormData = { id: newId, ...formData };
        storedEntries.push(newFormData);

        localStorage.setItem("entries", JSON.stringify(storedEntries));
        setEntries([...storedEntries]);
      }

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
      resetError();

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
    <div>
      <h1>Add New Entry</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Input
              label="Name"
              id="name"
              value={name}
              onChange={handleNameChange}
              type="text"
              error={nameError}
              autoFocus
              required
            />
          </div>
          <div className="col-md-6">
            <Input
              label="Email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              type="email"
              error={emailError}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input
              label="Phone Number"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              type="tel"
              error={phoneError}
              required
            />
          </div>
          <div className="col-md-6">
            <Input
              label="Date of Birth"
              id="dob"
              value={dob}
              onChange={handleDOBChange}
              type="date"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input
              label="City"
              id="city"
              name="city"
              value={city}
              onChange={handleAddressChange}
              type="text"
            />
          </div>
          <div className="col-md-6">
            <Input
              label="District"
              id="district"
              name="district"
              value={district}
              onChange={handleAddressChange}
              type="text"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input
              label="Province"
              id="province"
              name="province"
              value={province}
              onChange={handleAddressChange}
              type="text"
            />
          </div>
          <div className="col-md-6">
            <Input
              label="Country"
              id="country"
              name="country"
              value={country}
              onChange={handleAddressChange}
              type="text"
            />
          </div>
        </div>

        {/* Profile Picture */}
        <div className="row">
          <div className="col-md-6">
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
              />
              {profilePictureError && (
                <div className="text-danger">{profilePictureError}</div>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-lg btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRecordForm;
