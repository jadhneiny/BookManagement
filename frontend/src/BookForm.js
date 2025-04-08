import React, { useState } from "react";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/outline";

const API = "http://localhost:3001/api/books";

export default function BookForm({ onAdd }) {
  const [book, setBook] = useState({ title: "", author: "", year: "" });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API, book);
    setBook({ title: "", author: "", year: "" });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="group">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-primary-700 mb-2 transition-colors group-hover:text-primary-800"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
            className="block w-full rounded-lg border-primary-200 bg-white/50 shadow-sm 
                     focus:border-primary-500 focus:ring-primary-500 
                     transition-all duration-200
                     hover:border-primary-300 sm:text-sm"
          />
        </div>
        <div className="group">
          <label
            htmlFor="author"
            className="block text-sm font-semibold text-primary-700 mb-2 transition-colors group-hover:text-primary-800"
          >
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
            className="block w-full rounded-lg border-primary-200 bg-white/50 shadow-sm 
                     focus:border-primary-500 focus:ring-primary-500 
                     transition-all duration-200
                     hover:border-primary-300 sm:text-sm"
          />
        </div>
        <div className="group">
          <label
            htmlFor="year"
            className="block text-sm font-semibold text-primary-700 mb-2 transition-colors group-hover:text-primary-800"
          >
            Year
          </label>
          <input
            type="number"
            name="year"
            id="year"
            value={book.year}
            onChange={handleChange}
            placeholder="Publication year"
            className="block w-full rounded-lg border-primary-200 bg-white/50 shadow-sm 
                     focus:border-primary-500 focus:ring-primary-500 
                     transition-all duration-200
                     hover:border-primary-300 sm:text-sm"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg
                   text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700
                   hover:from-primary-700 hover:to-primary-800
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                   shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Book
        </button>
      </div>
    </form>
  );
}
