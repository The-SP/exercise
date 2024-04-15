// src/components/Table.js
import { useState } from "react";

const Table = ({ entries, setEntries }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Get the current entries to display
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  // Pagination logic
  const totalPages = Math.ceil(entries.length / entriesPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(totalPages);

  const handleDelete = (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    // Optionally, you can update the localStorage here
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
  };

// Display message when entries are empty
if (entries.length === 0) {
    return <h3>No entries available.</h3>;
    }

  return (
    <div className="mt-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.phone}</td>
              <td>{entry.dob}</td>
              <td>
                <td>
                  {entry.address.city && entry.address.city + ", "}
                  {entry.address.district && entry.address.district + ", "}
                  {entry.address.province && entry.address.province + ", "}
                  {entry.address.country && entry.address.country}
                </td>
              </td>
              <td>
                {entry.profilePicture && (
                  <img
                    src={entry.profilePicture}
                    alt="Profile"
                    className="img-thumbnail"
                  />
                )}
              </td>
              <td>
                <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(entry.id)}>Delete</button>
                <button className="btn btn-primary btn-sm">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <li
                  key={pageNumber}
                  className={`page-item ${
                    currentPage === pageNumber ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  <a className="page-link">{pageNumber}</a>
                </li>
              )
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Table;
