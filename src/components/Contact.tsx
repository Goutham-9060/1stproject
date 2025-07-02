import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Star, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
    alert('Thank you for your message! We will get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: [
        "The Stables Village Centre, Chartwell",
        "Shop No. C3 - C6, 212 3rd Street"
      ],
      color: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+27 67 880 0167",
        "+27 67 801 5223", 
        "+27 11 465 2848"
      ],
      color: "text-green-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "bawasfoodinfinite@gmail.com"
      ],
      color: "text-purple-600"
    },
    {
      icon: MessageCircle,
      title: "Customer Care",
      details: [
        "+27 81 438 1154"
      ],
      color: "text-orange-600"
    },
    {
      icon: Clock,
      title: "Opening Hours",
      details: [
        "Tue - Sun: 09:00 AM - 09:00 PM",
        "Kitchen closes at 09:00 PM"
      ],
      color: "text-green-600"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <p className="text-gray-600 text-lg mb-8">
                Ready to experience authentic Indian flavors? Reach out to us for reservations, 
                takeaway orders, catering services, or any questions about our delicious offerings.
              </p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className={`${info.color} mb-4`}>
                    <info.icon size={32} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h4>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">What Our Customers Say</h4>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-green-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">- Priya S.</span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    "Absolutely authentic flavors! The butter chicken reminds me of my grandmother's cooking."
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-green-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">- Rajesh M.</span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    "Best biryani in the city! The spices are perfectly balanced and the service is excellent."
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-green-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">- Sarah K.</span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    "Love the open kitchen concept! You can see the love and care that goes into every dish."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your inquiry, special requests, or feedback..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                For immediate assistance, call us at{' '}
                <a href="tel:+27678800167" className="text-green-600 hover:text-green-700 font-medium">
                  +27 067 880 0167
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
              <h3 className="text-2xl font-bold text-white text-center">Find Us Here</h3>
            </div>
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="text-gray-400 mx-auto mb-2" size={48} />
                <p className="text-gray-600">Interactive map would be integrated here</p>
                <p className="text-sm text-gray-500 mt-1">The Stables Village Centre, Chartwell</p>
                <p className="text-sm text-gray-500">Shop No. C3 - C6, 212 3rd Street</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;