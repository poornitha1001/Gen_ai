import { useState } from "react";

function Report() {
  const [text, setText] = useState("");
  const [area, setArea] = useState("");

  const submit = async () => {
    if (!text || !area) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/api/complaint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        area: area,
        location: {
          lat: 11.0168,
          lng: 76.9558
        }
      })
    });

    const data = await res.json();
    alert("Complaint Registered!\n\n" + data.aiResponse);

    setText("");
    setArea("");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>CivicPulse Complaint Portal</h2>
        <p style={styles.sub}>Report city issues quickly and transparently</p>

        <div style={styles.field}>
          <label style={styles.label}>Area / Location</label>
          <input
            type="text"
            placeholder="Eg: Gandhipuram, Coimbatore"
            value={area}
            onChange={e => setArea(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Issue Description</label>
          <textarea
            placeholder="Describe the problem clearly..."
            value={text}
            onChange={e => setText(e.target.value)}
            style={styles.textarea}
          />
        </div>

        <button onClick={submit} style={styles.button}>
          Submit Complaint
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#f1f5f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: 420,
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  },
  heading: { textAlign: "center", marginBottom: 5, color: "#1f2933" },
  sub: { textAlign: "center", color: "#6b7280", marginBottom: 20 },
  field: { marginBottom: 15 },
  label: { display: "block", marginBottom: 5, fontWeight: "600" },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #cbd5f5"
  },
  textarea: {
    width: "100%",
    height: 90,
    padding: 10,
    borderRadius: 6,
    border: "1px solid #cbd5f5",
    resize: "none"
  },
  button: {
    width: "100%",
    marginTop: 10,
    padding: 12,
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    cursor: "pointer"
  }
};

export default Report;




