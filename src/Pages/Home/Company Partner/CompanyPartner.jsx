import Marquee from "react-fast-marquee";

import amazon from "../../../assets/brands/amazon.png";
import amazonVector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import startPeople from "../../../assets/brands/start-people 1.png";
import start from "../../../assets/brands/start.png";

const logos = [amazon, amazonVector, casio, moonstar, randstad, startPeople, start];

const CompanyPartners = () => {
  return (
    <section className="py-16 bg-white mb-10">
      <h2 className="text-3xl text-primary font-bold text-center mb-8">
        Trusted by Leading Companies
      </h2>
      <Marquee speed={50} gradient={false} pauseOnHover={true}>
        {logos.map((logo, idx) => (
          <div key={idx} className="mx-10">
            <img
              src={logo} 
              alt={`Company logo ${idx + 1}`}
              className="h-[25px] w-auto object-contain md:mx-24"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default CompanyPartners;
