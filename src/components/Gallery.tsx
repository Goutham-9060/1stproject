import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: "/WhatsApp Image 2025-07-02 at 10.38.03_939565ff.jpg",
      alt: "BAWAS Restaurant Signage - Elegant display of our brand identity",
      title: "Our Brand Identity",
      description: "Beautiful signage showcasing the BAWAS name with traditional design elements"
    },
    {
      src: "/WhatsApp Image 2025-07-02 at 10.38.04_924f2a38.jpg",
      alt: "Main Dining Area - Colorful and welcoming atmosphere with international flags",
      title: "Main Dining Area",
      description: "Vibrant dining space decorated with international flags, creating a warm and inclusive atmosphere"
    },
    {
      src: "/WhatsApp Image 2025-07-02 at 10.38.05_14006281.jpg",
      alt: "Private Dining Section - Intimate seating with chess board for entertainment",
      title: "Private Dining & Entertainment",
      description: "Cozy private dining area featuring entertainment options including chess for a complete dining experience"
    },
    {
      src: "/WhatsApp Image 2025-07-02 at 10.38.03_7d03e7c0.jpg",
      alt: "Catering Setup - Professional buffet service with chafing dishes",
      title: "Catering Services",
      description: "Professional catering setup showcasing our ability to serve large groups with style and elegance"
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateImage('prev');
    if (e.key === 'ArrowRight') navigateImage('next');
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Step inside Bawas Food Infinite and experience the warm, authentic atmosphere where 
            every corner tells a story of culinary passion and cultural heritage.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto"></div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-100"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    <p className="text-sm text-gray-200 leading-relaxed">{image.description}</p>
                  </div>
                </div>

                {/* View Button */}
                <button
                  onClick={() => openLightbox(index)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100"
                  aria-label="View full image"
                >
                  <Camera size={20} />
                </button>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{image.title}</h3>
                <p className="text-gray-600 leading-relaxed">{image.description}</p>
                <button
                  onClick={() => openLightbox(index)}
                  className="mt-4 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors duration-300"
                >
                  View Full Image →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Experience It Yourself</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            These images capture just a glimpse of the warm, authentic atmosphere at Bawas Food Infinite. 
            Come visit us to experience the full magic of our restaurant, from the aromatic spices to the welcoming ambiance.
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Visit Us Today
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors duration-300 z-10"
            aria-label="Close gallery"
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={48} />
          </button>

          {/* Image Container */}
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img 
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-xl font-bold mb-2">
                {galleryImages[selectedImage].title}
              </h3>
              <p className="text-gray-200 text-sm">
                {galleryImages[selectedImage].description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-300 text-sm">
                  {selectedImage + 1} of {galleryImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;