import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllProducts({ searchText }) {
  const [history, setHistory] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState(null);

  const safeSearch = (searchText || "").toLowerCase();

  const navigate = useNavigate();


  const loadHistory = () => {
    fetch("https://nokia-support-backend.onrender.com/api/history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data =>{
        //console.log("History from backend",data)
         setHistory(data)});
  };


  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async () => {
    await fetch(`https://nokia-support-backend.onrender.com/api/history/${selected._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setShowConfirm(false);
    setPassword("");
    loadHistory();
  };

  //console.log("Deleting history id:",selected._id)

  return (
    <div className="p-6">
      <h2 className="text-xl text-center font-bold mb-4">All Products History</h2>

<div className="overflow-x-auto">
      <table className="w-full min-w[800px] border">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th>S.No</th>
            <th>Block ID</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Engineer</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {history
            .filter(h =>
              h.blockId?.toLowerCase().includes(safeSearch) ||
              h.productId?.toLowerCase().includes(safeSearch) ||
              h.productName?.toLowerCase().includes(safeSearch) ||
              h.engineerName?.toLowerCase().includes(safeSearch) ||
              h.description?.toLowerCase().includes(safeSearch)
            )
            .map((h, i) => (
              <tr key={h._id} className="border text-center">

                <td>{i + 1}</td>

                <td>{h.blockId}</td>

                <td>{h.productId}</td>

                <td>{h.productName}</td>

                <td>{h.engineerName}</td>

                <td>{h.description}</td>

                <td>{h.createdAt?.slice(0, 10)}</td>

                <td className="flex gap-2 justify-center">

                  <button
                    className="bg-blue-900 text-white px-3 py-1 rounded"
                    onClick={() =>
                      navigate("/add", {
                        state: {
                          editData: {
                            blockId: h.blockId,
                            productId: h.productId,
                            productName: h.productName,
                            engineer: h.engineerName,
                            description: h.description
                          }
                        }
                      })
                    }>
                    Edit
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setSelected(h);
                      setShowConfirm(true);
                    }}>
                    Delete
                  </button>

                </td>

              </tr>
            ))}
        </tbody>

      </table>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <h3 className="font-bold mb-2">Confirm Delete</h3>

            <input
              type="password"
              className="input"
              placeholder="Admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
              <button onClick={handleDelete} className="btn-red">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}