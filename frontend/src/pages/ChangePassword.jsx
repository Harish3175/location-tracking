import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [oldPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
  const res = await fetch("https://nokia-support-backend.onrender.com/api/auth/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  alert("Password changed successfully");

  const currentUser = JSON.parse(localStorage.getItem("user"));

  localStorage.setItem(
    "user",
    JSON.stringify({
      ...currentUser,
      forcePasswordChange: false,
    })
  );

  navigate("/home", { replace: true });
};

  return (
    <div className="flex flex-col items-center mt-20 gap-4">
      <h2 className="text-2xl font-bold">Change Password</h2>

      <input
        placeholder="Old Password"
        type="password"
        className="border p-2 w-64"
        onChange={e => setOld(e.target.value)}
      />

      <input
        placeholder="New Password"
        type="password"
        className="border p-2 w-64"
        onChange={e => setNew(e.target.value)}
      />

      <button onClick={submit} className="bg-blue-600 text-white px-6 py-2">
        Update
      </button>
    </div>
  );
}