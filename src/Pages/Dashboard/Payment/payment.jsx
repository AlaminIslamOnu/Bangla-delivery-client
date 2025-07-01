import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(`${import.meta.env.VITE_Payment_key}`) 
const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
           <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default Payment;