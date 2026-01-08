import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
    const [showLoginDropdown, setShowLoginDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { cartItems } = useCart();

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-14 gap-6">
                    {/* ... logos and search ... */}
                    {/* Logo Section */}
                    <Link to="/" className="flex flex-col items-start flex-shrink-0">
                        <span className="text-primary text-xl font-bold italic leading-tight">Flipkart</span>
                        <span className="text-[10px] text-gray-500 flex items-center gap-0.5 -mt-0.5">
                            Explore <span className="text-yellow-500 font-medium">Plus</span>
                            <svg className="w-2.5 h-2.5 text-yellow-500" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l2.5 5.5L16 6.5l-4 4 1 5.5L8 13l-5 3 1-5.5-4-4 5.5-1z" /></svg>
                        </span>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl">
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search for Products, Brands and More"
                                className="w-full py-2.5 pl-10 pr-4 rounded-sm text-sm outline-none bg-[#f0f5ff] border-none focus:ring-2 focus:ring-primary/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        navigate(`/?search=${searchTerm}`);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Navigation */}
                    <div className="flex items-center gap-8 text-gray-700 font-medium flex-shrink-0">
                        {/* Login Button */}
                        <div
                            className="relative"
                            onMouseEnter={() => setShowLoginDropdown(true)}
                            onMouseLeave={() => setShowLoginDropdown(false)}
                        >
                            <button className="flex items-center gap-2 text-sm hover:text-primary">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Login
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {showLoginDropdown && (
                                <div className="absolute top-full right-0 mt-2 w-60 bg-white text-gray-700 shadow-xl rounded-sm z-50 border">
                                    <div className="p-3 border-b bg-gray-50">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">New customer?</span>
                                            <Link to="/signup" className="text-primary text-sm font-medium">Sign Up</Link>
                                        </div>
                                    </div>
                                    <ul className="text-sm py-1">
                                        <li className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            My Profile
                                        </li>
                                        <li className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                            Orders
                                        </li>
                                        <li className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                            Wishlist
                                        </li>
                                        <li className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Rewards
                                        </li>
                                        <li className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Gift Cards
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        <Link to="/cart" className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                            <div className="relative">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-[#ff6161] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                                        {cartItems.length}
                                    </span>
                                )}
                            </div>
                            Cart
                        </Link>

                        {/* Become a Seller */}
                        <span className="text-sm cursor-pointer hover:text-primary flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Become a Seller
                        </span>

                        {/* More Menu */}
                        <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
