import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const { user } = UseAuth();
  const stripe = useStripe();
  const elements = useElements();
  const navigate =useNavigate()
  const [error, setError] = useState("");
  const axiosSecure = UseAxiosSecure();
  const { parcelId } = useParams();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcle", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <p> .....loading</p>;
  }

  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
    }
    //  Step 2 :
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parcelId,
    });
    console.log(res);
    const clientSecret = res.data.clientSecret;
    //  step 3 last
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.email,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!", result);
      }
    }
    const transactionId= result.paymentIntent.id
    const paymentData = {
      parcelId,
      email: user.email,
      amount,
      transactionId: transactionId,
      paymentMethod: result.paymentIntent.payment_method_types,
    };
    const paymentRes = await axiosSecure.post("/payments", paymentData);
    
    if(paymentRes.data.insertedId){

  await Swal.fire({
    title: "Payment Successful 🎉",
    text: `Transaction ID: ${transactionId}`,
    icon: "success",
    confirmButtonText: "Go to Dashboard",
  });

  // ✅ Navigate to dashboard
  navigate("/dashboard/myparcels");
      
    }
    
  };
  return (
    <div>
      <form
        className="max-w-md mx-auto p-6 shadow-xl bg-white rounded-2xl"
        onSubmit={handleSubmit}
      >
        <CardElement className="border p-4 mt-2 rounded-md" />
        <button
          className="btn btn-primary text-black w-full mt-2"
          type="submit"
          disabled={!stripe}
        >
          {amount}$
        </button>
        {error && <p className="text-red-600"> {error} </p>}
      </form>
    </div>
  );
};

export default PaymentForm;
