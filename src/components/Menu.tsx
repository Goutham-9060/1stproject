import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Star, Flame, Leaf, MessageCircle } from 'lucide-react';

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
  popular?: boolean;
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
      isVeg: false,
      isSpicy: true,
      rating: 4.8,
      popular: true
    },
    {
      id: 2,
      name: "Paneer Tikka Masala",
      description: "Grilled cottage cheese cubes in spiced tomato gravy",
      price: 165,
      image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: true,
      isSpicy: true,
      rating: 4.7
    },
    {
      id: 3,
      name: "Chicken Biryani",
      description: "Fragrant basmati rice layered with spiced chicken and aromatic herbs",
      price: 195,
      image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "rice",
      isVeg: false,
      isSpicy: true,
      rating: 4.9,
      popular: true
    },
    {
      id: 4,
      name: "Vegetable Biryani",
      description: "Aromatic basmati rice with mixed vegetables and traditional spices",
      price: 155,
      image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "rice",
      isVeg: true,
      isSpicy: false,
      rating: 4.6
    },
    {
      id: 5,
      name: "Garlic Naan",
      description: "Fresh baked bread with garlic and herbs",
      price: 45,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "breads",
      isVeg: true,
      isSpicy: false,
      rating: 4.5
    },
    {
      id: 6,
      name: "Samosa (2 pieces)",
      description: "Crispy pastry filled with spiced potatoes and peas",
      price: 35,
      image: "https://images.pexels.com/photos/14477797/pexels-photo-14477797.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "starters",
      isVeg: true,
      isSpicy: true,
      rating: 4.4,
      popular: true
    },
    {
      id: 7,
      name: "Chicken Tikka",
      description: "Marinated chicken pieces grilled to perfection",
      price: 175,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "starters",
      isVeg: false,
      isSpicy: true,
      rating: 4.7
    },
    {
      id: 8,
      name: "Dal Tadka",
      description: "Yellow lentils tempered with cumin, garlic, and spices",
      price: 125,
      image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: true,
      isSpicy: false,
      rating: 4.5
    },
    {
      id: 9,
      name: "Mango Lassi",
      description: "Refreshing yogurt drink blended with sweet mango",
      price: 55,
      image: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "beverages",
      isVeg: true,
      isSpicy: false,
      rating: 4.6
    },
    {
      id: 10,
      name: "Gulab Jamun (2 pieces)",
      description: "Soft milk dumplings in sweet rose-flavored syrup",
      price: 65,
      image: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "desserts",
      isVeg: true,
      isSpicy: false,
      rating: 4.8
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'starters', name: 'Starters', icon: '🥗' },
    { id: 'mains', name: 'Main Course', icon: '🍛' },
    { id: 'rice', name: 'Rice & Biryani', icon: '🍚' },
    { id: 'breads', name: 'Breads', icon: '🫓' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' },
    { id: 'desserts', name: 'Desserts', icon: '🍮' }
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

  const sendWhatsAppOrder = () => {
    if (cart.length === 0) {
      alert('Please add items to your cart before placing an order.');
      return;
    }

    // Create detailed order message
    let message = "🍽️ *New Order from Bawas Food Infinite Website*\n\n";
    message += "📋 *Order Details:*\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   ${item.isVeg ? '🟢' : '🔴'} ${item.isSpicy ? '🌶️' : ''}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: R${item.price} each\n`;
      message += `   Subtotal: R${item.price * item.quantity}\n\n`;
    });

    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    message += `💰 *Total Amount: R${getTotalPrice()}*\n\n`;
    message += "📍 *Restaurant Details:*\n";
    message += "Bawas Food Infinite\n";
    message += "The Stables Village Centre, Chartwell\n";
    message += "Shop No. C3 - C6, 212 3rd Street\n\n";
    message += "⏰ Please confirm availability and preparation time.\n";
    message += "🚗 Will this be for pickup or delivery?\n\n";
    message += "Thank you! 🙏";

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp business number (you should replace this with the actual business number)
    const whatsappNumber = "27678800167"; // Remove the + and any spaces
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Try to open WhatsApp
    try {
      // For desktop, try to open WhatsApp desktop app first
      if (navigator.userAgent.includes('Windows') || navigator.userAgent.includes('Mac') || navigator.userAgent.includes('Linux')) {
        // Try WhatsApp desktop protocol first
        const desktopURL = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
        
        // Create a temporary link and click it
        const tempLink = document.createElement('a');
        tempLink.href = desktopURL;
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        
        // Fallback to web WhatsApp after a short delay if desktop app doesn't open
        setTimeout(() => {
          window.open(whatsappURL, '_blank');
        }, 1000);
      } else {
        // For mobile devices, open WhatsApp directly
        window.open(whatsappURL, '_blank');
      }
      
      // Clear cart after successful order
      setCart([]);
      setIsCartOpen(false);
      
      // Show success message
      alert('Order sent to WhatsApp! Please check your WhatsApp to complete the order.');
      
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      // Fallback: copy message to clipboard
      navigator.clipboard.writeText(message).then(() => {
        alert('Unable to open WhatsApp automatically. Order details copied to clipboard. Please paste in WhatsApp manually.');
      }).catch(() => {
        alert('Unable to open WhatsApp. Please contact us directly at +27 67 880 0167');
      });
    }
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
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100"
            >
              <div className="relative">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {item.popular && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                      <Star size={12} className="mr-1" fill="currentColor" />
                      Popular
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.isVeg ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {item.isVeg ? <Leaf size={12} /> : '🍖'}
                  </span>
                  {item.isSpicy && (
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      <Flame size={12} />
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                  <div className="flex items-center text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="ml-1 text-sm font-semibold text-gray-800">{item.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">R{item.price}</span>
                  
                  {getCartItemQuantity(item.id) > 0 ? (
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold text-lg min-w-[2rem] text-center">
                        {getCartItemQuantity(item.id)}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
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

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center space-x-3"
            >
              <ShoppingCart size={24} />
              <span className="font-semibold">
                {getTotalItems()} items - R{getTotalPrice()}
              </span>
              <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {getTotalItems()}
              </span>
            </button>
          </div>
        )}

        {/* Cart Modal */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
                <div className="flex items-center justify-between">
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
                  <p className="text-center text-gray-500 py-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-gray-600">R{item.price} each</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold text-lg min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="font-semibold text-gray-900">R{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-green-600">R{getTotalPrice()}</span>
                  </div>
                  <button
                    onClick={sendWhatsAppOrder}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle size={24} />
                    <span>Order via WhatsApp</span>
                  </button>
                  <p className="text-center text-gray-600 text-sm mt-3">
                    Your order will be sent to our WhatsApp for confirmation
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;