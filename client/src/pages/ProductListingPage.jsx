import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HeroBanner from '../components/HeroBanner';
import TopDeals from '../components/TopDeals';

const ProductListingPage = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                
                const transformedProducts = data.map(product => ({
                    id: product.id,
                    title: product.title,
                    image_url: product.image_url,
                    rating: parseFloat(product.rating),
                    review_count: product.review_count,
                    price: parseFloat(product.price),
                    original_price: parseFloat(product.original_price),
                    discount_percentage: parseInt(product.discount_percentage),
                    is_assured: Boolean(product.is_assured),
                    category: product.category_name,
                    brand: 'Brand' 
                }));
                setProducts(transformedProducts);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedDiscount, setSelectedDiscount] = useState(null);

    // ... (fetchProducts useEffect remains the same)

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            } else {
                return [...prev, category];
            }
        });
    };
    
    const handleRatingChange = (rating) => {
         // Toggle rating: if picking the same one, clear it
         setSelectedRating(prev => (prev === rating ? null : rating));
    };

    const handleDiscountChange = (discount) => {
         // Extract number from string e.g., '10% or more' -> 10
         const value = parseInt(discount);
         setSelectedDiscount(prev => (prev === value ? null : value));
    };

    const handlePriceChange = (range) => {
        setSelectedPrice(range);
        if (range === 'Under ₹500') { setMinPrice(0); setMaxPrice(500); }
        else if (range === '₹500 - ₹1,000') { setMinPrice(500); setMaxPrice(1000); }
        else if (range === '₹1,000 - ₹5,000') { setMinPrice(1000); setMaxPrice(5000); }
        else if (range === '₹5,000 - ₹10,000') { setMinPrice(5000); setMaxPrice(10000); }
        else if (range === 'Over ₹10,000') { setMinPrice(10000); setMaxPrice(Infinity); }
    };

    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;
        const ratingMatch = selectedRating ? product.rating >= selectedRating : true;
        const discountMatch = selectedDiscount ? product.discount_percentage >= selectedDiscount : true;

        
        // Search Logic
        const query = searchParams.get('search')?.toLowerCase() || '';
        
        // Check if query exactly matches a category (handling simple plural variations)
        const isCategorySearch = product.category?.toLowerCase() === query || 
                                 product.category?.toLowerCase().includes(query);

        const searchMatch = query === '' || 
            product.title.toLowerCase().includes(query) || 
            product.brand?.toLowerCase().includes(query) ||
            isCategorySearch;

        return categoryMatch && priceMatch && searchMatch && ratingMatch && discountMatch;
    });

    if (loading) {
        // ... (loading skeleton remains the same)
        return (
            <div className="flex flex-col gap-4">
                <div className="bg-blue-500 h-72 animate-pulse"></div>
                <div className="container mx-auto px-4">
                    <div className="bg-white p-4 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                        <div className="grid grid-cols-5 gap-4">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="h-48 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
         // ... (error state remains the same)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {/* Hero Banner */}
            <HeroBanner />

            {/* Top Deals Section */}
            <div className="container mx-auto px-4 py-4">
                <TopDeals />
            </div>

            {/* Main Product Section */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex gap-4">
                    {/* Sidebar Filters */}
                    <div className="w-64 bg-white shadow-sm flex-shrink-0 hidden lg:block">
                        <div className="p-4 border-b">
                            <h2 className="font-bold text-gray-800">Filters</h2>
                        </div>

                        {/* Categories Filter */}
                        <div className="p-4 border-b">
                            <h3 className="text-xs font-bold text-gray-600 uppercase mb-3">Categories</h3>
                            <div className="flex flex-col gap-2 text-sm text-gray-700">
                                {['Mobiles', 'Fashion', 'Appliance', 'Electronics', 'Grocery'].map((cat) => (
                                    <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-primary">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 accent-primary" 
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => handleCategoryChange(cat)}
                                        />
                                        <span>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="p-4 border-b">
                            <h3 className="text-xs font-bold text-gray-600 uppercase mb-3">Price</h3>
                            <div className="flex flex-col gap-2 text-sm text-gray-700">
                                {['Under ₹500', '₹500 - ₹1,000', '₹1,000 - ₹5,000', '₹5,000 - ₹10,000', 'Over ₹10,000'].map((price) => (
                                    <label key={price} className="flex items-center gap-2 cursor-pointer hover:text-primary">
                                        <input 
                                            type="radio" 
                                            name="price" 
                                            className="w-4 h-4 accent-primary" 
                                            checked={selectedPrice === price}
                                            onChange={() => handlePriceChange(price)}
                                        />
                                        <span>{price}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Rating Filter */}
                        <div className="p-4 border-b">
                            <h3 className="text-xs font-bold text-gray-600 uppercase mb-3">Customer Ratings</h3>
                            <div className="flex flex-col gap-2 text-sm text-gray-700">
                                {[4, 3, 2, 1].map((rating) => (
                                    <label key={rating} className="flex items-center gap-2 cursor-pointer hover:text-primary">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 accent-primary" 
                                            checked={selectedRating === rating}
                                            onChange={() => handleRatingChange(rating)}
                                        />
                                        <span className="flex items-center gap-1">
                                            {rating}
                                            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            & above
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Discount Filter */}
                        <div className="p-4">
                            <h3 className="text-xs font-bold text-gray-600 uppercase mb-3">Discount</h3>
                            <div className="flex flex-col gap-2 text-sm text-gray-700">
                                {['10% or more', '20% or more', '30% or more', '40% or more', '50% or more'].map((discount) => (
                                    <label key={discount} className="flex items-center gap-2 cursor-pointer hover:text-primary">
                                        <input 
                                            type="radio" 
                                            name="discount" 
                                            className="w-4 h-4 accent-primary" 
                                            checked={selectedDiscount === parseInt(discount)}
                                            onChange={() => handleDiscountChange(discount)}
                                        />
                                        <span>{discount}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 bg-white shadow-sm">
                        <div className="p-4 border-b">
                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <span className="font-bold text-gray-800">All Products</span>
                                    <span className="text-gray-text ml-2">(Showing 1-{filteredProducts.length} products)</span>
                                </div>
                            </div>
                            {/* Sort Options */}
                            <div className="flex gap-6 text-sm mt-3 pt-3 border-t">
                                <span className="font-medium text-gray-600">Sort By</span>
                                <span className="cursor-pointer text-primary font-medium border-b-2 border-primary pb-1">Popularity</span>
                                <span className="cursor-pointer text-gray-600 hover:text-primary">Price -- Low to High</span>
                                <span className="cursor-pointer text-gray-600 hover:text-primary">Price -- High to Low</span>
                                <span className="cursor-pointer text-gray-600 hover:text-primary">Newest First</span>
                            </div>
                        </div>

                        {products.length === 0 ? (
                             <div className="p-8 text-center text-gray-500">
                                No products found. Please try different filters.
                             </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;
