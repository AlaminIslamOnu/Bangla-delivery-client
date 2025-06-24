import { useState } from "react";
import { FaQuoteLeft, FaStar, FaStarHalfAlt, FaRegStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const reviews = [
  {
    text: "Fast, reliable, and always on time. I can track everything in real-time which gives me peace of mind!",
    name: "Sarah Rahman",
    position: "E-commerce Manager",
    avatar: "/avatars/sarah.png",
    rating: 5,
  },
  {
    text: "Their 24/7 support is amazing. I had an urgent question at 3 AM and got a response in minutes!",
    name: "John D’Souza",
    position: "Logistics Director",
    avatar: "/avatars/john.png",
    rating: 4.5,
  },
  {
    text: "Secure and damage-free delivery every time. They’ve never let us down even during peak times.",
    name: "Tania Akter",
    position: "Online Store Owner",
    avatar: "/avatars/tania.png",
    rating: 4,
  },
];

const getStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <>
      {[...Array(full)].map((_, i) => <FaStar key={"f" + i} className="text-yellow-400" />)}
      {half && <FaStarHalfAlt className="text-yellow-400" />}
      {[...Array(empty)].map((_, i) => <FaRegStar key={"e" + i} className="text-yellow-400" />)}
    </>
  );
};

const CustomerReviews = () => {
  const [current, setCurrent] = useState(0);
  const total = reviews.length;

  const prev = () => setCurrent(current === 0 ? total - 1 : current - 1);
  const next = () => setCurrent(current === total - 1 ? 0 : current + 1);

  return (
    <section className="py-16 px-4 bg-gray-50 text-center mb-20">
      <div className="text-primary text-4xl mb-4">
        <FaQuoteLeft className="mx-auto" />
      </div>
      <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
      <p className="text-gray-600 mb-10 max-w-xl mx-auto">
        We believe in customer satisfaction and delivering peace of mind. See what our users have to say.
      </p>

      <div className="relative max-w-5xl mx-auto overflow-hidden">
        <div className="flex gap-6 justify-center items-center transition-transform duration-500">
          {reviews.map((review, index) => {
            const isActive = index === current;
            const isSide = index === current - 1 || index === current + 1 || (current === 0 && index === total - 1) || (current === total - 1 && index === 0);

            return (
              <div
                key={index}
                className={`min-w-[90%] md:min-w-[70%] lg:min-w-[40%] p-6 rounded-2xl shadow-lg bg-white transition-all duration-500 
                  ${isActive ? "scale-100 opacity-100 blur-0 z-20" : isSide ? "opacity-50 blur-sm scale-95 z-10" : "hidden"}`}
              >
                <p className="text-gray-700 text-lg mb-6">“{review.text}”</p>
                <div className="flex mb-4 justify-center">{getStars(review.rating)}</div>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => (e.target.src = "https://placehold.co/48x48")}

                    />
                    <div className="text-left">
                      <h4 className="font-bold">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={prev}
            className="bg-white border rounded-full p-2 shadow hover:bg-gray-200"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={next}
            className="bg-white border rounded-full p-2 shadow hover:bg-gray-200"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === current ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
