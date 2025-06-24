import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Sustainable Fashion",
      description: "Every purchase helps reduce fashion waste and supports circular economy.",
      icon: "🌱",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Unique Finds",
      description: "Discover one-of-a-kind pieces that tell their own story.",
      icon: "✨",
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Quality Guaranteed",
      description: "All items are carefully curated and quality-checked before listing.",
      icon: "🏆",
      color: "bg-blue-100 text-blue-800"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Thrift Store?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the sustainable fashion movement while discovering amazing pieces at great values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} mb-4 text-2xl`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/products')}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Start Browsing
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection; 