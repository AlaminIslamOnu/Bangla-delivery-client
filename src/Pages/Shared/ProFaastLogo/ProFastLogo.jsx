import React from 'react';
import logo from '../../../../src/assets/logo.png'
const ProFastLogo = () => {
    return (
        <div className='flex items-end font-extrabold'>
            <img src={logo} alt="" />
            <p className='text-4xl '>ProFast</p>
        </div>
    );
};

export default ProFastLogo;