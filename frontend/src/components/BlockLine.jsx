import React, { useRef, useState } from 'react'

const BlockLine = () => {

    const operatorRef = useRef(null)
    const lineRef = useRef(null)
    const blockRef = useRef(null)


    const [operatorId, setOperatorId] = useState("");
    const [lineId, setLineId] = useState("");
    const [blockId, setBlockId] = useState("");

    const handleEnter = (e, nextRef) => {
      if (e.key === "Enter") {
        e.preventDefault();
        nextRef.current?.focus();
      }
    };

    const submitScan = async ()=>{
      const res = await fetch("https://nokia-support-backend.onrender.com/api/records/scan",{
        method:"POST",
        headers:{"Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`
      },
        body:JSON.stringify({
          blockId,lineId,operatorId,location:lineId
        })
      });

      const data = await res.json();
      //console.log(data);

      if(!res.ok){
        alert(data.message);
        return;
      }

      setBlockId("");
      setLineId("");
      setOperatorId("");
      blockRef.current.focus();
    }

  return (

    <div className="p-4 bg-gray-500 rounded shadow mt-4 max-w-6xl mx-auto ">
      <h2 className="font-bold mb-3 text-3xl text-center">Scan Details</h2>

      <input
        type='text'
        placeholder="Scan Block ID"
        className="border p-2 text-2xl w-full mb-2"
        value={blockId}
        ref={blockRef}
        onChange={(e) => setBlockId(e.target.value)}
        onKeyDown={(e) => handleEnter(e, lineRef)}
      />

      <input
        type='text'
        placeholder="Scan Line (or) Location ID"
        className="border p-2 text-2xl w-full mb-2"
        value={lineId}
        ref={lineRef}
        onChange={(e) => setLineId(e.target.value)}
        onKeyDown={(e) => handleEnter(e, operatorRef)}
      />

      <input
        type='text'
        ref={operatorRef}
        placeholder="Scan Operator ID"
        className="border p-2 text-2xl w-full mb-2"
        value={operatorId}
        onChange={(e) => setOperatorId(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key === "Enter"){
            e.preventDefault();

            if(!blockId || !operatorId){
              alert("Incomplete scan");
              return;
            }
            submitScan();
          }
        }}
      />

      <p className="mt-2 text-sm text-gray-600">
        Product ID: {blockId}, Line ID: {lineId}, Operator ID: {operatorId}
      </p>
    </div>

  )
}

export default BlockLine
