import React from 'react';

// Array of services
const servicesData = [
  {
    title: 'Preorder Cars',
    description: 'Reserve upcoming car models and be among the first to own the latest vehicles.',
    link: '/pre-order',
    buttonText: 'Learn More',
    icon: '🚗' // Add relevant icons if needed
  },
  {
    title: 'Trade Your Car',
    description: 'Trade in your old car for a new model. Get a free estimate today.',
    link: '/trade',
    buttonText: 'Get Started',
    icon: '🔄'
  },
  {
    title: 'Car Servicing',
    description: 'Exclusive car servicing for registered clients. Book your appointment today.',
    link: '/servicing',
    buttonText: 'Book Service',
    icon: '🛠️'
  }
];

const Services = () => {
  return (
    <section className="py-16 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-600 dark:text-white">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Discover our range of services to enhance your car experience.
          </p>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-blue-50 dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105"
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{service.icon}</span>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {service.description}
              </p>
              <a
                href={service.link}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {service.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
