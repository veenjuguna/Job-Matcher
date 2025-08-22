import Navbar from './Navbar';
import UploadCard from './UploadCard';
import ProgressTracker from './ProgressTracker';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Navbar />
      <div style={{ padding: '16px' }}>
        <UploadCard />
        <ProgressTracker />
      </div>
    </div>
  );
}
