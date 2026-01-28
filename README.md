# 🚀 MyApp – Full Stack MERN Application

A full-stack web application built using **MongoDB, Express.js, React, and Node.js** with **JWT Authentication**, protected routes, and a clean, scalable folder structure.

This project is designed as an **industry-ready practice project** for learning real-world backend + frontend integration.

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcryptjs
* dotenv

### Frontend

* React.js
* React Router DOM
* Axios
* Context API / React Hooks

---

## 📁 Project Structure

```
MYAPP/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── authUser.controllers.js
│   │
│   ├── middlewares/
│   │   └── isLoggedIn.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── post.model.js
│   │
│   ├── routes/
│   │   └── user.routes.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── context/
    │   └── App.jsx
    └── package.json
```

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Token Generation
* Token-based authentication
* Protected routes using middleware

### 👤 User Features

* Fetch logged-in user details
* Secure dashboard access
* Logout handling

### 📦 Backend Architecture

* MVC Pattern (Models, Controllers, Routes)
* Centralized MongoDB connection
* Authentication middleware
* Reusable utility functions

### ⚛ Frontend Features

* React Router protected routes
* Axios API service layer
* Auth state handling
* Auto redirect on logout

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Run Project Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/ukshitchauhan/MyApp.git
cd myapp
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🚧 Future Improvements

* Role-based authorization
* Image upload (Cloudinary)
* Pagination & search
* Socket.io for real-time updates
* Deployment (Render / Vercel)

---

## 🤝 Contributing

Pull requests are welcome. Feel free to fork the repository and submit improvements.

---

## 📄 License

This project is for learning and practice purposes.

---

### 💡 Author

**Ukshit Chauhan**
GitHub: [https://github.com/ukshitchauhan](https://github.com/ukshitchauhan)
Full Stack Developer (MERN Stack)
