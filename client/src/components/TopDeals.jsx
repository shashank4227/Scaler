import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TopDeals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                // sort by discount percentage to show "Top Deals"
                const topDeals = data
                    .sort((a, b) => b.discount_percentage - a.discount_percentage)
                    .slice(0, 10);
                    
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
            <div className="bg-white p-4 shadow-sm">
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
        <div className="bg-white shadow-sm">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Top Deals</h2>
                <Link to="/" className="bg-primary text-white px-4 py-1.5 text-sm font-medium rounded-sm hover:bg-blue-600">
                    VIEW ALL
                </Link>
            </div>

            <div className="flex overflow-x-auto scrollbar-hide p-4 gap-4">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex-shrink-0 w-44 group"
                    >
                        <div className="bg-gray-50 rounded-lg p-4 h-36 flex items-center justify-center group-hover:shadow-md transition-shadow">
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
