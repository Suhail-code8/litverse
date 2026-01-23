import React from 'react';
import { Truck, Shield, Headphones, RefreshCcw } from 'lucide-react';

const features = [
    {
        icon: Truck,
        title: "Free Shipping",
        description: "On all orders over $50",
        color: "bg-blue-50 text-blue-600"
    },
    {
        icon: Shield,
        title: "Secure Payment",
        description: "100% secure payment",
        color: "bg-green-50 text-green-600"
    },
    {
        icon: RefreshCcw,
        title: "Easy Returns",
        description: "30 day money back guarantee",
        color: "bg-purple-50 text-purple-600"
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description: "Dedicated support team",
        color: "bg-orange-50 text-orange-600"
    }
];

export default function FeaturesSection() {
    return (
        <section className="py-12 bg-gray-50 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="flex items-center gap-4 group">
                                <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
