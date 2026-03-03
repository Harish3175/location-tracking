import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Add from "./pages/Add";
import AllProducts from "./pages/ProductDetails";
import Record from "./pages/Record";
import Signup from "./pages/Signup";
import AdminUsers from "./pages/AdminUsers";
import ChangePassword from "./pages/ChangePassword";
import AdminPassword from "./pages/AdminPassword";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Role from "./components/Role";

function App() {

  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState(()=>
  JSON.parse(localStorage.getItem("user"))
);
const [token,setToken] = useState(()=>
localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const handleLogout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    setUser(null);
    setToken(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-400 overflow-x-hidden max-w-full">

      <Navbar searchText={searchText} setSearchText={setSearchText} user={user} token={token} onLogout={handleLogout} />

      <div className="flex-grow">

        <Routes>

          <Route path="/home" element={<ProtectedRoute ><Home searchText={searchText} user={user} setUser={setUser} /></ProtectedRoute>}/>
          <Route path="/change-password" element={<ProtectedRoute ><ChangePassword /></ProtectedRoute>}/>

          <Route
            path="/adminpassword"
            element={
              <ProtectedRoute >
                <Role allowedRoles={["admin"]}>
                  <AdminPassword />
                </Role>
              </ProtectedRoute>
            }
          />

          <Route path="/products" element={<Products />} />

          <Route
            path="/add"
            element={
              <ProtectedRoute >
                <Role allowedRoles={["admin", "engineer"]}>
                  <Add />
                </Role>
              </ProtectedRoute>
            }
          />

          <Route
            path="/allproducts"
            element={
              <ProtectedRoute >
                <Role allowedRoles={["admin", "engineer"]}>
                  <AllProducts searchText={searchText} />
                </Role>
              </ProtectedRoute>
            }
          />

          <Route
            path="/records"
            element={
              <ProtectedRoute >
                <Role allowedRoles={["admin", "engineer"]}>
                  <Record searchText={searchText} />
                </Role>
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <PublicRoute >
                <Login setUser={setUser} setToken={setToken}/>
              </PublicRoute>
            }
          />

          <Route path="/signup" element={<ProtectedRoute ><Role allowedRoles={["admin"]}><Signup /></Role></ProtectedRoute>}/>

          <Route
            path="/admin-users"
            element={
              <ProtectedRoute >
                <Role allowedRoles={["admin"]}>
                  <AdminUsers />
                </Role>
              </ProtectedRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </div>

</div>
  );
}

export default App;