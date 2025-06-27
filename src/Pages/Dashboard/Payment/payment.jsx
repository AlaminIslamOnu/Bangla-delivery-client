import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx') 
const payment = () => {
    return (
        <Element stripe={stripePromise}>
           <PaymentForm></PaymentForm>
        </Element>
    );
};

export default payment;