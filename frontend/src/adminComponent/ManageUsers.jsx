import React, { useEffect, useState } from "react";

const ManageVendor = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null); // State to hold the user being edited
  const [updatedUsername, setUpdatedUsername] = useState(""); // State for username input
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(""); // State for phone number input

  useEffect(() => {
    // Fetch vendors from the API
    fetch(`${import.meta.env.VITE_API_URL}/manageusers.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Filter the users to show only vendors
          const vendors = data.users.filter((user) => user.role === 'customer');
          setUsers(vendors);
        } else {
          setError(data.message || "Failed to load users");
        }
      })
      .catch((err) => setError(err.message || "An error occurred"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(`${import.meta.env.VITE_API_URL}/manageusers.php?id=${userId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
          } else {
            setError(data.message || "Failed to delete customer");
          }
        })
        .catch((err) => setError(err.message || "An error occurred"));
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setUpdatedUsername(user.username);
    setUpdatedPhoneNumber(user.phone_number);
  };

  const handleUpdate = (userId) => {
    const updatedUser = {
      user_id: userId,
      username: updatedUsername,
      phone_number: updatedPhoneNumber,
    };

    fetch(`${import.meta.env.VITE_API_URL}/manageusers.php`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.user_id === userId ? { ...user, ...updatedUser } : user
            )
          );
          setEditUser(null); // Close the edit form
        } else {
          setError(data.message || "Failed to update customer");
        }
      })
      .catch((err) => setError(err.message || "An error occurred"));
  };

  const handleCancelEdit = () => {
    setEditUser(null); // Close the edit form without updating
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customer List</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Username</th>
            <th className="p-2 text-left">Phone Number</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Actions</th> {/* New Actions column */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.user_id} className="border-b">
                <td className="p-2">{user.user_id}</td>
                <td className="p-2">
                  {editUser && editUser.user_id === user.user_id ? (
                    <input
                      type="text"
                      value={updatedUsername}
                      onChange={(e) => setUpdatedUsername(e.target.value)}
                      className="border p-2 rounded"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="p-2">
                  {editUser && editUser.user_id === user.user_id ? (
                    <input
                      type="text"
                      value={updatedPhoneNumber}
                      onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
                      className="border p-2 rounded"
                    />
                  ) : (
                    user.phone_number
                  )}
                </td>
                <td className="p-2">{user.role}</td>
                <td className="p-2 flex space-x-2">
                  {editUser && editUser.user_id === user.user_id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(user.user_id)}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.user_id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-2 text-center">
                No customer found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageVendor;
