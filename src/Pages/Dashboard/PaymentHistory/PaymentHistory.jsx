import React from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../Shared/Loading/Loading";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { isLoading, data: payments = [] } = useQuery({
    queryKey: ["payment-data", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  console.log(payments);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Payment History</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Parcel ID</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.parcelId}</td>
                <td className="px-4 py-2"> {item.amount}$</td>
                <td className="px-4 py-2">{item.transactionId}</td>
                <td className="px-4 py-2">
                  {item.paid_at_string
                    ? new Date(item.paid_at_string).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
