import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './auth/Login';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import EmployeePage from './pages/EmployeePage';
import FieldBuilderPage from './pages/FieldBuilderPage';
const isLoggedIn = !!localStorage.getItem('access');

function App() {
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/login';
  };

  return (
    <div>
      {/* Navbar */}
      {isLoggedIn && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
          <span className="navbar-brand">EMS</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employees">Employees</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
            </ul>
            <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLogin={() => (window.location.href = '/dashboard')} />
              )
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLogin={() => (window.location.href = '/dashboard')} />
              )
            }
          />

          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/employees"
            element={isLoggedIn ? <EmployeePage /> : <Navigate to="/login" />}
          />

          <Route
            path="/fields"
            element={isLoggedIn ? <FieldBuilderPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/profile"
            element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
