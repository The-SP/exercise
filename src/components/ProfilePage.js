import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(storedEntries.reverse());
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Profiles</h1>
      <div className="row">
        {entries.map((entry, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title text-center">{entry.name}</h5>
                {entry.profilePicture && (
                  <div className="text-center">
                    <img
                      src={entry.profilePicture}
                      alt="Profile"
                      className="img-fluid"
                      style={{ maxHeight: "100px" }}
                    />
                  </div>
                )}
                <p className="card-text">
                  <strong>Email:</strong> {entry.email} <br />
                  <strong>Phone:</strong> {entry.phone}
                  <br />
                  <strong>Date of Birth:</strong> {entry.dob}
                </p>
                <strong>Address:</strong>
                <ul className="list-unstyled ms-1">
                  <li>
                    <strong>City:</strong> {entry.city}
                  </li>
                  <li>
                    <strong>District:</strong> {entry.district}
                  </li>
                  <li>
                    <strong>Province:</strong> {entry.province}
                  </li>
                  <li>
                    <strong>Country:</strong> {entry.country}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
