import { FaTruck, FaShippingFast, FaMapMarkedAlt, FaBoxOpen, FaRegClock, FaHeadset } from "react-icons/fa";

const services = [
  {
    icon: <FaTruck className="text-4xl text-primary" />,
    title: "Fast Delivery",
    description: "Quick and efficient delivery across the country, no delays — just speed and precision.",
  },
  {
    icon: <FaShippingFast className="text-4xl text-green-600" />,
    title: "Same-Day Shipping",
    description: "Urgent delivery? We offer same-day shipping services for selected locations.",
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-orange-500" />,
    title: "Real-Time Tracking",
    description: "Track your parcel in real-time from dispatch to doorstep. Total transparency.",
  },
  {
    icon: <FaBoxOpen className="text-4xl text-purple-600" />,
    title: "Safe Packaging",
    description: "Your package stays safe with our secure and durable packaging solutions.",
  },
  {
    icon: <FaRegClock className="text-4xl text-pink-600" />,
    title: "On-Time Delivery",
    description: "Timely delivery is our promise — every package, every time.",
  },
  {
    icon: <FaHeadset className="text-4xl text-red-600" />,
    title: "24/7 Support",
    description: "Need help? Our support team is available around the clock for your convenience.",
  },
];

const OurServices = () => {
  return (
    <section className="py-16 px-4 bg-gray-50 text-center">

      <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-blue-500 mb-2">{service.title}</h3>
            <p className="text-gray-500">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
