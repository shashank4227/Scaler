import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
   
    {
        name: 'Mobiles & Tablets',
        image: 'https://img.icons8.com/fluency/96/smartphone-tablet.png',
        link: '/?search=Mobiles'
    },
    {
        name: 'Fashion',
        image: 'https://img.icons8.com/color/96/hanger.png',
        link: '/?search=Fashion',
        hasDropdown: true
    },
    {
        name: 'Electronics',
        image: 'https://img.icons8.com/color/96/electronics.png',
        link: '/?search=Electronics',
        hasDropdown: true
    },
    {
        name: 'Home & Furniture',
        image: 'https://img.icons8.com/fluency/96/sofa.png',
        link: '/?search=Home',
        hasDropdown: true
    },
    {
        name: 'Appliances',
        image: 'https://img.icons8.com/fluency/96/appliances.png',
        link: '/?search=Appliance'
    },
    {
        name: 'Beauty, Food & More',
        image: 'https://img.icons8.com/fluency/96/shopping-basket.png',
        link: '/?search=Beauty'
    },
    {
        name: 'Grocery',
        image: 'https://img.icons8.com/fluency/96/grocery-shelf.png',
        link: '/?search=Grocery'
    },
];

const CategoryNav = () => {
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-screen-2xl mx-auto">
                <ul className="flex items-center lg:justify-center justify-start gap-4 py-2 px-4 overflow-x-auto scrollbar-hide w-full whitespace-nowrap">
                    {categories.map((category, index) => (
                        <li key={index} className="relative flex-shrink-0">
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
