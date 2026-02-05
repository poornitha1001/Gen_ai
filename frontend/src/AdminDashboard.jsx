import { useEffect, useState } from "react";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  const load = async () => {
    const res = await fetch("http://localhost:5000/api/complaints");
    const data = await res.json();
    setComplaints(data);
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/complaint/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "#1f2933" }}>Authority Dashboard</h2>
      {complaints.map(c => (
        <div key={c._id} style={styles.card}>
          <p><b>Issue:</b> {c.text}</p>
          <p><b>AI:</b> {c.aiResponse}</p>
          <p><b>Status:</b> <span style={styles.status}>{c.status}</span></p>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => updateStatus(c._id, "In Progress")} style={styles.btn1}>In Progress</button>
            <button onClick={() => updateStatus(c._id, "Resolved")} style={styles.btn2}>Resolved</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: "#f9fafb",
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  },
  status: { color: "#2563eb", fontWeight: "bold" },
  btn1: {
    marginRight: 10,
    padding: "6px 12px",
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: 4
  },
  btn2: {
    padding: "6px 12px",
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: 4
  }
};

export default AdminDashboard;

