// src/App.jsx
import { useState, useEffect } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5000/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert("Couldn't load users (is the backend running on :5000?)");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    if (!name) return;
    try {
      const res = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Save failed");
      setName("");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Saving failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", background: "#ffe6f0", minHeight: "100vh" }}>
      <h1 style={{ color: "#ff3399" }}>Job Matcher</h1>
      <p>Simple pink UI - add a test user:</p>
      <input
        type="text"
        placeholder="Type your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "0.5rem" }}
      />
      <button onClick={addUser} style={{ padding: "0.5rem", background: "#ff3399", color: "#fff", border: "none", cursor: "pointer" }}>
        Submit
      </button>

      <div style={{ marginTop: "2rem" }}>
        <h2>Current users</h2>
        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No users yet.</p>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
