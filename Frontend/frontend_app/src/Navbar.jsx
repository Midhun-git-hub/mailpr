import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from './Dashboard';
import { GiSeaDragon } from "react-icons/gi";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    navigate("/");
};

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-xl font-bold">
                    <GiSeaDragon className="inline-block mr-2" color="red" size={40}/>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center">
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className="hover:text-gray-200">
                                Dashboard
                            </Link>
                            <Link to="/preference" className="hover:text-gray-200">
                                Preferences
                            </Link>
                            <Link to="/settings" className="hover:text-gray-200">
                                Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-indigo-600 px-4 py-1 rounded-lg hover:bg-gray-200 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="hover:text-gray-200">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white text-indigo-600 px-4 py-1 rounded-lg hover:bg-gray-200 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-indigo-700 px-4 py-4 space-y-3">
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className="block">
                                Dashboard
                            </Link>
                            <Link to="/preference" className="block">
                                Preferences
                            </Link>
                            <Link to="/settings" className="block">
                                Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="block">
                                Login
                            </Link>
                            <Link to="/register" className="block">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
