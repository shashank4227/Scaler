import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    {
        name: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=150&q=80',
        link: '/?search=Mobiles'
    },
    {
        name: 'Fashion',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=150&q=80',
        link: '/?search=Fashion',
        hasDropdown: true
    },
    {
        name: 'Electronics',
        image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=150&q=80',
        link: '/?search=Electronics',
        hasDropdown: true
    },
    {
        name: 'Home',
        image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=150&q=80',
        link: '/?search=Home',
        hasDropdown: true
    },
    {
        name: 'Appliances',
        image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=150&q=80',
        link: '/?search=Appliance'
    },
    {
        name: 'Grocery',
        image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=150&q=80',
        link: '/?search=Grocery'
    },
];

const CategoryNav = () => {
    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto">
                <ul className="flex items-center justify-between py-2 px-4">
                    {categories.map((category, index) => (
                        <li key={index} className="relative">
                            <Link
                                to={category.link}
                                className="flex flex-col items-center gap-1 text-gray-700 hover:text-primary transition-colors group px-2"
                            >
                                <div className="relative">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-16 h-16 object-contain"
                                    />
                                    {category.badge && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                                            {category.badge}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs font-medium group-hover:text-primary whitespace-nowrap flex items-center gap-0.5">
                                    {category.name}
                                    {category.hasDropdown && (
                                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default CategoryNav;
