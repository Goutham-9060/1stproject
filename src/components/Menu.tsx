import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, X, Phone, MapPin, User, Clock } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  spiceLevel?: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('takeaway');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
    { id: 'mains', name: 'Main Course', icon: '🍛' },
    { id: 'biryani', name: 'Biryani', icon: '🍚' },
    { id: 'breads', name: 'Breads', icon: '🫓' },
    { id: 'desserts', name: 'Desserts', icon: '🍮' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' }
  ];

  const menuItems: MenuItem[] = [
    // Appetizers
    {
      id: 1,
      name: "Samosa (2 pieces)",
      description: "Crispy pastry filled with spiced potatoes and peas",
      price: 45,
      image: "https://images.pexels.com/photos/14477887/pexels-photo-14477887.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "appetizers",
      isVeg: true,
      spiceLevel: 2
    },
    {
      id: 2,
      name: "Chicken Tikka",
      description: "Marinated chicken pieces grilled to perfection",
      price: 120,
      image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "appetizers",
      isVeg: false,
      spiceLevel: 3
    },
    {
      id: 3,
      name: "Paneer Tikka",
      description: "Grilled cottage cheese with aromatic spices",
      price: 95,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "appetizers",
      isVeg: true,
      spiceLevel: 2
    },
    
    // Main Course
    {
      id: 4,
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken",
      price: 165,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: false,
      spiceLevel: 2
    },
    {
      id: 5,
      name: "Dal Makhani",
      description: "Rich and creamy black lentils slow-cooked with butter",
      price: 85,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: true,
      spiceLevel: 1
    },
    {
      id: 6,
      name: "Palak Paneer",
      description: "Cottage cheese in creamy spinach gravy",
      price: 95,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: true,
      spiceLevel: 2
    },
    
    // Biryani
    {
      id: 7,
      name: "Chicken Biryani",
      description: "Fragrant basmati rice with spiced chicken",
      price: 185,
      image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "biryani",
      isVeg: false,
      spiceLevel: 3
    },
    {
      id: 8,
      name: "Vegetable Biryani",
      description: "Aromatic rice with mixed vegetables and spices",
      price: 145,
      image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "biryani",
      isVeg: true,
      spiceLevel: 2
    },
    
    // Breads
    {
      id: 9,
      name: "Butter Naan",
      description: "Soft leavened bread brushed with butter",
      price: 35,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "breads",
      isVeg: true,
      spiceLevel: 0
    },
    {
      id: 10,
      name: "Garlic Naan",
      description: "Naan bread topped with fresh garlic and herbs",
      price: 40,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "breads",
      isVeg: true,
      spiceLevel: 1
    },
    
    // Desserts
    {
      id: 11,
      name: "Gulab Jamun (2 pieces)",
      description: "Sweet milk dumplings in sugar syrup",
      price: 55,
      image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "desserts",
      isVeg: true,
      spiceLevel: 0
    },
    {
      id: 12,
      name: "Kulfi",
      description: "Traditional Indian ice cream with cardamom",
      price: 45,
      image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "desserts",
      isVeg: true,
      spiceLevel: 0
    },
    
    // Beverages
    {
      id: 13,
      name: "Mango Lassi",
      description: "Creamy yogurt drink with fresh mango",
      price: 65,
      image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "beverages",
      isVeg: true,
      spiceLevel: 0
    },
    {
      id: 14,
      name: "Masala Chai",
      description: "Traditional spiced tea with milk",
      price: 25,
      image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "beverages",
      isVeg: true,
      spiceLevel: 1
    }
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
      }
      return [...prevCart, { ...item, quantity: 1 }];
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
      }
      return prevCart.filter(cartItem => cartItem.id !== itemId);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getSpiceIndicator = (level: number = 0) => {
    return '🌶️'.repeat(level);
  };

  const handleOrderNow = () => {
    if (!customerDetails.name || !customerDetails.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    if (orderType === 'delivery' && !customerDetails.address) {
      alert('Please provide your delivery address');
      return;
    }

    // Create WhatsApp message
    let message = `🍽️ *New Order from Bawas Food Infinite*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${customerDetails.name}\n`;
    message += `Phone: ${customerDetails.phone}\n`;
    message += `Order Type: ${orderType.charAt(0).toUpperCase() + orderType.slice(1)}\n`;
    
    if (orderType === 'delivery') {
      message += `Address: ${customerDetails.address}\n`;
    }
    
    if (customerDetails.notes) {
      message += `Notes: ${customerDetails.notes}\n`;
    }
    
    message += `\n📋 *Order Details:*\n`;
    cart.forEach(item => {
      message += `• ${item.name} x${item.quantity} - R${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n💰 *Total Amount: R${getTotalPrice().toFixed(2)}*\n`;
    message += `\nThank you for choosing Bawas Food Infinite! 🙏`;

    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "27678800167"; // Restaurant's WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset and close
    setShowOrderPopup(false);
    setCart([]);
    setCustomerDetails({ name: '', phone: '', address: '', notes: '' });
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Delicious Menu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover authentic Indian flavors crafted with traditional recipes and the finest spices
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-8"></div>
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
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-orange-100"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.isVeg 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    {item.isVeg ? '🌱 Veg' : '🍖 Non-Veg'}
                  </span>
                </div>
                {item.spiceLevel && item.spiceLevel > 0 && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 px-2 py-1 rounded-full text-xs">
                      {getSpiceIndicator(item.spiceLevel)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">R{item.price}</span>
                  
                  <div className="flex items-center space-x-2">
                    {cart.find(cartItem => cartItem.id === item.id) ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold text-lg min-w-[2rem] text-center">
                          {cart.find(cartItem => cartItem.id === item.id)?.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-white rounded-2xl shadow-2xl border border-orange-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ShoppingCart size={24} />
                    <div>
                      <h3 className="font-bold text-lg">Cart Summary</h3>
                      <p className="text-orange-100 text-sm">{getTotalItems()} items</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">R{getTotalPrice().toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              {isCartOpen && (
                <div className="p-4 max-h-64 overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-gray-900">Order Details</h4>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900 text-sm">{item.name}</h5>
                          <p className="text-gray-600 text-xs">R{item.price} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-100 hover:bg-red-200 text-red-600 w-6 h-6 rounded-full flex items-center justify-center"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-semibold text-sm min-w-[1.5rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-green-100 hover:bg-green-200 text-green-600 w-6 h-6 rounded-full flex items-center justify-center"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="ml-4 font-semibold text-sm">
                          R{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-colors"
                  >
                    {isCartOpen ? 'Hide Details' : 'View Details'}
                  </button>
                  <button
                    onClick={() => setShowOrderPopup(true)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                  >
                    Proceed to Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Popup */}
        {showOrderPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Complete Your Order</h2>
                  <button
                    onClick={() => setShowOrderPopup(false)}
                    className="text-white hover:text-orange-200 p-2"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col lg:flex-row max-h-[calc(90vh-140px)] overflow-hidden">
                {/* Left Side - Order Summary */}
                <div className="lg:w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-gray-600 text-sm">R{item.price} × {item.quantity}</p>
                        </div>
                        <div className="font-semibold text-orange-600">
                          R{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between py-4 border-t-2 border-orange-200">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-orange-600">R{getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Customer Details */}
                <div className="lg:w-1/2 p-6 overflow-y-auto">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Details</h3>
                  
                  {/* Order Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Order Type</label>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setOrderType('takeaway')}
                        className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                          orderType === 'takeaway'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Clock size={20} />
                          <span className="font-semibold">Takeaway</span>
                        </div>
                      </button>
                      <button
                        onClick={() => setOrderType('delivery')}
                        className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                          orderType === 'delivery'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <MapPin size={20} />
                          <span className="font-semibold">Delivery</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Customer Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User size={16} className="inline mr-1" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={customerDetails.name}
                        onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone size={16} className="inline mr-1" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerDetails.phone}
                        onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    {orderType === 'delivery' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin size={16} className="inline mr-1" />
                          Delivery Address *
                        </label>
                        <textarea
                          value={customerDetails.address}
                          onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter your complete delivery address"
                          rows={3}
                          required
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        value={customerDetails.notes}
                        onChange={(e) => setCustomerDetails({...customerDetails, notes: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Any special requests or dietary requirements"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowOrderPopup(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleOrderNow}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;