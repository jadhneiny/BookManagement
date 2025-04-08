import React, { useEffect, useState } from "react";
import axios from "axios";
import BookForm from "./BookForm";
import BookList from "./BookList";
import SearchBar from "./SearchBar";

const API = "http://localhost:3001/api/books";

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBooks = async () => {
    const res = await axios.get(API);
    setBooks(res.data);
  };

  const searchBooks = async (query) => {
    const res = await axios.get(`${API}/search?query=${query}`);
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-900 mb-2">
            Mini Library
          </h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Your digital bookshelf for managing and tracking your book
            collection
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-lg border border-primary-100">
            <div className="mb-6">
              <SearchBar onSearch={searchBooks} />
            </div>
            <BookForm onAdd={fetchBooks} />
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-lg border border-primary-100">
            <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Book Collection
            </h2>
            <BookList books={books} onRefresh={fetchBooks} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
