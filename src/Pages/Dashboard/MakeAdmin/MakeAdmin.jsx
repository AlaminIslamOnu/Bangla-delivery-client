import { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const MakeAdmin = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [queryEmail, setQueryEmail] = useState("");
  const axiosSecure = UseAxiosSecure();

  // ✅ Search users by email
  const { data: users = [], refetch, isFetching } = useQuery({
    queryKey: ["users-by-email", queryEmail],
    enabled: !!queryEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${queryEmail}`);
      return res.data;
    },
    retry: false,
  });

  // ✅ Mutation for role change
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      return axiosSecure.patch(`/users/${id}/role`, { role });
    },
    onSuccess: (_, variables) => {
      Swal.fire("Success", `Role updated to ${variables.role}`, "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to update role", "error");
    },
  });

  const handleSearch = () => {
    if (searchEmail.trim()) {
      setQueryEmail(searchEmail.trim());
    }
  };

  const handleRoleChange = (id, role) => {
    roleMutation.mutate({ id, role });
    
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🔐 Make Admin</h2>

      {/* Search input */}
      <div className="flex gap-2 mb-4">
        <input
          type="email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter user email"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* Results */}
      {isFetching && <p>Loading...</p>}

      {users.length > 0 ? (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </div>
              <div>
                {user.role === "admin" ? (
                  <button
                    onClick={() => handleRoleChange(user._id, "user")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove Admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleRoleChange(user._id, "admin")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Make Admin
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : queryEmail && !isFetching ? (
        <p>No users found</p>
      ) : null}
    </div>
  );
};

export default MakeAdmin;
