import React from "react";
import { FaBolt, FaChartLine, FaTag, FaLock } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      title: "Fast & Reliable",
      description: "Generate short links instantly and reliably without delays.",
      icon: <FaBolt className="text-indigo-600 w-6 h-6" />,
    },
    {
      title: "Track Analytics",
      description: "Monitor clicks, sources, and locations of your shortened URLs.",
      icon: <FaChartLine className="text-indigo-600 w-6 h-6" />,
    },
    {
      title: "Custom Aliases",
      description: "Create memorable and personalized short links easily.",
      icon: <FaTag className="text-indigo-600 w-6 h-6" />,
    },
    {
      title: "Secure Links",
      description: "All URLs are safe, protected, and handled securely.",
      icon: <FaLock className="text-indigo-600 w-6 h-6" />,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-600 mb-6 text-center">
          Features of Shortly
        </h1>
        <p className="text-slate-700 text-center mb-12 text-lg">
          Explore the key functionalities that make Shortly a powerful URL shortening tool:
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex gap-4 items-start"
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
