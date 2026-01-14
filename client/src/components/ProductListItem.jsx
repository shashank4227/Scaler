import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItem = ({ product }) => {
    // Mock features based on category (since we don't have them in DB yet)
    const getFeatures = (category) => {
        if (category === 'Mobiles') {
            return [
                '4 GB RAM | 64 GB ROM | Expandable Upto 2 TB',
                '17.12 cm (6.74 inch) HD+ Display',
                '50MP + 2MP | 5MP Front Camera',
                '6000 mAh Battery',
                'T615 Processor'
            ];
        } else if (category === 'Electronics') {
            return [
                'Wireless Bluetooth Connectivity',
                '30 Hours Battery Life',
                'Fast Charging Support',
                'Water Resistant (IPX4)'
            ];
        }
        return [
            'Genuine Quality Product',
            '1 Year Warranty',
            '7 Days Replacement Policy',
            'Cash on Delivery Available'
        ];
    };

    const features = getFeatures(product.category);

    return (
        <Link 
            to={`/product/${product.id}`}
            className="flex flex-col md:flex-row gap-6 p-6 bg-white hover:shadow-md transition-shadow cursor-pointer group"
        >
            {/* Left: Image */}
            <div className="w-full md:w-52 flex-shrink-0 flex items-center justify-center relative">
                <div className="h-48 w-48 relative">
                    <img 
                        src={product.image_url} 
                        alt={product.title} 
                        className="h-full w-full object-contain"
                    />
                     {/* Wishlist Icon */}
                     <button className="absolute top-0 right-0 text-gray-300 hover:text-red-500">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                        </svg>
                    </button>
                    <div className="absolute top-2 left-2">
                         <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" onClick={(e) => e.stopPropagation()}/>
                    </div>
                </div>
            </div>

            {/* Middle: Details */}
            <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-lg font-medium text-gray-800 group-hover:text-primary">
                    {product.title}
                </h3>
                
                {/* Rating Badge */}
                <div className="flex items-center gap-2">
                    <span className="bg-green-700 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        {product.rating?.toFixed(1) || '4.4'}
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </span>
                    <span className="text-gray-500 text-sm font-medium">
                        {product.review_count?.toLocaleString()} Ratings & {Math.floor(product.review_count / 10).toLocaleString()} Reviews
                    </span>
                </div>

                {/* Features List */}
                <ul className="mt-2 text-sm text-gray-600 list-none space-y-1">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-400 mt-1.5">•</span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right: Price */}
            <div className="md:w-60 flex-shrink-0 flex flex-col gap-1 pl-4">
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-medium text-gray-900">₹{product.price?.toLocaleString()}</span>
                    {product.is_assured && (
                        <img 
                            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" 
                            alt="Assured" 
                            className="h-5 object-contain"
                        />
                    )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 line-through">₹{product.original_price?.toLocaleString()}</span>
                    <span className="text-green-700 font-bold">{product.discount_percentage}% off</span>
                </div>
                <div className="text-xs text-gray-500">Free delivery</div>
                
                {product.discount_percentage > 20 && (
                    <div className="text-green-700 text-xs font-bold flex items-center gap-1 mt-1">
                        <span>Bank Offer</span>
                    </div>
                )}
                
                <div className="text-xs text-green-700 mt-1">
                    Upto <b>₹10,460</b> Off on Exchange
                </div>
            </div>
        </Link>
    );
};

export default ProductListItem;
