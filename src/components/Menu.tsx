import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, X, Truck, Store, User, Phone, MessageSquare } from 'lucide-react';

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
  selectedSpice?: string;
}

interface CustomerDetails {
  name: string;
  phone: string;
  orderType: 'takeaway' | 'delivery';
  address?: string;
  specialInstructions?: string;
}

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    orderType: 'takeaway',
    address: '',
    specialInstructions: ''
  });

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Veg Samosa",
      description: "An Indian fried pastry with savoury potato filling.",
      price: 48,
      image: "https://images.pexels.com/photos/14477883/pexels-photo-14477883.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "starters",
      isVeg: true,
      spiceLevel: 'Medium'
    },
    {
      id: 2,
      name: "Onion Bhajia",
      description: "Deep fried chopped onions in a spiced gram flour batter.",
      price: 44,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "starters",
      isVeg: true,
      spiceLevel: 'Medium'
    },
    {
      id: 3,
      name: "Potato Pakora",
      description: "Deep fried potato slices in a spiced gram flour batter.",
      price: 44,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "starters",
      isVeg: true,
      spiceLevel: 'Medium'
    },
    {
      id: 4,
      name: "Chicken Tikka",
      description: "Marinated chicken pieces grilled to perfection with aromatic spices.",
      price: 85,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: false,
      spiceLevel: 'Hot'
    },
    {
      id: 5,
      name: "Butter Chicken",
      description: "Tender chicken in a rich, creamy tomato-based sauce.",
      price: 120,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: false,
      spiceLevel: 'Mild'
    },
    {
      id: 6,
      name: "Paneer Makhani",
      description: "Cottage cheese cubes in a creamy tomato gravy.",
      price: 95,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "mains",
      isVeg: true,
      spiceLevel: 'Mild'
    },
    {
      id: 7,
      name: "Biryani",
      description: "Fragrant basmati rice cooked with aromatic spices and your choice of meat or vegetables.",
      price: 140,
      image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "rice",
      isVeg: false,
      spiceLevel: 'Medium'
    },
    {
      id: 8,
      name: "Gulab Jamun",
      description: "Soft milk dumplings soaked in rose-flavored sugar syrup.",
      price: 35,
      image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "desserts",
      isVeg: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'starters', name: 'Starters' },
    { id: 'mains', name: 'Main Course' },
    { id: 'rice', name: 'Rice & Biryani' },
    { id: 'desserts', name: 'Desserts' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item: MenuItem, spiceLevel?: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => 
        cartItem.id === item.id && cartItem.selectedSpice === spiceLevel
      );
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id && cartItem.selectedSpice === spiceLevel
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1, selectedSpice: spiceLevel }];
      }
    });
  };

  const updateQuantity = (id: number, spiceLevel: string | undefined, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => 
        !(item.id === id && item.selectedSpice === spiceLevel)
      ));
    } else {
      setCart(prevCart => prevCart.map(item =>
        item.id === id && item.selectedSpice === spiceLevel
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleProceedToOrder = () => {
    setShowOrderPopup(true);
  };

  const handleOrderNow = () => {
    const orderDetails = cart.map(item => 
      `${item.name} (Qty: ${item.quantity}${item.selectedSpice ? `, Spice: ${item.selectedSpice}` : ''}) - R${item.price * item.quantity}`
    ).join('\n');
    
    const totalAmount = getTotalAmount();
    const customerInfo = `Name: ${customerDetails.name}\nPhone: ${customerDetails.phone}\nOrder Type: ${customerDetails.orderType.toUpperCase()}${customerDetails.address ? `\nAddress: ${customerDetails.address}` : ''}${customerDetails.specialInstructions ? `\nSpecial Instructions: ${customerDetails.specialInstructions}` : ''}`;
    
    const whatsappMessage = `*New Order from Bawas Food Infinite*\n\n*Customer Details:*\n${customerInfo}\n\n*Order Details:*\n${orderDetails}\n\n*Total Amount: R${totalAmount}*\n\nThank you for choosing Bawas Food Infinite!`;
    
    const phoneNumber = "27678800167"; // Restaurant's WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Reset cart and close popup
    setCart([]);
    setShowOrderPopup(false);
    setIsCartOpen(false);
    setCustomerDetails({
      name: '',
      phone: '',
      orderType: 'takeaway',
      address: '',
      specialInstructions: ''
    });
  };

  const handleContinueShopping = () => {
    setShowOrderPopup(false);
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Menu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our authentic Indian cuisine, prepared with traditional recipes and the finest spices
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
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item) => (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              onAddToCart={addToCart}
              cartQuantity={cart.find(cartItem => cartItem.id === item.id)?.quantity || 0}
            />
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className={`fixed bottom-4 right-4 z-40 transition-all duration-300 ${
            isCartOpen ? 'w-80' : 'w-auto'
          }`}>
            {!isCartOpen ? (
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-4 rounded-full shadow-lg flex items-center space-x-3 transform hover:scale-105 transition-all duration-300"
              >
                <ShoppingCart size={24} />
                <span className="font-semibold">Cart ({getTotalItems()})</span>
                <span className="bg-white text-green-600 px-2 py-1 rounded-full text-sm font-bold">
                  R{getTotalAmount()}
                </span>
              </button>
            ) : (
              <div className="bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 flex justify-between items-center">
                  <h3 className="font-bold text-lg">Cart Summary</h3>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="max-h-48 overflow-y-auto p-4">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${item.selectedSpice}-${index}`} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        {item.selectedSpice && (
                          <p className="text-xs text-gray-500">Spice: {item.selectedSpice}</p>
                        )}
                        <p className="text-xs text-gray-600">R{item.price} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSpice, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSpice, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-lg text-green-600">R{getTotalAmount()}</span>
                  </div>
                  <button
                    onClick={handleProceedToOrder}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Proceed to Order
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Order Popup */}
        {showOrderPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Complete Your Order</h2>
                <button
                  onClick={() => setShowOrderPopup(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-140px)]">
                {/* Left Side - Order Summary */}
                <div className="lg:w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h3>
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={`${item.id}-${item.selectedSpice}-${index}`} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-green-600 flex items-center">
                            {item.name}
                            <span className="ml-2 text-xs">
                              {item.isVeg ? '🟢' : '🔴'}
                            </span>
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Quantity: {item.quantity}</span>
                            {item.selectedSpice && <span>Spice: {item.selectedSpice}</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">R{item.price * item.quantity}</p>
                          <p className="text-xs text-gray-500">R{item.price} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total Amount:</span>
                      <span className="text-green-600">R{getTotalAmount()}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Customer Details */}
                <div className="lg:w-1/2 p-6 overflow-y-auto">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Customer Details</h3>
                  
                  {/* Order Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Order Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setCustomerDetails({...customerDetails, orderType: 'takeaway'})}
                        className={`p-3 rounded-lg border-2 flex items-center justify-center space-x-2 transition-all ${
                          customerDetails.orderType === 'takeaway'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 hover:border-green-300'
                        }`}
                      >
                        <Store size={20} />
                        <span>Takeaway</span>
                      </button>
                      <button
                        onClick={() => setCustomerDetails({...customerDetails, orderType: 'delivery'})}
                        className={`p-3 rounded-lg border-2 flex items-center justify-center space-x-2 transition-all ${
                          customerDetails.orderType === 'delivery'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 hover:border-green-300'
                        }`}
                      >
                        <Truck size={20} />
                        <span>Delivery</span>
                      </button>
                    </div>
                  </div>

                  {/* Customer Information Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <User size={16} className="mr-1" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={customerDetails.name}
                        onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Phone size={16} className="mr-1" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerDetails.phone}
                        onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    {customerDetails.orderType === 'delivery' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Address *
                        </label>
                        <textarea
                          value={customerDetails.address}
                          onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        value={customerDetails.specialInstructions}
                        onChange={(e) => setCustomerDetails({...customerDetails, specialInstructions: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Any special requests or dietary requirements..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={handleContinueShopping}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleOrderNow}
                    disabled={!customerDetails.name || !customerDetails.phone || (customerDetails.orderType === 'delivery' && !customerDetails.address)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <MessageSquare size={20} />
                    <span>Order Now</span>
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

// Menu Item Card Component
interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, spiceLevel?: string) => void;
  cartQuantity: number;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart, cartQuantity }) => {
  const [selectedSpice, setSelectedSpice] = useState<string>(item.spiceLevel || 'Medium');
  const [showSpiceOptions, setShowSpiceOptions] = useState(false);

  const spiceLevels = ['Mild', 'Medium', 'Hot'];

  const handleAddToCart = () => {
    onAddToCart(item, item.spiceLevel ? selectedSpice : undefined);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-orange-100">
      <div className="relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.isVeg 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-orange-600">
            R{item.price}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
        
        {item.spiceLevel && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Spice Level:</span>
              <button
                onClick={() => setShowSpiceOptions(!showSpiceOptions)}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                {selectedSpice} ▼
              </button>
            </div>
            {showSpiceOptions && (
              <div className="grid grid-cols-3 gap-2">
                {spiceLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      setSelectedSpice(level);
                      setShowSpiceOptions(false);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedSpice === level
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-600">R{item.price}</span>
            {cartQuantity > 0 && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                {cartQuantity} in cart
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;