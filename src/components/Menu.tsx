import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Star, Flame, Leaf } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isSpicy: boolean;
  rating: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Menu: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Butter Chicken",
      description: "Tender chicken in rich, creamy tomato-based sauce with aromatic spices",
      price: 185,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: false,
      isSpicy: true,
      rating: 4.8
    },
    {
      id: 2,
      name: "Chicken Biryani",
      description: "Fragrant basmati rice layered with spiced chicken and aromatic herbs",
      price: 220,
      image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: false,
      isSpicy: true,
      rating: 4.9
    },
    {
      id: 3,
      name: "Paneer Makhani",
      description: "Cottage cheese cubes in creamy tomato gravy with butter and cream",
      price: 165,
      image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: true,
      isSpicy: false,
      rating: 4.7
    },
    {
      id: 4,
      name: "Samosa (2 pieces)",
      description: "Crispy pastry filled with spiced potatoes and peas, served with chutneys",
      price: 45,
      image: "https://images.pexels.com/photos/14477797/pexels-photo-14477797.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "starters",
      isVeg: true,
      isSpicy: true,
      rating: 4.6
    },
    {
      id: 5,
      name: "Tandoori Chicken",
      description: "Marinated chicken grilled in traditional tandoor oven with yogurt and spices",
      price: 195,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: false,
      isSpicy: true,
      rating: 4.8
    },
    {
      id: 6,
      name: "Dal Makhani",
      description: "Slow-cooked black lentils in rich, creamy gravy with butter and cream",
      price: 135,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: true,
      isSpicy: false,
      rating: 4.5
    },
    {
      id: 7,
      name: "Naan Bread",
      description: "Soft, fluffy bread baked in tandoor oven - plain, butter, or garlic",
      price: 35,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "breads",
      isVeg: true,
      isSpicy: false,
      rating: 4.4
    },
    {
      id: 8,
      name: "Mango Lassi",
      description: "Refreshing yogurt-based drink blended with sweet mango pulp",
      price: 55,
      image: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "beverages",
      isVeg: true,
      isSpicy: false,
      rating: 4.7
    },
    {
      id: 9,
      name: "Gulab Jamun (2 pieces)",
      description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
      price: 65,
      image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "desserts",
      isVeg: true,
      isSpicy: false,
      rating: 4.6
    },
    {
      id: 10,
      name: "Chicken Tikka",
      description: "Marinated chicken pieces grilled to perfection with aromatic spices",
      price: 175,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "starters",
      isVeg: false,
      isSpicy: true,
      rating: 4.7
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'starters', name: 'Starters', icon: '🥗' },
    { id: 'mains', name: 'Main Course', icon: '🍛' },
    { id: 'breads', name: 'Breads', icon: '🍞' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter(cartItem => cartItem.id !== itemId);
      }
    });
  };

  const getItemQuantity = (itemId: number) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const generateWhatsAppMessage = () => {
    if (cart.length === 0) {
      return "Hello! I would like to place an order from Bawas Food Infinite.";
    }

    let message = "🍽️ *Order from Bawas Food Infinite*\n\n";
    message += "📋 *Order Details:*\n";
    message += "━━━━━━━━━━━━━━━━━━━━\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   ${item.isVeg ? '🟢' : '🔴'} ${item.isSpicy ? '🌶️' : ''}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: R${item.price} each\n`;
      message += `   Subtotal: R${item.price * item.quantity}\n\n`;
    });

    message += "━━━━━━━━━━━━━━━━━━━━\n";
    message += `💰 *Total Amount: R${getTotalPrice()}*\n`;
    message += `📦 *Total Items: ${getTotalItems()}*\n\n`;
    message += "📍 *Delivery/Collection Details:*\n";
    message += "Please let me know if this is for:\n";
    message += "• Collection from restaurant\n";
    message += "• Delivery (please provide address)\n\n";
    message += "Thank you! 😊";

    return message;
  };

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "27678800167"; // Restaurant's WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Menu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our authentic Indian cuisine, prepared with traditional recipes and the finest spices. 
            Each dish tells a story of our rich culinary heritage.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border border-orange-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-orange-100"
            >
              <div className="relative">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {item.isVeg ? (
                    <div className="bg-green-500 text-white p-1 rounded-full">
                      <Leaf size={16} />
                    </div>
                  ) : (
                    <div className="bg-red-500 text-white p-1 rounded-full">
                      <div className="w-4 h-4 rounded-full bg-red-600"></div>
                    </div>
                  )}
                  {item.isSpicy && (
                    <div className="bg-orange-500 text-white p-1 rounded-full">
                      <Flame size={16} />
                    </div>
                  )}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center">
                  <Star className="text-yellow-400 mr-1" size={14} fill="currentColor" />
                  <span className="text-sm font-semibold">{item.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">R{item.price}</span>
                  
                  {getItemQuantity(item.id) === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-lg min-w-[2rem] text-center">
                        {getItemQuantity(item.id)}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary & WhatsApp Order */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <div className="bg-white rounded-2xl shadow-2xl border border-orange-200 p-6 max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <ShoppingCart className="mr-2 text-orange-500" size={20} />
                  Your Order
                </h3>
                <span className="bg-orange-500 text-white text-sm px-2 py-1 rounded-full">
                  {getTotalItems()} items
                </span>
              </div>

              <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{item.name} x{item.quantity}</span>
                    <span className="font-semibold text-orange-600">R{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-orange-600">R{getTotalPrice()}</span>
                </div>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>📱</span>
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our menu features many more delicious options! Visit us in person or call to discover our full range 
            of authentic Indian dishes, daily specials, and seasonal offerings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Contact Us
            </button>
            <a 
              href="tel:+27678800167"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;