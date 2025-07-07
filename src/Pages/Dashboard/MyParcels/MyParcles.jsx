import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router";
// import UseAuth from "../../../Hooks/UseAuth";

const MyParcels = () => {
  const { user } = UseAuth(); 
  const axiosSecure = UseAxiosSecure();
  // const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
console.log(parcels,isLoading);
  if (isLoading) return <p className="text-center">Loading..</p>;

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this parcel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        const res=await axiosSecure.delete(`/parcels/${id}`);
        if (res.data.deletedCount) {
          Swal.fire("Deleted!", "Parcel deleted successfully.", "success");
          // queryClient.invalidateQueries(["my-parcels", user?.email]);
          refetch()
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const handleDelete =async(id)=> {
  //   const result = await Swal.fire({
  //       title: "Are you sure?",
  //       text: "Do you want to delete this parcel?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, delete it!",
  //       cancelButtonText: "Cancel",
  //     });

  //     if (result.isConfirmed) {
  //       try {
  //         const res = await axiosSecure.delete(`/parcels/${id}`);
  //         // console.log(res.data);
  //         if (res.data.deletedCount) {
  //           Swal.fire("Deleted!", "Parcel deleted successfully.", "success");
  //           queryClient.invalidateQueries(["my-parcels", user?.email]);
  //         }
  //         // console.log(res.data);
  //       } catch (error) {
  //         Swal.fire("Error!", "Failed to delete parcel.", "error");
  //       }
  //     }

  // }
  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📦 My Parcels</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-base-200 text-base font-bold">
            <tr>
              <th>#</th>
              <th>Parcel Type</th>
              <th>Parcel Title</th>
              <th>Email</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td className="capitalize">{parcel.parcelType}</td>
                <td>{parcel.title || "Not found"}</td>
                <td>{parcel.email}</td>
                <td>{parcel.cost} ৳</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="badge badge-success">Paid</span>
                  ) : (
                    <span className="badge badge-error">Unpaid</span>
                  )}
                </td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-info">View</button>
                  {parcels.paymentStatus !== "paid" && (
                    <button
                      onClick={() => handlePay(parcel._id)}
                      className="btn btn-sm btn-warning"
                    >
                      Pay
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
