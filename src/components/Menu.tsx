import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, X, Phone, MapPin, Clock, User } from 'lucide-react';

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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    orderType: 'takeaway'
  });

  const menuItems: MenuItem[] = [
    // Starters
    {
      id: 1,
      name: "Veg Samosa",
      description: "Crispy pastry filled with spiced potatoes and peas",
      price: 45,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Starters",
      isVeg: true
    },
    {
      id: 2,
      name: "Chicken Tikka",
      description: "Tender chicken marinated in yogurt and spices",
      price: 120,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Starters",
      isVeg: false
    },
    {
      id: 3,
      name: "Paneer Tikka",
      description: "Grilled cottage cheese with bell peppers and onions",
      price: 95,
      image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Starters",
      isVeg: true
    },
    {
      id: 4,
      name: "Fish Pakora",
      description: "Crispy fish fritters with aromatic spices",
      price: 110,
      image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Starters",
      isVeg: false
    },

    // Main Course
    {
      id: 5,
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken",
      price: 180,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Main Course",
      isVeg: false
    },
    {
      id: 6,
      name: "Dal Makhani",
      description: "Rich and creamy black lentils cooked overnight",
      price: 140,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Main Course",
      isVeg: true
    },
    {
      id: 7,
      name: "Biryani (Chicken)",
      description: "Fragrant basmati rice with spiced chicken",
      price: 220,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Main Course",
      isVeg: false
    },
    {
      id: 8,
      name: "Palak Paneer",
      description: "Cottage cheese in creamy spinach gravy",
      price: 160,
      image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Main Course",
      isVeg: true
    },

    // Breads
    {
      id: 9,
      name: "Butter Naan",
      description: "Soft leavened bread brushed with butter",
      price: 35,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Breads",
      isVeg: true
    },
    {
      id: 10,
      name: "Garlic Naan",
      description: "Naan bread topped with fresh garlic and herbs",
      price: 40,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Breads",
      isVeg: true
    },
    {
      id: 11,
      name: "Roti",
      description: "Traditional whole wheat flatbread",
      price: 25,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Breads",
      isVeg: true
    },

    // Beverages
    {
      id: 12,
      name: "Mango Lassi",
      description: "Refreshing yogurt drink with mango",
      price: 55,
      image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Beverages",
      isVeg: true
    },
    {
      id: 13,
      name: "Masala Chai",
      description: "Traditional spiced tea with milk",
      price: 30,
      image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Beverages",
      isVeg: true
    },
    {
      id: 14,
      name: "Fresh Lime Water",
      description: "Refreshing lime water with mint",
      price: 35,
      image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Beverages",
      isVeg: true
    }
  ];

  const categories = ["All", "Starters", "Main Course", "Breads", "Beverages"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = selectedCategory === "All" 
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
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
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

  const handleCustomerDetailsChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateWhatsAppMessage = () => {
    const orderDetails = cart.map(item => 
      `${item.name} x${item.quantity} - R${item.price * item.quantity}`
    ).join('\n');
    
    const total = getTotalPrice();
    const orderType = customerDetails.orderType === 'delivery' ? 'Delivery' : 'Takeaway';
    const addressLine = customerDetails.orderType === 'delivery' ? `\nAddress: ${customerDetails.address}` : '';
    
    const message = `🍽️ *New Order from Bawas Food Infinite*

👤 *Customer Details:*
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Order Type: ${orderType}${addressLine}

📋 *Order Details:*
${orderDetails}

💰 *Total Amount: R${total}*

Thank you for choosing Bawas Food Infinite! 🙏`;

    return encodeURIComponent(message);
  };

  const handleOrderNow = () => {
    if (!customerDetails.name || !customerDetails.phone) {
      alert('Please fill in your name and phone number');
      return;
    }
    
    if (customerDetails.orderType === 'delivery' && !customerDetails.address) {
      alert('Please provide your delivery address');
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/27678800167?text=${message}`;
    window.open(whatsappUrl, '_blank');
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
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-100 border border-orange-200'
              }`}
            >
              {category}
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
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  item.isVeg 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {item.isVeg ? 'VEG' : 'NON-VEG'}
                </div>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                  <span className="text-orange-600 font-bold">R{item.price}</span>
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

        {/* Cart Summary */}
        {showCart && cart.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold flex items-center">
                  <ShoppingCart className="mr-2" size={24} />
                  Cart Summary
                </h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-orange-600 font-bold">R{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 ml-2 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 p-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-orange-600">R{getTotalPrice()}</span>
                </div>
                <button
                  onClick={() => {
                    setShowCart(false);
                    setShowOrderPopup(true);
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Proceed to Order ({getTotalItems()} items)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Popup */}
        {showOrderPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 flex justify-between items-center rounded-t-2xl flex-shrink-0">
                <h3 className="text-2xl font-bold">Complete Your Order</h3>
                <button
                  onClick={() => setShowOrderPopup(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  {/* Order Details */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Order Details</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                          <div>
                            <span className="font-semibold text-gray-900">{item.name}</span>
                            <span className="text-gray-600 ml-2">x{item.quantity}</span>
                          </div>
                          <span className="font-bold text-orange-600">R{item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="pt-3 border-t border-gray-300">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-gray-900">Total:</span>
                          <span className="text-2xl font-bold text-green-600">R{getTotalPrice()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Customer Details</h4>
                    
                    {/* Order Type Selection */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Order Type</label>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleCustomerDetailsChange('orderType', 'takeaway')}
                          className={`flex-1 p-3 rounded-lg border-2 transition-all duration-300 ${
                            customerDetails.orderType === 'takeaway'
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-300 hover:border-green-300'
                          }`}
                        >
                          <div className="text-center">
                            <Clock className="mx-auto mb-1" size={20} />
                            <span className="font-semibold">Takeaway</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleCustomerDetailsChange('orderType', 'delivery')}
                          className={`flex-1 p-3 rounded-lg border-2 transition-all duration-300 ${
                            customerDetails.orderType === 'delivery'
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-300 hover:border-green-300'
                          }`}
                        >
                          <div className="text-center">
                            <MapPin className="mx-auto mb-1" size={20} />
                            <span className="font-semibold">Delivery</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Customer Information */}
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            id="customerName"
                            value={customerDetails.name}
                            onChange={(e) => handleCustomerDetailsChange('name', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="tel"
                            id="customerPhone"
                            value={customerDetails.phone}
                            onChange={(e) => handleCustomerDetailsChange('phone', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>

                      {customerDetails.orderType === 'delivery' && (
                        <div>
                          <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-2">
                            Delivery Address *
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                            <textarea
                              id="customerAddress"
                              value={customerDetails.address}
                              onChange={(e) => handleCustomerDetailsChange('address', e.target.value)}
                              rows={3}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                              placeholder="Enter your complete delivery address"
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer Buttons - Fixed at bottom */}
              <div className="bg-gray-50 p-6 border-t flex-shrink-0 rounded-b-2xl">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      setShowOrderPopup(false);
                      setShowCart(true);
                    }}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleOrderNow}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
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