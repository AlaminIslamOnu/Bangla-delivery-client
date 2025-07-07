import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";
 

const PendingRiders = () => {
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const axiosSecure = UseAxiosSecure();


   const {isPending, data: riderss = [],refetch  }= useQuery({
    queryKey: ['pending-riders'],
    queryFn: async ()=> {
      const res = await axiosSecure.get('/riders/pending');
      return res.data
    }
   })
   if(isPending){
     return <Loading></Loading>
   }
// console.log(Rider);
  const handleApprove = async (id,email) => {
  try {
    const res = await axiosSecure.patch(`/riders/approve/${id}`, {
      email: email, // ✅ sending email to backend
    });

    if (res.data.modifiedCount > 0 || res.data.userUpdate?.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Approved!",
        text: "Rider has been approved successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      refetch();
      setShowModal(false);
    }
  } catch (err) {
    console.error("Approve failed:", err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong while approving.",
    });
  }
};

const handleReject = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This rider will be marked as rejected!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, reject it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/riders/reject/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Rejected!", "Rider has been rejected.", "success");
          refetch(); // optional, or filter UI manually
          setShowModal(false);
        }
      } catch (err) {
        console.error("Reject failed:", err);
        Swal.fire("Error", "Failed to reject rider.", "error");
      }
    }
  });
};



  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
  {riderss.map((rider) => (
    <tr key={rider._id}>
      <td className="border px-4 py-2">{rider.name}</td>
      <td className="border px-4 py-2">{rider.email}</td>
      <td className="border px-4 py-2">{rider.phone}</td>
      <td className="border px-4 py-2 text-right">
        <div className="flex justify-end gap-2">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            onClick={() => {
              setSelectedRider(rider);
              setShowModal(true);
            }}
          >
            👁️ View
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            onClick={() => handleApprove(rider._id, rider.email)}
          >
            ✅ Approve
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            onClick={() => handleReject(rider._id)}
          >
            ❌ Cancel
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {/* Modal */}
      {showModal && selectedRider && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-2">Rider Details</h3>
            <ul className="space-y-2">
              <li><strong>Name:</strong> {selectedRider.name}</li>
              <li><strong>Email:</strong> {selectedRider.email}</li>
              <li><strong>Phone:</strong> {selectedRider.phone}</li>
              <li><strong>Age:</strong> {selectedRider.age}</li>
              <li><strong>Religion:</strong> {selectedRider.religion}</li>
              <li><strong>District:</strong> {selectedRider.district}</li>
              <li><strong>NID:</strong> {selectedRider.nid}</li>
              <li><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</li>
              <li><strong>Bike Reg No:</strong> {selectedRider.bikeRegNo}</li>
            </ul>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApprove(selectedRider._id)}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
