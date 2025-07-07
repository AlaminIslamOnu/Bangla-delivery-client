import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading/Loading";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";


const ActiveRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { isPending, data: riders = [], refetch } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  const handleDeactivate = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This rider will be deactivated!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, deactivate!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/riders/deactivate/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Deactivated!", "Rider has been deactivated.", "success");
          refetch();
        }
      }
    });
  };

  if (isPending) return <Loading />;

  // Search filter
  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      <input
        type="text"
        placeholder="Search by name..."
        className="border px-3 py-2 rounded w-full max-w-xs mb-4"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">District</th>
              <th className="border px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider) => (
              <tr key={rider._id}>
                <td className="border px-4 py-2">{rider.name}</td>
                <td className="border px-4 py-2">{rider.email}</td>
                <td className="border px-4 py-2">{rider.phone}</td>
                <td className="border px-4 py-2">{rider.district}</td>
                <td className="border px-4 py-2 text-right">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleDeactivate(rider._id)}
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
            {filteredRiders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No active riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
