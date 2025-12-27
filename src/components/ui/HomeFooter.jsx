import React from 'react';
import { Truck, Shield, Headphones } from 'lucide-react';

function HomeFooter() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "30-day money back guarantee",
      color: "emerald"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Always here to help you",
      color: "purple"
    }
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconText: "text-blue-600",
      border: "border-blue-200"
    },
    emerald: {
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-600",
      border: "border-emerald-200"
    },
    purple: {
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconText: "text-purple-600",
      border: "border-purple-200"
    }
  };

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorClasses[feature.color];
            
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`${colors.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${colors.iconText}`} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomeFooter;