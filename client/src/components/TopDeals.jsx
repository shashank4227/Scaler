import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TopDeals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
                const data = await response.json();
                // sort by discount percentage to show "Top Deals"
                const topDeals = data
                    .sort((a, b) => b.discount_percentage - a.discount_percentage)
                    .slice(0, 6);
                    
                setProducts(topDeals);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="bg-white p-4 shadow-sm rounded-sm">
                <div className="animate-pulse flex gap-4 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex-shrink-0 w-40">
                            <div className="bg-gray-200 h-32 rounded mb-2"></div>
                            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-sm rounded-sm">
            <div className="flex items-center justify-between p-4">
                <h2 className="text-xl font-bold text-gray-800">Top Deals</h2>
                
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="group"
                    >
                        <div className="bg-white rounded-lg p-4 h-36 flex items-center justify-center group-hover:shadow-md transition-shadow border border-gray-100 relative">
                            <img
                                src={product.image_url}
                                alt={product.title}
                                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                            />
                        </div>
                        <div className="pt-3 text-center">
                            <h3 className="text-sm font-medium text-gray-800 truncate">{product.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">Brand</p>
                            <div className="flex items-center justify-center gap-2 mt-1">
                                <span className="text-sm font-bold text-gray-800">
                                    ₹{product.price}
                                </span>
                                <span className="text-xs text-gray-400 line-through">
                                    ₹{product.original_price}
                                </span>
                            </div>
                            <span className="text-xs text-green-600 font-medium">
                                {product.discount_percentage}% off
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TopDeals;
