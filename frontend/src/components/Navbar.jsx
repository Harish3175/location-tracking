import React, { useState } from "react";
import nokialogo from "../assets/nokialogo.png";
import droupdown_img from "../assets/dropdown_icon.png";
import menu_icon from "../assets/menu_icon.png";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ searchText, setSearchText, user, token, onLogout }) => {

  const [visible, setVisible] = useState(false);

  return (
    <div className="bg-gray-500 text-white">

      {/* ===== TOP ROW ===== */}
      <div className="flex items-center justify-between px-3 py-2">

        {/* LOGO */}
        <Link to={token ? "/home" : "/"}>
          <img src={nokialogo} className="w-28" />
        </Link>

        {/* TITLE */}
        <h1 className="text-xl md:text-2xl flex-1 text-center">
          Support Blocks
        </h1>

        {/* SEARCH*/}
        {token && (
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="hidden md:block px-3 py-1 rounded text-black w-60 lg:w-64"
          />
        )}

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex gap-4 items-center ml-6">

          {token && <Link to="/add">Add</Link>}
          {token && <Link to="/allproducts">AllProducts</Link>}
          {token && <Link to="/records">Records</Link>}

          {user?.role === "admin" && <Link to="/admin-users">Users</Link>}
          {user?.role === "admin" && <Link to="/adminpassword">Admin Password</Link>}
          {user?.role === "admin" && <Link to="/signup">Sign-Up</Link>}

          {user && <span className="text-sm">{user.name}</span>}

          {token && (
            <button onClick={onLogout} className="bg-red-600 px-3 py-1 rounded">
              Logout
            </button>
          )}

        </ul>

        {/* MOBILE ICON */}
        <img
          onClick={() => setVisible(true)}
          src={menu_icon}
          className="w-7 cursor-pointer md:hidden"
        />

      </div>

      {/* ===== MOBILE SEARCH ===== */}
      {token && (
        <div className="md:hidden px-3 pb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-3 py-2 rounded text-black mt-2"
          />
        </div>
      )}

      {/* ===== TABLET MENU ROW ===== */}
      <ul className="hidden md:flex lg:hidden justify-evenly items-center py-3 mb-3">

        {token && <Link to="/add">Add</Link>}
        {token && <Link to="/allproducts">AllProducts</Link>}
        {token && <Link to="/records">Records</Link>}

        {user?.role === "admin" && <Link to="/admin-users">Users</Link>}
        {user?.role === "admin" && <Link to="/adminpassword">Admin Password</Link>}
        {user?.role === "admin" && <Link to="/signup">Sign-Up</Link>}

        {user && <span className="text-sm">{user.name}</span>}

        {token && (
          <button onClick={onLogout} className="bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
        )}

      </ul>

      {/*  MOBILE SIDEBAR  */}
      <div className={`fixed top-0 right-0 bottom-0 bg-white transition-all ${visible ? "w-full" : "w-0"}`}>
        <div className="flex flex-col text-gray-600">

          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img className="h-4 rotate-180" src={droupdown_img} />
            <p>Back</p>
          </div>

          {token && <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/add">Add</NavLink>}
          {token && <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/allproducts">AllProducts</NavLink>}
          {token && <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/records">Records</NavLink>}

          {user?.role === "admin" && <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/admin-users">Users</NavLink>}
          {user?.role === "admin" && <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/adminpassword">Admin Password</NavLink>}
          {user?.role === "admin" && <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/signup">Sign-Up</NavLink>}

          {token && (
            <button onClick={onLogout} className="py-2 pl-6 border text-left">
              Logout
            </button>
          )}

        </div>
      </div>

    </div>
  );
};

export default Navbar;