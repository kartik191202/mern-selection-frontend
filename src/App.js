// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AdminPanel from "./components/AdminPanel";
import "./App.css";

function AdminLink() {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";
  return (
    <Link to={isAdmin ? "/" : "/admin"} className="admin-link-btn">
      {isAdmin ? "Back to Home" : "Admin Panel"}
    </Link>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

        {/* toggling admin link */}
        <AdminLink />
      </div>
    </Router>
  );
}

export default App;
