import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("operator");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("https://nokia-support-backend.onrender.com/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Signup successful. Please login.");
    navigate("/login");
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[50%] sm:max-w-96 m-auto mt-14 gap-4"
    >
      <h2 className="text-3xl">Sign Up</h2>

      <input
        type="text"
        placeholder="Name"
        className="w-full px-3 py-2 border"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* ROLE (NO ADMIN) */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-3 py-2 border"
        required
      >
        <option value="operator">Operator</option>
        <option value="engineer">Engineer</option>
      </select>

      <button className="bg-black text-white px-8 py-2">
        Sign Up
      </button>

      <p className="text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Signup;