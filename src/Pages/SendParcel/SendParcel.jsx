import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import regionsData from "../../../public/warehouses.json"; // adjust the path if needed
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/useAxiosSecure";
import UseAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";


 // ✅ Importing user auth

const SendParcel = () => {
  const { register, handleSubmit,  reset } = useForm();
  const [showWeight, setShowWeight] = useState(false);
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth(); // ✅ Getting user email
  const naviagte =useNavigate()

  // const parcelType = watch("parcelType");
  // const weight = watch("weight");

  const calculateCost = (type, weight) => {
    const base = type === "non-document" ? 100 : 50;
    const weightCost = type === "non-document" ? parseFloat(weight || 0) * 10 : 0;
    return base + weightCost;
  };

  const onSubmit = (data) => {
    const cost = calculateCost(data.parcelType, data.weight);

    const finalData = {
      ...data,
      email: user?.email, // ✅ user email
      cost, // ✅ calculated delivery cost
      phone: data.senderContact, // ✅ sender's phone number
      paymentStatus: "unpaid", // ✅ default status
      deliveryStatus: "processing", // ✅ default status
      creation_date: new Date().toISOString()
    };
    // console.log(finalData);


    axiosSecure.post("/parcels", finalData)
    .then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Your order is received!",
          icon: "success",
          timer: 1500,
        });
        console.log(res.data,finalData);
        reset();
      }
    });

    toast.success(`Delivery Cost: ৳${cost}`);
    naviagte('/dashboard/myparcels')
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-3xl font-bold text-center mb-2">Enter Your Parcel</h2>
      <p className="text-center text-gray-500 mb-6">
        Fill in the details to send your parcel
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Parcel Info</h3>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="document"
                {...register("parcelType", { required: true })}
                onClick={() => setShowWeight(false)}
              />
              Document
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="non-document"
                {...register("parcelType", { required: true })}
                onClick={() => setShowWeight(true)}
              />
              Non-Document
            </label>
          </div>

          <input
            type="text"
            placeholder="Parcel Title"
            className="input input-bordered w-full"
            {...register("title", { required: true })}
          />

          {showWeight && (
            <input
              type="number"
              step="0.1"
              min="0"
              placeholder="Weight in kg"
              className="input input-bordered w-full"
              {...register("weight")}
            />
          )}
        </div>

        {/* Sender and Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Sender Info</h3>
            <input
              placeholder="Sender Name"
              className="input input-bordered w-full"
              {...register("senderName", { required: true })}
            />
            <input
              placeholder="Sender Contact"
              className="input input-bordered w-full"
              {...register("senderContact", { required: true })}
            />
            <select
              className="select select-bordered w-full"
              {...register("senderRegion", { required: true })}
            >
              <option value="">Select Region</option>
              {[...new Set(regionsData.map((r) => r.region))].map((region, idx) => (
                <option key={idx}>{region}</option>
              ))}
            </select>
            <select
              className="select select-bordered w-full"
              {...register("senderCenter", { required: true })}
            >
              <option value="">Select Service Center</option>
              {regionsData.map((r, idx) => (
                <option key={idx} value={r.city}>
                  {r.city}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Sender Address"
              className="textarea textarea-bordered w-full"
              {...register("senderAddress", { required: true })}
            />
            <input
              placeholder="Pickup Instruction"
              className="input input-bordered w-full"
              {...register("pickupInstruction", { required: true })}
            />
          </div>

          {/* Receiver Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Receiver Info</h3>
            <input
              placeholder="Receiver Name"
              className="input input-bordered w-full"
              {...register("receiverName", { required: true })}
            />
            <input
              placeholder="Receiver Contact"
              className="input input-bordered w-full"
              {...register("receiverContact", { required: true })}
            />
            <select
              className="select select-bordered w-full"
              {...register("receiverRegion", { required: true })}
            >
              <option value="">Select Region</option>
              {[...new Set(regionsData.map((r) => r.region))].map((region, idx) => (
                <option key={idx}>{region}</option>
              ))}
            </select>
            <select
              className="select select-bordered w-full"
              {...register("receiverCenter", { required: true })}
            >
              <option value="">Select Service Center</option>
              {regionsData.map((r, idx) => (
                <option key={idx} value={r.city}>
                  {r.city}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Receiver Address"
              className="textarea textarea-bordered w-full"
              {...register("receiverAddress", { required: true })}
            />
            <input
              placeholder="Delivery Instruction"
              className="input input-bordered w-full"
              {...register("deliveryInstruction", { required: true })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary text-black w-full mt-6"
        >
          Submit Parcel
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
