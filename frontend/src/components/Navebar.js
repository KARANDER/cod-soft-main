import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const { token } = useSelector((state) => state.auth); 
    const { role } = useSelector((state) => state.profile);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
        console.log('Menu toggled:', !menuOpen);
    };

    return (
        <nav className="bg-slate-50 p-4 relative z-10"> {/* Set z-index here */}
            <div className="container mx-auto flex justify-between items-center flex-wrap">
                <div className="text-2xl font-bold text-black">Job Board</div>
                <div className="block md:hidden">
                    <button 
                        onClick={handleMenuToggle} 
                        className="focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
                <div className="hidden md:flex text-black space-x-8 flex-1 justify-center">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/browse-jobs" className="hover:underline">Browse Jobs</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </div>

                {token ? (
                    <div className="hidden md:flex space-x-4">
                        <button 
                            onClick={() => navigate(role === 'employer' ? '/employer-dashboard' : '/candidate-dashboard')}
                            className="bg-green-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-green-600"
                        >
                            Profile
                        </button>
                    </div>  
                ) : (
                    <div className="hidden md:flex space-x-4">
                        <Link to="/login">
                            <button className="bg-[#3edf63] text-black px-4 py-2 rounded transition duration-300 hover:bg-green-600">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-[#3edf63] text-black px-4 py-2 rounded transition duration-300 hover:bg-green-600">Sign Up</button>
                        </Link>
                    </div>
                )}

                <div className={`absolute top-16 left-0 w-full bg-green-500 text-white p-4 rounded transition-all duration-300 md:hidden ${menuOpen ? 'block' : 'hidden'} flex-col items-center space-y-4 z-20`}>
                    <Link to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/browse-jobs" className="hover:underline" onClick={() => setMenuOpen(false)}>Browse Jobs</Link>
                    <Link to="/contact" className="hover:underline" onClick={() => setMenuOpen(false)}>Contact</Link>
                    {token ? (
                        <button 
                            onClick={() => {
                                navigate(role === 'employer' ? '/employer-dashboard' : '/candidate-dashboard');
                                setMenuOpen(false);
                            }}
                            className="bg-white text-green-500 px-4 py-2 rounded transition duration-300 hover:bg-green-600 hover:text-white"
                        >
                            Profile
                        </button>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)}>
                                <button className="bg-white text-green-500 px-4 py-2 rounded transition duration-300 hover:bg-green-600 hover:text-white">Login</button>
                            </Link>
                            <Link to="/signup" onClick={() => setMenuOpen(false)}>
                                <button className="bg-white text-green-500 px-4 py-2 rounded transition duration-300 hover:bg-green-600 hover:text-white">Sign Up</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
