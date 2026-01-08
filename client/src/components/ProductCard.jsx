import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white p-4 border-r border-b hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col group"
    >
      {/* Image Container */}
      <div className="h-44 flex items-center justify-center p-2 relative mb-3">
        <img
          src={product.image_url || "https://via.placeholder.com/150"}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
        />
        {/* Wishlist Icon */}
        <button
          className="absolute top-0 right-0 text-gray-300 hover:text-red-500 transition-colors"
          onClick={(e) => { e.preventDefault(); }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1.5 flex-1">
        {/* Brand */}
        {product.brand && (
          <span className="text-xs text-gray-500 font-medium uppercase">{product.brand}</span>
        )}

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-800 group-hover:text-primary line-clamp-2 leading-tight">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-1">
          <span className="bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            {product.rating?.toFixed(1) || 'N/A'}
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
          <span className="text-gray-400 text-xs">({product.review_count})</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-base font-bold text-gray-800">
            ₹{product.price?.toLocaleString() || 0}
          </span>
          <span className="text-gray-400 text-sm line-through">
            ₹{product.original_price?.toLocaleString() || 0}
          </span>
          <span className="text-green-600 text-xs font-bold">
            {product.discount_percentage || 0}% off
          </span>
        </div>

        {/* Assured Badge */}
        {product.is_assured && (
          <div className="mt-2">
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
              alt="Assured"
              className="h-4"
            />
          </div>
        )}

        {/* Free Delivery */}
        <p className="text-xs text-gray-500 mt-auto pt-2">Free delivery</p>
      </div>
    </Link>
  );
};

export default ProductCard;
