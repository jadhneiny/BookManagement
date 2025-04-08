# 📚 Mini Library Management System

A full-stack web application to manage a small digital library.  
Users can log in with different roles, view and search books, borrow or return them, and (if admin) add, edit, and delete books.

---

## 🚀 Features

- 🔐 **Role-Based Authentication** (`admin`, `user`)
- 📘 **Book Management**: Add, edit, delete (admin only)
- 🔍 **Search by title/author**
- ✅ **Check-in / Check-out** functionality
- 🎨 **Modern UI** with Tailwind CSS
- 🧠 **Smart conditional UI** based on user role

---

## 🧑‍💻 Tech Stack

| Layer      | Tech                     |
|------------|--------------------------|
| Frontend   | React + Tailwind CSS     |
| Backend    | Node.js + Express        |
| Database   | SQLite (local, zero config) |

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/library-management.git
cd library-management
npm install
node server.js
Runs on http://localhost:3001

Creates books.db in db/ directory

Auto-seeds users table with test accounts

cd frontend
npm install
npm start



👥 Test Users
These are preloaded into the system:

🔐 Admin User
Email: admin@lib.com

Role: admin

✅ Can add/edit/delete books

✅ Can check in/out books

👤 Regular User
Email: user@lib.com

Role: user

❌ Cannot add/edit/delete

✅ Can view, search, check in/out books


🧪 How to Test
Start both the backend and frontend servers

Navigate to http://localhost:3000

Login using either role

Test role-specific features:

admin@lib.com ➝ Full access

user@lib.com ➝ Limited access


🗂️ Project Structure
book-management/
├── db/
│   └── books.db             # SQLite DB (auto-generated)
├── routes/
│   ├── books.js             # Book-related APIs
│   └── users.js             # Login/auth route
├── server.js                # Express backend entry point
├── frontend/
│   └── src/
│       ├── App.js
│       ├── BookForm.js
│       ├── BookList.js
│       ├── LoginForm.js
│       ├── SearchBar.js
│       └── index.js
