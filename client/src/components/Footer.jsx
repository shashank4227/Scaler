import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#172337] text-white mt-8">
            {/* Top Footer */}
            <div className="border-b border-gray-600">
                <div className="container mx-auto px-4 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                        {/* About */}
                        <div>
                            <h3 className="text-gray-400 text-xs font-medium mb-3 uppercase">About</h3>
                            <ul className="text-xs space-y-2">
                                <li><Link to="/" className="text-gray-300 hover:underline">Contact Us</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">About Us</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">Careers</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">Flipkart Stories</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">Press</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">Corporate Information</Link></li>
                            </ul>
                        </div>

                        {/* Group Companies */}
                        <div>
                            <h3 className="text-gray-400 text-xs font-medium mb-3 uppercase">Group Companies</h3>
                            <ul className="text-xs space-y-2">
                                <li><Link to="/" className="text-gray-300 hover:underline">Myntra</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">Cleartrip</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">Shopsy</Link></li>
                            </ul>
                        </div>

                        {/* Help */}
                        <div>
                            <h3 className="text-gray-400 text-xs font-medium mb-3 uppercase">Help</h3>
                            <ul className="text-xs space-y-2">
                                <li><Link to="/" className="text-gray-300 hover:underline">Payments</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">Shipping</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">Cancellation & Returns</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">FAQ</Link></li>
                            </ul>
                        </div>

                        {/* Consumer Policy */}
                        <div>
                            <h3 className="text-gray-400 text-xs font-medium mb-3 uppercase">Consumer Policy</h3>
                            <ul className="text-xs space-y-2">
                                <li><Link to="/" className="text-gray-300 hover:underline">Cancellation & Returns</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">Terms Of Use</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">Security</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">Privacy</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">Sitemap</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">Grievance Redressal</Link></li>
                                <li><Link to="/" className="text-gray-300 hover:underline">EPR Compliance</Link></li>
                            </ul>
                        </div>

                        {/* Mail Us */}
                        <div>
                            <h3 className="text-gray-400 text-xs font-medium mb-3 uppercase">Mail Us:</h3>
                            <p className="text-xs text-gray-300 leading-5">
                                Flipkart Internet Private Limited,<br />
                                Buildings Alyssa, Begonia &<br />
                                Clove Embassy Tech Village,<br />
                                Outer Ring Road, Devarabeesanahalli Village,<br />
                                Bengaluru, 560103,<br />
                                Karnataka, India
                            </p>
                        </div>

                        {/* Registered Office */}
                        <div>
                            <h3 className="text-gray-400 text-xs font-medium mb-3 uppercase">Registered Office Address:</h3>
                            <p className="text-xs text-gray-300 leading-5">
                                Flipkart Internet Private Limited,<br />
                                Buildings Alyssa, Begonia &<br />
                                Clove Embassy Tech Village,<br />
                                Outer Ring Road, Devarabeesanahalli Village,<br />
                                Bengaluru, 560103,<br />
                                Karnataka, India<br />
                                CIN: U51109KA2012PTC066107<br />
                                Telephone: 044-45614700
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-wrap items-center justify-between text-xs">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 12V8h2v4H9zm0-5V5h2v2H9z" />
                            </svg>
                            <span className="text-gray-300">Become a Seller</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            <span className="text-gray-300">Advertise</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                                <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                            </svg>
                            <span className="text-gray-300">Gift Cards</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-300">Help Center</span>
                        </div>
                    </div>
                    <div className="text-gray-400">
                        © 2007-2026 Flipkart.com
                    </div>
                    <div className="flex items-center gap-4">
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" alt="Payment Methods" className="h-6 opacity-70" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
