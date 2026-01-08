import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const navigate = useNavigate();
    const { cartItems, updateQuantity, removeFromCart, totalAmount } = useCart();
    // Calculate derived totals
    const totalOriginalAmount = cartItems.reduce((acc, item) => acc + item.original_price * item.quantity, 0);
    const totalDiscount = totalOriginalAmount - totalAmount;




    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-white p-12 text-center shadow-sm">
                    <img
                        src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png"
                        alt="Empty Cart"
                        className="w-48 mx-auto mb-6 opacity-70"
                    />
                    <h2 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty!</h2>
                    <p className="text-gray-500 mb-6">Add items to it now.</p>
                    <Link to="/" className="bg-primary text-white px-12 py-3 font-semibold rounded-sm inline-block">
                        Shop now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f1f3f6] min-h-screen py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Left: Cart Items */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="bg-white shadow-sm p-4 mb-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-medium">My Cart ({cartItems.length})</h2>
                                <div className="text-sm text-gray-500">
                                    Deliver to: <span className="font-medium text-gray-800">560001</span>
                                </div>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="bg-white shadow-sm">
                            {cartItems.map((item, index) => (
                                <div key={item.id} className={`p-4 flex gap-6 ${index < cartItems.length - 1 ? 'border-b' : ''}`}>
                                    {/* Image */}
                                    <div className="w-28 h-28 flex-shrink-0">
                                        <img src={item.image_url} alt={item.title} className="w-full h-full object-contain" />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1">
                                        <Link to={`/product/${item.id}`} className="font-medium text-gray-800 hover:text-primary block mb-1">
                                            {item.title}
                                        </Link>
                                        <p className="text-xs text-gray-500 mb-2">Seller: {item.seller}</p>

                                        {/* Price */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-gray-400 line-through text-sm">₹{item.original_price.toLocaleString()}</span>
                                            <span className="text-lg font-bold text-gray-800">₹{item.price.toLocaleString()}</span>
                                            <span className="text-green-600 text-sm font-medium">{item.discount_percentage}% off</span>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center">
                                                <button
                                                    className="w-7 h-7 rounded-full border-2 border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:border-gray-400 disabled:opacity-50"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    −
                                                </button>
                                                <input
                                                    type="text"
                                                    value={item.quantity}
                                                    readOnly
                                                    className="w-12 text-center border-t border-b border-gray-200 py-1 mx-1 bg-gray-50 font-medium"
                                                />
                                                <button
                                                    className="w-7 h-7 rounded-full border-2 border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:border-gray-400"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button className="text-sm font-semibold text-gray-700 hover:text-primary uppercase">
                                                Save for Later
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-sm font-semibold text-gray-700 hover:text-red-500 uppercase"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Delivery */}
                                    <div className="text-right text-sm text-gray-500 w-40">
                                        <p>Delivery by Tomorrow</p>
                                        <p className="text-green-600 font-medium">FREE</p>
                                    </div>
                                </div>
                            ))}

                            {/* Place Order Button */}
                            <div className="p-4 border-t flex justify-end sticky bottom-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="bg-[#fb641b] text-white px-16 py-4 font-bold uppercase shadow hover:shadow-lg transition-shadow"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Price Details */}
                    <div className="w-full lg:w-[360px]">
                        <div className="bg-white shadow-sm sticky top-20">
                            <div className="p-4 border-b">
                                <h2 className="text-gray-500 font-bold uppercase text-sm">Price Details</h2>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span>Price ({cartItems.length} items)</span>
                                    <span>₹{totalOriginalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Discount</span>
                                    <span>− ₹{totalDiscount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Delivery Charges</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t border-dashed pt-4">
                                    <span>Total Amount</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="p-4 pt-0">
                                <p className="text-green-600 font-medium text-sm">You will save ₹{totalDiscount.toLocaleString()} on this order</p>
                            </div>

                            {/* Safe & Secure */}
                            <div className="p-4 border-t flex items-center gap-2 text-gray-500 text-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Safe and Secure Payments. Easy returns. 100% Authentic products.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
