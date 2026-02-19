import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Navbar.jsx';
import Preference from './Preference.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import Dashboard from "./Dashboard.jsx";
import Settings from "./Settings.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
  );

  return (
    <>
      <Navbar 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
      />

      <Routes>
        {/* Default route */}
        <Route 
          path="/" 
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage setIsLoggedIn={setIsLoggedIn} />
            )
          } 
        />

        <Route 
          path="/register" 
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterPage />
          } 
        />

        <Route 
          path="/preference" 
          element={
            isLoggedIn ? <Preference /> : <Navigate to="/" />
          } 
        />

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/" />
          }
        />

        <Route
          path="/settings"
          element={
            isLoggedIn ? <Settings /> : <Navigate to="/" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
