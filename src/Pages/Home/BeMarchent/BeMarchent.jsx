import React from 'react';
import locationimg from '../../../assets/location-merchant.png'
const BeMarchent = () => {
    return (
  <div className="hero bg-[#a9cbcf] rounded-4xl md:p-20   ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src={locationimg}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
      <p className="py-6">
      We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
      </p>
      <button className="btn btn-primary">Be a marchent</button>
      <button className="btn btn-outline ms-4">Earn with ProFast</button>
    </div>
  </div>
</div>
    );
};

export default BeMarchent;