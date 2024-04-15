import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(storedEntries);
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Profiles</h1>
      <div className="row">
        {entries.map((entry, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{entry.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {entry.email}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {entry.phone}
                </p>
                <p className="card-text">
                  <strong>Date of Birth:</strong> {entry.dob}
                </p>
                <p className="card-text">
                  <strong>Address:</strong>
                </p>
                <ul className="list-unstyled">
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
                {entry.profilePicture && (
                  <div className="text-center">
                    <img
                      src={entry.profilePicture}
                      alt="Profile Picture"
                      className="img-fluid"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
