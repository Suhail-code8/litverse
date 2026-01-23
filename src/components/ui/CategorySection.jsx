import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Compass, Award, Coffee } from 'lucide-react';

const categories = [
  {
    id: 'fiction',
    name: 'Fiction',
    icon: BookOpen,
    description: 'Immerse yourself in imaginary worlds',
    color: 'bg-rose-50 text-rose-600',
    link: '/products?category=fiction'
  },
  {
    id: 'non-fiction',
    name: 'Non-Fiction',
    icon: Compass,
    description: 'Explore proper knowledge and facts',
    color: 'bg-blue-50 text-blue-600',
    link: '/products?category=non-fiction'
  },
  {
    id: 'bestsellers',
    name: 'Bestsellers',
    icon: Award,
    description: 'Most popular books this month',
    color: 'bg-amber-50 text-amber-600',
    link: '/products?category=bestsellers'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    icon: Coffee,
    description: 'Living your best life everyday',
    color: 'bg-emerald-50 text-emerald-600',
    link: '/products?category=lifestyle'
  }
];

export default function CategorySection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your next favorite read from our wide range of collections
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={category.link}
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {category.description}
                </p>

                <div className="flex items-center text-sm font-semibold text-gray-400 group-hover:text-blue-600 transition-colors">
                  Explore Category
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
