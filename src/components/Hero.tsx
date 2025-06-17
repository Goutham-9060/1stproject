import React from 'react';
import { ChefHat, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://i.ibb.co/yBkXm632/indian-condiments-with-copy-space-view-1.jpg')`
        }}
      ></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <ChefHat className="text-yellow-300 opacity-20" size={60} />
      </div>
      <div className="absolute bottom-32 right-16 animate-float-delayed">
        <Star className="text-yellow-300 opacity-20" size={40} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Greetings from
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mt-2">
              Bawas Food Infinite
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-yellow-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            It is our honor to introduce you to our culture and its vast variety of delectable 
            <span className="text-yellow-300 font-semibold"> vegetarian and non-vegetarian dishes</span>, 
            all prepared with authentic masalas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Explore Our Menu
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
            
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-green-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-yellow-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-300 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;