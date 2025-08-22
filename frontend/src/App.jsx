import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const response = await fetch("http://localhost:5000/api/jobs");
    const data = await response.json();
    setJobs(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Job Matcher</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>{job.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
