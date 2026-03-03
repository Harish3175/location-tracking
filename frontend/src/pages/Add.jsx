import { useState,useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function AddSupportBlock() {

  const location = useLocation();
  const editData = location.state?.editData;

  /* ================= ADD STATES ================= */
  const [addBlockId, setAddBlockId] = useState("");
  const [addproductId, setAddProductId] = useState("");
  const [addBlockNames, setAddBlockNames] = useState("");
  const [addDefaultLocation, setAddDefaultLocation] = useState("");
  const [addEngineer, setAddEngineer] = useState("");
  const [AddDescription,setAddDescription] = useState("");

  const productRef = useRef(null)
  const productidRef = useRef(null)
      const lineRef = useRef(null)
      const blockRef = useRef(null)
      const nameRef = useRef(null)
      const descripRef = useRef(null)
  
      const [lineId, setLineId] = useState("");
      const [blockId, setBlockId] = useState("");
      const [name, setName] = useState("");
  
      const handleEnter = (e, nextRef) => {
        if (e.key === "Enter") {
          e.preventDefault();
          nextRef.current.focus();
        }
      }
  

  /* ================= UPDATE STATES ================= */
  const [updateBlockId, setUpdateBlockId] = useState();
  const [updateProduct, setUpdateProduct] = useState();
  const [updateEngineer, setUpdateEngineer] = useState();
  const [updateProductId, setUpdateProductId] = useState();
  const [UpdateDescription,setUpdateDescription] = useState();

  const [message, setMessage] = useState("");

  useEffect(() => {
  if (editData) {
    setUpdateBlockId(editData.blockId || "");
    setUpdateProductId(editData.productId || "");
    setUpdateProduct(editData.productName || "");
    setUpdateEngineer(editData.engineer || "");
    setUpdateDescription(editData.description || "")
  }
}, [editData]);

  /* ================= ADD ================= */
  const handleAdd = async () => {
    const res = await fetch("https://nokia-support-backend.onrender.com/api/blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json",Authorization:`Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({
        blockId: addBlockId,
        productID:addproductId,
        blockNames: addBlockNames.split(","),
        defaultLocation: addDefaultLocation,
        engineerName: addEngineer,
        description:AddDescription
      })
    });

    const data = await res.json();
    setMessage(data.message);

    if (res.ok) {
      setAddBlockId("");
      setAddProductId("");
      setAddBlockNames("");
      setAddDefaultLocation("");
      setAddEngineer("");
      setAddDescription("");
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    const res = await fetch(
      `https://nokia-support-backend.onrender.com/api/blocks/${updateBlockId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json",Authorization:`Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({
          productName: updateProduct,
          engineerName: updateEngineer,
          productId:updateProductId,
          description:UpdateDescription
        })
      }
    );

    const data = await res.json();
    setMessage(data.message);

    if (res.ok) {
      setUpdateBlockId("");
      setUpdateProductId("");
      setUpdateProduct("");
      setUpdateEngineer("");
      setUpdateDescription("");
    }
  };

  return (
    <div >

      {/* CENTER CARD */}
      <div className="flex justify-center mt-10">
        <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-8">

          <h2 className="text-xl font-bold text-center mb-6">
            Support Block Registration
          </h2>

          {message && (
            <p className="text-center text-green-600 font-semibold mb-4">
              {message}
            </p>
          )}

          {/* ================= ADD ================= */}
          <h3 className="font-semibold mb-3">Add New Support Block</h3>

          <input
            className="input"
            type="text"
            placeholder="Block ID"
            value={addBlockId}
            ref={blockRef}
            onChange={(e) => setAddBlockId(e.target.value)}
            onKeyDown={(e)=> handleEnter(e,productidRef)}
          />

          <input
            className="input"
            type="text"
            placeholder="Product ID"
            value={addproductId}
            ref={productidRef}
            onChange={(e) => setAddProductId(e.target.value)}
            onKeyDown={(e)=> handleEnter(e,productRef)}
          />

          <input
            className="input"
            placeholder="Block Names (comma separated)"
            value={addBlockNames}
            ref={productRef}
            onChange={(e) => setAddBlockNames(e.target.value)}
            onKeyDown={(e) => handleEnter(e, lineRef)}
          />

          <input
            className="input"
            placeholder="Default Location"
            value={addDefaultLocation}
            ref={lineRef}
            onChange={(e) => setAddDefaultLocation(e.target.value)}
            onKeyDown={(e) => handleEnter(e,nameRef)}
          />

          <input
            className="input"
            placeholder="Engineer Name"
            value={addEngineer}
            ref={nameRef}
            onChange={(e) => setAddEngineer(e.target.value)}
            onKeyDown={(e)=>handleEnter(e,descripRef)}
          />

          <input
            className="input"
            placeholder="Description"
            value={AddDescription}
            ref={descripRef}
            onChange={(e) => setAddDescription(e.target.value)}
          />

          <button onClick={handleAdd} className="btn-blue">
            Save
          </button>

          {/* ================= UPDATE ================= */}
          <h3 className="font-semibold mt-8 mb-3">Update Support Block</h3>

          <input
            className="input bg-gray-100"
            placeholder="Block ID"
            value={updateBlockId}
            disabled
          />

          <input
            className="input"
            placeholder="Product ID"
            value={updateProductId}
            onChange={(e) => setUpdateProductId(e.target.value)}
          />

          <input
            className="input"
            placeholder="Add Product Name"
            value={updateProduct}
            onChange={(e) => setUpdateProduct(e.target.value)}
          />

          <input
            className="input"
            placeholder="Engineer Name"
            value={updateEngineer}
            onChange={(e) => setUpdateEngineer(e.target.value)}
          />

          <input
            className="input"
            placeholder="Description"
            value={UpdateDescription}
            onChange={(e) => setUpdateDescription(e.target.value)}
          />

          <button onClick={handleUpdate} className="btn-blue">
            Update
          </button>

        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-bottom: 10px;
        }
        .btn-blue {
          width: 100%;
          background: #2563eb;
          color: white;
          padding: 10px;
          border-radius: 6px;
          margin-top: 5px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}