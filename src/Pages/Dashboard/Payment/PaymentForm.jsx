import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


const PaymentForm = () => {
  const stripe = useStripe();
  const element = useElements();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!stripe || !element){
        return
    }
    const card = element.getElement(CardElement)
    if(!card){
        return
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay for parcel pickup
        </button>

      </form>
    </div>
  );
};

export default PaymentForm;
