import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Could not load users (is the backend running on :5000?)');
    }
  };

  const addUser = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users', { name });
      setMessage(res.data.message);
      setName('');
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage('Save failed');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#ffe4e6' }}>
      <h1>Job Matcher 💖</h1>
      <p>Simple UI, Pink and clean</p>

      <div style={{ margin: '1rem 0' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name"
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button onClick={addUser} style={{ padding: '0.5rem 1rem', backgroundColor: '#ec4899', color: 'white', border: 'none', cursor: 'pointer' }}>
          Add User
        </button>
      </div>

      {message && <p>{message}</p>}

      <h2>Current Users</h2>
      <ul>
        {users.length === 0 ? <li>No users yet.</li> : users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
