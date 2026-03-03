import React from "react";
import { Link } from "react-router-dom";

const AccessDenied = ({message}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Access Denied
      </h1>
      <p className="text-lg mb-6">
        {message || "You do not have permission to view this page."}
      </p>
      <Link
        to="/home"
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default AccessDenied;