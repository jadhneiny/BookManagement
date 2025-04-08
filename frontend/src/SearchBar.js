import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-4 w-4 text-primary-400" />
        </div>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-10 pr-4 py-2 border-2 border-primary-200 
                   rounded-lg leading-5 bg-white/50 placeholder-primary-400 
                   focus:outline-none focus:placeholder-primary-300 
                   focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                   hover:border-primary-300
                   transition-all duration-200 sm:text-sm"
        />
      </div>
    </form>
  );
}
