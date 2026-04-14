import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function PatientDashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/users");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Axios Interceptor Dashboard</h2>

        <button style={styles.button} onClick={fetchPatients}>
          Refresh Data
        </button>

        {loading ? (
          <p>Loading data...</p>
        ) : (
          patients.map((patient) => (
            <div key={patient.id} style={styles.patientCard}>
              <h3>{patient.name}</h3>
              <p>Email: {patient.email}</p>
              <p>Phone: {patient.phone}</p>
            </div>
          ))
        )}
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
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    borderRadius: "12px"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  button: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "6px"
  },
  patientCard: {
    padding: "15px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px"
  }
};

export default PatientDashboard;
