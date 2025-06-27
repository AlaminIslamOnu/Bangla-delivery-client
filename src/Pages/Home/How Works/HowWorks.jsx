import React from 'react';
import bookingimg from '../../../assets/bookingIcon.png'
const HowWorks = () => {
    return (
        <div className=''>
            <h2 className='p-3 text-4xl font-bold'>How it Works</h2>
            <div className='grid md:grid-cols-4 grid-cols-2 gap-3'>
                <div className='p-5 bg-white shadow-2xl rounded-2xl'>
                    <img src={bookingimg} alt="" />
                    <h2 className='font-bold text-2xl'>Booking Pick and Drop</h2>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='p-5 bg-white shadow-2xl rounded-2xl'>
                    <img src={bookingimg} alt="" />
                    <h2 className='font-bold text-2xl'>Booking Pick and Drop</h2>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='p-5 bg-white shadow-2xl rounded-2xl'>
                    <img src={bookingimg} alt="" />
                    <h2 className='font-bold text-2xl'>Booking Pick and Drop</h2>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='p-5 bg-white shadow-2xl rounded-2xl'>
                    <img src={bookingimg} alt="" />
                    <h2 className='font-bold text-2xl'>Booking Pick and Drop</h2>
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                
            </div>
        </div>
    );
};

export default HowWorks;