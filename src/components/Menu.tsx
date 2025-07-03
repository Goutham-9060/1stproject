import React, { useState } from 'react';
import { Star, Clock, Flame, Leaf } from 'lucide-react';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('appetizers');

  const categories = [
    { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
    { id: 'mains', name: 'Main Course', icon: '🍛' },
    { id: 'biryani', name: 'Biryani & Rice', icon: '🍚' },
    { id: 'breads', name: 'Breads', icon: '🫓' },
    { id: 'desserts', name: 'Desserts', icon: '🍮' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' }
  ];

  const menuItems = {
    appetizers: [
      {
        name: "Samosa Chaat",
        description: "Crispy samosas topped with tangy chutneys, yogurt, and fresh herbs",
        price: "R85",
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.8,
        prepTime: "15 mins"
      },
      {
        name: "Chicken Tikka",
        description: "Tender marinated chicken pieces grilled to perfection with aromatic spices",
        price: "R120",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: false,
        isSpicy: true,
        rating: 4.9,
        prepTime: "20 mins"
      },
      {
        name: "Paneer Tikka",
        description: "Marinated cottage cheese cubes grilled with bell peppers and onions",
        price: "R95",
        image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: true,
        rating: 4.7,
        prepTime: "18 mins"
      },
      {
        name: "Aloo Tikki",
        description: "Crispy potato patties served with mint and tamarind chutneys",
        price: "R65",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.6,
        prepTime: "12 mins"
      }
    ],
    mains: [
      {
        name: "Butter Chicken",
        description: "Creamy tomato-based curry with tender chicken pieces and aromatic spices",
        price: "R165",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: false,
        isSpicy: false,
        rating: 4.9,
        prepTime: "25 mins"
      },
      {
        name: "Palak Paneer",
        description: "Fresh spinach curry with cottage cheese cubes in a rich, creamy sauce",
        price: "R135",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.7,
        prepTime: "20 mins"
      },
      {
        name: "Lamb Rogan Josh",
        description: "Slow-cooked lamb in a rich, aromatic curry with traditional Kashmiri spices",
        price: "R195",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: false,
        isSpicy: true,
        rating: 4.8,
        prepTime: "35 mins"
      },
      {
        name: "Dal Makhani",
        description: "Creamy black lentils slow-cooked with butter, cream, and aromatic spices",
        price: "R115",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.8,
        prepTime: "30 mins"
      }
    ],
    biryani: [
      {
        name: "Chicken Biryani",
        description: "Fragrant basmati rice layered with spiced chicken and aromatic herbs",
        price: "R185",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: false,
        isSpicy: true,
        rating: 4.9,
        prepTime: "40 mins"
      },
      {
        name: "Vegetable Biryani",
        description: "Aromatic basmati rice with mixed vegetables and traditional spices",
        price: "R155",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.6,
        prepTime: "35 mins"
      },
      {
        name: "Mutton Biryani",
        description: "Premium basmati rice layered with tender mutton and exotic spices",
        price: "R225",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: false,
        isSpicy: true,
        rating: 4.8,
        prepTime: "45 mins"
      }
    ],
    breads: [
      {
        name: "Garlic Naan",
        description: "Soft, fluffy bread topped with fresh garlic and herbs",
        price: "R45",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.7,
        prepTime: "10 mins"
      },
      {
        name: "Butter Naan",
        description: "Classic soft bread brushed with butter and baked in tandoor",
        price: "R35",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.6,
        prepTime: "8 mins"
      },
      {
        name: "Stuffed Kulcha",
        description: "Bread stuffed with spiced potatoes or paneer, baked to perfection",
        price: "R55",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.8,
        prepTime: "15 mins"
      }
    ],
    desserts: [
      {
        name: "Gulab Jamun",
        description: "Soft, spongy milk dumplings soaked in rose-flavored sugar syrup",
        price: "R65",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.8,
        prepTime: "5 mins"
      },
      {
        name: "Kulfi",
        description: "Traditional Indian ice cream with cardamom and pistachios",
        price: "R55",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.7,
        prepTime: "3 mins"
      },
      {
        name: "Ras Malai",
        description: "Soft cottage cheese dumplings in sweetened, thickened milk",
        price: "R75",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.9,
        prepTime: "5 mins"
      }
    ],
    beverages: [
      {
        name: "Mango Lassi",
        description: "Creamy yogurt drink blended with fresh mango pulp",
        price: "R45",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.8,
        prepTime: "5 mins"
      },
      {
        name: "Masala Chai",
        description: "Traditional spiced tea with cardamom, ginger, and aromatic spices",
        price: "R35",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.7,
        prepTime: "8 mins"
      },
      {
        name: "Fresh Lime Soda",
        description: "Refreshing lime juice with soda water and a hint of mint",
        price: "R40",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        isVeg: true,
        isSpicy: false,
        rating: 4.5,
        prepTime: "3 mins"
      }
    ]
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Menu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our carefully curated selection of authentic Indian dishes, 
            each prepared with traditional recipes and the finest ingredients.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto"></div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-md'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-green-100"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  {item.isVeg ? (
                    <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                      <Leaf size={16} />
                    </div>
                  ) : (
                    <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                      <Flame size={16} />
                    </div>
                  )}
                  {item.isSpicy && (
                    <div className="bg-orange-500 text-white p-2 rounded-full shadow-lg">
                      🌶️
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="text-yellow-400" size={14} fill="currentColor" />
                  <span className="text-sm font-semibold text-gray-800">{item.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-green-600">{item.price}</span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock size={16} />
                    <span className="text-sm">{item.prepTime}</span>
                  </div>
                  
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Can't Decide?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our experienced chefs are happy to recommend dishes based on your preferences. 
              Call us or visit our restaurant for personalized suggestions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
              </button>
              <a 
                href="tel:+27678800167"
                className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;