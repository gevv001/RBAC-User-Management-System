# RBAC User Management System

A full-stack Role-Based Access Control (RBAC) User Management System built with **Node.js**, **Express**, **MongoDB**, and **React**. This application allows administrators to manage users, roles, and permissions securely. It includes user authentication, registration via email invite, password reset functionality, and a simple user profile dashboard.

## ⚙️ Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure password hashing with bcrypt
* Role-based access control (RBAC)
* Permission-based route protection
* Invite-only registration flow
* Password reset via email link

### 👤 User Management

* Admin dashboard to:

  * View all users (except self)
  * Invite new users (email, full name, role)
  * Edit user info and role
  * Delete users
* Profile page for logged-in users to:

  * View and edit their own profile
  * Upload or update avatar image
  * Change password

### 📷 Avatar Support

* File upload via Multer middleware
* Images stored in MongoDB buffer
* Default avatar fallback for users without uploads

### 🧠 Tech Stack

#### Backend:

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT for authentication
* Multer for file uploads
* dotenv for environment configs
* Nodemailer for emails

#### Frontend:

* React (JavaScript)
* React Router v6
* Axios for API communication
* Pure CSS

---

## 🗂 Project Structure

```
Backend/
├── controllers/
├── routes/
├── models/
├── services/
├── middlewares/
├── utils/
├── config/
├── uploads/ (if storing files locally)
├── app.js
├── initAdmin.mjs
├── admin-seeded.flag
└── .env

Frontend/src/
├── components/
├── pages/
├── contexts/
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

---

## 🚀 Getting Started

### 📦 Backend Setup

```bash
cd Backend
npm install
```

### 📁 Environment Variables

Create a `.env` file inside the `Backend/` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection
EMAIL_USER=email_that_sends_invitation
EMAIL_PASS=inviter_email_password
JWT_SECRET=your_jwt_secret
JWT_INVITE_TOKEN=your_jwt_invite
JWT_RESET_TOKEN=your_jwt_reset
SEED_ADMIN=false
ADMIN_EMAIL=first_admin_email
ADMIN_PASSWORD=first_admin_password
ADMIN_FULLNAME=first_admin_fullname
```

### 🔑 Seed Admin User (optional)

```bash
node initAdmin.mjs
```

### ▶️ Run Backend

```bash
npm run dev
```

---

### 💻 Frontend Setup

```bash
cd Frontend
npm install
```

### ▶️ Run Frontend

```bash
npm start
```

---

## 📮 API Endpoints

### Authentication

* `POST /auth/login`
* `POST /auth/invite`
* `POST /auth/complete-registration`
* `POST /auth/forgot-password`
* `POST /auth/reset-password/:token`

### User Management

* `GET /users`
* `GET /users/:id`
* `PATCH /users/:id` – edit name/email/role
* `DELETE /users/:id`
* `PATCH /users/:id/role` – admin only
* `GET /users/me`
* `PATCH /users/me`

### Profile & Avatar

* `POST /photos` – upload avatar
* `GET /photos/:id` – get avatar

---

## 🔐 Role & Permission System

### Roles

* `admin`
* `user`

### Sample Permissions

* `USERS_READ`
* `USERS_UPDATE`
* `USERS_PERM_UPDATE`
* `USERS_INVITE`

Each role is mapped to a set of permissions in `utils/permissions.js`. Permissions are checked using custom middleware `authPermissions()`.

---

## 🧪 Future Improvements

* Add unit/integration tests with Jest
* Improve image storage (e.g., migrate to AWS S3)
* Add rate-limiting for auth endpoints
* Use refresh tokens for long-lived sessions
* Better validation with `Joi` or `express-validator`

---

## 👨‍💻 Author

**Gevorg Torosyan**
GitHub: [@gevv001](https://github.com/gevv001)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
