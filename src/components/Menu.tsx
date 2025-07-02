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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
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
      description: "Crispy pastry filled with spiced potatoes and peas",
      price: 45,
      image: "https://images.pexels.com/photos/14477797/pexels-photo-14477797.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Starters",
      isVeg: true,
      spiceLevel: "Mild"
    },
    {
      id: 2,
      name: "Chicken Tikka",
      description: "Marinated chicken pieces grilled to perfection",
      price: 120,
      image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Starters",
      isVeg: false,
      spiceLevel: "Medium"
    },
    {
      id: 3,
      name: "Paneer Tikka",
      description: "Grilled cottage cheese with aromatic spices",
      price: 95,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Starters",
      isVeg: true,
      spiceLevel: "Medium"
    },
    // Main Course
    {
      id: 4,
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken",
      price: 165,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Main Course",
      isVeg: false,
      spiceLevel: "Mild"
    },
    {
      id: 5,
      name: "Dal Makhani",
      description: "Rich and creamy black lentils cooked overnight",
      price: 85,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Main Course",
      isVeg: true,
      spiceLevel: "Mild"
    },
    {
      id: 6,
      name: "Biryani (Chicken)",
      description: "Fragrant basmati rice with spiced chicken",
      price: 185,
      image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Main Course",
      isVeg: false,
      spiceLevel: "Medium"
    },
    {
      id: 7,
      name: "Palak Paneer",
      description: "Cottage cheese in creamy spinach gravy",
      price: 125,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Main Course",
      isVeg: true,
      spiceLevel: "Mild"
    },
    // Breads
    {
      id: 8,
      name: "Naan",
      description: "Soft and fluffy Indian bread",
      price: 25,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Breads",
      isVeg: true
    },
    {
      id: 9,
      name: "Garlic Naan",
      description: "Naan topped with fresh garlic and herbs",
      price: 35,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Breads",
      isVeg: true
    },
    {
      id: 10,
      name: "Roti",
      description: "Traditional whole wheat flatbread",
      price: 15,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Breads",
      isVeg: true
    },
    // Beverages
    {
      id: 11,
      name: "Mango Lassi",
      description: "Refreshing yogurt drink with mango",
      price: 45,
      image: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Beverages",
      isVeg: true
    },
    {
      id: 12,
      name: "Masala Chai",
      description: "Traditional spiced tea",
      price: 25,
      image: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Beverages",
      isVeg: true
    }
  ];

  const categories = ['All', 'Starters', 'Main Course', 'Breads', 'Beverages'];

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

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

  const handleProceedToOrder = () => {
    setShowOrderForm(true);
    setIsCartOpen(false);
  };

  const handleOrderNow = () => {
    const orderDetails = cart.map(item => 
      `${item.name} x${item.quantity} - R${item.price * item.quantity}`
    ).join('\n');
    
    const total = getTotalPrice();
    const customerInfo = `Name: ${customerDetails.name}\nPhone: ${customerDetails.phone}`;
    const deliveryInfo = orderType === 'delivery' ? `\nAddress: ${customerDetails.address}` : '\nPickup: Takeaway';
    const notes = customerDetails.notes ? `\nNotes: ${customerDetails.notes}` : '';
    
    const message = `*New Order from Bawas Food Infinite*\n\n*Order Details:*\n${orderDetails}\n\n*Total: R${total}*\n\n*Customer Details:*\n${customerInfo}${deliveryInfo}${notes}\n\n*Order Type: ${orderType.toUpperCase()}*`;
    
    const whatsappUrl = `https://wa.me/27678800167?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value
    });
  };

  const resetOrder = () => {
    setShowOrderForm(false);
    setCustomerDetails({ name: '', phone: '', address: '', notes: '' });
    setOrderType('delivery');
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
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border border-orange-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-orange-100">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.isVeg ? '🌱 Veg' : '🍖 Non-Veg'}
                  </span>
                  {item.spiceLevel && (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.spiceLevel === 'Mild' ? 'bg-yellow-100 text-yellow-800' :
                      item.spiceLevel === 'Medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      🌶️ {item.spiceLevel}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">R{item.price}</span>
                  
                  <div className="flex items-center gap-2">
                    {cart.find(cartItem => cartItem.id === item.id) ? (
                      <div className="flex items-center gap-2">
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
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary - Fixed Position */}
        {cart.length > 0 && !showOrderForm && (
          <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-orange-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={20} />
                    <span className="font-semibold">Cart ({getTotalItems()} items)</span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="text-white hover:text-orange-200 transition-colors"
                  >
                    {isCartOpen ? <X size={20} /> : <Plus size={20} />}
                  </button>
                </div>
              </div>
              
              {isCartOpen && (
                <div className="p-4 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">R{item.price} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-600 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-semibold text-sm min-w-[1.5rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-green-100 hover:bg-green-200 text-green-600 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-lg">Total: R{getTotalPrice()}</span>
                </div>
                <button
                  onClick={handleProceedToOrder}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Proceed to Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Form Modal */}
        {showOrderForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Complete Your Order</h3>
                  <button
                    onClick={resetOrder}
                    className="text-white hover:text-orange-200 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row max-h-[calc(90vh-120px)] overflow-hidden">
                {/* Order Summary - Left Side */}
                <div className="lg:w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
                  <h4 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h4>
                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{item.name}</h5>
                          <p className="text-sm text-gray-600">R{item.price} × {item.quantity}</p>
                        </div>
                        <span className="font-semibold text-orange-600">R{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between text-xl font-bold text-gray-900">
                      <span>Total:</span>
                      <span className="text-orange-600">R{getTotalPrice()}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Details - Right Side */}
                <div className="lg:w-1/2 p-6 overflow-y-auto">
                  <h4 className="text-xl font-bold mb-4 text-gray-900">Customer Details</h4>
                  
                  {/* Order Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Order Type</label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setOrderType('delivery')}
                        className={`flex-1 p-3 rounded-lg border-2 transition-all duration-300 ${
                          orderType === 'delivery'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <MapPin className="mx-auto mb-1" size={20} />
                        <span className="block text-sm font-medium">Delivery</span>
                      </button>
                      <button
                        onClick={() => setOrderType('takeaway')}
                        className={`flex-1 p-3 rounded-lg border-2 transition-all duration-300 ${
                          orderType === 'takeaway'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <Clock className="mx-auto mb-1" size={20} />
                        <span className="block text-sm font-medium">Takeaway</span>
                      </button>
                    </div>
                  </div>

                  {/* Customer Form */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={customerDetails.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={customerDetails.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    {orderType === 'delivery' && (
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Address *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                          <textarea
                            id="address"
                            name="address"
                            value={customerDetails.address}
                            onChange={handleInputChange}
                            required={orderType === 'delivery'}
                            rows={3}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                            placeholder="Enter your complete delivery address"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={customerDetails.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        placeholder="Any special requests or dietary requirements..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Bottom Buttons */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={resetOrder}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleOrderNow}
                    disabled={!customerDetails.name || !customerDetails.phone || (orderType === 'delivery' && !customerDetails.address)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none"
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