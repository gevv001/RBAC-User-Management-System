# RBAC User Management System

A full-stack user management system implementing **Role-Based Access Control (RBAC)** using Node.js, Express, MongoDB, and React. Admins can invite users, assign roles, and manage accounts, while users can log in, complete registration, update profiles, and reset passwords.

## 🚀 Features

- ✅ Authentication with JWT
- ✅ Role-based access (Admin, User, etc.)
- ✅ Admin can:
  - Invite users
  - Edit user info (name, email)
  - Change user roles
  - Delete users
- ✅ Users can:
  - Complete registration from invite link
  - Log in and reset password
  - View and update their profile
- ✅ Avatar upload and editing support (coming soon)
- 🔐 Protected routes and pages based on roles

---

## 📁 Project Structure

RBAC-User-Management-System/
│
├── Backend/ # Express + MongoDB backend
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── config/
  ├── services/
│ └── app.js
│
├── Frontend/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── contexts/
│ │ ├── pages/
│ │ └── App.jsx
│ 
│
├── .gitignore
└── README.md

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB running locally or in the cloud (e.g. MongoDB Atlas)

### Clone the repository

```bash
git clone https://github.com/gevv001/RBAC-User-Management-System.git
cd RBAC-User-Management-System

1️⃣ Backend Setup

cd Backend
npm install
Create .env file in Backend/ directory:
PORT=3000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=email_address
EMAIL_PASS=email_pass 
JWT_TOKEN=your_token
JWT_INVITE_TOKEN=your_invite_token
JWT_RESET_TOKEN=your_reset_token
Start the backend server
node app.js

2️⃣ Frontend Setup

cd ../Frontend
npm install
Start the frontend

npm run dev
The app will be running at: http://localhost:5173

📦 API Overview
Auth

POST /auth/invite

POST /auth/login

POST /auth/forgot-password

PATCH /auth/reset-password/:token

PATCH /auth/complete-registration/:token

Users

GET /users

GET /users/:id 

PATCH /users/:id — Edit user info

PATCH /users/:id/role — Change user role

DELETE /users/:id

🛡️ Role-Based Access Control
The app defines roles like admin and user Middleware ensures only authorized users can access sensitive routes and actions.

🧪 Tests
Testing is not yet implemented — you can contribute by adding tests using:

Jest / Supertest for backend

React Testing Library for frontend

🤝 Contributing
Pull requests are welcome! To contribute:

Fork the repo

Create your branch: git checkout -b feature-name

Commit your changes: git commit -am 'Add new feature'

Push to the branch: git push origin feature-name

Open a pull request

📜 License
MIT License — you can use this project freely for learning and development.

🧑‍💻 Author
Gevorg – GitHub Profile

📬 Feedback
If you have suggestions or find bugs, feel free to open an issue or contact the author.