import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api/users";

export default function App() {
  const [name, setName] = useState("");
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchPeople = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setPeople(Array.isArray(data) ? data : data.users || []);
    } catch (e) {
      console.error(e);
      setMsg("Couldn't load users (is the backend running on :5000?)");
    }
  };

  useEffect(() => { fetchPeople(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Request failed");
      setName("");
      await fetchPeople();
      setMsg("Saved ");
    } catch (e) {
      console.error(e);
      setMsg("Save failed ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="header">
        <h1><span className="badge">beta</span> <span className="pink">Job Matcher</span></h1>
        <p>Simple UI (no Chakra). Pink and clean </p>
      </header>

      <article>
        <h3>Add a test user</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" aria-busy={loading}>{loading ? "Saving…" : "Submit"}</button>
        </form>
        {msg && <small>{msg}</small>}
      </article>

      <article>
        <h3>Current users</h3>
        {people.length === 0 ? (
          <p>No users yet.</p>
        ) : (
          <ul>
            {people.map((p, i) => (
              <li key={p.id || p._id || i}>{p.name || String(p)}</li>
            ))}
          </ul>
        )}
      </article>
    </>
  );
}
