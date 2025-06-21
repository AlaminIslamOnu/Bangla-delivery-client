const features = [
    {
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: "https://images.ctfassets.net/v78wipeni189/10YFfxWJtcHZDPa58ZStjo/4df47591502357fcf612ec456c6d7932/image_5.png?fm=webp&w=1920&q=80&h=1870", // Replace with your image path
    },
    {
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: "https://static.vecteezy.com/system/resources/previews/019/796/973/non_2x/motorbike-delivery-man-logo-icon-symbol-template-free-vector.jpg", // Replace with your image path
    },
    {
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: "https://images.ctfassets.net/ukazlt65o6hl/1BalUtkZDLYoeLy0Atl6R1/515ced205ad4bb5186e2f8e47f6f3e72/call-center-skills-for-agent-success-banner.jpeg", // Replace with your image path
    },
  ];
  
  const Features = () => {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-10">
        <h2 className="text-4xl font-bold text-primary text-center">We will ensure</h2>
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-2xl overflow-hidden"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full md:w-1/3 h-64 object-cover"
              />
              <div className="p-6 text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Features;
  