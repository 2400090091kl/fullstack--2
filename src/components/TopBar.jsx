// ─────────────────────────────────────────────
// TopBar.jsx — Top header bar
// Shows welcome message, role label, and logout button
// ─────────────────────────────────────────────

export default function TopBar({ username, role, onLogout }) {
  return (
    <div style={styles.topbar}>

      {/* Left side: Welcome message and role */}
      <div>
        <h2 style={styles.welcome}>Welcome, {username}</h2>
        {/* Role label shown in uppercase */}
        <p style={styles.roleLabel}>{role.toUpperCase()}</p>
      </div>

      {/* Right side: Logout button */}
      <button style={styles.logoutBtn} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

// ── Styles ──────────────────────────────────────
const styles = {
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 28px",
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
  },
  welcome: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1e293b",
    margin: 0,
  },
  roleLabel: {
    fontSize: "12px",
    color: "#64748b",
    margin: "2px 0 0",
    letterSpacing: "0.5px",
  },
  logoutBtn: {
    padding: "9px 22px",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
  },
};
