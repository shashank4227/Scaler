import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const StepHeader = ({ number, title, isActive, isComplete, children, onChangeStep }) => (
    <div className="bg-white shadow-sm mb-3">
        <div className={`flex items-center gap-4 p-4 ${isActive ? 'bg-primary' : ''}`}>
            <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${isActive ? 'bg-white text-primary' : 'bg-gray-100 text-primary'}`}>
                {isComplete ? '✓' : number}
            </span>
            <span className={`font-semibold uppercase text-sm ${isActive ? 'text-white' : 'text-gray-500'}`}>
                {title}
            </span>
            {isComplete && !isActive && (
                <button
                    className="ml-auto text-primary text-sm font-medium border border-gray-200 px-4 py-1 bg-white"
                    onClick={() => onChangeStep(number)}
                >
                    CHANGE
                </button>
            )}
        </div>
        {isActive && children && (
            <div className="p-4 pt-2">
                {children}
            </div>
        )}
        {isComplete && !isActive && (
            <div className="px-4 pb-4 text-sm text-gray-600">
                {number === 1 && <span>John Doe · +91 9999999999</span>}
                {number === 2 && children && children.props && children.props.address && (
                    <span>{children.props.address.name}, {children.props.address.address}, {children.props.address.city}, {children.props.address.state} - {children.props.address.pincode}</span>
                )}
            </div>
        )}
    </div>
);

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, totalAmount, clearCart } = useCart();
    // Start at step 2 (Address) since we simulate a logged-in user
    const [step, setStep] = useState(2);
    const [address, setAddress] = useState({
        name: '',
        phone: '',
        pincode: '',
        locality: '',
        address: '',
        city: '',
        state: ''
    });

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setStep(3); // Proceed to Order Summary directly
    };

    const handlePlaceOrder = async () => {
        try {
            const orderPayload = {
                user_id: 1, // Default guest
                items: cartItems.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total_amount: totalAmount,
                shipping_address: address
            };

            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderPayload)
            });

            if (response.ok) {
                const data = await response.json();
                clearCart();
                navigate('/order-confirmed', { state: { orderId: data.orderId } });
            } else {
                alert('Failed to place order');
            }
        } catch (err) {
            console.error(err);
            alert('Error placing order');
        }
    };

    return (
        <div className="bg-[#f1f3f6] min-h-screen py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Left: Checkout Steps */}
                    <div className="flex-1">
                        {/* Step 1: Login */}
                        <StepHeader 
                            number={1} 
                            title="Login" 
                            isActive={step === 1} 
                            isComplete={step > 1}
                            onChangeStep={setStep}
                        >
                            <div className="flex flex-col gap-2">
                                <div className="text-sm">
                                    <span className="text-gray-500">Name:</span> <span className="font-medium">John Doe</span>
                                </div>
                                <div className="text-sm">
                                    <span className="text-gray-500">Phone:</span> <span className="font-medium">+91 9999999999</span>
                                </div>
                                <button 
                                    onClick={() => setStep(2)}
                                    className="bg-[#fb641b] text-white font-bold uppercase px-8 py-3 shadow hover:shadow-lg mt-2 w-fit"
                                >
                                    Continue Checkout
                                </button>
                            </div>
                        </StepHeader>

                        {/* Step 2: Delivery Address */}
                        <StepHeader 
                            number={2} 
                            title="Delivery Address" 
                            isActive={step === 2} 
                            isComplete={step > 2}
                            onChangeStep={setStep}
                        >
                            {step === 2 ? (
                                <form onSubmit={handleAddressSubmit} className="max-w-xl space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            required
                                            className="border p-3 rounded-sm text-sm outline-none focus:border-primary w-full"
                                            value={address.name}
                                            onChange={e => setAddress(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                        <input
                                            type="text"
                                            placeholder="10-digit mobile number"
                                            required
                                            className="border p-3 rounded-sm text-sm outline-none focus:border-primary w-full"
                                            value={address.phone}
                                            onChange={e => setAddress(prev => ({ ...prev, phone: e.target.value }))}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Pincode"
                                            required
                                            className="border p-3 rounded-sm text-sm outline-none focus:border-primary w-full"
                                            value={address.pincode}
                                            onChange={e => setAddress(prev => ({ ...prev, pincode: e.target.value }))}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Locality"
                                            required
                                            className="border p-3 rounded-sm text-sm outline-none focus:border-primary w-full"
                                            value={address.locality}
                                            onChange={e => setAddress(prev => ({ ...prev, locality: e.target.value }))}
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Address (Area and Street)"
                                        required
                                        className="border p-3 rounded-sm text-sm outline-none focus:border-primary w-full h-20 resize-none"
                                        value={address.address}
                                        onChange={e => setAddress(prev => ({ ...prev, address: e.target.value }))}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="City/District/Town"
                                            required
                                            className="border p-3 rounded-sm text-sm outline-none focus:border-primary w-full"
                                            value={address.city}
                                            onChange={e => setAddress(prev => ({ ...prev, city: e.target.value }))}
                                        />
                                        <select
                                            className="border p-3 rounded-sm text-sm outline-none focus:border-primary text-gray-600 w-full"
                                            value={address.state}
                                            onChange={e => setAddress(prev => ({ ...prev, state: e.target.value }))}
                                        >
                                            <option value="">--Select State--</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Gujarat">Gujarat</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 text-sm">
                                            <input type="radio" name="addressType" defaultChecked /> Home
                                        </label>
                                        <label className="flex items-center gap-2 text-sm">
                                            <input type="radio" name="addressType" /> Work
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-[#fb641b] text-white font-bold uppercase px-10 py-4 shadow hover:shadow-lg"
                                    >
                                        Deliver Here
                                    </button>
                                </form>
                            ) : (
                                // This block handles the "completed" view passing text down
                                // We are using children prop trick in StepHeader, or we can just pass address prop to StepHeader
                                // But to keep it simple with existing structure:
                                <div style={{display: 'none'}} address={address}></div> 
                            )}
                        </StepHeader>

                        {/* Step 3: Order Summary */}
                        <StepHeader 
                            number={3} 
                            title="Order Summary" 
                            isActive={step === 3} 
                            isComplete={step > 3}
                            onChangeStep={setStep}
                        >
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-start gap-4 pb-4 border-b mb-4">
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="w-20 h-20 object-contain"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-sm">{item.title}</h3>
                                        <p className="text-xs text-gray-500 mt-1">Seller: {item.seller}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-gray-400 line-through text-sm">₹{item.original_price.toLocaleString()}</span>
                                            <span className="font-bold">₹{item.price.toLocaleString()}</span>
                                            <span className="text-green-600 text-xs font-bold">{item.discount_percentage}% off</span>
                                        </div>
                                        <div className="text-sm font-semibold mt-1">Qty: {item.quantity}</div>
                                    </div>
                                </div>
                            ))}
                            <button
                                className="bg-[#fb641b] text-white font-bold uppercase px-10 py-4 shadow hover:shadow-lg mt-4"
                                onClick={() => setStep(4)}
                            >
                                Continue
                            </button>
                        </StepHeader>

                        {/* Step 4: Payment Options */}
                        <StepHeader 
                            number={4} 
                            title="Payment Options" 
                            isActive={step === 4} 
                            isComplete={false}
                            onChangeStep={setStep}
                        >
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:border-primary">
                                    <input type="radio" name="payment" className="accent-primary" />
                                    <span>UPI</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:border-primary">
                                    <input type="radio" name="payment" className="accent-primary" />
                                    <span>Wallets</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:border-primary">
                                    <input type="radio" name="payment" className="accent-primary" />
                                    <span>Credit / Debit / ATM Card</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:border-primary">
                                    <input type="radio" name="payment" className="accent-primary" />
                                    <span>Net Banking</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:border-primary bg-blue-50 border-primary">
                                    <input type="radio" name="payment" defaultChecked className="accent-primary" />
                                    <span>Cash on Delivery</span>
                                </label>
                                <button
                                    onClick={handlePlaceOrder}
                                    className="bg-[#fb641b] text-white font-bold uppercase px-10 py-4 shadow hover:shadow-lg mt-4"
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </StepHeader>
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
                                    <span>₹{cartItems.reduce((acc, item) => acc + item.original_price * item.quantity, 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Discount</span>
                                    <span>− ₹{(cartItems.reduce((acc, item) => acc + item.original_price * item.quantity, 0) - totalAmount).toLocaleString()}</span>
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
                                <p className="text-green-600 font-medium text-sm">You will save ₹{(cartItems.reduce((acc, item) => acc + item.original_price * item.quantity, 0) - totalAmount).toLocaleString()} on this order</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
