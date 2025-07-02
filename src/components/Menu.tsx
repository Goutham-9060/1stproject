import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, X, MapPin, Phone, User, MessageCircle } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  orderType: 'delivery' | 'takeaway';
}

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    orderType: 'takeaway'
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
      name: "Samosa (2 pcs)",
      description: "Crispy pastry filled with spiced potatoes and peas",
      price: 45,
      image: "https://images.pexels.com/photos/14477887/pexels-photo-14477887.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "appetizers",
      isVeg: true
    },
    {
      id: 2,
      name: "Chicken Tikka",
      description: "Tender chicken pieces marinated in yogurt and spices",
      price: 120,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "appetizers",
      isVeg: false
    },
    {
      id: 3,
      name: "Paneer Tikka",
      description: "Grilled cottage cheese with bell peppers and onions",
      price: 95,
      image: "https://images.pexels.com/photos/11786715/pexels-photo-11786715.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "appetizers",
      isVeg: true
    },
    // Main Course
    {
      id: 4,
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken pieces",
      price: 165,
      image: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: false
    },
    {
      id: 5,
      name: "Dal Makhani",
      description: "Rich and creamy black lentils cooked overnight",
      price: 85,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: true
    },
    {
      id: 6,
      name: "Palak Paneer",
      description: "Cottage cheese in a creamy spinach gravy",
      price: 95,
      image: "https://images.pexels.com/photos/8879227/pexels-photo-8879227.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: true
    },
    // Biryani
    {
      id: 7,
      name: "Chicken Biryani",
      description: "Fragrant basmati rice with spiced chicken and saffron",
      price: 185,
      image: "https://images.pexels.com/photos/11786730/pexels-photo-11786730.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "biryani",
      isVeg: false
    },
    {
      id: 8,
      name: "Vegetable Biryani",
      description: "Aromatic rice with mixed vegetables and whole spices",
      price: 145,
      image: "https://images.pexels.com/photos/8879232/pexels-photo-8879232.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "biryani",
      isVeg: true
    },
    // Breads
    {
      id: 9,
      name: "Butter Naan",
      description: "Soft leavened bread brushed with butter",
      price: 35,
      image: "https://images.pexels.com/photos/5560756/pexels-photo-5560756.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "breads",
      isVeg: true
    },
    {
      id: 10,
      name: "Garlic Naan",
      description: "Naan bread topped with fresh garlic and herbs",
      price: 40,
      image: "https://images.pexels.com/photos/5560756/pexels-photo-5560756.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "breads",
      isVeg: true
    },
    // Desserts
    {
      id: 11,
      name: "Gulab Jamun (2 pcs)",
      description: "Soft milk dumplings in rose-flavored sugar syrup",
      price: 55,
      image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "desserts",
      isVeg: true
    },
    {
      id: 12,
      name: "Kulfi",
      description: "Traditional Indian ice cream with cardamom and pistachios",
      price: 45,
      image: "https://images.pexels.com/photos/8879229/pexels-photo-8879229.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "desserts",
      isVeg: true
    },
    // Beverages
    {
      id: 13,
      name: "Mango Lassi",
      description: "Creamy yogurt drink blended with fresh mango",
      price: 65,
      image: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "beverages",
      isVeg: true
    },
    {
      id: 14,
      name: "Masala Chai",
      description: "Traditional spiced tea with milk and aromatic spices",
      price: 25,
      image: "https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "beverages",
      isVeg: true
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
    setShowCart(true);
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleProceedToOrder = () => {
    setShowCart(false);
    setShowOrderPopup(true);
  };

  const handleCustomerDetailsChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOrderNow = () => {
    const orderDetails = cart.map(item => 
      `${item.name} x${item.quantity} - R${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const customerInfo = `
Customer Details:
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Order Type: ${customerDetails.orderType.charAt(0).toUpperCase() + customerDetails.orderType.slice(1)}
${customerDetails.orderType === 'delivery' ? `Address: ${customerDetails.address}` : ''}
    `.trim();

    const message = `
🍽️ *New Order from Bawas Food Infinite*

${orderDetails}

*Total: R${getTotalPrice().toFixed(2)}*

${customerInfo}

Thank you for choosing Bawas Food Infinite!
    `.trim();

    const whatsappUrl = `https://wa.me/27678800167?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const isOrderValid = () => {
    return customerDetails.name.trim() !== '' && 
           customerDetails.phone.trim() !== '' && 
           (customerDetails.orderType === 'takeaway' || customerDetails.address.trim() !== '');
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Menu</span>
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
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
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
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                  item.isVeg 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {item.isVeg ? '🌱 Veg' : '🍖 Non-Veg'}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-lg font-bold text-orange-600">R{item.price}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setShowCart(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
            >
              <ShoppingCart size={24} />
              <span>Cart ({getTotalItems()})</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                R{getTotalPrice().toFixed(2)}
              </span>
            </button>
          </div>
        )}

        {/* Cart Summary Popup */}
        {showCart && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white relative">
                <button
                  onClick={() => setShowCart(false)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <h3 className="text-2xl font-bold">Cart Summary</h3>
                <p className="text-green-100">Review your order</p>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">R{item.price} each</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-gray-100 hover:bg-gray-200 p-1 rounded-full transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-gray-100 hover:bg-gray-200 p-1 rounded-full transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors ml-2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold">R{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">Total:</span>
                  <span className="text-2xl font-bold text-green-600">R{getTotalPrice().toFixed(2)}</span>
                </div>
                <button
                  onClick={handleProceedToOrder}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Proceed to Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Popup */}
        {showOrderPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white relative">
                <button
                  onClick={() => setShowOrderPopup(false)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <h3 className="text-2xl font-bold">Complete Your Order</h3>
                <p className="text-green-100">Review details and place your order</p>
              </div>
              
              <div className="flex flex-col lg:flex-row max-h-[calc(95vh-140px)]">
                {/* Left Side - Order Summary */}
                <div className="lg:w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h4>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">R{item.price} × {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">R{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                    <div className="border-t-2 border-gray-300 pt-3 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">Total:</span>
                        <span className="text-xl font-bold text-green-600">R{getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Customer Details */}
                <div className="lg:w-1/2 p-6 overflow-y-auto">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Customer Details</h4>
                  
                  {/* Order Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Order Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleCustomerDetailsChange('orderType', 'takeaway')}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          customerDetails.orderType === 'takeaway'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">🏪</div>
                          <div className="font-medium">Takeaway</div>
                        </div>
                      </button>
                      <button
                        onClick={() => handleCustomerDetailsChange('orderType', 'delivery')}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          customerDetails.orderType === 'delivery'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">🚚</div>
                          <div className="font-medium">Delivery</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Customer Information Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User size={16} className="inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={customerDetails.name}
                        onChange={(e) => handleCustomerDetailsChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone size={16} className="inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerDetails.phone}
                        onChange={(e) => handleCustomerDetailsChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    {customerDetails.orderType === 'delivery' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin size={16} className="inline mr-2" />
                          Delivery Address *
                        </label>
                        <textarea
                          value={customerDetails.address}
                          onChange={(e) => handleCustomerDetailsChange('address', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                          rows={3}
                          placeholder="Enter your complete delivery address"
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Buttons - Fixed at bottom */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      setShowOrderPopup(false);
                      setShowCart(false);
                    }}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleOrderNow}
                    disabled={!isOrderValid()}
                    className={`flex-1 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isOrderValid()
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <MessageCircle size={20} />
                    <span>Order Now via WhatsApp</span>
                  </button>
                </div>
                {!isOrderValid() && (
                  <p className="text-sm text-red-500 mt-2 text-center">
                    Please fill in all required fields to place your order
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;