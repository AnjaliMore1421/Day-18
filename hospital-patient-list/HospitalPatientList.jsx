import React, { useEffect, useState } from "react";

function HospitalPatientList() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      const data = await response.json();

      setPatients(data);
      setFilteredPatients(data);
    } catch (err) {
      setError("Failed to fetch patient data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPatients(filtered);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Hospital Patient List</h2>

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={handleSearch}
          style={styles.search}
        />

        <button onClick={fetchPatients} style={styles.button}>
          Refresh List
        </button>

        {loading && <p>Loading patients...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {!loading &&
          filteredPatients.map((patient) => (
            <div key={patient.id} style={styles.patientCard}>
              <h3>{patient.name}</h3>
              <p>Email: {patient.email}</p>
              <p>Phone: {patient.phone}</p>
              <p>City: {patient.address.city}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px"
  },
  card: {
    width: "600px",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  search: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px"
  },
  button: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  patientCard: {
    padding: "15px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px"
  },
  error: {
    color: "red"
  }
};

export default HospitalPatientList;
