// ─────────────────────────────────────────────
// Sidebar.jsx — Left panel with subject list and search
// Used by both Teacher and Student dashboards
// ─────────────────────────────────────────────

import { useState } from "react";

// ── List of subjects ───────────────────────────
const SUBJECTS = ["OS", "DBMS", "FSAD", "Frontend", "OOPs", "CN", "CIS","DAA","CLOUD","NURAL NETWORK"];

export default function Sidebar({ activeSubject, onSelectSubject }) {
  // Search input state
  const [search, setSearch] = useState("");

  // Filter subjects based on search input
  const filtered = SUBJECTS.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.sidebar}>

      {/* Search bar */}
      <div style={styles.searchWrapper}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          style={styles.searchInput}
          placeholder="Search subjects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Subject list */}
      <div style={styles.list}>
        {filtered.map((subject) => (
          <div
            key={subject}
            style={{
              ...styles.item,
              // Highlight active subject
              background: activeSubject === subject ? "#dbeafe" : "#ffffff",
              fontWeight: activeSubject === subject ? "600" : "400",
              color: activeSubject === subject ? "#1d4ed8" : "#334155",
              borderLeft: activeSubject === subject
                ? "4px solid #2563eb"
                : "4px solid transparent",
            }}
            onClick={() => onSelectSubject(subject)}
          >
            {subject}
          </div>
        ))}

        {/* Show message if no subjects match search */}
        {filtered.length === 0 && (
          <p style={styles.noResult}>No subjects found.</p>
        )}
      </div>
    </div>
  );
}

// ── Styles ──────────────────────────────────────
const styles = {
  sidebar: {
    width: "240px",
    minHeight: "100vh",
    background: "#f8fafc",
    borderRight: "1px solid #e2e8f0",
    padding: "16px 0",
    flexShrink: 0,
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#ffffff",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    padding: "8px 12px",
    margin: "0 12px 16px",
  },
  searchIcon: {
    fontSize: "14px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    fontSize: "13px",
    width: "100%",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#334155",
    background: "transparent",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  item: {
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.15s",
    borderRadius: "0 8px 8px 0",
    marginRight: "12px",
  },
  noResult: {
    padding: "12px 20px",
    fontSize: "13px",
    color: "#94a3b8",
  },
};
