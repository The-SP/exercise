import { useState, useEffect } from "react";
import AddRecordForm from "./components/AddRecordForm.js";
import Table from "./components/Table.js";

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(storedEntries);
  }, []);

  return (
    <div>
      <AddRecordForm entries={entries} setEntries={setEntries} />
      <Table entries={entries} setEntries={setEntries} />
    </div>
  );
}

export default App;
