import React from 'react';
import { Heart, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://i.ibb.co/TxYbvcNw/img6.jpg" 
                alt="Bawas Food Infinite" 
                className="h-16 w-auto object-contain rounded-lg"
              />
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Experience the authentic flavors of India with our carefully crafted dishes, 
              prepared using traditional recipes and the finest spices. Every meal is a 
              celebration of our rich culinary heritage.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-green-400">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
                  Catering Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
                  Private Events
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-green-400">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-green-400 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-300">The Stables Village Centre, Chartwell</p>
                  <p className="text-gray-300">Shop No. C3 - C6, 212 3rd Street</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-green-400 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-300">+27 067 880 0167</p>
                  <p className="text-gray-300">+27 067 801 5223</p>
                  <p className="text-gray-300">+27 011 465 2848</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="text-green-400 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-300">Customer Care:</p>
                  <p className="text-gray-300">+27 081 438 1154</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-green-400 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-300">bawasfoodinfinite@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="text-green-400 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-300">Tue - Sun</p>
                  <p className="text-gray-300">09:00 AM - 09:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-green-400">Stay Updated</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for special offers, new menu items, and exclusive events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Bawas Food Infinite. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-gray-400 text-sm mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="text-red-500" size={16} fill="currentColor" />
              <span>for food lovers everywhere</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;