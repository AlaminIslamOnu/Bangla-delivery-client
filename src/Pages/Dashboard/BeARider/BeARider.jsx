import React from "react";
import { useForm } from "react-hook-form";
import warehouseData from "../../../../public/warehouses.json";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxios from "../../../Hooks/UseAxios";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = UseAuth();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxios();

  // warehouse data থেকে unique region এবং district বের করা
  const uniqueRegions = [...new Set(warehouseData.map((item) => item.region))];
  const uniqueDistricts = [
    ...new Set(warehouseData.map((item) => item.district)),
  ];

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      submittedAt: new Date().toISOString(),
    };
    console.log("Rider Submission:", riderData);
    axiosSecure.post("/riders", riderData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Your request is pending ...!",
          icon: "success",
          draggable: true,
          timer: 1400
        });
      }
    });
    
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Be A Rider</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            defaultValue={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full"
            {...register("name")}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            defaultValue={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
            {...register("email")}
          />
        </div>

        {/* Age */}
        <div>
          <label className="block font-semibold">Age</label>
          <input
            type="number"
            placeholder="Enter your age"
            className="input input-bordered w-full"
            {...register("age", { required: true })}
          />
        </div>

        <div>
          <label className="block font-semibold">District</label>
          <select
            className="select select-bordered w-full"
            {...register("district", { required: true })}
          >
            <option value="">Select District</option>
            {uniqueDistricts.map((district, i) => (
              <option key={i} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Region (previously religion) */}
        <div>
          <label className="block font-semibold">Region</label>
          <select
            className="select select-bordered w-full"
            {...register("region", { required: true })}
          >
            <option value="">Select Region</option>
            {uniqueRegions.map((region, i) => (
              <option key={i} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold">Phone Number</label>
          <input
            type="tel"
            placeholder="01XXXXXXXXX"
            className="input input-bordered w-full"
            {...register("phone", { required: true })}
          />
        </div>

        {/* NID */}
        <div>
          <label className="block font-semibold">NID Card Number</label>
          <input
            type="text"
            placeholder="Enter NID"
            className="input input-bordered w-full"
            {...register("nid", { required: true })}
          />
        </div>

        {/* Bike Brand */}
        <div>
          <label className="block font-semibold">Bike Brand</label>
          <input
            type="text"
            placeholder="e.g. Honda, Bajaj"
            className="input input-bordered w-full"
            {...register("bikeBrand", { required: true })}
          />
        </div>

        {/* Registration */}
        <div>
          <label className="block font-semibold">
            Bike Registration Number
          </label>
          <input
            type="text"
            placeholder="Enter Registration Number"
            className="input input-bordered w-full"
            {...register("bikeRegNumber", { required: true })}
          />
        </div>

        {/* Other Info */}
        <div>
          <label className="block font-semibold">Other Relevant Info</label>
          <textarea
            placeholder="Anything else?"
            className="textarea textarea-bordered w-full"
            {...register("otherInfo")}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary text-black w-full mt-4"
        >
          Be a Rider
        </button>
      </form>
    </div>
  );
};

export default BeARider;
