import React, { useState } from 'react';
import { 
  Leaf, 
  Drumstick, 
  Plus, 
  Minus, 
  X, 
  ShoppingCart,
  Soup,
  UtensilsCrossed,
  MapPin,
  Sandwich,
  ChefHat,
  Fish,
  Wheat,
  Coffee,
  Cookie,
  Flame,
  Salad,
  Truck,
  Store,
  User,
  Phone,
  MapPinIcon,
  MessageCircle
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVegetarian: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
  spiceLevel: string;
}

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  orderType: 'delivery' | 'takeaway';
  notes: string;
}

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('starters-veg');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<{[key: string]: {quantity: number, spiceLevel: string}}>({});
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    orderType: 'takeaway',
    notes: ''
  });

  const spiceLevels = ['Very Mild', 'Mild', 'Medium', 'Hot', 'Extra Hot'];

  const categories = [
    { id: 'starters-veg', label: 'Starters - Vegetarian', icon: Leaf },
    { id: 'starters-nonveg', label: 'Starters - Non-Vegetarian', icon: Drumstick },
    { id: 'chips-soup', label: 'Chips & Soup', icon: Soup },
    { id: 'thali', label: 'Thali', icon: UtensilsCrossed },
    { id: 'street-bites', label: 'Street Bites', icon: MapPin },
    { id: 'street-meals', label: 'Street Meals', icon: Sandwich },
    { id: 'chicken', label: 'Chicken Delights', icon: Drumstick },
    { id: 'lamb', label: 'Lamb Enthrals', icon: ChefHat },
    { id: 'seafood', label: 'Sea Food Specialities', icon: Fish },
    { id: 'vegetarian', label: 'Vegetarian Ravishes', icon: Leaf },
    { id: 'rice-biryani', label: 'Various Rice & Biryani', icon: Wheat },
    { id: 'breads', label: 'Indian Breads', icon: Wheat },
    { id: 'bunny-chows', label: 'Bunny Chows & Roti Rolls', icon: Sandwich },
    { id: 'indo-chinese', label: 'Indo Chinese', icon: Flame },
    { id: 'sides', label: 'Side Dishes', icon: Salad },
    { id: 'desserts', label: 'Desserts & Hot Beverages', icon: Coffee }
  ];

  const menuItems: MenuItem[] = [
    // Starters - Vegetarian
    { id: 'veg-samosa', name: 'Veg Samosa', description: 'An Indian fried pastry with savoury potato filling.', price: 48, category: 'starters-veg', isVegetarian: true },
    { id: 'onion-bhajia', name: 'Onion Bhajia', description: 'Deep fried chopped onions marinated in a spicy paste.', price: 44, category: 'starters-veg', isVegetarian: true },
    { id: 'potato-pakora', name: 'Potato Pakora', description: 'Deep fried potato slices marinated in a spicy paste.', price: 42, category: 'starters-veg', isVegetarian: true },
    { id: 'paneer-pakora', name: 'Paneer Pakora', description: 'Deep fried Indian cottage cheese marinated in a spicy paste.', price: 60, category: 'starters-veg', isVegetarian: true },
    { id: 'paneer-tikka', name: 'Paneer Tikka', description: 'Chunks of Indian cottage cheese marinated and cooked with tomatoes, onion and green pepper in clay oven.', price: 90, category: 'starters-veg', isVegetarian: true },
    { id: 'tandoori-mushroom', name: 'Tandoori Mushroom', description: 'Mushroom marinated and cooked in clay oven with onion, tomato and green pepper.', price: 90, category: 'starters-veg', isVegetarian: true },
    { id: 'cauliflower-65', name: 'Cauliflower 65', description: 'Fried cauliflower florets spiced with herbs.', price: 85, category: 'starters-veg', isVegetarian: true },
    { id: 'veg-platter', name: 'Veg Platter For 2', description: 'Platter consists of veg samosa, paneer tikka and assorted pakoras.', price: 130, category: 'starters-veg', isVegetarian: true },

    // Starters - Non-Vegetarian
    { id: 'chicken-samosa', name: 'Samosa Chicken', description: 'An Indian pastry with a savoury chicken filling.', price: 56, category: 'starters-nonveg', isVegetarian: false },
    { id: 'lamb-samosa', name: 'Samosa Lamb', description: 'An Indian pastry with a savoury lamb filling.', price: 60, category: 'starters-nonveg', isVegetarian: false },
    { id: 'chicken-tikka-half', name: 'Chicken Tikka Half', description: 'Tender boneless chicken pieces marinated overnight in exotic spices and slow cooked in a clay oven.', price: 80, category: 'starters-nonveg', isVegetarian: false },
    { id: 'chicken-tikka-full', name: 'Chicken Tikka Full', description: 'Tender boneless chicken pieces marinated overnight in exotic spices and slow cooked in a clay oven.', price: 130, category: 'starters-nonveg', isVegetarian: false },
    { id: 'chicken-malai-tikka-half', name: 'Chicken Malai Tikka Half', description: 'Tender boneless chicken pieces marinated with rich cream, spices and cooked in a clay oven.', price: 85, category: 'starters-nonveg', isVegetarian: false },
    { id: 'chicken-malai-tikka-full', name: 'Chicken Malai Tikka Full', description: 'Tender boneless chicken pieces marinated with rich cream, spices and cooked in a clay oven.', price: 135, category: 'starters-nonveg', isVegetarian: false },
    { id: 'chicken-tikka-hara-bhara-half', name: 'Chicken Tikka Hara Bhara Half', description: 'Tender boneless chicken pieces marinated in a mixture of mint leaves, coriander leaves, curd cooked in a clay oven.', price: 90, category: 'starters-nonveg', isVegetarian: false },
    { id: 'chicken-tikka-hara-bhara-full', name: 'Chicken Tikka Hara Bhara Full', description: 'Tender boneless chicken pieces marinated in a mixture of mint leaves, coriander leaves, curd cooked in a clay oven.', price: 140, category: 'starters-nonveg', isVegetarian: false },
    { id: 'chicken-seekh-kebab', name: 'Chicken Seekh Kebab', description: 'Minced chicken deliciously flavoured with herbs & spices, prepared on a skewer in a clay oven.', price: 90, category: 'starters-nonveg', isVegetarian: false },
    { id: 'lamb-chops', name: 'Lamb Chops', description: 'Lamb chops marinated overnight in exotic spices and slow cooked in a clay oven.', price: 150, category: 'starters-nonveg', isVegetarian: false },
    { id: 'lamb-seekh-kebab', name: 'Lamb Seekh Kebab', description: 'Minced lamb deliciously flavoured with herbs & spices, prepared on a skewer in a clay oven.', price: 120, category: 'starters-nonveg', isVegetarian: false },
    { id: 'tandoori-chicken-half', name: 'Tandoori Chicken Half', description: 'Half chicken marinated overnight in Indian spices & gradually cooked in a clay oven.', price: 85, category: 'starters-nonveg', isVegetarian: false },
    { id: 'tandoori-chicken-full', name: 'Tandoori Chicken Full', description: 'Whole chicken marinated overnight in Indian spices & gradually cooked in a clay oven.', price: 150, category: 'starters-nonveg', isVegetarian: false },
    { id: 'chicken-quarter-leg', name: 'Chicken Quarter Leg', description: 'Chicken leg marinated in exotic spices and cooked in a clay oven.', price: 45, category: 'starters-nonveg', isVegetarian: false },
    { id: 'tava-fried-prawns', name: 'Tava Fried Prawns', description: 'Prawns roasted on a heavy flat pan.', price: 140, category: 'starters-nonveg', isVegetarian: false },
    { id: 'chicken-65', name: 'Chicken 65', description: 'Chicken 65 is a spicy, deep fried chicken dish marinated in Indian spices.', price: 110, category: 'starters-nonveg', isVegetarian: false },
    { id: 'amritsari-fried-fish', name: 'Amritsari Fried Fish', description: 'Fish marinated with spices and gram flour.', price: 155, category: 'starters-nonveg', isVegetarian: false },
    { id: 'mixed-platter', name: 'Mixed Platter for 2', description: 'Platter contains samosa, lamb seekh kebab and chicken tikka.', price: 200, category: 'starters-nonveg', isVegetarian: false },

    // Chips & Soup
    { id: 'plain-chips', name: 'Plain Chips', description: 'Potato fingers fried.', price: 25, category: 'chips-soup', isVegetarian: true },
    { id: 'masala-chips', name: 'Masala Chips', description: 'Potato fingers fried and tossed with spices.', price: 30, category: 'chips-soup', isVegetarian: true },
    { id: 'lentil-soup', name: 'Lentil Soup / Dhal Soup', description: 'Traditional lentil soup served with cocktail naan.', price: 25, category: 'chips-soup', isVegetarian: true },
    { id: 'vegetable-soup', name: 'Vegetable Soup', description: 'Fresh vegetable soup served with cocktail naan.', price: 25, category: 'chips-soup', isVegetarian: true },
    { id: 'tomato-soup', name: 'Tomato Soup', description: 'Classic tomato soup served with cocktail naan.', price: 25, category: 'chips-soup', isVegetarian: true },
    { id: 'chicken-soup', name: 'Chicken Soup', description: 'Hearty chicken soup served with cocktail naan.', price: 30, category: 'chips-soup', isVegetarian: false },

    // Thali (Served with rice, desert, pickle, raita and 1 naan)
    { id: 'vegetable-thali', name: 'Vegetable Thali', description: 'Paneer and 2 sides. Served with rice, desert, pickle, raita and 1 naan.', price: 140, category: 'thali', isVegetarian: true },
    { id: 'chicken-thali', name: 'Chicken Thali', description: 'Chicken curry and 2 sides. Served with rice, desert, pickle, raita and 1 naan.', price: 160, category: 'thali', isVegetarian: false },
    { id: 'lamb-thali', name: 'Lamb Thali', description: 'Lamb curry, Chicken curry and 1 side. Served with rice, desert, pickle, raita and 1 naan.', price: 190, category: 'thali', isVegetarian: false },

    // Street Bites
    { id: 'aloo-corn-chaat', name: 'Aloo Corn Chaat', description: 'Traditional Indian street snack with potatoes and corn.', price: 30, category: 'street-bites', isVegetarian: true },
    { id: 'pani-puri', name: 'Pani Puri', description: 'Crispy hollow puris filled with spiced water.', price: 45, category: 'street-bites', isVegetarian: true },
    { id: 'bombay-bhel', name: 'Bombay Bhel', description: 'Mumbai style puffed rice snack.', price: 40, category: 'street-bites', isVegetarian: true },
    { id: 'dahi-puri', name: 'Dahi Puri', description: 'Crispy puris topped with yogurt and chutneys.', price: 45, category: 'street-bites', isVegetarian: true },
    { id: 'samosa-chaat', name: 'Samosa Chaat', description: 'Samosa topped with chutneys and yogurt.', price: 60, category: 'street-bites', isVegetarian: true },
    { id: 'aloo-tikki', name: 'Aloo Tikki', description: 'Spiced potato patties served with chutneys.', price: 50, category: 'street-bites', isVegetarian: true },
    { id: 'chole-tikki', name: 'Chole Tikki', description: 'Potato patties topped with chickpea curry.', price: 70, category: 'street-bites', isVegetarian: true },
    { id: 'dahi-vada', name: 'Dahi Vada (4pc)', description: 'Lentil dumplings in spiced yogurt.', price: 55, category: 'street-bites', isVegetarian: true },
    { id: 'aloo-bonda', name: 'Aloo Bonda', description: 'Deep fried potato dumplings with spices.', price: 55, category: 'street-bites', isVegetarian: true },

    // Street Meals
    { id: 'kadi-pakora-rice', name: 'Kadi Pakora With Rice or Tava Paratha', description: 'Traditional yogurt curry with pakoras served with rice or paratha.', price: 85, category: 'street-meals', isVegetarian: true },
    { id: 'lamb-kofta-curry', name: 'Lamb Kofta Curry with Rice or Tava Paratha', description: 'Spiced lamb meatballs in curry served with rice or paratha.', price: 140, category: 'street-meals', isVegetarian: false },
    { id: 'egg-curry-paratha', name: 'Egg Curry With Tava Paratha', description: 'Spiced egg curry served with fresh tava paratha.', price: 85, category: 'street-meals', isVegetarian: false },
    { id: 'amritsari-chole-kulcha', name: 'Amritsari Chole Kulcha', description: 'Spicy chickpea curry served with kulcha bread.', price: 95, category: 'street-meals', isVegetarian: true },
    { id: 'chole-bhature', name: 'Chole Bhature', description: 'Chickpea curry served with fluffy fried bread.', price: 90, category: 'street-meals', isVegetarian: true },
    { id: 'baigan-dahi-masala', name: 'Baigan Dahi Masala with Tava Paratha', description: 'Eggplant in yogurt curry served with paratha.', price: 80, category: 'street-meals', isVegetarian: true },
    { id: 'puri-bhaji', name: 'Puri Bhaji', description: 'Spiced potato curry served with crispy puris.', price: 60, category: 'street-meals', isVegetarian: true },

    // Chicken Delights
    { id: 'punjabi-chicken', name: 'Punjabi Chicken Curry', description: 'Chicken with potatoes traditionally prepared in tasty Punjabi style gravy.', price: 120, category: 'chicken', isVegetarian: false },
    { id: 'chicken-vindaloo', name: 'Chicken Vindaloo', description: 'Chicken prepared with potatoes, vinegar, whole red chillies and curry leaves.', price: 125, category: 'chicken', isVegetarian: false },
    { id: 'chicken-korma', name: 'Chicken Korma', description: 'Chicken pieces cooked in rich cream and velvety cashew nut sauce.', price: 130, category: 'chicken', isVegetarian: false },
    { id: 'butter-chicken', name: 'Butter Chicken', description: 'Tandoori chicken pieces cooked in butter and cream based gravy.', price: 130, category: 'chicken', isVegetarian: false },
    { id: 'chicken-badami', name: 'Chicken Badami (Almonds)', description: 'Chicken pieces prepared in a tasty gravy with almonds.', price: 140, category: 'chicken', isVegetarian: false },
    { id: 'chicken-palak', name: 'Chicken Palak', description: 'Chicken pieces prepared with spinach and cream.', price: 130, category: 'chicken', isVegetarian: false },
    { id: 'chicken-tikka-masala', name: 'Chicken Tikka Masala', description: 'Roasted chicken pieces cooked with tomato, green pepper, onions, butter and spices.', price: 130, category: 'chicken', isVegetarian: false },
    { id: 'chicken-do-pyaza', name: 'Chicken Do Pyaza', description: 'Chicken pieces cooked with onion, flavoured with spices in a delicious gravy.', price: 140, category: 'chicken', isVegetarian: false },
    { id: 'chicken-bhuna', name: 'Chicken Bhuna', description: 'Chicken pieces roasted with onions and tomatoes with spices for a thick gravy.', price: 140, category: 'chicken', isVegetarian: false },
    { id: 'chicken-jalfrazi', name: 'Chicken Jalfrazi', description: 'Chicken pieces cooked with onion, tomato and green pepper in a sweet and sour flavoured sauce.', price: 130, category: 'chicken', isVegetarian: false },
    { id: 'chicken-madras', name: 'Chicken Madras', description: 'Chicken pieces prepared with coconut and curry leaves flavoured in traditional South Indian style.', price: 130, category: 'chicken', isVegetarian: false },
    { id: 'chicken-kadai', name: 'Chicken Kadai', description: 'Chicken pieces cooked in an Indian wok with a divine gravy.', price: 140, category: 'chicken', isVegetarian: false },
    { id: 'chicken-dhanshak', name: 'Chicken Dhanshak', description: 'Chicken pieces cooked with yellow lentils.', price: 130, category: 'chicken', isVegetarian: false },
    { id: 'chicken-seekh-masala', name: 'Chicken Seekh Masala', description: 'Minced chicken prepared on a skewer and sauteed in a delicious gravy.', price: 140, category: 'chicken', isVegetarian: false },
    { id: 'chicken-kali-mirch', name: 'Chicken Kali Mirch', description: 'Chicken pieces cooked in cashew nut gravy and prominently flavoured with black pepper.', price: 140, category: 'chicken', isVegetarian: false },

    // Lamb Enthrals
    { id: 'punjabi-lamb', name: 'Punjabi Lamb Curry', description: 'Lamb traditionally prepared with potatoes in a tasty Punjabi style gravy.', price: 150, category: 'lamb', isVegetarian: false },
    { id: 'lamb-vindaloo', name: 'Lamb Vindaloo', description: 'Lamb prepared with potatoes, vinegar, whole red chillies and curry leaves.', price: 155, category: 'lamb', isVegetarian: false },
    { id: 'lamb-rogan-josh', name: 'Lamb Rogan Josh', description: 'Lamb pieces cooked with tomato, onion glazed with butter.', price: 155, category: 'lamb', isVegetarian: false },
    { id: 'lamb-dal-gosht', name: 'Lamb Dal Gosht', description: 'Lamb pieces cooked with yellow lentils.', price: 150, category: 'lamb', isVegetarian: false },
    { id: 'lamb-korma', name: 'Lamb Korma', description: 'Lamb pieces cooked in a rich cream and velvety cashew nut sauce.', price: 155, category: 'lamb', isVegetarian: false },
    { id: 'lamb-butter-masala', name: 'Lamb Butter Masala', description: 'Lamb cooked in butter and cream based gravy.', price: 165, category: 'lamb', isVegetarian: false },
    { id: 'lamb-badami', name: 'Lamb Badami (Almonds)', description: 'Lamb pieces cooked in a tasty gravy with almonds.', price: 170, category: 'lamb', isVegetarian: false },
    { id: 'lamb-palak', name: 'Lamb Palak', description: 'Lamb pieces prepared with spinach and cream.', price: 155, category: 'lamb', isVegetarian: false },
    { id: 'lamb-tikka-masala', name: 'Lamb Tikka Masala', description: 'Roasted pieces of lamb cooked in tomato, green pepper, onion, butter and spices.', price: 160, category: 'lamb', isVegetarian: false },
    { id: 'lamb-do-pyaza', name: 'Lamb Do Pyaza', description: 'Pieces of lamb cooked with onion and flavoured with spices in a tasty gravy.', price: 170, category: 'lamb', isVegetarian: false },
    { id: 'lamb-bhuna', name: 'Lamb Bhuna', description: 'Lamb pieces roasted in onion, tomato and spices for a thick gravy.', price: 165, category: 'lamb', isVegetarian: false },
    { id: 'lamb-jalfrazi', name: 'Lamb Jalfrazi', description: 'Lamb pieces cooked with onion, tomato, green pepper in a sweet and sour flavour.', price: 155, category: 'lamb', isVegetarian: false },
    { id: 'lamb-madras', name: 'Lamb Madras', description: 'Lamb pieces cooked with coconut, curry leaves in a traditional South Indian style.', price: 155, category: 'lamb', isVegetarian: false },
    { id: 'lamb-kadai', name: 'Lamb Kadai', description: 'Pieces of lamb cooked in an Indian wok with a divine gravy.', price: 160, category: 'lamb', isVegetarian: false },
    { id: 'lamb-chops-masala', name: 'Lamb Chops Masala', description: 'Tandoori lamb chops cooked in a tasty onion and tomato gravy.', price: 170, category: 'lamb', isVegetarian: false },
    { id: 'lamb-seekh-masala', name: 'Lamb Seekh Masala', description: 'Lamb mince prepared on skewer and sauteed in delicious gravy.', price: 170, category: 'lamb', isVegetarian: false },

    // Sea Food Specialities
    { id: 'fish-curry', name: 'Fish Curry', description: 'Kingklip pieces spiced and prepared in a delicious gravy.', price: 160, category: 'seafood', isVegetarian: false },
    { id: 'fish-vindaloo', name: 'Fish Vindaloo', description: 'Kingklip cooked with potato, vinegar, whole red chillies and curry leaves.', price: 165, category: 'seafood', isVegetarian: false },
    { id: 'prawn-masala', name: 'Prawn Masala', description: 'Prawns cooked in a special blend of spices and gravy.', price: 170, category: 'seafood', isVegetarian: false },
    { id: 'prawn-vindaloo', name: 'Prawn Vindaloo', description: 'Prawns cooked with potato, vinegar, whole red chillies and curry leaves.', price: 175, category: 'seafood', isVegetarian: false },
    { id: 'prawn-korma', name: 'Prawn Korma', description: 'Prawns cooked in a rich cream and velvety cashew nut sauce.', price: 175, category: 'seafood', isVegetarian: false },
    { id: 'fish-prawn-curry', name: 'Fish And Prawn Curry', description: 'Kingklip and prawns cooked in a delicious gravy.', price: 170, category: 'seafood', isVegetarian: false },
    { id: 'prawns-chicken-curry', name: 'Prawns And Chicken Curry', description: 'Prawns and chicken cooked in a divinely spiced gravy.', price: 160, category: 'seafood', isVegetarian: false },

    // Vegetarian Ravishes
    { id: 'jeera-aloo', name: 'Jeera Aloo', description: 'Potatoes spiced and cooked with cumin seeds and coriander.', price: 75, category: 'vegetarian', isVegetarian: true },
    { id: 'bombay-potatoes', name: 'Bombay Potatoes', description: 'Potatoes cooked with onion, tomato and flavoured with spices.', price: 75, category: 'vegetarian', isVegetarian: true },
    { id: 'stuffed-bell-pepper', name: 'Stuffed Bell Pepper', description: 'Pieces of small bell pepper stuffed with potatoes and dressed with gravy.', price: 95, category: 'vegetarian', isVegetarian: true },
    { id: 'aloo-matar-gobi', name: 'Aloo Matar Gobi', description: 'Potatoes, green peas and cauliflower cooked in spices.', price: 90, category: 'vegetarian', isVegetarian: true },
    { id: 'baigan-bharta', name: 'Baigan Bharta', description: 'Grilled mashed egg plant cooked in onion and tomato.', price: 90, category: 'vegetarian', isVegetarian: true },
    { id: 'matar-mushroom', name: 'Matar Mushroom', description: 'Green peas and mushrooms cooked in a delicious onion tomato gravy.', price: 90, category: 'vegetarian', isVegetarian: true },
    { id: 'mixed-vegetable', name: 'Mixed Vegetable', description: 'Mixed vegetable cooked in a tangy gravy.', price: 85, category: 'vegetarian', isVegetarian: true },
    { id: 'malai-kofta', name: 'Malai Kofta', description: 'Paneer potato dumplings served with a creamy luxurious gravy.', price: 100, category: 'vegetarian', isVegetarian: true },
    { id: 'navratan-korma', name: 'Navratan Korma', description: 'Fresh vegetables cooked in cashew nut and cream sauce.', price: 110, category: 'vegetarian', isVegetarian: true },
    { id: 'vegetable-kadai', name: 'Vegetable Kadai', description: 'Fresh vegetables cooked in an Indian wok with a divine gravy.', price: 110, category: 'vegetarian', isVegetarian: true },
    { id: 'vegetable-makhani', name: 'Vegetable Makhani', description: 'Fresh vegetables cooked in a glossy butter and tomato gravy.', price: 100, category: 'vegetarian', isVegetarian: true },
    { id: 'vegetable-jalfrazi', name: 'Vegetable Jalfrazi', description: 'Mixed vegetables cooked in a tomato gravy with a sweet sour flavour.', price: 95, category: 'vegetarian', isVegetarian: true },
    { id: 'paneer-masala', name: 'Paneer Masala', description: 'Indian cottage cheese prepared in tomato and a rich butter gravy.', price: 105, category: 'vegetarian', isVegetarian: true },
    { id: 'paneer-tikka-masala', name: 'Paneer Tikka Masala', description: 'Tandoori cottage cheese cooked in a rich buttered tomato gravy.', price: 110, category: 'vegetarian', isVegetarian: true },
    { id: 'paneer-kadai', name: 'Paneer Kadai', description: 'Indian cottage cheese cooked in an Indian wok in a tasty gravy.', price: 110, category: 'vegetarian', isVegetarian: true },
    { id: 'paneer-butter-masala', name: 'Paneer Butter Masala', description: 'Indian cottage cheese cooked in onion, tomato and butter gravy.', price: 115, category: 'vegetarian', isVegetarian: true },
    { id: 'paneer-makhani', name: 'Paneer Makhani', description: 'Indian cottage cheese cooked in butter and cream based gravy.', price: 115, category: 'vegetarian', isVegetarian: true },
    { id: 'paneer-korma', name: 'Paneer Korma', description: 'Indian cottage cheese cooked in rich cream and velvety cashew nut sauce.', price: 115, category: 'vegetarian', isVegetarian: true },
    { id: 'paneer-palak', name: 'Paneer Palak', description: 'Indian cottage cheese tastefully prepared with spinach and cream.', price: 100, category: 'vegetarian', isVegetarian: true },
    { id: 'paneer-matar', name: 'Paneer Matar', description: 'Indian cottage cheese tossed with green peas and cooked in tomato gravy.', price: 100, category: 'vegetarian', isVegetarian: true },
    { id: 'chana-masala', name: 'Chana Masala', description: 'Chick peas cooked with herbs and spices.', price: 80, category: 'vegetarian', isVegetarian: true },
    { id: 'bean-curry', name: 'Bean Curry', description: 'Sugar beans cooked in onion and tomato.', price: 80, category: 'vegetarian', isVegetarian: true },
    { id: 'dal-makhani', name: 'Dal Makhani', description: 'Black lentils cooked with red kidney beans in butter.', price: 90, category: 'vegetarian', isVegetarian: true },
    { id: 'dal-tadka', name: 'Dal Tadka', description: 'Mixed lentils fried with onions and tomatoes sauteed with whole red chillies.', price: 85, category: 'vegetarian', isVegetarian: true },
    { id: 'dal-fry', name: 'Dal Fry', description: 'Yellow lentils sauteed with onion and tomatoes.', price: 75, category: 'vegetarian', isVegetarian: true },

    // Various Rice & Biryani Dishes
    { id: 'lamb-biryani', name: 'Lamb Biryani', description: 'Lamb marinated with herbs & spices cooked gradually with basmati rice.', price: 155, category: 'rice-biryani', isVegetarian: false },
    { id: 'chicken-biryani', name: 'Chicken Biryani', description: 'Chicken marinated with herbs & spices cooked gradually with basmati rice.', price: 130, category: 'rice-biryani', isVegetarian: false },
    { id: 'fish-biryani', name: 'Fish Biryani', description: 'Deliciously flavoured fish cooked with basmati rice.', price: 160, category: 'rice-biryani', isVegetarian: false },
    { id: 'prawn-biryani', name: 'Prawn Biryani', description: 'Prawns simmered in herbs and spices and cooked with basmati rice.', price: 175, category: 'rice-biryani', isVegetarian: false },
    { id: 'vegetable-biryani', name: 'Vegetable Biryani', description: 'Mixed vegetable blended with herbs and spices, cooked with basmati rice.', price: 100, category: 'rice-biryani', isVegetarian: true },
    { id: 'plain-rice', name: 'Plain Rice', description: 'Steamed basmati rice.', price: 25, category: 'rice-biryani', isVegetarian: true },
    { id: 'jeera-rice', name: 'Jeera Rice', description: 'Basmati rice cooked with cumin seeds.', price: 30, category: 'rice-biryani', isVegetarian: true },

    // Indian Breads
    { id: 'tandoori-roti', name: 'Tandoori Roti / Tava Roti', description: 'Whole wheat bread thinly rolled and baked in a tandoor/tava.', price: 19, category: 'breads', isVegetarian: true },
    { id: 'roomali-roti', name: 'Roomali Roti', description: 'Thin soft bread made in an Indian style.', price: 21, category: 'breads', isVegetarian: true },
    { id: 'plain-naan', name: 'Plain Naan', description: 'Flat white bread baked in tandoor.', price: 21, category: 'breads', isVegetarian: true },
    { id: 'cocktail-naan', name: 'Cocktail Naan', description: 'Small whole wheat bread baked in tandoor.', price: 12, category: 'breads', isVegetarian: true },
    { id: 'butter-naan', name: 'Butter Naan', description: 'Buttered white bread baked in tandoor.', price: 22, category: 'breads', isVegetarian: true },
    { id: 'garlic-naan', name: 'Garlic Naan', description: 'Garlic white bread baked in tandoor.', price: 26, category: 'breads', isVegetarian: true },
    { id: 'garlic-chilli-naan', name: 'Garlic And Chilli Naan', description: 'Garlic white bread baked in tandoor topped with chilli.', price: 28, category: 'breads', isVegetarian: true },
    { id: 'garlic-cheese-naan', name: 'Garlic and Cheese Naan', description: 'Garlic and cheese white bread baked in tandoor.', price: 38, category: 'breads', isVegetarian: true },
    { id: 'peshwari-naan', name: 'Peshwari Naan', description: 'White bread stuffed with coconut, raisins and almond.', price: 38, category: 'breads', isVegetarian: true },
    { id: 'rogani-naan', name: 'Rogani Naan', description: 'White bread topped with sesame and black cumin brushed with Rogan.', price: 34, category: 'breads', isVegetarian: true },
    { id: 'keema-naan', name: 'Keema Naan (Mince)', description: 'White bread stuffed with lamb mince baked in tandoor.', price: 55, category: 'breads', isVegetarian: false },
    { id: 'aloo-parantha', name: 'Aloo Parantha/Kulcha', description: 'Indian bread stuffed with potato and spices.', price: 40, category: 'breads', isVegetarian: true },
    { id: 'gobi-parantha', name: 'Gobi Parantha/Kulcha', description: 'Indian bread stuffed with cauliflower and spices.', price: 45, category: 'breads', isVegetarian: true },
    { id: 'paneer-parantha', name: 'Paneer Parantha/Kulcha', description: 'Indian bread stuffed with Indian cottage cheese.', price: 50, category: 'breads', isVegetarian: true },
    { id: 'egg-parantha', name: 'Egg Parantha/Kulcha', description: 'Indian bread stuffed with egg and spices.', price: 55, category: 'breads', isVegetarian: false },
    { id: 'laccha-parantha', name: 'Laccha Parantha/Kerala Parantha', description: 'Indian pastry rolled and cooked in tandoor.', price: 28, category: 'breads', isVegetarian: true },

    // Bunny Chows & Roti Rolls
    { id: 'bunny-mixed-veg', name: 'Mixed Vegetable Bunny Chow', description: 'Mixed vegetable curry served in a hollowed bread loaf.', price: 80, category: 'bunny-chows', isVegetarian: true },
    { id: 'bunny-beans', name: 'Beans Bunny Chow', description: 'Bean curry served in a hollowed bread loaf.', price: 80, category: 'bunny-chows', isVegetarian: true },
    { id: 'bunny-paneer', name: 'Paneer Bunny Chow', description: 'Paneer curry served in a hollowed bread loaf.', price: 90, category: 'bunny-chows', isVegetarian: true },
    { id: 'bunny-chicken', name: 'Chicken Bunny Chow', description: 'Chicken curry served in a hollowed bread loaf.', price: 90, category: 'bunny-chows', isVegetarian: false },
    { id: 'bunny-lamb', name: 'Lamb Bunny Chow', description: 'Lamb curry served in a hollowed bread loaf.', price: 120, category: 'bunny-chows', isVegetarian: false },

    // Indo Chinese - Starters
    { id: 'honey-chilli-potato', name: 'Honey Chilli Potato', description: 'Crispy potatoes tossed in honey chilli sauce.', price: 80, category: 'indo-chinese', isVegetarian: true },
    { id: 'chilli-paneer-dry', name: 'Chilli Paneer Dry', description: 'Paneer cubes stir-fried with peppers in spicy sauce.', price: 80, category: 'indo-chinese', isVegetarian: true },
    { id: 'chilli-mushroom-dry', name: 'Chilli Mushroom Dry', description: 'Mushrooms stir-fried in spicy chilli sauce.', price: 80, category: 'indo-chinese', isVegetarian: true },
    { id: 'veg-manchurian-dry', name: 'Vegetable Manchurian Dry', description: 'Mixed vegetable balls in Manchurian sauce.', price: 80, category: 'indo-chinese', isVegetarian: true },
    { id: 'gobi-manchurian-dry', name: 'Gobi Manchurian Dry', description: 'Cauliflower florets in spicy Manchurian sauce.', price: 80, category: 'indo-chinese', isVegetarian: true },
    { id: 'chilli-chicken-dry', name: 'Chilli Chicken Dry', description: 'Chicken pieces stir-fried in spicy chilli sauce.', price: 100, category: 'indo-chinese', isVegetarian: false },
    { id: 'chilli-prawns-dry', name: 'Chilli Prawns Dry', description: 'Prawns stir-fried in spicy chilli sauce.', price: 165, category: 'indo-chinese', isVegetarian: false },
    { id: 'honey-chilli-chicken', name: 'Honey Chilli Chicken', description: 'Chicken pieces in sweet and spicy honey chilli sauce.', price: 110, category: 'indo-chinese', isVegetarian: false },
    { id: 'chicken-manchurian-dry', name: 'Chicken Manchurian Dry', description: 'Chicken balls in spicy Manchurian sauce.', price: 90, category: 'indo-chinese', isVegetarian: false },

    // Indo Chinese - Noodles/Rice
    { id: 'veg-noodles', name: 'Vegetable Noodles/Fried Rice', description: 'Noodles/Rice prepared with veggies, soya sauce and vinegar.', price: 80, category: 'indo-chinese', isVegetarian: true },
    { id: 'veg-schezwan-noodles', name: 'Vegetables Schezwan Noodles/Fried Rice', description: 'Noodles prepared with veggies, soya sauce, vinegar and Schezwan sauce.', price: 90, category: 'indo-chinese', isVegetarian: true },
    { id: 'egg-noodles', name: 'Egg Noodles/Fried Rice', description: 'Noodles prepared with egg, soya sauce and vinegar.', price: 85, category: 'indo-chinese', isVegetarian: false },
    { id: 'chicken-noodles', name: 'Chicken Noodles/Fried Rice', description: 'Noodles prepared with chicken, soya sauce and vinegar.', price: 95, category: 'indo-chinese', isVegetarian: false },
    { id: 'chicken-schezwan-noodles', name: 'Chicken Schezwan Noodles/Fried Rice', description: 'Noodles prepared with chicken, soya sauce, vinegar, and Schezwan sauce.', price: 100, category: 'indo-chinese', isVegetarian: false },

    // Indo Chinese - Gravy
    { id: 'veg-manchurian-gravy', name: 'Vegetable Manchurian Gravy', description: 'Mixed vegetables mixed in corn flour prepared with soya sauce, chilli sauce, ginger and garlic.', price: 90, category: 'indo-chinese', isVegetarian: true },
    { id: 'gobi-manchurian-gravy', name: 'Gobi Manchurian Gravy', description: 'Cauliflower mixed in corn flour prepared with soya sauce, chilli sauce, ginger and garlic.', price: 95, category: 'indo-chinese', isVegetarian: true },
    { id: 'chicken-manchurian-gravy', name: 'Chicken Manchurian Gravy', description: 'Crispy chicken served in a tangy brown sauce.', price: 100, category: 'indo-chinese', isVegetarian: false },
    { id: 'chilli-chicken-gravy', name: 'Chilli Chicken Gravy', description: 'Chicken prepared with soya sauce, chilli sauce, ginger and garlic.', price: 110, category: 'indo-chinese', isVegetarian: false },
    { id: 'paneer-chilli-gravy', name: 'Paneer Chilli Gravy', description: 'Paneer mixed in corn flour and prepared with soya sauce, chilli sauce, ginger and garlic.', price: 95, category: 'indo-chinese', isVegetarian: true },
    { id: 'chilli-mushroom-gravy', name: 'Chilli Mushroom Gravy', description: 'Mushrooms prepared in a sweet chilli-based sauce.', price: 95, category: 'indo-chinese', isVegetarian: true },
    { id: 'chilli-prawn-gravy', name: 'Chilli Prawn Gravy', description: 'Sizzling combination of sauteed prawns, sauces and spring onions.', price: 175, category: 'indo-chinese', isVegetarian: false },
    { id: 'honey-chilli-potatoes-gravy', name: 'Honey Chilli Potatoes Gravy', description: 'Fried potatoes cooked with spring onions and bell peppers, tossed in honey chilli sauce.', price: 95, category: 'indo-chinese', isVegetarian: true },

    // Side Dishes
    { id: 'papadam', name: 'Papadam', description: 'Crispy lentil wafer.', price: 8, category: 'sides', isVegetarian: true },
    { id: 'masala-papadam', name: 'Masala Papadam', description: 'Spiced crispy lentil wafer.', price: 12, category: 'sides', isVegetarian: true },
    { id: 'tomato-onion-chilli-salad', name: 'Tomato Onion Chilli Salad', description: 'Fresh salad with tomatoes, onions and green chillies.', price: 30, category: 'sides', isVegetarian: true },
    { id: 'green-salad', name: 'Green Salad', description: 'Fresh mixed green salad.', price: 45, category: 'sides', isVegetarian: true },
    { id: 'cucumber-raita', name: 'Cucumber Raita', description: 'Yogurt with cucumber and spices.', price: 45, category: 'sides', isVegetarian: true },
    { id: 'potato-raita', name: 'Potato Raita', description: 'Yogurt with boiled potatoes and spices.', price: 30, category: 'sides', isVegetarian: true },
    { id: 'tomato-onion-chilli-raita', name: 'Tomato Onion Chilli Raita', description: 'Yogurt with tomatoes, onions and green chillies.', price: 40, category: 'sides', isVegetarian: true },
    { id: 'boondi-raita', name: 'Boondi Raita', description: 'Yogurt with crispy gram flour pearls.', price: 40, category: 'sides', isVegetarian: true },
    { id: 'mint-raita', name: 'Mint Raita', description: 'Yogurt with fresh mint leaves.', price: 40, category: 'sides', isVegetarian: true },
    { id: 'chutney-pickle', name: 'Chutney And Pickle', description: 'Traditional Indian condiments.', price: 15, category: 'sides', isVegetarian: true },
    { id: 'soya-sauce-vinegar', name: 'Soya Sauce/Vinegar With Chilli', description: 'Condiments for Indo-Chinese dishes.', price: 15, category: 'sides', isVegetarian: true },
    { id: 'mint-sauce', name: 'Mint Sauce', description: 'Fresh mint chutney.', price: 15, category: 'sides', isVegetarian: true },
    { id: 'schezwan-sauce', name: 'Schezwan Sauce', description: 'Spicy Chinese-style sauce.', price: 20, category: 'sides', isVegetarian: true },

    // Desserts & Hot Beverages
    { id: 'sooji-halwa', name: 'Sooji Halwa', description: 'Semolina pudding with nuts and raisins.', price: 35, category: 'desserts', isVegetarian: true },
    { id: 'gajjar-halwa', name: 'Gajjar Halwa', description: 'Carrot pudding with milk and nuts.', price: 40, category: 'desserts', isVegetarian: true },
    { id: 'moong-dal-halwa', name: 'Moong Dal Halwa', description: 'Yellow lentil pudding with ghee and nuts.', price: 60, category: 'desserts', isVegetarian: true },
    { id: 'gulab-jamun', name: 'Gulab Jamun/Rasgulla 2PCS', description: 'Traditional Indian sweet dumplings in sugar syrup.', price: 36, category: 'desserts', isVegetarian: true },
    { id: 'vermicilli', name: 'Vermicilli', description: 'Sweet vermicelli pudding with milk.', price: 45, category: 'desserts', isVegetarian: true },
    { id: 'kheer', name: 'Kheer', description: 'Traditional Indian rice pudding.', price: 45, category: 'desserts', isVegetarian: true },
    { id: 'shahi-tukda', name: 'Shahi Tukda', description: 'Bread pudding with rabdi and nuts.', price: 45, category: 'desserts', isVegetarian: true },
    { id: 'vanilla-ice-cream', name: 'Vanilla Ice Cream', description: 'Classic vanilla flavored ice cream.', price: 35, category: 'desserts', isVegetarian: true },
    { id: 'strawberry-ice-cream', name: 'Strawberry Ice Cream', description: 'Fresh strawberry flavored ice cream.', price: 35, category: 'desserts', isVegetarian: true },
    { id: 'chocolate-ice-cream', name: 'Chocolate Ice Cream', description: 'Rich chocolate flavored ice cream.', price: 35, category: 'desserts', isVegetarian: true },
    { id: 'malai-rabdi', name: 'Malai Rabdi', description: 'Thick sweetened milk dessert.', price: 45, category: 'desserts', isVegetarian: true },
    { id: 'hot-chocolate', name: 'Hot Chocolate', description: 'Rich hot chocolate drink.', price: 40, category: 'desserts', isVegetarian: true },
    { id: 'five-roses-tea', name: 'Five Roses Tea', description: 'Classic black tea.', price: 22, category: 'desserts', isVegetarian: true },
    { id: 'rooibos-tea', name: 'Rooibos Tea', description: 'South African red bush tea.', price: 26, category: 'desserts', isVegetarian: true },
    { id: 'green-tea', name: 'Green Tea', description: 'Healthy green tea.', price: 26, category: 'desserts', isVegetarian: true },
    { id: 'masala-tea', name: 'Masala Tea', description: 'Spiced Indian tea.', price: 26, category: 'desserts', isVegetarian: true },
    { id: 'irish-tea', name: 'Irish Tea', description: 'Premium Irish blend tea.', price: 54, category: 'desserts', isVegetarian: true },
    { id: 'kahlua-coffee', name: 'Kahlua Coffee', description: 'Coffee with Kahlua liqueur.', price: 45, category: 'desserts', isVegetarian: true },
    { id: 'espresso', name: 'Espresso', description: 'Strong Italian coffee.', price: 24, category: 'desserts', isVegetarian: true },
    { id: 'double-espresso', name: 'Double Espresso', description: 'Double shot of espresso.', price: 40, category: 'desserts', isVegetarian: true },
    { id: 'cappuccino', name: 'Cappuccino', description: 'Italian coffee with steamed milk.', price: 34, category: 'desserts', isVegetarian: true },
    { id: 'caffe-latte', name: 'Caffe Latte', description: 'Coffee with steamed milk and foam.', price: 36, category: 'desserts', isVegetarian: true },
    { id: 'ginger-cardamom-tea', name: 'Ginger & Cardamom Tea', description: 'Aromatic tea with ginger and cardamom.', price: 22, category: 'desserts', isVegetarian: true },
    { id: 'black-coffee', name: 'Black Coffee', description: 'Pure black coffee.', price: 22, category: 'desserts', isVegetarian: true },
  ];

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  const handleQuantityChange = (itemId: string, change: number) => {
    setSelectedItems(prev => {
      const current = prev[itemId] || { quantity: 0, spiceLevel: 'Medium' };
      const newQuantity = Math.max(0, current.quantity + change);
      
      if (newQuantity === 0) {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [itemId]: { ...current, quantity: newQuantity }
      };
    });
  };

  const handleSpiceLevelChange = (itemId: string, spiceLevel: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: { 
        ...prev[itemId] || { quantity: 1 }, 
        spiceLevel 
      }
    }));
  };

  const removeItem = (itemId: string) => {
    setSelectedItems(prev => {
      const { [itemId]: removed, ...rest } = prev;
      return rest;
    });
  };

  const getTotalItems = () => {
    return Object.values(selectedItems).reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(selectedItems).reduce((sum, [itemId, selection]) => {
      const item = menuItems.find(i => i.id === itemId);
      return sum + (item ? item.price * selection.quantity : 0);
    }, 0);
  };

  const handleCustomerDetailsChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateWhatsAppMessage = () => {
    const orderItems = Object.entries(selectedItems).map(([itemId, selection]) => {
      const item = menuItems.find(i => i.id === itemId);
      if (!item) return '';
      return `• ${item.name} x${selection.quantity} (${selection.spiceLevel}) - R${item.price * selection.quantity}`;
    }).filter(Boolean).join('\n');

    const message = `🍽️ *Order from Bawas Food Infinite*

👤 *Customer Details:*
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Order Type: ${customerDetails.orderType === 'delivery' ? '🚚 Delivery' : '🏪 Takeaway'}
${customerDetails.orderType === 'Delivery (Delivery charges extra)' ? `Address: ${customerDetails.address}` : ''}
${customerDetails.notes ? `Notes: ${customerDetails.notes}` : ''}

📋 *Order Details:*
${orderItems}

💰 *Total Amount: R${getTotalPrice()}*

Thank you for choosing Bawas Food Infinite! 🙏`;

    return encodeURIComponent(message);
  };

  const handleOrderNow = () => {
    const whatsappMessage = generateWhatsAppMessage();
    const phoneNumber = '27678800167'; // Restaurant's WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const isOrderValid = () => {
    return customerDetails.name.trim() !== '' && 
           customerDetails.phone.trim() !== '' && 
           (customerDetails.orderType === 'takeaway' || customerDetails.address.trim() !== '') &&
           getTotalItems() > 0;
  };

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Menu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated selection of authentic dishes, each prepared with traditional recipes and the finest ingredients
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-8"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
              }`}
            >
              <category.icon size={16} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid gap-6 mb-12">
          {filteredItems.map((item) => {
            const selection = selectedItems[item.id];
            const isSelected = selection && selection.quantity > 0;
            
            return (
              <div 
                key={item.id}
                className={`bg-white rounded-xl shadow-lg border transition-all duration-300 ${
                  isSelected ? 'border-green-500 shadow-xl' : 'border-gray-200 hover:shadow-xl'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                        <div className={`p-1 rounded-full ${item.isVegetarian ? 'bg-green-100' : 'bg-red-100'}`}>
                          {item.isVegetarian ? (
                            <Leaf className="text-green-600" size={16} />
                          ) : (
                            <Drumstick className="text-red-600" size={16} />
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <span className="text-2xl font-bold text-green-600">R{item.price}</span>
                    </div>
                  </div>

                  {/* Selection Controls */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-700">Quantity:</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                          disabled={!selection || selection.quantity === 0}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {selection?.quantity || 0}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Spice Level Dropdown */}
                    {isSelected && (
                      <>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-700">Spice Level:</span>
                          <select
                            value={selection.spiceLevel}
                            onChange={(e) => handleSpiceLevelChange(item.id, e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          >
                            {spiceLevels.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center space-x-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors text-sm"
                        >
                          <X size={14} />
                          <span>Remove</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        {getTotalItems() > 0 && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white rounded-xl shadow-2xl p-4 min-w-64 max-w-sm z-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <ShoppingCart size={20} />
                <span className="font-semibold">Cart Summary</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-white text-green-600 px-2 py-1 rounded-full text-sm font-bold">
                  {getTotalItems()}
                </span>
                <button
                  onClick={() => setSelectedItems({})}
                  className="text-white hover:text-red-200 transition-colors"
                  title="Clear cart"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {Object.entries(selectedItems).map(([itemId, selection]) => {
                const item = menuItems.find(i => i.id === itemId);
                if (!item) return null;
                
                return (
                  <div key={itemId} className="flex justify-between items-center text-sm">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-green-200 text-xs">
                        {selection.quantity}x • {selection.spiceLevel}
                      </div>
                    </div>
                    <span className="font-medium">R{item.price * selection.quantity}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-green-500 pt-3 flex justify-between items-center">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-xl">R{getTotalPrice()}</span>
            </div>
            <button 
              onClick={() => setShowOrderPopup(true)}
              className="w-full mt-3 bg-white text-green-600 font-semibold py-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              Proceed to Order
            </button>
          </div>
        )}

        {/* Order Popup */}
        {showOrderPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold">Complete Your Order</h3>
                <button
                  onClick={() => setShowOrderPopup(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col lg:flex-row max-h-[calc(90vh-120px)]">
                {/* Left Side - Order Details */}
                <div className="lg:w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h4>
                  <div className="space-y-4">
                    {Object.entries(selectedItems).map(([itemId, selection]) => {
                      const item = menuItems.find(i => i.id === itemId);
                      if (!item) return null;
                      
                      return (
                        <div key={itemId} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h5 className="font-semibold text-gray-900">{item.name}</h5>
                              <div className={`p-1 rounded-full ${item.isVegetarian ? 'bg-green-100' : 'bg-red-100'}`}>
                                {item.isVegetarian ? (
                                  <Leaf className="text-green-600" size={12} />
                                ) : (
                                  <Drumstick className="text-red-600" size={12} />
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                            <div className="text-sm text-gray-700">
                              <span>Quantity: {selection.quantity}</span>
                              <span className="ml-4">Spice: {selection.spiceLevel}</span>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="font-bold text-green-600">R{item.price * selection.quantity}</div>
                            <div className="text-sm text-gray-500">R{item.price} each</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total Amount:</span>
                      <span className="text-green-600">R{getTotalPrice()}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 italic">(excluding delivery charges)</p>
                  </div>
                </div>

                {/* Right Side - Customer Details */}
                <div className="lg:w-1/2 p-6 overflow-y-auto">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Customer Details</h4>
                  
                  {/* Order Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Order Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleCustomerDetailsChange('orderType', 'takeaway')}
                        className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-all ${
                          customerDetails.orderType === 'takeaway'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 hover:border-green-300'
                        }`}
                      >
                        <Store size={20} />
                        <span className="font-medium">Takeaway</span>
                      </button>
                      <button
                        onClick={() => handleCustomerDetailsChange('orderType', 'delivery')}
                        className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-all ${
                          customerDetails.orderType === 'delivery'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 hover:border-green-300'
                        }`}
                      >
                        <Truck size={20} />
                        <span className="font-medium">Delivery</span>
                      </button>
                    </div>
                  </div>

                  {/* Customer Information Form */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                        <User size={16} className="inline mr-1" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="customerName"
                        value={customerDetails.name}
                        onChange={(e) => handleCustomerDetailsChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone size={16} className="inline mr-1" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="customerPhone"
                        value={customerDetails.phone}
                        onChange={(e) => handleCustomerDetailsChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    {customerDetails.orderType === 'delivery' && (
                      <div>
                        <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPinIcon size={16} className="inline mr-1" />
                          Delivery Address *
                        </label>
                        <textarea
                          id="customerAddress"
                          value={customerDetails.address}
                          onChange={(e) => handleCustomerDetailsChange('address', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                          placeholder="Enter your complete delivery address"
                          required
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="customerNotes" className="block text-sm font-medium text-gray-700 mb-2">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        id="customerNotes"
                        value={customerDetails.notes}
                        onChange={(e) => handleCustomerDetailsChange('notes', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        placeholder="Any special requests or dietary requirements..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="border-t border-gray-200 p-6 flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white">
                <button
                  onClick={() => setShowOrderPopup(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleOrderNow}
                  disabled={!isOrderValid()}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                    isOrderValid()
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <MessageCircle size={20} />
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Order?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact us for takeaway orders, delivery, or table reservations. We're here to serve you the best authentic Indian cuisine.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;