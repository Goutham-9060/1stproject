import React, { useState } from 'react';
import { Star, Clock, Flame, Leaf, ShoppingCart, MessageCircle, Phone } from 'lucide-react';

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
    { id: 'mains', name: 'Main Course', icon: '🍛' },
    { id: 'biryani', name: 'Biryani', icon: '🍚' },
    { id: 'breads', name: 'Breads', icon: '🫓' },
    { id: 'desserts', name: 'Desserts', icon: '🍮' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' }
  ];

  const menuItems = [
    // Appetizers
    {
      id: 1,
      name: "Samosa Chaat",
      category: "appetizers",
      price: 85,
      description: "Crispy samosas topped with tangy chutneys, yogurt, and fresh herbs",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: true,
      spiceLevel: 2,
      prepTime: "15 mins",
      rating: 4.8,
      popular: true
    },
    {
      id: 2,
      name: "Chicken Tikka",
      category: "appetizers",
      price: 120,
      description: "Tender chicken pieces marinated in yogurt and spices, grilled to perfection",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: false,
      spiceLevel: 3,
      prepTime: "25 mins",
      rating: 4.9,
      popular: true
    },
    {
      id: 3,
      name: "Paneer Tikka",
      category: "appetizers",
      price: 95,
      description: "Marinated cottage cheese cubes grilled with bell peppers and onions",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: true,
      spiceLevel: 2,
      prepTime: "20 mins",
      rating: 4.7
    },

    // Main Course
    {
      id: 4,
      name: "Butter Chicken",
      category: "mains",
      price: 165,
      description: "Creamy tomato-based curry with tender chicken pieces and aromatic spices",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: false,
      spiceLevel: 2,
      prepTime: "30 mins",
      rating: 4.9,
      popular: true
    },
    {
      id: 5,
      name: "Dal Makhani",
      category: "mains",
      price: 110,
      description: "Rich and creamy black lentils slow-cooked with butter and cream",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: true,
      spiceLevel: 1,
      prepTime: "45 mins",
      rating: 4.8,
      popular: true
    },
    {
      id: 6,
      name: "Lamb Rogan Josh",
      category: "mains",
      price: 195,
      description: "Tender lamb cooked in aromatic Kashmiri spices with a rich gravy",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: false,
      spiceLevel: 3,
      prepTime: "40 mins",
      rating: 4.7
    },

    // Biryani
    {
      id: 7,
      name: "Chicken Biryani",
      category: "biryani",
      price: 180,
      description: "Fragrant basmati rice layered with spiced chicken and aromatic herbs",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: false,
      spiceLevel: 3,
      prepTime: "50 mins",
      rating: 4.9,
      popular: true
    },
    {
      id: 8,
      name: "Vegetable Biryani",
      category: "biryani",
      price: 140,
      description: "Aromatic basmati rice with mixed vegetables and traditional spices",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: true,
      spiceLevel: 2,
      prepTime: "45 mins",
      rating: 4.6
    },
    {
      id: 9,
      name: "Mutton Biryani",
      category: "biryani",
      price: 220,
      description: "Premium basmati rice with tender mutton pieces and exotic spices",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: false,
      spiceLevel: 3,
      prepTime: "60 mins",
      rating: 4.8
    },

    // Breads
    {
      id: 10,
      name: "Garlic Naan",
      category: "breads",
      price: 45,
      description: "Soft leavened bread topped with fresh garlic and herbs",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: true,
      spiceLevel: 1,
      prepTime: "15 mins",
      rating: 4.7,
      popular: true
    },
    {
      id: 11,
      name: "Butter Roti",
      category: "breads",
      price: 25,
      description: "Traditional whole wheat flatbread brushed with butter",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: true,
      spiceLevel: 0,
      prepTime: "10 mins",
      rating: 4.5
    },
    {
      id: 12,
      name: "Cheese Kulcha",
      category: "breads",
      price: 65,
      description: "Stuffed bread with melted cheese and aromatic herbs",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: true,
      spiceLevel: 1,
      prepTime: "20 mins",
      rating: 4.6
    },

    // Desserts
    {
      id: 13,
      name: "Gulab Jamun",
      category: "desserts",
      price: 55,
      description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: true,
      spiceLevel: 0,
      prepTime: "5 mins",
      rating: 4.8,
      popular: true
    },
    {
      id: 14,
      name: "Kulfi",
      category: "desserts",
      price: 45,
      description: "Traditional Indian ice cream with cardamom and pistachios",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: true,
      spiceLevel: 0,
      prepTime: "2 mins",
      rating: 4.7
    },

    // Beverages
    {
      id: 15,
      name: "Mango Lassi",
      category: "beverages",
      price: 35,
      description: "Refreshing yogurt drink blended with sweet mango pulp",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: true,
      spiceLevel: 0,
      prepTime: "5 mins",
      rating: 4.6,
      popular: true
    },
    {
      id: 16,
      name: "Masala Chai",
      category: "beverages",
      price: 25,
      description: "Traditional spiced tea with aromatic herbs and spices",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      isVeg: true,
      spiceLevel: 1,
      prepTime: "10 mins",
      rating: 4.5
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(item => item.id === parseInt(itemId));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getCartItemsCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const generateWhatsAppMessage = () => {
    const cartItems = Object.entries(cart).map(([itemId, quantity]) => {
      const item = menuItems.find(item => item.id === parseInt(itemId));
      return item ? `${quantity}x ${item.name} - R${item.price * quantity}` : '';
    }).filter(Boolean);

    const total = getCartTotal();
    const orderTypeText = orderType === 'delivery' ? 'Delivery' : 'Pickup';
    const deliveryNote = orderType === 'delivery' ? '\n\n*Note: Delivery charges are extra and will be calculated based on location.' : '';
    
    const message = `Hello! I'd like to place an order from Bawas Food Infinite:

*Order Type:* ${orderTypeText}

*Items:*
${cartItems.join('\n')}

*Subtotal:* R${total}${deliveryNote}

Please confirm my order and let me know the total amount and estimated time.

Thank you!`;

    return encodeURIComponent(message);
  };

  const sendWhatsAppOrder = () => {
    if (getCartItemsCount() === 0) {
      alert('Please add items to your cart before placing an order.');
      return;
    }
    
    const message = generateWhatsAppMessage();
    const phoneNumber = '27678800167'; // Restaurant's WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const callRestaurant = () => {
    window.open('tel:+27678800167', '_self');
  };

  const renderSpiceLevel = (level: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(3)].map((_, i) => (
          <Flame 
            key={i} 
            size={12} 
            className={i < level ? 'text-red-500 fill-current' : 'text-gray-300'} 
          />
        ))}
      </div>
    );
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Menu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our authentic Indian cuisine, crafted with traditional recipes and the finest spices
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-8"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
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
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-orange-100 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {item.popular && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Popular
                    </span>
                  )}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.isVeg ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {item.isVeg ? <Leaf className="text-white" size={16} /> : '🍖'}
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="text-yellow-400 fill-current" size={14} />
                  <span className="text-sm font-semibold">{item.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-orange-600">R{item.price}</span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock size={14} />
                      <span className="text-sm">{item.prepTime}</span>
                    </div>
                    {item.spiceLevel > 0 && (
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-500">Spice:</span>
                        {renderSpiceLevel(item.spiceLevel)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Cart Controls */}
                <div className="flex items-center justify-between">
                  {cart[item.id] ? (
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center text-orange-600 font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="font-semibold text-lg">{cart[item.id]}</span>
                      <button
                        onClick={() => addToCart(item.id)}
                        className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item.id)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                    >
                      <ShoppingCart size={16} />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary & Order Section */}
        {getCartItemsCount() > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Order</h3>
            
            {/* Order Type Selection */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Order Type</h4>
              <div className="flex space-x-4">
                <button
                  onClick={() => setOrderType('pickup')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    orderType === 'pickup'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pickup
                </button>
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    orderType === 'delivery'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Delivery
                </button>
              </div>
              {orderType === 'delivery' && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Delivery charges are extra and will be calculated based on your location.
                  </p>
                </div>
              )}
            </div>

            {/* Cart Items */}
            <div className="space-y-3 mb-6">
              {Object.entries(cart).map(([itemId, quantity]) => {
                const item = menuItems.find(item => item.id === parseInt(itemId));
                if (!item) return null;
                
                return (
                  <div key={itemId} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold">{quantity}x</span>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-semibold">R{item.price * quantity}</span>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Subtotal:</span>
                <span className="text-orange-600">R{getCartTotal()}</span>
              </div>
              {orderType === 'delivery' && (
                <p className="text-sm text-gray-600 mt-2">
                  *Delivery charges will be added based on location
                </p>
              )}
            </div>

            {/* Order Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={sendWhatsAppOrder}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Order via WhatsApp</span>
              </button>
              
              <button
                onClick={callRestaurant}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>Call to Order</span>
              </button>
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              <p>Orders are typically ready in 20-45 minutes depending on items selected.</p>
              <p className="mt-1">For immediate assistance, call us at +27 67 880 0167</p>
            </div>
          </div>
        )}

        {/* Call to Action for Empty Cart */}
        {getCartItemsCount() === 0 && (
          <div className="text-center bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Order?</h3>
            <p className="text-gray-600 mb-6">
              Add your favorite dishes to the cart and place your order via WhatsApp or phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={callRestaurant}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>Call to Order: +27 67 880 0167</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;