// ─────────────────────────────────────────────
// TeacherDashboard.jsx — Teacher main page
// Teacher can upload projects and give marks to student submissions
// ─────────────────────────────────────────────

import { useState } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import "./TeacherDashboard.css";

export default function TeacherDashboard({
  username, onLogout,
  teacherUploads, setTeacherUploads,
  studentSubmissions,
  marksData,   // { submissionId: { marks, feedback } } — shared from App.jsx
  saveMarks,   // function to save marks — shared from App.jsx
  getGroupsForSubject = () => [],
  setGroupsForSubject = () => {},
  setGroupLeader = () => {},
}) {
  const [activeSubject, setActiveSubject] = useState("OS");
  const [uploadType, setUploadType] = useState("pdf");
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Local state for marks inputs — { submissionId: { marks, feedback } }
  // Tracks what teacher is currently typing before saving
  const [inputMarks, setInputMarks] = useState({});

  // Handle teacher project upload
  const handleUpload = () => {
    if (!projectTitle.trim()) { alert("Please enter a project title."); return; }
    if (uploadType === "url" && !urlInput.trim()) { alert("Please enter a URL."); return; }
    if (uploadType === "pdf" && !fileInput) { alert("Please choose a PDF file."); return; }

    const newUpload = {
      subject: activeSubject, title: projectTitle,
      description, type: uploadType,
      value: uploadType === "url" ? urlInput : fileInput?.name,
      deadline,
    };
    setTeacherUploads([...teacherUploads, newUpload]);
    setSuccessMsg(`Project "${projectTitle}" uploaded for ${activeSubject}!`);
    setProjectTitle(""); setDescription(""); setUrlInput(""); setFileInput(null); setDeadline("");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Update local input state as teacher types marks or feedback
  const handleMarkInput = (submissionId, field, value) => {
    setInputMarks((prev) => ({
      ...prev,
      [submissionId]: { ...prev[submissionId], [field]: value },
    }));
  };

  // Save marks to shared state when teacher clicks "Save Marks"
  const handleSaveMarks = (submissionId) => {
    const data = inputMarks[submissionId] || {};
    const marks = data.marks || "";
    const feedback = data.feedback || "";

    if (!marks.trim()) { alert("Please enter marks before saving."); return; }

    // Save to shared App.jsx state — student will see this
    saveMarks(submissionId, marks, feedback);
    alert("Marks saved successfully! Student can now see their grade.");
  };

  // Filter by active subject
  const subjectUploads = teacherUploads.filter((u) => u.subject === activeSubject);
  // Show all submissions for this subject, regardless of project
  // Group-based: submissions have groupName and members
  const subjectSubmissions = studentSubmissions.filter((s) => s.subject === activeSubject);

    // Subject-specific groups
    const groups = getGroupsForSubject(activeSubject);
    const [groupCreateCount, setGroupCreateCount] = useState(1);
    const [groupFormationDeadline, setGroupFormationDeadline] = useState("");
    const handleCreateGroup = () => {
      // Name groups as Group 1, Group 2, ...
      const newName = `Group ${groups.length + 1}`;
      setGroupsForSubject(activeSubject, [...groups, { groupName: newName, members: [], leader: null }]);
      setGroupCreateCount(groupCreateCount + 1);
    };

    // Delete a group
    const handleDeleteGroup = (groupName) => {
      if (window.confirm(`Are you sure you want to delete ${groupName}?`)) {
        setGroupsForSubject(activeSubject, groups.filter(g => g.groupName !== groupName));
      }
    };
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* Sidebar Navigation */}
          <div style={{ width: 220, background: "#fff", borderRight: "1px solid #e2e8f0", padding: "24px 0" }}>
            <Sidebar activeSubject={activeSubject} onSelectSubject={setActiveSubject} />
          </div>
          {/* Main Content */}
          <div style={{ flex: 1, padding: "32px 40px", display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Top Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#1e293b" }}>Teacher Dashboard</div>
              <div style={{ fontSize: 16, color: "#475569" }}>Welcome, {username} <button onClick={onLogout} style={{ marginLeft: 16, background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 600, cursor: "pointer" }}>Logout</button></div>
            </div>
            {/* Group Management Section */}
            <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: "28px", marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#2563eb" }}>Group Management for <span style={{ color: '#1e293b' }}>{activeSubject}</span></div>
                <div>
                  <label style={{ fontWeight: 500, marginRight: 8 }}>Group Formation Deadline:</label>
                  <input type="datetime-local" value={groupFormationDeadline} onChange={e => setGroupFormationDeadline(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #cbd5e1' }} />
                </div>
              </div>
              <button style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, fontSize: 15, marginBottom: 18, cursor: "pointer" }} onClick={handleCreateGroup}>Create New Group</button>
              {groups.length === 0 ? (
                <div style={{ color: '#64748b', fontSize: 15 }}>No groups created yet.</div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
                  {groups.map((g) => (
                    <div key={g.groupName} style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 12, padding: "18px 22px", minWidth: 260, flex: '1 1 260px', display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "#2563eb" }}>👥 {g.groupName}</div>
                      <div style={{ fontSize: 14, color: "#475569" }}>Members: {g.members.length > 0 ? g.members.join(", ") : <span style={{ color: '#dc2626' }}>None</span>}</div>
                      <div style={{ fontSize: 14, color: "#475569" }}>Leader: {g.leader || <span style={{ color: '#dc2626' }}>None</span>}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <select
                          value={g.leader || ''}
                          onChange={e => setGroupLeader(activeSubject, g.groupName, e.target.value)}
                          style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                        >
                          <option value="">Select leader</option>
                          {g.members.map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                        <button style={{ padding: '6px 12px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }} onClick={() => handleDeleteGroup(g.groupName)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Project Upload Section */}
            <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: "28px", marginBottom: 24 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", marginBottom: 18 }}>📤 Upload Project for <span style={{ color: "#2563eb" }}>{activeSubject}</span></div>
              <div style={{ display: "flex", gap: 18, marginBottom: 12 }}>
                <input style={{ flex: 1, minWidth: 220, padding: '12px 16px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15 }} placeholder="Project Title" value={projectTitle} onChange={e => setProjectTitle(e.target.value)} />
                <input type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} style={{ width: 220, padding: '12px 16px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15 }} />
              </div>
              <textarea style={{ width: '100%', marginTop: 8, padding: '12px 16px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15 }} placeholder="Project Description (optional)" value={description} onChange={e => setDescription(e.target.value)} rows={2} />
              <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8 }}>
                <span style={{ fontSize: 15, color: '#475569', fontWeight: 500 }}>Upload via:</span>
                <button style={{ background: uploadType === "url" ? "#2563eb" : "#e2e8f0", color: uploadType === "url" ? "#fff" : "#475569", border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }} onClick={() => setUploadType("url")}>🔗 URL</button>
                <button style={{ background: uploadType === "pdf" ? "#2563eb" : "#e2e8f0", color: uploadType === "pdf" ? "#fff" : "#475569", border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }} onClick={() => setUploadType("pdf")}>📄 PDF</button>
              </div>
              {uploadType === "url" && <input style={{ width: '100%', marginTop: 8, padding: '12px 16px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15 }} placeholder="Paste project URL here..." value={urlInput} onChange={e => setUrlInput(e.target.value)} />}
              {uploadType === "pdf" && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                  <input type="file" accept=".pdf" onChange={e => setFileInput(e.target.files[0])} />
                  <span style={{ fontSize: 13, color: "#94a3b8" }}>PDF files only</span>
                </div>
              )}
              {successMsg && <p style={{ color: "#16a34a", fontSize: 15, fontWeight: 500, margin: 0 }}>{successMsg}</p>}
              <button style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, fontSize: 16, marginTop: 12, cursor: "pointer", width: '100%' }} onClick={handleUpload}>Upload Project</button>
            </div>
            {/* Uploaded Projects List */}
            {subjectUploads.length > 0 && (
              <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: "28px", marginBottom: 24 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", marginBottom: 18 }}>📁 Uploaded Projects for <span style={{ color: "#2563eb" }}>{activeSubject}</span></div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
                  {subjectUploads.map((item, index) => (
                    <div key={index} style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 12, padding: "18px 22px", minWidth: 260, flex: '1 1 260px', display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "#1e293b" }}>📌 {item.title}</div>
                      {item.description && <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>{item.description}</p>}
                      <div style={{ fontSize: 13, color: "#475569" }}>
                        {item.type === "url"
                          ? <span>🔗 <a href={item.value} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>{item.value}</a></span>
                          : <span>📄 {item.value}</span>}
                      </div>
                      <div style={{ fontSize: 13, color: '#475569', marginTop: 6 }}>
                        <span>⏰ Deadline: {item.deadline ? new Date(item.deadline).toLocaleString() : "Not set"}</span>
                        <input
                          type="datetime-local"
                          value={item.deadline || ""}
                          onChange={e => {
                            const newDeadline = e.target.value;
                            setTeacherUploads(teacherUploads.map((u, i) =>
                              i === index ? { ...u, deadline: newDeadline } : u
                            ));
                          }}
                          style={{ marginLeft: 8, padding: '4px 8px', borderRadius: 8, border: '1px solid #cbd5e1' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Student Submissions with Marks */}
            <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: "28px", marginBottom: 24 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", marginBottom: 18 }}>📥 Student Submissions for <span style={{ color: "#2563eb" }}>{activeSubject}</span></div>
              {subjectSubmissions.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
                  {subjectSubmissions.map((s, index) => {
                    // Use groupName for submissionId if present, else fallback to studentName
                    const submissionId = `${s.groupName || s.studentName}-${s.subject}-${index}`;
                    const savedMarks = marksData[submissionId];
                    const currentInput = inputMarks[submissionId] || {};
                    return (
                      <div key={index} style={{ background: "#eff6ff", border: "1px solid #bbf7d0", borderRadius: 12, padding: "18px 22px", minWidth: 260, flex: '1 1 260px', display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#1d4ed8" }}>
                          {s.groupName ? (
                            <>
                              👥 Group: {s.groupName}
                              <div style={{ fontSize: 13, color: "#475569", marginTop: 2 }}>
                                Members: {Array.isArray(s.members) ? s.members.join(", ") : s.members}
                              </div>
                            </>
                          ) : (
                            <>👤 {s.studentName}</>
                          )}
                        </div>
                        {s.projectTitle && (
                          <div style={{ fontSize: 13, color: "#2563eb", fontWeight: 500, marginBottom: 2 }}>
                            🏷️ Project: {s.projectTitle}
                          </div>
                        )}
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#1e293b" }}>📎 {s.title}</div>
                        <div style={{ fontSize: 13, color: "#475569" }}>
                          {s.type === "url"
                            ? <span>🔗 <a href={s.value} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>{s.value}</a></span>
                            : <span>📄 {s.value}</span>}
                        </div>
                        <div style={{ fontSize: 12, color: "#94a3b8" }}>Submitted on: {s.date}</div>
                        <div style={{ background: "#dcfce7", border: "1px solid #bbf7d0", borderRadius: 10, padding: "14px", marginTop: "6px", display: "flex", flexDirection: "column", gap: "10px" }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#15803d" }}>🎯 Give Marks</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <label style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>Marks (out of 100):</label>
                            <input
                              style={{ width: "140px", padding: "8px 12px", borderRadius: 8, border: "1px solid #86efac", fontSize: 14 }}
                              type="number"
                              min="0"
                              max="100"
                              placeholder="e.g. 85"
                              value={savedMarks ? savedMarks.marks : (currentInput.marks || "")}
                              onChange={e => handleMarkInput(submissionId, "marks", e.target.value)}
                            />
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <label style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>Feedback:</label>
                            <textarea
                              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #86efac", fontSize: 13, resize: "vertical" }}
                              placeholder={s.groupName ? "Write feedback for the group..." : "Write feedback for the student..."}
                              rows={2}
                              value={savedMarks ? savedMarks.feedback : (currentInput.feedback || "")}
                              onChange={e => handleMarkInput(submissionId, "feedback", e.target.value)}
                            />
                          </div>
                          {savedMarks ? (
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#15803d", background: "#dcfce7", padding: "7px 14px", borderRadius: 8, alignSelf: "flex-start" }}>✅ Marks Saved — {savedMarks.marks}/100</div>
                          ) : (
                            <button style={{ padding: "9px 20px", background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }} onClick={() => handleSaveMarks(submissionId)}>
                              💾 Save Marks
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ color: "#94a3b8", fontSize: 15, textAlign: "center", padding: "12px 0" }}>No submissions from students for {activeSubject} yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

// ── Styles ──────────────────────────────────────
const styles = {
  wrapper: { minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI', sans-serif" },
  body: { display: "flex" },
  content: { flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: "24px" },
  section: { background: "#ffffff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", gap: "12px" },
  sectionTitle: { fontSize: "17px", fontWeight: "700", color: "#1e293b", margin: 0 },
  subject: { color: "#2563eb" },
  input: { width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", fontFamily: "'Segoe UI', sans-serif", color: "#1e293b", outline: "none" },
  textarea: { width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", fontFamily: "'Segoe UI', sans-serif", color: "#1e293b", outline: "none", resize: "vertical" },
  toggleRow: { display: "flex", alignItems: "center", gap: "10px" },
  toggleLabel: { fontSize: "14px", color: "#475569", fontWeight: "500" },
  toggleBtn: { padding: "8px 18px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" },
  fileRow: { display: "flex", alignItems: "center", gap: "12px" },
  fileHint: { fontSize: "12px", color: "#94a3b8" },
  success: { color: "#16a34a", fontSize: "14px", fontWeight: "500", margin: 0 },
  uploadBtn: { padding: "12px 0", background: "#2563eb", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer", fontFamily: "'Segoe UI', sans-serif", width: "100%" },
  uploadCard: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "14px 18px", display: "flex", flexDirection: "column", gap: "6px" },
  submissionCard: { background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "6px" },
  studentName: { fontSize: "14px", fontWeight: "700", color: "#1d4ed8" },
  cardTitle: { fontSize: "15px", fontWeight: "600", color: "#1e293b" },
  cardDesc: { fontSize: "13px", color: "#64748b", margin: 0 },
  cardMeta: { fontSize: "13px", color: "#475569" },
  cardDate: { fontSize: "12px", color: "#94a3b8" },
  link: { color: "#2563eb", textDecoration: "none" },
  empty: { fontSize: "14px", color: "#94a3b8", textAlign: "center", padding: "8px 0" },

  // Marks section styles
  marksBox: { background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "14px", marginTop: "8px", display: "flex", flexDirection: "column", gap: "10px" },
  marksTitle: { fontSize: "14px", fontWeight: "700", color: "#15803d" },
  marksRow: { display: "flex", flexDirection: "column", gap: "4px" },
  marksLabel: { fontSize: "12px", color: "#475569", fontWeight: "500" },
  marksInput: { width: "140px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #86efac", fontSize: "14px", fontFamily: "'Segoe UI', sans-serif", color: "#1e293b", outline: "none" },
  feedbackInput: { width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #86efac", fontSize: "13px", fontFamily: "'Segoe UI', sans-serif", color: "#1e293b", outline: "none", resize: "vertical" },
  saveBtn: { padding: "9px 20px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "'Segoe UI', sans-serif", alignSelf: "flex-start" },
  savedBadge: { fontSize: "13px", fontWeight: "600", color: "#15803d", background: "#dcfce7", padding: "7px 14px", borderRadius: "8px", alignSelf: "flex-start" },
};
