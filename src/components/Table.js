// src/components/Table.js
import { useState } from "react";
import { Link } from "react-router-dom";

const Table = ({ entries, handleDelete, handleEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Filter entries
  const filteredEntries = entries.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the current entries to display
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries
    .slice()
    .reverse()
    .slice(indexOfFirstEntry, indexOfLastEntry);

  // Pagination logic
  const totalPages = Math.ceil(entries.length / entriesPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Display message when entries are empty
  if (entries.length === 0) {
    return <h3>No entries available.</h3>;
  }

  return (
    <div className="py-2">
      <input
        type="text"
        className="form-control w-75 mx-auto mb-3"
        placeholder="Search by Name.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table table-sm table-striped table-hover shadow-lg cursor-pointer">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Profile Pic</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry, index) => (
            <tr key={index}>
              <td>{index + indexOfFirstEntry + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.phone}</td>
              <td>{entry.dob}</td>
              <td>
                {entry.city && entry.city + ", "}
                {entry.district && entry.district + ", "}
                {entry.province && "Province " + entry.province + ", "}
                {entry.country && entry.country}
              </td>
              <td>
                {entry.profilePicture && (
                  <img
                    src={entry.profilePicture}
                    alt="Profile"
                    className="img-circle img-fluid"
                    style={{ maxWidth: "50px", maxHeight: "50px" }}
                  />
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(entry.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEdit(entry)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center cursor-pointer">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <li
                  key={pageNumber}
                  className={`page-item ${
                    currentPage === pageNumber ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  <span className="page-link">{pageNumber}</span>
                </li>
              )
            )}
          </ul>
        </nav>
      )}

      <div>
        <Link to="/profile" className="btn btn-primary">
          Profile Page
        </Link>
      </div>
    </div>
  );
};

export default Table;
