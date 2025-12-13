import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      
      <h1 className="text-7xl font-extrabold text-slate-600 drop-shadow-lg">404</h1>

      <h2 className="text-2xl font-semibold text-gray-800 mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-600 mt-2 text-center max-w-md">
        The page you’re looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-slate-600 text-white rounded-lg shadow hover:bg-slate-700 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
}
