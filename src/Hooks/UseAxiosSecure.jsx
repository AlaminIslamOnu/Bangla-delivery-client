import axios from 'axios';
import React from 'react';

const UseAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: `http://localhost:3000`
    })
    return axiosSecure
};

export default UseAxiosSecure;