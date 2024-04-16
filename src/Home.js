import { useState, useEffect } from "react";
import AddRecordForm from "./components/AddRecordForm.js";
import Table from "./components/Table.js";

const Home = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null); // for editing action

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(storedEntries);
  }, []);

  const handleDelete = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
  };

  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container-md">
      <div className="border border-3 p-sm-3 my-5 shadow">
        <AddRecordForm selectedEntry={selectedEntry} setEntries={setEntries} />
      </div>
      <div className="border border-3 p-sm-3 mb-3 shadow">
        <Table
          entries={entries}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default Home;
