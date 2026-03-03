const LineProducts = ({ onSelectLine }) => {
  return (
    <div className="grid grid-cols-3 gap-6 p-5">
      {Array.from({ length: 9 }, (_, i) => {
        const lineName = `Line ${i + 1}`;
      
        return (
          <button
            key={lineName}
            onClick={() => onSelectLine(lineName)}
            className="bg-blue-700 p-5 text-white text-2xl rounded-full hover:scale-95"
          >
            {lineName}
          </button>
        );
      })}
        
        {/* STORAGE ROOM BUTTON */}
      <button
        onClick={() => onSelectLine("Stencil Room")}
        className="bg-blue-700 p-5 text-white text-2xl rounded-full hover:scale-95"
      >
        Stencil Room
      </button>
    </div>
  );
};

export default LineProducts;