import React, { useEffect, useState } from "react";
import LineProducts from "../components/LineProducts";
import CurrentBlocks from "../components/CurrentBlocks";
import BlockLine from "../components/BlockLine";
import { useNavigate } from "react-router-dom";

function Home({ searchText }) {
  const navigate = useNavigate();

  //STATES 
  const [records, setRecords] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const safeSearch = (searchText || "").toLowerCase();

  //-----FETCH RECORDS -----
  const fetchRecords = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const res = await fetch(
      "https://nokia-support-backend.onrender.com/api/records",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //AUTO LOGOUT ON TOKEN FAIL
    if (res.status === 401 || res.status === 403) {
      localStorage.clear();
      alert("Session expired. Please login again.");
      navigate("/");
      return;
    }

    const data = await res.json();
    setRecords(data);
    setLoading(false);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchRecords();

    const interval = setInterval(() => {
      fetchRecords();
    }, 10000); // every 10 seconds (safer for backend)

    return () => clearInterval(interval);
  }, []);

//  FETCH BLOCKS
  useEffect(() => {
    fetch("https://nokia-support-backend.onrender.com/api/blocks")
      .then((res) => res.json())
      .then((data) => setBlocks(data))
      .catch((err) => console.error(err));
  }, []);

  //  FAST LOOKUP MAP 
  const recordMap = {};
  Array.isArray(records) &&
  records.forEach((r) => {
    if(!recordMap[r.blockId]){
    recordMap[r.blockId] = r;
    }
  });

  //  SEARCH 
  const searchResults = blocks.filter(
    (block) =>
      block.productID?.toLowerCase().includes(safeSearch) ||
      block.blockNames?.some((name) =>
        name.toLowerCase().includes(safeSearch)
      )
  );

  //  LINE CLICK 
  const handleLineClick = (line) => {
    navigate("/products", { state: { line } });
  };

  //  LOADING 
  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4">

      {/* SEARCH RESULTS */}
      {searchText && (
        <div className="mb-6 rounded p-4 shadow">
          <h2 className="text-2xl text-center font-bold mb-3">
            Search Result
          </h2>

          {searchResults.length > 0 ? (
            searchResults.map((block) => {
              const record = recordMap[block.blockId];

              return (
                <div
                  key={block._id}
                  className={`border-b p-5 flex justify-between pb-3 mb-3 text-white ${record?.status === "RUNNING"
                      ? "bg-green-500"
                      : "bg-yellow-400"
                    }`}
                >
                  <p>
                    <b>Product ID:</b> {block.productID}
                  </p>

                  <p>
                    <b>Products:</b> {block.blockNames.join(", ")}
                  </p>

                  <p>
                    <b>Location:</b>{" "}
                    {record
                      ? record.lastLocation
                      : block.defaultLocation}
                  </p>

                  <p>
                    <b>Status:</b>{" "}
                    {record?.status || "IDLE"}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-red-600 font-bold text-center">
              No matching product or block found
            </p>
          )}
        </div>
      )}

      {/* SCAN SECTION */}
      <BlockLine />

      {/* LINE SELECTION */}
      <h2 className="text-center font-bold text-3xl mt-6">
        Select a Line
      </h2>

      <LineProducts onSelectLine={handleLineClick} />

      {/* CURRENT RUNNING BLOCKS */}
      <CurrentBlocks />
    </div>
  );
}

export default Home;