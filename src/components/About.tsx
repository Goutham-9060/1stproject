import React from 'react';
import { Heart, Award, Users, Clock, Eye, MapPin, Calendar } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: "Homemade Warmth",
      description: "Every dish is prepared with the same love and care as homemade meals, bringing comfort to every bite."
    },
    {
      icon: Eye,
      title: "Open Kitchen Experience",
      description: "Watch the magical preparation of our dishes through our open kitchen concept - transparency in every step."
    },
    {
      icon: Award,
      title: "Authentic Masalas",
      description: "We use traditional aromatic masalas and time-honored recipes passed down through generations."
    },
    {
      icon: Users,
      title: "Family-Oriented Service",
      description: "Every guest is treated like family with personalized service and attention to detail."
    }
  ];

  const highlights = [
    {
      icon: Calendar,
      number: "5+",
      label: "Years of Excellence",
      description: "Since February 2020"
    },
    {
      icon: MapPin,
      number: "1",
      label: "Exclusive Location",
      description: "Heart of Chartwell"
    },
    {
      icon: Heart,
      number: "100%",
      label: "Authentic Flavors",
      description: "Traditional Recipes"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Bawas Food Infinite</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8"></div>
        </div>

        {/* Main Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Our Journey: From Humble Beginnings to Culinary Excellence
            </h3>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                <span className="font-semibold text-green-600">Bawas Food Infinite</span>, formerly known as 
                <span className="italic"> Taste Punjabi Fourways</span>, was established in <span className="font-semibold">February 2020</span>, 
                just before the onset of the first COVID-19 lockdown. What began as a humble effort to introduce 
                authentic home-cooked meals has grown and evolved over the past five years into a celebrated culinary destination.
              </p>
              <p>
                Our core philosophy has always been rooted in the <span className="font-semibold text-green-600">warmth and comfort of homemade food</span>, 
                and we have continued to build on that foundation with passion and dedication. At our current location, 
                we proudly feature an <span className="font-semibold">open kitchen</span>, allowing guests to witness the magical 
                preparation of our dishes — a beautiful fusion of aromatic Masalas, heartfelt Love, and heartfelt Blessings.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Traditional Indian cooking"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-xl border border-green-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">★★★★★</div>
                <div className="text-sm text-gray-600 mt-1">Since 2020</div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 border border-green-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Bawas Food Infinite Experience</h3>
          </div>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              Bawas Food Infinite offers a <span className="font-semibold text-green-600">unique experience</span> that brings the 
              vibrant flavors and spirit of Indian street food to the heart of Johannesburg. From mouthwatering street bites 
              to flavorful <span className="font-semibold">Indo-Chinese and Indo-Italian creations</span>, our menu is designed 
              to transport you back to the bustling streets of India.
            </p>
            <p>
              Staying true to our values of <span className="font-semibold text-green-600">personalization and family-oriented service</span>, 
              Bawas Food Infinite operates a <span className="font-semibold">single exclusive branch</span>, located in the heart of 
              <span className="font-semibold"> Chartwell, Johannesburg</span> — where every dish tells a story and every guest is treated like family.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <div 
              key={index}
              className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <highlight.icon className="text-white" size={28} />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">{highlight.number}</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{highlight.label}</div>
              <div className="text-sm text-gray-600">{highlight.description}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-white" size={24} />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;