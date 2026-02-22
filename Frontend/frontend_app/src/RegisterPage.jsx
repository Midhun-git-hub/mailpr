import React, { useState } from "react";
import API from "./services/api";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wakingUp, setWakingUp] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
  setLoading(true);
  setError("");
  setWakingUp(false);

  // Start a 10 second timer
  const wakeTimer = setTimeout(() => {
    setWakingUp(true);
  }, 10000);

  try {
    await API.post("register/", formData);
    navigate("/");
  } catch (err) {
    if (err.response?.data) {
      setError("Registration failed. Username or email may already exist.");
    } else {
      setError("Something went wrong. Please try again.");
    }
  } finally {
    clearTimeout(wakeTimer);
    setLoading(false);
    setWakingUp(false);
  }
};

  

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6 overflow-hidden">

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-white tracking-widest text-lg animate-pulse">
              CREATING YOUR EMPIRE...
            </p>
            {wakingUp && (
        <p className="text-gray-400 text-sm mt-4">
          Server is waking up. This may take 30–60 seconds.
        </p>
      )}
          </div>
        </div>
      )}

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1"
          alt="fitness"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white tracking-widest">
            JOIN THE ELITE
          </h1>
          <p className="text-gray-400 mt-2 uppercase text-sm tracking-wide">
            Discipline • Strength • Growth
          </p>
        </div>

        {/* Glass Card */}
        <div className="bg-gray-900/70 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-2xl text-white">

          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/40 border border-red-700 rounded text-sm text-red-400 text-center">
              {error}
            </div>
          )}

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full mb-6 px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold tracking-wide transition duration-200 flex items-center justify-center
              ${loading 
                ? "bg-gray-700 cursor-not-allowed" 
                : "bg-red-700 hover:bg-red-800"
              }`}
          >
            {loading ? "PROCESSING..." : "Sign Up"}
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;