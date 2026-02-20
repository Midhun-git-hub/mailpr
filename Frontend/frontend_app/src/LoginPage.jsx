import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://mailpr.onrender.com/api/token/",
        { username, password }
      );

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) { // eslint-disable-line no-unused-vars
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-black via-gray-900 to-black p-6">

      {/* Glassy Heading */}
      <h1 className="text-6xl font-extrabold text-white mb-6 bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20 shadow-lg text-center tracking-wider">
        BUILD POWER
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-center mb-10 uppercase tracking-widest text-sm">
        Discipline • Strength • Growth
      </p>

      {/* Login Card */}
      <div className="bg-gray-900/70 backdrop-blur-md border border-gray-700 p-8 rounded-xl shadow-2xl w-full max-w-md text-white">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-700 text-white py-3 rounded-lg hover:bg-red-800 transition duration-200 font-semibold tracking-wide"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
