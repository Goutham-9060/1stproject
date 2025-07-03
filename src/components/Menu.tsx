import React, { useState, useEffect } from 'react';
import { Plus, Minus, ShoppingCart, X, MapPin, Navigation, Loader2 } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  deliveryType: 'pickup' | 'delivery';
}

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  distance?: number;
}

const Menu: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryType: 'pickup'
  });
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);

  // Restaurant location (Chartwell, Johannesburg)
  const restaurantLocation = {
    latitude: -26.0285,
    longitude: 28.0436
  };

  const menuItems: MenuItem[] = [
    // Starters
    {
      id: 1,
      name: "Samosa (2 pieces)",
      description: "Crispy triangular pastries filled with spiced potatoes and peas",
      price: 45,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Starters",
      isVeg: true,
      spiceLevel: "Medium"
    },
    {
      id: 2,
      name: "Chicken Tikka",
      description: "Tender marinated chicken pieces grilled to perfection",
      price: 85,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Starters",
      isVeg: false,
      spiceLevel: "Medium"
    },
    {
      id: 3,
      name: "Paneer Tikka",
      description: "Marinated cottage cheese cubes grilled with bell peppers and onions",
      price: 75,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Starters",
      isVeg: true,
      spiceLevel: "Medium"
    },

    // Main Course
    {
      id: 4,
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken pieces",
      price: 120,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Main Course",
      isVeg: false,
      spiceLevel: "Mild"
    },
    {
      id: 5,
      name: "Chicken Biryani",
      description: "Fragrant basmati rice layered with spiced chicken and aromatic herbs",
      price: 140,
      image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Main Course",
      isVeg: false,
      spiceLevel: "Medium"
    },
    {
      id: 6,
      name: "Dal Makhani",
      description: "Rich and creamy black lentils slow-cooked with butter and cream",
      price: 95,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Main Course",
      isVeg: true,
      spiceLevel: "Mild"
    },
    {
      id: 7,
      name: "Palak Paneer",
      description: "Fresh cottage cheese cubes in a creamy spinach gravy",
      price: 110,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Main Course",
      isVeg: true,
      spiceLevel: "Medium"
    },

    // Breads
    {
      id: 8,
      name: "Butter Naan",
      description: "Soft and fluffy bread brushed with butter",
      price: 35,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Breads",
      isVeg: true
    },
    {
      id: 9,
      name: "Garlic Naan",
      description: "Naan bread topped with fresh garlic and herbs",
      price: 40,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Breads",
      isVeg: true
    },
    {
      id: 10,
      name: "Tandoori Roti",
      description: "Whole wheat bread cooked in tandoor",
      price: 25,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Breads",
      isVeg: true
    },

    // Beverages
    {
      id: 11,
      name: "Mango Lassi",
      description: "Refreshing yogurt drink blended with sweet mango",
      price: 45,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Beverages",
      isVeg: true
    },
    {
      id: 12,
      name: "Masala Chai",
      description: "Traditional spiced tea with aromatic herbs",
      price: 25,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Beverages",
      isVeg: true
    },

    // Desserts
    {
      id: 13,
      name: "Gulab Jamun (2 pieces)",
      description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
      price: 55,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Desserts",
      isVeg: true
    },
    {
      id: 14,
      name: "Kulfi",
      description: "Traditional Indian ice cream with cardamom and pistachios",
      price: 50,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Desserts",
      isVeg: true
    }
  ];

  const categories = ['All', 'Starters', 'Main Course', 'Breads', 'Beverages', 'Desserts'];

  const filteredItems = activeCategory === 'All' 
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

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotal = () => {
    return getSubtotal() + deliveryFee;
  };

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Calculate delivery fee based on distance
  const calculateDeliveryFee = (distance: number): number => {
    if (distance <= 4) return 40;
    if (distance <= 8) return 60;
    if (distance <= 12) return 100;
    return 200;
  };

  // Auto-detect location
  const detectLocation = async () => {
    setIsDetectingLocation(true);
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Calculate distance from restaurant
      const distance = calculateDistance(
        restaurantLocation.latitude,
        restaurantLocation.longitude,
        latitude,
        longitude
      );

      // Get address using reverse geocoding (using a free service)
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();
        
        const address = `${data.locality || ''}, ${data.city || ''}, ${data.principalSubdivision || ''}, ${data.countryName || ''}`.replace(/^,\s*|,\s*$/g, '');
        
        const locationInfo: LocationData = {
          latitude,
          longitude,
          address: address || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          distance: Math.round(distance * 10) / 10 // Round to 1 decimal place
        };

        setLocationData(locationInfo);
        setCustomerDetails(prev => ({
          ...prev,
          address: locationInfo.address
        }));

        // Calculate and set delivery fee
        const fee = calculateDeliveryFee(distance);
        setDeliveryFee(fee);

      } catch (geocodeError) {
        // Fallback to coordinates if reverse geocoding fails
        const locationInfo: LocationData = {
          latitude,
          longitude,
          address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          distance: Math.round(distance * 10) / 10
        };

        setLocationData(locationInfo);
        setCustomerDetails(prev => ({
          ...prev,
          address: locationInfo.address
        }));

        const fee = calculateDeliveryFee(distance);
        setDeliveryFee(fee);
      }

    } catch (error) {
      console.error('Error detecting location:', error);
      alert('Unable to detect your location. Please enter your address manually or check your browser permissions.');
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Update delivery fee when delivery type changes
  useEffect(() => {
    if (customerDetails.deliveryType === 'pickup') {
      setDeliveryFee(0);
      setLocationData(null);
    } else if (locationData?.distance) {
      const fee = calculateDeliveryFee(locationData.distance);
      setDeliveryFee(fee);
    }
  }, [customerDetails.deliveryType, locationData?.distance]);

  const handleCustomerDetailsChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitOrder = () => {
    if (!customerDetails.name || !customerDetails.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    if (customerDetails.deliveryType === 'delivery' && !customerDetails.address) {
      alert('Please provide your delivery address');
      return;
    }

    // Here you would typically send the order to your backend
    console.log('Order submitted:', {
      items: cart,
      customer: customerDetails,
      subtotal: getSubtotal(),
      deliveryFee,
      total: getTotal(),
      locationData
    });

    alert('Order submitted successfully! We will contact you shortly.');
    setCart([]);
    setIsCartOpen(false);
    setCustomerDetails({
      name: '',
      phone: '',
      email: '',
      address: '',
      deliveryType: 'pickup'
    });
    setLocationData(null);
    setDeliveryFee(0);
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
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md hover:shadow-lg'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
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
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
                      🌶️ {item.spiceLevel}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">R {item.price}</span>
                  
                  <div className="flex items-center gap-3">
                    {getCartItemQuantity(item.id) > 0 ? (
                      <div className="flex items-center gap-3">
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
            </div>
          ))}
        </div>

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-40"
          >
            <div className="relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {getTotalItems()}
              </span>
            </div>
          </button>
        )}

        {/* Cart Modal */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">Complete Your Order</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                {/* Cart Items */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Your Order</h4>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{item.name}</h5>
                          <p className="text-orange-600 font-semibold">R {item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold text-lg min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-semibold">R {getSubtotal()}</span>
                      </div>
                      {customerDetails.deliveryType === 'delivery' && (
                        <div className="flex justify-between">
                          <span>Delivery Fee:</span>
                          <span className="font-semibold">R {deliveryFee}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-300 pt-2">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-orange-600">R {getTotal()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Details */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Details</h4>
                  
                  {/* Delivery Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleCustomerDetailsChange('deliveryType', 'pickup')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          customerDetails.deliveryType === 'pickup'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        🏪 Pickup
                      </button>
                      <button
                        onClick={() => handleCustomerDetailsChange('deliveryType', 'delivery')}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          customerDetails.deliveryType === 'delivery'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        🚚 Delivery
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={customerDetails.phone}
                        onChange={(e) => handleCustomerDetailsChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                      <input
                        type="email"
                        value={customerDetails.email}
                        onChange={(e) => handleCustomerDetailsChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {customerDetails.deliveryType === 'delivery' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label>
                        
                        {/* Auto-detect Location Button */}
                        <div className="mb-3">
                          <button
                            onClick={detectLocation}
                            disabled={isDetectingLocation}
                            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            {isDetectingLocation ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Navigation size={16} />
                            )}
                            {isDetectingLocation ? 'Detecting Location...' : 'Auto-Detect My Location'}
                          </button>
                        </div>

                        <textarea
                          value={customerDetails.address}
                          onChange={(e) => handleCustomerDetailsChange('address', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter your complete delivery address"
                          rows={3}
                          required
                        />

                        {/* Location Information */}
                        {locationData && (
                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <MapPin size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <div className="text-sm">
                                <p className="text-green-800 font-medium">Location Detected</p>
                                <p className="text-green-700">Distance: {locationData.distance} km</p>
                                <p className="text-green-700">Delivery Fee: R {deliveryFee}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Delivery Fee Information */}
                        <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <h5 className="text-sm font-medium text-orange-800 mb-2">Delivery Charges:</h5>
                          <div className="text-xs text-orange-700 space-y-1">
                            <div>• 0-4 km: R 40</div>
                            <div>• 5-8 km: R 60</div>
                            <div>• 9-12 km: R 100</div>
                            <div>• Above 12 km: R 200</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSubmitOrder}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 mt-6"
                  >
                    Place Order - R {getTotal()}
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