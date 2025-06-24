import React from 'react';
import { Link } from 'react-router-dom';
import DollarRackSection from '../components/home/DollarRackSection';
import { COLORS, FONTS } from '../config/constants';
import { Button } from '../components/ui';

/**
 * Hero section component
 */
const HeroSection = () => (
  <div className="text-center py-24">
    <h1 
      className="text-6xl md:text-8xl font-light mb-6"
      style={{ 
        fontFamily: FONTS.display,
        color: COLORS.charcoal,
        letterSpacing: '0.02em'
      }}
    >
      919
    </h1>
    <p 
      className="text-xl md:text-2xl font-light text-gray-600 mb-12 max-w-2xl mx-auto"
      style={{ 
        fontFamily: FONTS.primary,
        lineHeight: '1.6'
      }}
    >
      Curated second-hand apparel for the conscious consumer
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      <Button
        as={Link}
        to="/products"
        variant="primary"
        size="large"
        className="px-8 py-4"
      >
        Shop Collection
      </Button>
      <Button
        as={Link}
        to="/about"
        variant="outline"
        size="large"
        className="px-8 py-4"
      >
        Our Story
      </Button>
    </div>
  </div>
);

/**
 * Features section component
 */
const FeaturesSection = () => {
  const features = [
    {
      title: 'Curated Selection',
      description: 'Each piece is hand-picked for quality and style',
      icon: '✨'
    },
    {
      title: 'Sustainable Fashion',
      description: 'Giving pre-loved clothes a second chance',
      icon: '🌱'
    },
    {
      title: 'Affordable Luxury',
      description: 'Designer pieces at accessible prices',
      icon: '💎'
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 
          className="text-4xl font-light text-center mb-16"
          style={{ 
            fontFamily: FONTS.display,
            color: COLORS.charcoal
          }}
        >
          Why Choose 919?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 
                className="text-xl font-medium mb-4"
                style={{ 
                  fontFamily: FONTS.primary,
                  color: COLORS.charcoal
                }}
              >
                {feature.title}
              </h3>
              <p 
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: FONTS.primary }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Newsletter section component
 */
const NewsletterSection = () => (
  <div className="py-24">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
      <h2 
        className="text-4xl font-light mb-6"
        style={{ 
          fontFamily: FONTS.display,
          color: COLORS.charcoal
        }}
      >
        Stay in the Loop
      </h2>
      <p 
        className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
        style={{ fontFamily: FONTS.primary }}
      >
        Be the first to know about new arrivals and exclusive deals
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent"
          style={{ fontFamily: FONTS.primary }}
        />
        <Button
          variant="primary"
          size="medium"
          className="px-6 py-3"
        >
          Subscribe
        </Button>
      </div>
    </div>
  </div>
);

/**
 * Main Home page component
 */
const Home = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.cream }}>
      <div className="max-w-7xl mx-auto">
        <HeroSection />
      </div>
      
      <DollarRackSection />
      
      <FeaturesSection />
      
      <div className="max-w-7xl mx-auto">
        <NewsletterSection />
      </div>
    </div>
  );
};

export default Home; 