import React, { useState, useEffect } from 'react';

const banners = [
    {
        id: 1,
        title: 'Beds',
        subtitle: 'From ₹8,999',
        description: 'Wooden Street, Sleepyhead & more',
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80',
        bgColor: 'from-blue-500 to-blue-600'
    },
    {
        id: 2,
        title: 'Smartphones',
        subtitle: 'From ₹6,999',
        description: 'Samsung, Realme, Poco & more',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
        bgColor: 'from-purple-500 to-purple-600'
    },
    {
        id: 3,
        title: 'Electronics',
        subtitle: 'Up to 80% Off',
        description: 'Headphones, Speakers & more',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
        bgColor: 'from-green-500 to-green-600'
    }
];

const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };

    return (
        <div className="relative overflow-hidden">
            {/* Main Banner */}
            <div
                className={`relative bg-gradient-to-r ${banners[currentSlide].bgColor} py-8 px-4 min-h-[280px] transition-all duration-500`}
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'4\' fill=\'rgba(255,255,255,0.1)\'/%3E%3Ccircle cx=\'85\' cy=\'35\' r=\'6\' fill=\'rgba(255,255,255,0.1)\'/%3E%3Ccircle cx=\'45\' cy=\'85\' r=\'4\' fill=\'rgba(255,255,255,0.1)\'/%3E%3C/svg%3E")',
                    backgroundSize: '300px'
                }}
            >
                {/* Decorative elements - Re-positioned and simplified for better responsiveness */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                     {/* Top left decorative elements */}
                    <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-white/20 rounded-full animate-spin-slow"></div>
                    <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
                    
                    {/* Bottom right decorative elements */}
                    <div className="absolute bottom-10 right-10 w-12 h-12 bg-yellow-400 rounded-full opacity-40 blur-sm"></div>
                    <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-yellow-300 rounded-full opacity-60"></div>
                </div>

                <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10 h-full py-8">
                    {/* Banner Text - Left on Desktop */}
                    <div className="text-white text-center md:text-left z-20">
                        <h2 className="text-2xl md:text-4xl font-semibold mb-2 drop-shadow-sm">{banners[currentSlide].title}</h2>
                        <p className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">{banners[currentSlide].subtitle}</p>
                        <p className="text-white/90 text-sm md:text-lg">{banners[currentSlide].description}</p>
                    </div>

                    {/* Banner Image - Right on Desktop */}
                    <div className="w-56 h-40 md:w-80 md:h-64 flex-shrink-0 transition-transform duration-500 transform hover:scale-105">
                        <img
                            src={banners[currentSlide].image}
                            alt={banners[currentSlide].title}
                            className="w-full h-full object-contain drop-shadow-xl"
                        />
                    </div>
                </div>

                {/* Navigation Arrows - Vertical Center & Responsive */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all z-20 backdrop-blur-sm"
                    aria-label="Previous Slide"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all z-20 backdrop-blur-sm"
                    aria-label="Next Slide"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroBanner;
