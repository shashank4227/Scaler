import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                const data = await response.json();
                
                const transformedProduct = {
                    ...data,
                    image_url: data.image_url, 
                    images: [data.image_url, data.image_url, data.image_url], // duplicating for thumbnail demo
                    rating: parseFloat(data.rating),
                    discountPercentage: parseInt(data.discount_percentage),
                    price: parseFloat(data.price),
                    originalPrice: parseFloat(data.original_price),
                };

                setProduct(transformedProduct);
                setSelectedImage(transformedProduct.image_url);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto p-4 flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return <div className="p-10 text-center">Product not found</div>;
    }

    return (
        <div className="bg-white min-h-screen pb-10">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-8 bg-white p-4">
                    {/* Left: Images */}
                    <div className="w-full md:w-5/12 sticky top-20 h-fit">
                        <div className="flex gap-4">
                            {/* Thumbnails */}
                            <div className="w-16 flex flex-col gap-2">
                                {product.images?.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-16 h-16 border rounded p-1 cursor-pointer overflow-hidden ${selectedImage === img ? 'border-primary' : 'border-gray-200'}`}
                                        onMouseEnter={() => setSelectedImage(img)}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-contain" />
                                    </div>
                                ))}
                            </div>
                            {/* Main Image */}
                            <div className="flex-1 border rounded-sm relative p-4 flex items-center justify-center bg-white h-[450px]">
                                <img
                                    src={selectedImage}
                                    alt={product.title}
                                    className="max-w-full max-h-full object-contain"
                                />
                                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow border text-gray-300 hover:text-red-500 cursor-pointer">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => addToCart({
                                    id: product.id,
                                    title: product.title,
                                    image_url: product.image_url,
                                    price: Math.round(product.price * (1 - product.discountPercentage / 100)),
                                    original_price: product.price,
                                    discount_percentage: product.discountPercentage,
                                    seller: "RetailNet"
                                })}
                                className="flex-1 bg-[#ff9f00] text-white font-bold py-4 uppercase text-center shadow hover:shadow-lg transition-shadow flex items-center justify-center gap-2 rounded-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                ADD TO CART
                            </button>
                            <button 
                                onClick={() => {
                                    addToCart({
                                        id: product.id,
                                        title: product.title,
                                        image_url: product.image_url,
                                        price: Math.round(product.price * (1 - product.discountPercentage / 100)),
                                        original_price: product.price,
                                        discount_percentage: product.discountPercentage,
                                        seller: "RetailNet"
                                    });
                                    navigate('/cart');
                                }}
                                className="flex-1 bg-[#fb641b] text-white font-bold py-4 uppercase shadow hover:shadow-lg transition-shadow flex items-center justify-center gap-2 rounded-sm"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                                </svg>
                                BUY NOW
                            </button>
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="w-full md:w-7/12 pl-4">
                        <div className="text-gray-400 text-xs mb-2">Home {'>'} Electronics {'>'} {product.category_name || 'Mobiles'}</div>
                        
                        <h1 className="text-lg font-normal text-gray-800 mb-2">{product.title}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-[#388e3c] text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                {product.rating} <span className="text-[10px]">★</span>
                            </span>
                            <span className="text-gray-500 font-medium text-sm ml-1">
                                8,432 Ratings & 982 Reviews
                            </span>
                            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className="h-5 ml-2" />
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-3">
                            <span className="text-3xl font-medium">₹{product.price?.toLocaleString()}</span>
                            <span className="text-gray-500 line-through text-base">₹{product.originalPrice?.toLocaleString()}</span>
                            <span className="text-[#388e3c] font-bold text-base">{product.discountPercentage}% off</span>
                        </div>

                        {/* Offers */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-800 mb-2">Available offers</h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-start gap-3">
                                    <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" className="w-5 h-5" />
                                    <span className="text-sm text-gray-700 leading-snug"><strong>Bank Offer</strong> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card <span className="text-primary font-medium cursor-pointer">T&C</span></span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" className="w-5 h-5" />
                                    <span className="text-sm text-gray-700 leading-snug"><strong>Bank Offer</strong> 10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply <span className="text-primary font-medium cursor-pointer">T&C</span></span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" className="w-5 h-5" />
                                    <span className="text-sm text-gray-700 leading-snug"><strong>Special Price</strong> Get extra 20% off (price inclusive of discount) <span className="text-primary font-medium cursor-pointer">T&C</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Warranty & Highlights Row */}
                        <div className="flex gap-4 mb-4">
                            <div className="w-28 text-gray-500 text-sm font-medium">Warranty</div>
                            <div className="text-sm text-gray-700">1 Year Manufacturer Warranty</div>
                        </div>

                        <div className="flex gap-4 mb-4">
                            <div className="w-28 text-gray-500 text-sm font-medium">Delivery</div>
                            <div className="text-sm text-gray-800 font-medium">
                                Delivery by <span className="font-bold">18 Jan, Sunday</span> | <span className="text-[#388e3c]">Free</span> <span className="line-through text-gray-500 text-xs">₹40</span>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-4">
                            <div className="w-28 text-gray-500 text-sm font-medium">Highlights</div>
                            <div className="text-sm text-gray-700 flex-1">
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Power Output(RMS): 20 W</li>
                                    <li>Battery life: 20 hrs | Charging time: 5 hrs</li>
                                    <li>Bluetooth Version: 5.0</li>
                                    <li>Wireless range: 10 m</li>
                                    <li>Wireless music streaming via Bluetooth</li>
                                    <li>Memory Card Slot</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-8">
                            <div className="w-28 text-gray-500 text-sm font-medium">Seller</div>
                            <div className="text-sm flex-1">
                                <div className="font-medium text-primary cursor-pointer">RetailNet</div>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="bg-primary text-white text-[10px] px-1 rounded-sm">4.8 ★</span>
                                </div>
                                <ul className="list-disc pl-4 mt-2 space-y-1 text-gray-700 text-xs">
                                    <li>7 Days Replacement Policy</li>
                                    <li>GST invoice available</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border rounded-sm">
                            <div className="p-4 border-b">
                                <h3 className="font-medium text-lg">Product Description</h3>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
