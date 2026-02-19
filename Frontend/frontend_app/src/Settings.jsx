import { useState } from "react";
import axios from "axios";
import API from "./services/api";

const Settings = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const [passwordData, setPasswordData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });
    const [passwordError, setPasswordError] = useState("");

    const token = localStorage.getItem("access");

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value.trim()) {
            return "Email is required.";
        }

        if (!regex.test(value)) {
            return "Enter a valid email address.";
        }

        return "";
    };

    const updateEmail = async () => {
        const validationError = validateEmail(email);

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await axios.put(
                "http://127.0.0.1:8000/api/update_email/",
                { email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setError("");
            alert("Email updated!");
            setEmail(""); // optional clear
        } catch (error) // eslint-disable-line no-unused-vars
        {
            setError("Something went wrong.");
        }
    };

    const sendTestEmail = async () => {
        await axios.post(
            "http://127.0.0.1:8000/api/send_test_email/",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        alert("Test email sent!");
    };



    const validatePassword = () => {
        if (!passwordData.current_password.trim()) {
            return "Current password is required.";
        }

        if (passwordData.new_password.length < 6) {
            return "New password must be at least 6 characters.";
        }

        if (passwordData.new_password !== passwordData.confirm_password) {
            return "Passwords do not match.";
        }

        return "";
    };

    const changePassword = async () => {
        const validationError = validatePassword();

        if (validationError) {
            setPasswordError(validationError);
            return;
        }

        try {
            await axios.put(
                "http://127.0.0.1:8000/api/change_password/",
                passwordData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setPasswordError("");
            alert("Password updated successfully!");
            setPasswordData({
                current_password: "",
                new_password: "",
                confirm_password: "",
            });
        } catch (error) // eslint-disable-line no-unused-vars
        {
            setPasswordError("Incorrect current password.");
        }


    };


    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Page Title */}
                <h1 className="text-4xl font-bold tracking-tight mb-12">
                    Account Settings
                </h1>

                {/*  ACCOUNT  */}
                <section className="mb-14">
                    <h2 className="text-xl font-semibold mb-6 text-neutral-400 uppercase tracking-wider">
                        Account
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm text-neutral-400">
                                Change Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter new email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                className={`w-full bg-neutral-900 border px-4 py-3 rounded-md focus:outline-none transition
                                ${error
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-neutral-800 focus:border-blue-500"
                                    }`}
                            />

                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>

                        <button
                            onClick={updateEmail}
                            disabled={!email.trim()}
                            className={`px-6 py-2 rounded-md font-medium transition
                            ${!email.trim()
                                    ? "bg-neutral-700 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`
                            }
                        >
                            Update Email
                        </button>
                        <div className="border-t border-neutral-800 my-12"></div>

                        <div>
                            <label className="block mb-2 text-sm text-neutral-400">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={passwordData.current_password}
                                onChange={(e) =>
                                    setPasswordData({ ...passwordData, current_password: e.target.value })
                                }
                                className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-neutral-400">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={passwordData.new_password}
                                onChange={(e) =>
                                    setPasswordData({ ...passwordData, new_password: e.target.value })
                                }
                                className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-neutral-400">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={passwordData.confirm_password}
                                onChange={(e) =>
                                    setPasswordData({ ...passwordData, confirm_password: e.target.value })
                                }
                                className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-md"
                            />
                        </div>

                        {passwordError && (
                            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                        )}

                        <button
                            onClick={changePassword}
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition"
                        >
                            Update Password
                        </button>
                    </div>
                </section>

                <div className="border-t border-neutral-800 my-12"></div>

                {/* NOTIFICATIONS */}
                <section className="mb-14">
                    <h2 className="text-xl font-semibold mb-6 text-neutral-400 uppercase tracking-wider">
                        Notifications
                    </h2>

                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <span>Email Notifications</span>
                            <input type="checkbox" className="accent-blue-600 h-5 w-5" />
                        </div>

                        <button
                            onClick={sendTestEmail}
                            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md transition"
                        >
                            Send Test Email
                        </button>

                    </div>
                </section>

                <div className="border-t border-neutral-800 my-12"></div>

                {/*  SECURITY  */}
                <section className="mb-14">
                    <h2 className="text-xl font-semibold mb-6 text-neutral-400 uppercase tracking-wider">
                        Security
                    </h2>

                    <div className="flex flex-col space-y-6">
                        <button className="bg-neutral-800 hover:bg-neutral-700 px-6 py-2 rounded-md transition">
                            Enable Two-Factor Authentication
                        </button>

                        <button className="bg-neutral-800 hover:bg-neutral-700 px-6 py-2 rounded-md transition">
                            View Active Sessions
                        </button>
                    </div>
                </section>

                <div className="border-t border-neutral-800 my-12"></div>

                {/*  DANGER ZONE */}
                <section>
                    <h2 className="text-xl font-semibold mb-6 text-red-500 uppercase tracking-wider">
                        Danger Zone
                    </h2>

                    <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition">
                        Delete Account
                    </button>
                </section>
            </div>
        </div>
    );
};

export default Settings;
