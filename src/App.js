import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ExamAttempt from "./pages/ExamAttempt";
import ExamResultDetails from "./pages/ExamResultDetails";
import AdminPanel from "./pages/AdminPanel";

function Navbar({ onLogout }) {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">MCQ System</h1>
      <div className="space-x-4">
        <a href="/dashboard" className="hover:underline">
          Dashboard
        </a>
        <a href="/admin" className="hover:underline">
          Admin
        </a>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-200 text-center py-3 mt-auto text-sm text-gray-600">
      © {new Date().getFullYear()} MCQ System. All rights reserved.
    </footer>
  );
}

function AppLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const hideNavbarOnPaths = ["/", "/login", "/register"];

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbarOnPaths.includes(location.pathname) && isLoggedIn && (
        <Navbar onLogout={handleLogout} />
      )}
      <main className="flex-grow px-4 py-6">{children}</main>
      {!hideNavbarOnPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exam/:id" element={<ExamAttempt />} />
          <Route path="/result/:id" element={<ExamResultDetails />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
