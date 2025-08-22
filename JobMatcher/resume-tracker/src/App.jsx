import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/") // your backend URL
      .then((res) => setMessage(res.data.message || JSON.stringify(res.data)))
      .catch((err) => setMessage("Error: " + err.message));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Frontend Connected 🚀</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
