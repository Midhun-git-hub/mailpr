import React, { useState, useEffect } from "react";
import API from "./services/api.jsx";
import { Flame, DollarSign, TrendingUp, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Preference = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        receive_motivation: false,
        receive_finance: false,
        receive_stocks: false,
        receive_workout: false,
        frequency: "daily",
    });

    useEffect(() => {
        API.get("preference/")
            .then((res) => setFormData(res.data))
            .catch(() => console.log("No preferences yet"));
    }, []);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSave = async () => {
        try {
            await API.put("preference/", formData);
            alert("Updated!");
        } catch {
            await API.post("preference/", formData);
            alert("Created!");
        }
        navigate("/dashboard");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">

            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/loginbg.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            {/* Glass Panel */}
            <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-lg text-white">

                <h2 className="text-3xl font-bold mb-8 text-center">
                    Customize Your Preferences
                </h2>

                <div className="space-y-6">

                    {/* ========== MOTIVATION ========== */}
                    <PreferenceRow
                        icon={<Flame size={20} />}
                        label="Motivation"
                        name="receive_motivation"
                        checked={formData.receive_motivation}
                        onChange={handleChange}
                        activeColor="pink"
                    />

                    {/* ========== FINANCE ========== */}
                    <PreferenceRow
                        icon={<DollarSign size={20} />}
                        label="Finance"
                        name="receive_finance"
                        checked={formData.receive_finance}
                        onChange={handleChange}
                        activeColor="yellow"
                    />

                    {/* ========== STOCKS ========== */}
                    <PreferenceRow
                        icon={<TrendingUp size={20} />}
                        label="Stocks"
                        name="receive_stocks"
                        checked={formData.receive_stocks}
                        onChange={handleChange}
                        activeColor="green"
                    />

                    {/* ========== WORKOUT ========== */}
                    <PreferenceRow
                        icon={<Dumbbell size={20} />}
                        label="Workout"
                        name="receive_workout"
                        checked={formData.receive_workout}
                        onChange={handleChange}
                        activeColor="blue"
                    />

                    {/* Frequency */}
                    <div>
                        <label className="block mb-2 font-semibold">
                            Email Frequency
                        </label>
                        <select
                            name="frequency"
                            value={formData.frequency}
                            onChange={handleChange}
                            className="w-full bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        >
                            <option value="daily" className="text-black">Daily</option>
                            <option value="weekly" className="text-black">Weekly</option>
                        </select>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:scale-105 py-3 rounded-xl font-semibold transition duration-200 shadow-lg mt-4"
                    >
                        Save Preferences
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Preference;



/* ========================= */
/* Reusable Preference Row   */
/* ========================= */

const PreferenceRow = ({ icon, label, name, checked, onChange, activeColor }) => {

    const colorMap = {
        pink: "peer-checked:bg-pink-500 bg-pink-500/20",
        green: "peer-checked:bg-green-500 bg-green-500/20",
        yellow: "peer-checked:bg-yellow-400 bg-yellow-400/20",
        blue: "peer-checked:bg-blue-400 bg-blue-400/20",
    };

    return (
        <label className="flex items-center justify-between bg-white/10 p-4 rounded-xl hover:bg-white/20 transition duration-200 cursor-pointer">

            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[activeColor]}`}>
                    {icon}
                </div>
                <span className="text-lg">{label}</span>
            </div>

            {/* Toggle */}
            <div className="relative inline-flex items-center">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="peer sr-only"
                />
                <div className={`
                w-11 h-6 bg-white/20 rounded-full
                transition-colors duration-300
                ${colorMap[activeColor]}
                after:content-['']
                after:absolute after:top-0.5 after:left-0.5
                after:w-5 after:h-5
                after:bg-white after:rounded-full
                after:shadow-md
                after:transition-transform after:duration-300
                peer-checked:after:translate-x-5
        `      } />
            </div>

        </label>
    );
};
