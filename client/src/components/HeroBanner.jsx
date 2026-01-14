import React, { useState, useEffect } from 'react';

const banners = [
    {
        id: 1,
        category: 'Premium Smartphones',
        title: 'iPhone 15 Pro',
        description: 'Titanium design, A17 Pro chip',
        image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 2,
        category: 'Noise Cancelling',
        title: 'Sony WH-1000XM5',
        description: 'Industry-leading noise cancellation',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 3,
        category: 'Fitness Trackers',
        title: 'Apple Watch Series 9',
        description: 'Smarter. Brighter. Mightier.',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80',
    }
];

const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };



    return (
        <div className="relative w-full overflow-hidden bg-blue-600">
             {/* Background Decoration Layer - Festive Elements */}
             <div className="absolute inset-0 pointer-events-none">
                {/* Hanging Ornaments */}
                <div className="absolute top-0 left-20 md:left-40 flex flex-col items-center animate-swing origin-top">
                    <div className="w-0.5 h-16 md:h-24 bg-yellow-300/60"></div>
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-500 shadow-lg"></div>
                </div>
                <div className="absolute top-0 right-20 md:right-40 flex flex-col items-center animate-swing-delayed origin-top">
                    <div className="w-0.5 h-12 md:h-20 bg-yellow-300/60"></div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-500 shadow-lg"></div>
                </div>

                {/* Sparkles / Fireworks */}
                <svg className="absolute top-10 left-10 w-20 h-20 text-blue-400 opacity-20" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                </svg>
                <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-100"></div>
                
                {/* Gold Coin Effect (Right side) */}
                 <div className="absolute bottom-16 right-32 transform rotate-12 bg-gradient-to-tr from-yellow-500 to-yellow-200 w-8 h-8 rounded-full border-2 border-yellow-600 shadow-xl hidden md:block opacity-80"></div>
             </div>

             {/* Main Content Area - Carousel Window */}
             <div className="relative z-10 max-w-screen-2xl mx-auto h-[320px] md:h-[380px] overflow-hidden">
                 {/* Sliding Track */}
                 <div 
                    className="flex h-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                 >
                     {banners.map((bannerItem) => (
                        <div key={bannerItem.id} className="min-w-full flex-shrink-0 flex items-center justify-center px-12 md:px-0">
                             <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16">
                                  {/* Image Card */}
                                  <div 
                                    className="w-56 h-56 md:w-[300px] md:h-[300px] rounded-3xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300 mx-auto md:mx-0"
                                  >
                                      <img 
                                        src={bannerItem.image} 
                                        alt={bannerItem.category} 
                                        className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-xl" 
                                      />
                                  </div>

                                  {/* Text Content */}
                                  <div className="text-white text-center md:text-left flex flex-col justify-center items-center md:items-start">
                                      <h3 className="text-xl md:text-2xl font-medium mb-1 md:mb-2 opacity-90">{bannerItem.category}</h3>
                                      <h2 className="text-4xl md:text-5xl font-bold mb-2 md:mb-3 drop-shadow-md">{bannerItem.title}</h2>
                                      <p className="text-sm md:text-lg text-blue-100 font-light">{bannerItem.description}</p>
                                  </div>
                             </div>
                        </div>
                     ))}
                 </div>
             </div>

             {/* Navigation Buttons */}
             <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 md:w-12 h-20 md:h-24 bg-white shadow-lg rounded-r-xl flex items-center justify-center text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors z-20 group"
                aria-label="Previous Slide"
             >
                 <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                 </svg>
             </button>
             
             <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 md:w-12 h-20 md:h-24 bg-white shadow-lg rounded-l-xl flex items-center justify-center text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors z-20 group"
                aria-label="Next Slide"
             >
                 <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                 </svg>
             </button>

             {/* Slide Indicators */}
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                 {banners.map((_, index) => (
                     <button
                         key={index}
                         onClick={() => setCurrentSlide(index)}
                         className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`}
                         aria-label={`Go to slide ${index + 1}`}
                     />
                 ))}
             </div>
        </div>
    );
};

export default HeroBanner;
