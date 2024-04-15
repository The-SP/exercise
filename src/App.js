import { useState, useEffect } from "react";
import AddRecordForm from "./components/AddRecordForm.js";
import Table from "./components/Table.js";

function App() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null)

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(storedEntries);
  }, []);

  const handleDelete = (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
  };

  const handleEdit = (entry) => {
    console.log('Edit button pressed');
    setSelectedEntry(entry);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  };

  return (
    <div>
      <div className="container border border-3 p-sm-3 my-5">
        <AddRecordForm selectedEntry={selectedEntry} setEntries={setEntries} />
      </div>
      <div className="container border border-3 p-sm-3">
        <Table entries={entries} handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>
    </div>
  );
}

export default App;
