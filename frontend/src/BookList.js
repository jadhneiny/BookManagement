import React from 'react';
import axios from 'axios';
import {
  TrashIcon,
  BookOpenIcon,
  BookmarkIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

const API = 'http://localhost:3001/api/books';

export default function BookList({ books, onRefresh, onEdit, role }) {
  const deleteBook = async (id) => {
    await axios.delete(`${API}/${id}`);
    onRefresh();
  };

  const checkOut = async (id) => {
    await axios.put(`${API}/${id}/checkout`);
    onRefresh();
  };

  const checkIn = async (id) => {
    await axios.put(`${API}/${id}/checkin`);
    onRefresh();
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm border border-primary-100">
      <table className="min-w-full divide-y divide-primary-200">
        <thead>
          <tr className="bg-gradient-to-r from-primary-50 to-primary-100">
            <th className="px-4 py-3 text-left text-xs font-bold text-primary-700 uppercase tracking-wider">
              Title
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-primary-700 uppercase tracking-wider">
              Author
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-primary-700 uppercase tracking-wider">
              Year
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-primary-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-primary-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white/50 divide-y divide-primary-100">
          {books.map((b) => (
            <tr
              key={b.id}
              className="transition-colors duration-150 hover:bg-primary-50"
            >
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary-900">
                {b.title}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-primary-600">
                {b.author}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-primary-600">
                {b.year}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full
                  ${
                    b.status === 'in'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }
                  transition-colors duration-150`}
                >
                  {b.status === 'in' ? 'Available' : 'Checked Out'}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-primary-600">
                <div className="flex space-x-3">
                  {role === 'admin' && (
                    <>
                      <button
                        onClick={() => onEdit(b)}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-150"
                        title="Edit book"
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteBook(b.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-150"
                        title="Delete book"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  {b.status === 'in' ? (
                    <button
                      onClick={() => checkOut(b.id)}
                      className="text-primary-500 hover:text-primary-700 transition-colors duration-150"
                      title="Check out book"
                    >
                      <BookOpenIcon className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => checkIn(b.id)}
                      className="text-green-500 hover:text-green-700 transition-colors duration-150"
                      title="Check in book"
                    >
                      <BookmarkIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
