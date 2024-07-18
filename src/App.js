// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LanguageSelector from './components/LanguageSelector'; // Dil seçici bileşeni
import './i18n'; // i18n yapılandırması

function App() {
  const user = localStorage.getItem('user');

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="flex justify-end py-4 pr-4">
              <LanguageSelector /> {/* Dil seçici bileşeni sağ üst köşede */}
            </div>
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Home />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
            </Routes>
          </header>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
