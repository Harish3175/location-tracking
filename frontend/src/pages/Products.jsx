import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Products() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedLine = location.state?.line;
  const [products, setProducts] = useState([]);

  // 🔹 Fetch products for selected line
  useEffect(() => {
  if (!selectedLine) return;

  fetch(`https://nokia-support-backend.onrender.com/api/records/line/${selectedLine.toLowerCase().trim()}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then(res => res.json())
    .then(data => {
  setProducts(data);
})
    .catch(() => setProducts([]));

}, [selectedLine]);

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold mb-4">
        Products in {selectedLine}
      </h2>

      <button
        onClick={() => navigate("/home")}
        className="bg-gray-800 text-white rounded-md px-3 py-1 mb-4"
      >
        Back
      </button>

      {products.length === 0 ? (
        <p className="text-3xl text-center text-red-500">
          No products found
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {products.map((p, i) => (

  <div
    key={p._id}
    className={`flex flex-col sm:flex-row flex-wrap gap-3 text-white p-4 rounded text-sm sm:text-xl ${
      p.status === "RUNNING" ? "bg-green-500": "bg-yellow-400"
    }`}
  >

    <p><b>{i + 1}.</b></p>
    <p className="w-full sm:w-auto">Block ID : {p.blockId}</p>
    <p className="w-full sm:w-auto">Product : {p.productName}</p>
    <p className="w-full sm:w-auto">Location : {p.lastLocation}</p>
    <p className="w-full sm:w-auto">Status : {p.status}</p>

  </div>
//"bg-yellow-400 flex gap-2 text-white p-5 rounded text-center text-xl"
))}
        </div>
      )}
    </div>
  );
}

export default Products;