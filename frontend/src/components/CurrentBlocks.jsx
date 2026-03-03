import { useEffect, useState } from "react";
 
const CurrentBlocks = () => {
  const [running, setRunning] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const load = () => {
    fetch("https://nokia-support-backend.onrender.com/api/records/running", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRunning(data);
        } else if (data?.record) {
          setRunning([data.record]);
        } else {
          setRunning([]);
        }
      })
      .catch(() => setRunning([]));
  };

  load();

  const interval = setInterval(load, 3000);
  return () => clearInterval(interval);
}, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center p-8">
        Current Running Blocks
      </h1>

      <div className="grid gap-10 p-5 grid-cols-1 sm:grid-cols-2">
        {running.length === 0 ? (
          <div className="flex justify-center items-center">
          <p className="text-red-500 h-[50vh]">
            
          </p>
          </div>
        ) : (
          running.map((r, i) => (
            <h1
              key={r._id}
              className="bg-green-700 rounded-full text-center text-white p-5 text-2xl"
            >
              {i + 1}. {r.lineId} | {r.blockId}|{r.productID} |{r.productName}
            </h1>
          ))
        )}
      </div>
    </div>
  );
};

export default CurrentBlocks;