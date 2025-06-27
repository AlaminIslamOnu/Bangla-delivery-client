import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner from "./Banner/Banner";
import OurServices from "./Services/OurService";
import CompanyPartners from "./Company Partner/CompanyPartner";
import Features from "./Feature/Feature";
import BeMarchent from "./BeMarchent/BeMarchent";
import HowWorks from "./How Works/HowWorks";
import CustomerReview from "./CustomerReview/CustomerReview";
import Faq from "./Faq/Faq";

const Home = () => {
  return (
    <div className="md:w-[1400px] mx-auto">
      <Banner></Banner>
      <HowWorks></HowWorks>
      <OurServices></OurServices>
      <CompanyPartners></CompanyPartners>
      <Features></Features>
      <BeMarchent></BeMarchent>
      <CustomerReview></CustomerReview>
      <Faq></Faq>
    </div>
  );
};

export default Home;
