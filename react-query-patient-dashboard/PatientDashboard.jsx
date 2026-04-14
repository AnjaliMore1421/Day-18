import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchPatients from "../api/patientApi";

function PatientDashboard() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const {
    data: patients,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true
  });

  const handleRefresh = async () => {
    await refetch();
    setLastUpdated(new Date().toLocaleTimeString());
  };

  const clearCache = () => {
    queryClient.removeQueries({ queryKey: ["patients"] });
    alert("Cache cleared successfully");
  };

  const filteredPatients = patients?.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>React Query Patient Dashboard</h2>

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <button style={styles.button} onClick={handleRefresh}>
          Refresh Data
        </button>

        <button style={styles.clearBtn} onClick={clearCache}>
          Clear Cache
        </button>

        {isFetching && <p>Refreshing latest data...</p>}
        {lastUpdated && <p>Last Updated: {lastUpdated}</p>}

        {isLoading && <p>Loading patients...</p>}
        {isError && <p>Error: {error.message}</p>}

        {filteredPatients &&
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
    width: "650px",
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
    marginBottom: "10px",
    background: "black",
    color: "white",
    border: "none"
  },
  clearBtn: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    background: "gray",
    color: "white",
    border: "none"
  },
  patientCard: {
    padding: "15px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px"
  }
};

export default PatientDashboard;
