import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [preference, setPreference] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const token = localStorage.getItem("access");

        const res = await axios.get(
          "https://mailpr.onrender.com/api/preference/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPreference(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPreference();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">

      {/* Hero Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Hello, Warrior !!
        </h1>
        <p className="text-gray-400 mt-2">
          Stay disciplined. Stay consistent. Build power daily.
        </p>
      </div>

      {/* System Overview */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

  <div className="bg-gray-900/70 border border-gray-700 p-6 rounded-2xl shadow-lg">
    <h3 className="text-gray-400 text-sm uppercase tracking-wide">
      Active Focus Areas
    </h3>
    <p className="text-3xl font-bold mt-2 text-red-500">
      {[
        preference?.receive_motivation,
        preference?.receive_finance,
        preference?.receive_stocks,
        preference?.receive_workout,
      ].filter(Boolean).length}
    </p>
  </div>

  <div className="bg-gray-900/70 border border-gray-700 p-6 rounded-2xl shadow-lg">
    <h3 className="text-gray-400 text-sm uppercase tracking-wide">
      Delivery Mode
    </h3>
    <p className="text-2xl font-bold mt-2 text-green-400">
      {preference?.frequency}
    </p>
  </div>

  <div className="bg-gray-900/70 border border-gray-700 p-6 rounded-2xl shadow-lg">
    <h3 className="text-gray-400 text-sm uppercase tracking-wide">
      System Status
    </h3>
    <p className="text-2xl font-bold mt-2 text-blue-400">
      Active
    </p>
  </div>

</div>

      {/* Preferences Section */}
      <h2 className="text-2xl font-bold mb-6">
        Your Active Preferences
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-gray-900/70 border border-gray-700 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Motivation</h3>
          <p className="mt-2 text-gray-400">
            {preference?.receive_motivation ? "Enabled 🔥" : "Disabled"}
          </p>
        </div>

        <div className="bg-gray-900/70 border border-gray-700 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Finance</h3>
          <p className="mt-2 text-gray-400">
            {preference?.receive_finance ? "Enabled 💰" : "Disabled"}
          </p>
        </div>

        <div className="bg-gray-900/70 border border-gray-700 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Stocks</h3>
          <p className="mt-2 text-gray-400">
            {preference?.receive_stocks ? "Enabled 📈" : "Disabled"}
          </p>
        </div>

        <div className="bg-gray-900/70 border border-gray-700 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Workout</h3>
          <p className="mt-2 text-gray-400">
            {preference?.receive_workout ? "Enabled 💪" : "Disabled"}
          </p>
        </div>

      </div>

      {/* Frequency */}
      <div className="mt-10 bg-gray-900/70 border border-gray-700 p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold">Email Frequency</h3>
        <p className="mt-2 text-gray-400">
          {preference?.frequency}
        </p>
      </div>

      <div className="mt-8 flex justify-center md:justify-end">
  <button
    onClick={() => navigate("/preference")}
    className="px-6 py-3 bg-red-700 hover:bg-red-800 transition duration-200 rounded-xl font-semibold tracking-wide shadow-lg"
  >
    Adjust Strategy
  </button>
</div>

      {/* Quote Section */}
      <div className="mt-12 text-center text-gray-500 italic">
        “Comfort is the enemy of progress.”
      </div>

    </div>
  );
};

export default Dashboard;
