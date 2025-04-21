import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Suppliers from './pages/Suppliers';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

const App: React.FC = () => {
  const isAuthenticated = false; // TODO: Implement authentication check

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App; 