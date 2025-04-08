import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const API = process.env.REACT_APP_API_URL + "/books";

export default function BookForm({ onAdd, role, editingBook, onClearEdit }) {
  const [book, setBook] = useState({ title: "", author: "", year: "" });

  useEffect(() => {
    if (editingBook) {
      setBook({
        title: editingBook.title,
        author: editingBook.author,
        year: editingBook.year,
      });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await axios.put(`${API}/${editingBook.id}`, book);
        onClearEdit();
      } else {
        await axios.post(API, { ...book, role });
      }
      setBook({ title: "", author: "", year: "" });
      onAdd();
    } catch (error) {
      alert("You do not have permission to perform this action.");
    }
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
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg
                   text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700
                   hover:from-primary-700 hover:to-primary-800
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                   shadow-sm transition-all duration-200 hover:shadow-md"
        >
          {editingBook ? (
            <>
              <PencilSquareIcon className="h-4 w-4 mr-2" />
              Update Book
            </>
          ) : (
            <>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Book
            </>
          )}
        </button>

        {editingBook && (
          <button
            type="button"
            onClick={onClearEdit}
            className="text-sm text-primary-700 underline hover:text-primary-900"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}
