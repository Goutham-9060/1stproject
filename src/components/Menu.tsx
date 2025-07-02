import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, X, MapPin, Phone, User, Clock } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot';
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const menuItems: MenuItem[] = [
    // Starters
    {
      id: 1,
      name: "Samosa (2 pieces)",
      description: "Crispy triangular pastries filled with spiced potatoes and peas",
      price: 45,
      image: "https://images.pexels.com/photos/14477887/pexels-photo-14477887.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "starters",
      isVeg: true,
      spiceLevel: "Mild"
    },
    {
      id: 2,
      name: "Chicken Tikka",
      description: "Tender chicken pieces marinated in yogurt and spices, grilled to perfection",
      price: 120,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "starters",
      isVeg: false,
      spiceLevel: "Medium"
    },
    {
      id: 3,
      name: "Paneer Tikka",
      description: "Marinated cottage cheese cubes grilled with bell peppers and onions",
      price: 95,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "starters",
      isVeg: true,
      spiceLevel: "Medium"
    },
    // Main Course
    {
      id: 4,
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken pieces",
      price: 165,
      image: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: false,
      spiceLevel: "Mild"
    },
    {
      id: 5,
      name: "Dal Makhani",
      description: "Rich and creamy black lentils slow-cooked with butter and cream",
      price: 85,
      image: "https://images.pexels.com/photos/5560756/pexels-photo-5560756.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: true,
      spiceLevel: "Mild"
    },
    {
      id: 6,
      name: "Chicken Biryani",
      description: "Fragrant basmati rice layered with spiced chicken and aromatic herbs",
      price: 185,
      image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: false,
      spiceLevel: "Medium"
    },
    {
      id: 7,
      name: "Palak Paneer",
      description: "Fresh cottage cheese cubes in a creamy spinach gravy",
      price: 95,
      image: "https://images.pexels.com/photos/5560754/pexels-photo-5560754.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: true,
      spiceLevel: "Mild"
    },
    // Breads
    {
      id: 8,
      name: "Garlic Naan",
      description: "Soft leavened bread topped with fresh garlic and herbs",
      price: 35,
      image: "https://images.pexels.com/photos/5560748/pexels-photo-5560748.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "breads",
      isVeg: true
    },
    {
      id: 9,
      name: "Butter Naan",
      description: "Classic soft bread brushed with butter",
      price: 30,
      image: "https://images.pexels.com/photos/5560745/pexels-photo-5560745.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "breads",
      isVeg: true
    },
    {
      id: 10,
      name: "Tandoori Roti",
      description: "Whole wheat bread cooked in tandoor oven",
      price: 25,
      image: "https://images.pexels.com/photos/5560742/pexels-photo-5560742.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "breads",
      isVeg: true
    },
    // Desserts
    {
      id: 11,
      name: "Gulab Jamun (2 pieces)",
      description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
      price: 55,
      image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "desserts",
      isVeg: true
    },
    {
      id: 12,
      name: "Kulfi",
      description: "Traditional Indian ice cream flavored with cardamom and pistachios",
      price: 45,
      image: "https://images.pexels.com/photos/4449066/pexels-photo-4449066.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "desserts",
      isVeg: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'starters', name: 'Starters', icon: '🥗' },
    { id: 'mains', name: 'Main Course', icon: '🍛' },
    { id: 'breads', name: 'Breads', icon: '🫓' },
    { id: 'desserts', name: 'Desserts', icon: '🍮' }
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

  const getCartItemQuantity = (itemId: number) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCustomerDetailsChange = (field: string, value: string) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateWhatsAppMessage = () => {
    const orderDetails = cart.map(item => 
      `${item.name} x${item.quantity} - R${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const customerInfo = `
Customer Details:
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
${orderType === 'delivery' ? `Address: ${customerDetails.address}` : 'Pickup: Takeaway'}
${customerDetails.notes ? `Notes: ${customerDetails.notes}` : ''}`;

    const message = `🍛 *New Order from Bawas Food Infinite*

📋 *Order Details:*
${orderDetails}

💰 *Total: R${getTotalPrice().toFixed(2)}*

👤 ${customerInfo}

🚚 *Order Type: ${orderType === 'delivery' ? 'Delivery' : 'Takeaway'}*

Thank you for choosing Bawas Food Infinite! 🙏`;

    return encodeURIComponent(message);
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

    const whatsappMessage = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/27678800167?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const SpiceLevelIndicator = ({ level }: { level?: string }) => {
    if (!level) return null;
    
    const getColor = () => {
      switch (level) {
        case 'Mild': return 'text-green-500';
        case 'Medium': return 'text-yellow-500';
        case 'Hot': return 'text-red-500';
        default: return 'text-gray-500';
      }
    };

    return (
      <span className={`text-xs font-medium ${getColor()}`}>
        🌶️ {level}
      </span>
    );
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Delicious Menu</span>
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
                {item.spiceLevel && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <SpiceLevelIndicator level={item.spiceLevel} />
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">R{item.price}</span>
                  
                  {getCartItemQuantity(item.id) > 0 ? (
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold text-lg min-w-[2rem] text-center">
                        {getCartItemQuantity(item.id)}
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
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-4 rounded-full shadow-lg flex items-center space-x-3 transition-all duration-300 transform hover:scale-105"
            >
              <ShoppingCart size={24} />
              <span className="font-semibold">
                {getTotalItems()} items - R{getTotalPrice().toFixed(2)}
              </span>
            </button>

            {isCartOpen && (
              <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl p-6 w-96 max-h-96 overflow-y-auto border border-orange-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Cart Summary</h3>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-orange-600 font-medium">R{item.price} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-semibold min-w-[1.5rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-green-500 hover:bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-xl font-bold text-orange-600">R{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsOrderPopupOpen(true);
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Proceed to Order
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Order Popup */}
        {isOrderPopupOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Complete Your Order</h2>
                  <button
                    onClick={() => setIsOrderPopupOpen(false)}
                    className="text-white hover:text-gray-200 p-2"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row max-h-[calc(90vh-120px)]">
                {/* Left Side - Order Details */}
                <div className="lg:w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-600">R{item.price} × {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-orange-600">R{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-orange-600">R{getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Customer Details */}
                <div className="lg:w-1/2 p-6 overflow-y-auto">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Details</h3>

                  {/* Order Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Order Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setOrderType('delivery')}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          orderType === 'delivery'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <MapPin className="mx-auto mb-2" size={24} />
                        <div className="font-semibold">Delivery</div>
                      </button>
                      <button
                        onClick={() => setOrderType('takeaway')}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          orderType === 'takeaway'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <Clock className="mx-auto mb-2" size={24} />
                        <div className="font-semibold">Takeaway</div>
                      </button>
                    </div>
                  </div>

                  {/* Customer Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline mr-2" size={16} />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={customerDetails.name}
                        onChange={(e) => handleCustomerDetailsChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="inline mr-2" size={16} />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerDetails.phone}
                        onChange={(e) => handleCustomerDetailsChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    {orderType === 'delivery' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="inline mr-2" size={16} />
                          Delivery Address *
                        </label>
                        <textarea
                          value={customerDetails.address}
                          onChange={(e) => handleCustomerDetailsChange('address', e.target.value)}
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
                        onChange={(e) => handleCustomerDetailsChange('notes', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Any special requests or dietary requirements..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    onClick={() => setIsOrderPopupOpen(false)}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleOrderNow}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Order Now via WhatsApp
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