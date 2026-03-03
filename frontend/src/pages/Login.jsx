import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({setUser, setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("https://nokia-support-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    setToken(data.token);
    if(data.user.forcePasswordChange){
      navigate("/change-password");
      return;
    }
    
    navigate("/home",{replace:true})// go home after login
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[50%] sm:max-w-96 m-auto mt-14 gap-4"
    >
      <h2 className="text-3xl">Login</h2>

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

      <button className="bg-black text-white px-8 py-2">
        Login
      </button>

      <p className="text-sm">
        Contact admin to create an account
      </p>
    </form>
  );
};

export default Login;