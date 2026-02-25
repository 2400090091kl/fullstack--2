// ─────────────────────────────────────────────
// RoleSelection.jsx — First screen user sees
// Two buttons: Teacher or Student
// ─────────────────────────────────────────────

export default function RoleSelection({ onSelectRole }) {
  return (
    <div style={styles.wrapper}>
      {/* Centered card */}
      <div style={styles.card}>

        {/* Platform logo and title */}
		<div style={styles.logoRow}>
		  <span style={styles.logoIcon}>📘</span>
		  <h1 style={styles.title}>Project Submission Portal</h1>
		</div>

        <p style={styles.subtitle}>Student Group Project Management</p>

        <p style={styles.label}>Select your role:</p>

        {/* Role buttons */}
        <div style={styles.buttonRow}>
          {/* Teacher button */}
          <button
            style={{ ...styles.btn, background: "#2563eb" }}
            onClick={() => onSelectRole("teacher")}
          >
            Teacher
          </button>

          {/* Student button */}
          <button
            style={{ ...styles.btn, background: "#0891b2" }}
            onClick={() => onSelectRole("student")}
          >
            Student
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Styles ──────────────────────────────────────
const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "40px 48px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    minWidth: "340px",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "6px",
  },
  logoIcon: {
    fontSize: "28px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  subtitle: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "24px",
  },
  label: {
    fontSize: "15px",
    color: "#475569",
    marginBottom: "16px",
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  btn: {
    padding: "10px 32px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
  },
};
