import axios from 'axios';
import React from 'react';

const UseAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: `http://localhost:5000` // ✅ Correct port
    });
    return axiosSecure;
};

export default UseAxiosSecure;
