import { useState, useEffect } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users/");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
      setMessage("Couldn't load users. Is the backend running on :5000?");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleNameChange = (e) => setName(e.target.value);

  const uploadResume = async () => {
    if (!file || !name) {
      setMessage("Please enter your name and select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    try {
      const res = await fetch("http://localhost:5000/upload/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message);
      setFile(null);
      setName("");
      fetchUsers(); // refresh users list
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 20, background: "#ffe6f0", minHeight: "100vh" }}>
      <h1 style={{ color: "#ff66b2" }}>Job Matcher</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Type your name"
          value={name}
          onChange={handleNameChange}
          style={{ padding: 8, borderRadius: 5, border: "1px solid #ffb3d9", marginRight: 8 }}
        />
        <input type="file" onChange={handleFileChange} style={{ padding: 8 }} />
        <button
          onClick={uploadResume}
          style={{ padding: "8px 16px", marginLeft: 8, backgroundColor: "#ff66b2", color: "#fff", border: "none", borderRadius: 5 }}
        >
          Upload Resume
        </button>
      </div>

      {message && <p style={{ color: "#d6336c" }}>{message}</p>}

      <h2>Current Users</h2>
      {users.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        <ul>
          {users.map((u, idx) => (
            <li key={idx}>{u.name} - {u.file}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
// src/App.jsx