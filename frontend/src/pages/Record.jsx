import { useEffect, useState } from "react";

const Record = ({ searchText }) => {

  const [records, setRecords] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 Fetch records from backend
  useEffect(() => {
    fetch("https://nokia-support-backend.onrender.com/api/records", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(err => console.error(err));
  }, []);

  // 🔹 Safe search text
  const safeSearch = (searchText || "").toLowerCase();

  // 🔹 Filter records
  const filteredHistory = records.filter(item =>
    (item.operatorIn || "").toLowerCase().includes(safeSearch) ||
    (item.blockId || "").toLowerCase().includes(safeSearch) ||
    (item.lineId || "").toLowerCase().includes(safeSearch)
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    await fetch(`https://nokia-support-backend.onrender.com/api/records/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setRecords(prev => prev.filter(r => r._id !== id));
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-4">
        Operator Record
      </h2>

      {filteredHistory.length === 0 ? (
        <p className="text-gray-500 text-center">No history found</p>
      ) : (
        <div className="overflow-x-auto">
        <table className="w-full border min-[800px]:">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Operator IN</th>
              <th className="border p-2">Start</th>
              <th className="border p-2">Line</th>
              <th className="border p-2">Block</th>
              <th className="border p-2">End</th>
              <th className="border p-2">Operator OUT</th>
              <th className="border p-2">Last Location</th>
              {user?.role === "admin" && (
                <th className="border p-2">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map(h => (
              <tr key={h._id}>
                <td className="border p-2">{h.operatorIn}</td>
                <td className="border p-2">{h.startTime? new Date(h.startTime).toLocaleString("en-IN", {timeZone: "Asia/Kolkata",hour12:false}): ""}</td>
                <td className="border p-2">{h.lineId}</td>
                <td className="border p-2">{h.blockId}</td>
                <td className="border p-2">{h.endTime? new Date(h.endTime).toLocaleString("en-IN", {timeZone: "Asia/Kolkata",hour12:false}): ""}</td>
                <td className="border p-2">{h.operatorOut}</td>
                <td className="border p-2">{h.lastLocation}</td>
                {user?.role === "admin" && (
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDelete(h._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default Record;