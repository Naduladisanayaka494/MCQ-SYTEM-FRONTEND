import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExamAttempt from './pages/ExamAttempt';
import ExamResultDetails from './pages/ExamResultDetails';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exam/:id" element={<ExamAttempt />} />
        <Route path="/result/:id" element={<ExamResultDetails />} />
       <Route path="/admin" element={<AdminPanel />} />

      </Routes>
    </Router>
  );
}

export default App;
