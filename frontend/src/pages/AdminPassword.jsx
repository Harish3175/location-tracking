import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPassword() {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("https://nokia-support-backend.onrender.com/api/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        oldPassword,
        newPassword
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message);
      return;
    }

    alert("Password updated successfully");

    // logout after change password
    localStorage.clear();

    navigate("/");
  };

  return (
    <div className="flex justify-center mt-20">

      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded shadow w-full max-w-sm"
      >

        <h2 className="text-2xl font-bold text-center mb-6">
          Admin Password
        </h2>

        {message && (
          <p className="text-center text-red-600 mb-4">
            {message}
          </p>
        )}

        <input
          type="password"
          placeholder="Current Password"
          className="border w-full p-2 mb-3"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          className="border w-full p-2 mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Update Password
        </button>

      </form>

    </div>
  );
}