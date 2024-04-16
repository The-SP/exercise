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

  const [countryNames, setCountryNames] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching data");
        }
      })
      .then((data) => {
        const countries = data.map((item) => item.name.common);
        setCountryNames(countries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
    setProfilePictureError("");
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

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageData = reader.result;
      setProfilePicture(imageData);
      setProfilePictureError(validateProfilePicture(imageData));
    };
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
      const formData = {
        name,
        email,
        phone,
        dob,
        city,
        district,
        province,
        country,
        profilePicture,
      };

      // Retrieve entries from localStorage
      let storedEntries = JSON.parse(localStorage.getItem("entries")) || [];

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
        setEntries((prevEntries) => [...prevEntries, newFormData]);
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
      setProfilePicture(null);

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
    <div className="p-1">
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
              onChange={(e) => setDOB(e.target.value)}
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
              onChange={(e) => setCity(e.target.value)}
              type="text"
            />
          </div>
          <div className="col-md-6">
            <Input
              label="District"
              id="district"
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              type="text"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="province">
                Province
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="province"
                name="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                <option value="">Province</option>
                <option value="1">Province 1</option>
                <option value="2">Province 2</option>
                <option value="3">Province 3</option>
                <option value="4">Province 4</option>
                <option value="5">Province 5</option>
                <option value="6">Province 6</option>
                <option value="7">Province 7</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="country">
                Country
              </label>
              <select
                className="form-select"
                id="country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countryNames.map((country, index) => (
                  <option value={country} key={index}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
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
              <div className="d-flex">
                <input
                  type="file"
                  className="form-control"
                  id="profilePicture"
                  accept="image/png"
                  onChange={handleProfilePictureChange}
                />
                {profilePicture && (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="img-circle img-fluid"
                    style={{ maxWidth: "50px", maxHeight: "50px" }}
                  />
                )}
              </div>
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
