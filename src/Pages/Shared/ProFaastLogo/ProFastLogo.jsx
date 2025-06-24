import React from 'react';
import logo from '../../../../src/assets/logo.png'
import { Link } from 'react-router';
const ProFastLogo = () => {
    return (
         <Link to={'/'}>
             <div className='flex items-end font-extrabold'>
            <img src={logo} alt="" />
            <p className='text-4xl '>ProFast</p>
        </div>
         </Link>
    );
};

export default ProFastLogo;