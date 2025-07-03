import React, { useState } from 'react';
import { Star, Plus, Minus, ShoppingCart, Phone, MessageCircle } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isVeg: boolean;
  spiceLevel: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Butter Chicken",
      description: "Tender chicken in rich, creamy tomato-based sauce with aromatic spices",
      price: 185,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      rating: 4.8,
      isVeg: false,
      spiceLevel: 2
    },
    {
      id: 2,
      name: "Paneer Tikka Masala",
      description: "Grilled cottage cheese cubes in spiced tomato gravy",
      price: 165,
      image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      rating: 4.7,
      isVeg: true,
      spiceLevel: 2
    },
    {
      id: 3,
      name: "Chicken Biryani",
      description: "Fragrant basmati rice layered with spiced chicken and aromatic herbs",
      price: 220,
      image: "https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "rice",
      rating: 4.9,
      isVeg: false,
      spiceLevel: 3
    },
    {
      id: 4,
      name: "Vegetable Biryani",
      description: "Aromatic basmati rice with mixed vegetables and traditional spices",
      price: 180,
      image: "https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "rice",
      rating: 4.6,
      isVeg: true,
      spiceLevel: 2
    },
    {
      id: 5,
      name: "Garlic Naan",
      description: "Fresh baked bread with garlic and herbs",
      price: 45,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "breads",
      rating: 4.5,
      isVeg: true,
      spiceLevel: 1
    },
    {
      id: 6,
      name: "Tandoori Chicken",
      description: "Marinated chicken grilled in traditional tandoor oven",
      price: 195,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "starters",
      rating: 4.8,
      isVeg: false,
      spiceLevel: 3
    },
    {
      id: 7,
      name: "Samosa (2 pieces)",
      description: "Crispy pastry filled with spiced potatoes and peas",
      price: 35,
      image: "https://images.pexels.com/photos/14477797/pexels-photo-14477797.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "starters",
      rating: 4.4,
      isVeg: true,
      spiceLevel: 2
    },
    {
      id: 8,
      name: "Mango Lassi",
      description: "Refreshing yogurt drink blended with sweet mango",
      price: 55,
      image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "beverages",
      rating: 4.6,
      isVeg: true,
      spiceLevel: 0
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', count: menuItems.length },
    { id: 'starters', name: 'Starters', count: menuItems.filter(item => item.category === 'starters').length },
    { id: 'mains', name: 'Main Course', count: menuItems.filter(item => item.category === 'mains').length },
    { id: 'rice', name: 'Rice & Biryani', count: menuItems.filter(item => item.category === 'rice').length },
    { id: 'breads', name: 'Breads', count: menuItems.filter(item => item.category === 'breads').length },
    { id: 'beverages', name: 'Beverages', count: menuItems.filter(item => item.category === 'beverages').length }
  ];

  const filteredItems = selectedCategory === 'all' 
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

  const getItemQuantity = (itemId: number) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const formatOrderForWhatsApp = () => {
    const restaurantInfo = "🍽️ *BAWAS FOOD INFINITE ORDER*\n📍 The Stables Village Centre, Chartwell\n📞 +27 67 880 0167\n\n";
    
    const orderDetails = cart.map(item => 
      `• ${item.name} x${item.quantity}\n  R${item.price} each = R${item.price * item.quantity}\n  ${item.description}\n`
    ).join('\n');
    
    const total = `\n💰 *TOTAL: R${getTotalPrice()}*\n\n`;
    const footer = "📝 Please confirm your order and provide:\n• Delivery address (if applicable)\n• Contact number\n• Any special instructions\n\nThank you for choosing Bawas Food Infinite! 🙏";
    
    return restaurantInfo + "📋 *ORDER DETAILS:*\n\n" + orderDetails + total + footer;
  };

  const sendWhatsAppOrder = () => {
    if (cart.length === 0) {
      alert('Please add items to your cart before placing an order.');
      return;
    }

    const message = formatOrderForWhatsApp();
    const phoneNumber = "27678800167"; // WhatsApp Business number
    
    // Create WhatsApp URL with proper encoding
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // For desktop, try to open WhatsApp desktop first, then fallback to web
    const userAgent = navigator.userAgent.toLowerCase();
    const isDesktop = !(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent));
    
    if (isDesktop) {
      // Try WhatsApp desktop protocol first
      const desktopUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      
      // Create a temporary link to test if WhatsApp desktop is available
      const tempLink = document.createElement('a');
      tempLink.href = desktopUrl;
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      
      // Try to open WhatsApp desktop
      try {
        tempLink.click();
        
        // Fallback to web WhatsApp after a short delay if desktop doesn't open
        setTimeout(() => {
          const webWhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
          window.open(webWhatsAppUrl, '_blank');
        }, 1000);
        
      } catch (error) {
        // If desktop fails, open web WhatsApp directly
        const webWhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(webWhatsAppUrl, '_blank');
      }
      
      document.body.removeChild(tempLink);
    } else {
      // For mobile devices, use the standard WhatsApp URL
      window.open(whatsappUrl, '_blank');
    }
    
    // Clear cart after sending order
    setCart([]);
    setIsCartOpen(false);
  };

  const callRestaurant = () => {
    window.open('tel:+27678800167', '_self');
  };

  const renderSpiceLevel = (level: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < level ? 'bg-red-500' : 'bg-gray-300'
            }`}
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our authentic Indian cuisine, prepared with traditional recipes and the finest spices
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
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
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100"
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
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400" size={14} fill="currentColor" />
                    <span className="text-sm font-semibold text-gray-800">{item.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600">R{item.price}</div>
                    {item.spiceLevel > 0 && (
                      <div className="mt-1">
                        {renderSpiceLevel(item.spiceLevel)}
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  {getItemQuantity(item.id) > 0 ? (
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-orange-100 hover:bg-orange-200 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold text-lg min-w-[2rem] text-center">
                        {getItemQuantity(item.id)}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-orange-100 hover:bg-orange-200 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
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

        {/* Order Actions */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>View Cart ({getTotalItems()})</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
            
            <button
              onClick={callRestaurant}
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Phone size={20} />
              <span>Call to Order</span>
            </button>
          </div>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Add items to your cart and place your order via WhatsApp, or call us directly for immediate assistance.
            We're here to serve you the best authentic Indian cuisine!
          </p>
        </div>
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Your Order</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 text-lg">Your cart is empty</p>
                  <p className="text-gray-500">Add some delicious items to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-gray-600 text-sm">R{item.price} each</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-orange-100 hover:bg-orange-200 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold text-lg min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-orange-100 hover:bg-orange-200 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                        >
                          <Plus size={16} />
                        </button>
                        <div className="text-right ml-4">
                          <div className="font-semibold text-gray-900">
                            R{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-orange-600">R{getTotalPrice()}</span>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={sendWhatsAppOrder}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle size={20} />
                    <span>Order via WhatsApp</span>
                  </button>
                  
                  <button
                    onClick={callRestaurant}
                    className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Phone size={20} />
                    <span>Call to Order</span>
                  </button>
                </div>
                
                <p className="text-center text-gray-600 text-sm mt-4">
                  Your order details will be sent via WhatsApp for confirmation
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;