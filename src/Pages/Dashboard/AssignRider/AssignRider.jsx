import React, { useState } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssignRider = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [loadingRiders, setLoadingRiders] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);
  const [riders, setRiders] = useState([]);
  const axiosSecure = UseAxiosSecure();
  // const { logTracking } = useTrackingLogger();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data;
    },
  });

  const filteredParcels = parcels.filter(
    (parcel) =>
      parcel.paymentStatus === "paid" && parcel.deliveryStatus === "processing"
  );

  const { mutateAsync: assignRider } = useMutation({
    mutationFn: async ({ parcelId, rider }) => {
        setSelectedRider(rider);
        const res = await axiosSecure.patch(`/parcels/${parcelId}/assign`, {
            riderId: rider._id,
            riderEmail: rider.email,
            riderName: rider.name,
        });
        return res.data;
    },
    onSuccess: async () => {
        QueryClient.invalidateQueries(["assignableParcels"]);
        Swal.fire("Success", "Rider assigned successfully!", "success");

        // track rider assigned
        // await logTracking({
        //     tracking_id: selectedParcel.tracking_id,
        //     status: "rider_assigned",
        //     details: `Assigned to ${selectedRider.name}`,
        //     updated_by: user.email,
        // });
        document.getElementById("assignModal").close();
    },
    onError: () => {
        Swal.fire("Error", "Failed to assign rider", "error");
    },
});

  // Step 2: Open modal and load matching riders
  const openAssignModal = async (parcel) => {
    setSelectedParcel(parcel);
    setLoadingRiders(true);
    setRiders([]);

    try {
      const res = await axiosSecure.get("/riders/available", {
        params: {
          district: parcel.senderCenter, // match with rider.district
        },
      });
      setRiders(res.data);
    } catch (error) {
      console.error("Error fetching riders", error);
      Swal.fire("Error", "Failed to load riders", "error");
    } finally {
      setLoadingRiders(false);
      document.getElementById("assignModal").showModal();
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Parcels Ready for Rider Assignment
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Sender</th>
              <th className="px-4 py-2 border">Receiver</th>
              <th className="px-4 py-2 border">Weight</th>
              <th className="px-4 py-2 border">Cost</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.map((parcel, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{parcel.title}</td>
                <td className="px-4 py-2 border">
                  <div className="text-sm">{parcel.senderName}</div>
                  <div className="text-xs text-gray-500">
                    {parcel.senderCenter}
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="text-sm">{parcel.receiverName}</div>
                  <div className="text-xs text-gray-500">
                    {parcel.receiverRegion}
                  </div>
                </td>
                <td className="px-4 py-2 border">{parcel.weight} kg</td>
                <td className="px-4 py-2 border">${parcel.cost}</td>
                <td className="px-4 py-2 border">
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-sm rounded">
                    {parcel.deliveryStatus}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => openAssignModal(parcel)}
                    className="btn btn-sm bg-blue-600 text-white"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <p className="mt-4 text-center">Loading...</p>}
      </div>
      <dialog id="assignModal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="text-lg font-bold mb-3">
            Assign Rider for Parcel:{" "}
            <span className="text-primary">{selectedParcel?.title}</span>
          </h3>

          {loadingRiders ? (
            <p>Loading riders...</p>
          ) : riders.length === 0 ? (
            <p className="text-error">No available riders in this district.</p>
          ) : (
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Bike Info</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider) => (
                    <tr key={rider._id}>
                      <td>{rider.name}</td>
                      <td>{rider.phone}</td>
                      <td>
                        {rider.bike_brand} - {rider.bike_registration}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            assignRider({
                                parcelId: selectedParcel._id,
                                rider,
                            })
                        }
                          className="btn btn-xs btn-success"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
