import { useEffect, useState } from "react";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [newPassword, setNewPassword] = useState("");

  const token = localStorage.getItem("token");

  // Load all users
  const loadUsers = async () => {
    const res = await fetch("https://nokia-support-backend.onrender.com/api/auth/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Enable / Disable user
  const changeStatus = async (id, status) => {
    await fetch("https://nokia-support-backend.onrender.com/api/auth/user-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: id,
        status,
      }),
    });

    loadUsers();
  };

  // Reset password
  const resetPassword = async (id) => {
    if (!newPassword) {
      alert("Enter temp password");
      return;
    }

    await fetch("https://nokia-support-backend.onrender.com/api/auth/admin-reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: id,
        newPassword,
      }),
    });

    alert("Password reset. User must change on login.");
    setNewPassword("");
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4 text-center">Admin User Management</h2>

      <input
        placeholder="Temporary Password"
        className="border p-2 mb-4 w-full"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

<div className="overflow-x-auto">
      <table className="min-[800px]: w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border text-center">

              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>

              <td className="flex gap-2 justify-center p-2">

                {u.status === "active" ? (
                  <button
                    onClick={() => changeStatus(u._id, "disabled")}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Disable
                  </button>
                ) : (
                  <button
                    onClick={() => changeStatus(u._id, "active")}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Enable
                  </button>
                )}

                <button
                  onClick={() => resetPassword(u._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Reset Password
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>
      </div>

    </div>
  );
}