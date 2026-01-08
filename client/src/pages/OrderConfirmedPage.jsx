import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmedPage = () => {
    const location = useLocation();
    const orderId = location.state?.orderId || 'OD' + Math.floor(Math.random() * 1000000000);

    return (
        <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center p-4">
            <div className="bg-white rounded shadow-sm text-center max-w-lg w-full overflow-hidden">
                {/* Success Header */}
                <div className="bg-gradient-to-r from-green-400 to-green-500 p-8">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
                    <p className="text-gray-500 mb-6">Thank you for shopping with us.</p>

                    <div className="bg-gray-50 p-4 rounded mb-6">
                        <p className="text-sm text-gray-500 mb-1">Order ID</p>
                        <p className="font-bold font-mono text-lg text-primary">{orderId}</p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-8">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        You'll receive a confirmation email shortly.
                    </div>

                    <div className="flex gap-4">
                        <Link
                            to="/"
                            className="flex-1 bg-primary text-white font-bold py-3 rounded shadow hover:bg-blue-600 transition-colors text-center"
                        >
                            Continue Shopping
                        </Link>
                        <button
                            className="flex-1 border-2 border-primary text-primary font-bold py-3 rounded hover:bg-blue-50 transition-colors"
                        >
                            Track Order
                        </button>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="bg-gray-50 p-4 border-t flex items-center justify-center gap-6 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        100% Secure
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Easy Returns
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Genuine Products
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmedPage;
