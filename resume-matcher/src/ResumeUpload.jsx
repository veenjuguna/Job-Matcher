import { useState } from 'react';

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setMessage('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://127.0.0.1:8000/upload/', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setMessage(data.message || 'Upload successful!');
    } catch (err) {
      console.error(err);
      setMessage('Upload failed!');
    }
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Resume</button>
      <p>{message}</p>
    </div>
  );
}
