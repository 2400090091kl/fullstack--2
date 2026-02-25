// ─────────────────────────────────────────────
// LoginForm.jsx — Login screen for Teacher & Student
// Hardcoded credentials for demo purposes
// ─────────────────────────────────────────────

import { useState } from "react";

// ── Hardcoded credentials (for demo) ──────────
const CREDENTIALS = {
  teacher:   { username: "teacher",   password: "teacher123" },
  students: [
    { username: "student1", password: "student@1" },
    { username: "student2", password: "student@2" },
    { username: "student3", password: "student@3" },
    { username: "student4", password: "student@4" },
    { username: "student5", password: "student@5" },
    { username: "student6", password: "student@6" },
  ]
};

export default function LoginForm({ role, onLoginSuccess, onBack }) {
  // Input field states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Show/hide password toggle
  const [showPassword, setShowPassword] = useState(false);

  // Error message state
  const [error, setError] = useState("");

  // Called when Login button is clicked
  const handleLogin = () => {
    if (role === "teacher") {
      const cred = CREDENTIALS.teacher;
      if (username === cred.username && password === cred.password) {
        setError("");
        onLoginSuccess(username);
        return;
      }
    } else if (role === "student") {
      const student = CREDENTIALS.students.find(
        (s) => s.username === username && s.password === password
      );
      if (student) {
        setError("");
        onLoginSuccess(username);
        return;
      }
    }
    setError("Invalid username or password. Please try again.");
  };

  // Title for the login page
  const title = "Project Submission Portal Login";

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>

        {/* Login title */}
        <h2 style={styles.title}>{title}</h2>

        {/* Username input */}
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password input with show/hide toggle */}
        <div style={styles.passwordWrapper}>
          <input
            style={{ ...styles.input, marginBottom: 0, paddingRight: "48px" }}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Toggle button to show/hide password */}
          <button
            style={styles.eyeBtn}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Error message — shown only when login fails */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Login button */}
        <button style={styles.loginBtn} onClick={handleLogin}>
          Login
        </button>

        {/* Back button to go to role selection */}
        <button style={styles.backBtn} onClick={onBack}>
          ← Back
        </button>

        {/* Hint for demo credentials */}
        <p style={styles.hint}>
          {role === "teacher"
            ? "Demo: teacher / teacher123"
            : "Demo: student / student123"}
        </p>
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
    minWidth: "380px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "24px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    marginBottom: "14px",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#1e293b",
    outline: "none",
  },
  passwordWrapper: {
    position: "relative",
    marginBottom: "14px",
  },
  eyeBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "#ef4444",
    fontSize: "13px",
    marginBottom: "10px",
    textAlign: "center",
  },
  loginBtn: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
    marginBottom: "10px",
  },
  backBtn: {
    width: "100%",
    padding: "10px",
    background: "transparent",
    color: "#64748b",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "'Segoe UI', sans-serif",
    marginBottom: "12px",
  },
  hint: {
    textAlign: "center",
    fontSize: "12px",
    color: "#94a3b8",
  },
};
