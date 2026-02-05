import { useState } from "react";

function Login({ setRole }) {
  const [role, setLocalRole] = useState("citizen");

  return (
    <div style={styles.card}>
      <h2>CivicPulse Login</h2>
      <select onChange={e => setLocalRole(e.target.value)} style={styles.select}>
        <option value="citizen">Citizen</option>
        <option value="authority">Authority</option>
      </select>
      <button onClick={() => setRole(role)} style={styles.btn}>Enter</button>
    </div>
  );
}

const styles = {
  card: { maxWidth: 300, margin: "120px auto", padding: 25, textAlign: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)", borderRadius: 10 },
  select: { width: "100%", padding: 8, marginBottom: 15 },
  btn: { padding: "8px 16px", background: "#2563eb", color: "#fff", border: "none" }
};

export default Login;
