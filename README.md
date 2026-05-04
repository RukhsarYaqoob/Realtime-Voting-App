# 🗳️ VotePulse — Live Voting App

## 🎥 Project Demo

▶️ Watch Demo:  
👉 https://voting-app-ysgy.onrender.com/

---

## 📌 Overview

VotePulse is a real-time voting application where users can register, log in, create polls, cast their votes, and instantly see live percentage results. Results update across all connected browsers in real-time using WebSockets — vote in one browser and watch the results change in another.

This project demonstrates full-stack development including authentication, real-time communication, CRUD operations, and responsive UI design.

---

## 📂 Project Structure

```bash
VotePulse/
│
├── frontend/        # React Application
│
└── backend/         # Node.js & Express API
```

---

## 🧑‍💻 Tech Stack

### 🎨 Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Socket.io Client
- Axios
- Context API

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io (WebSockets)
- REST APIs

### 🔐 Authentication & Security
- JWT (JSON Web Token)
- Protected Routes
- Token-Based Authentication

---

## ✨ Features

### 👤 User Auth
- User registration & login
- JWT-based secure sessions
- Protected routes (only logged-in users can vote/create polls)

---

### 🗳️ Poll Management
- Create new polls with multiple options
- Edit existing polls
- Delete polls
- Browse all available polls

---

### 📊 Live Voting & Results
- Submit vote on any poll
- Real-time percentage display after voting
- Live result page — updates instantly across all browsers
- WebSocket (Socket.io) powered live sync

---

## 🚀 Key Highlights

* **Real-Time Results:** Using **Socket.io** to broadcast vote updates across all connected clients instantly.
* **Secure Voting:** JWT authentication ensures only logged-in users can vote.
* **Responsive UI:** Fully fluid interface built with **Tailwind CSS**.
* **CRUD Operations:** Full poll lifecycle — create, browse, edit, delete.
* **Protected Routes:** Unauthorized users are redirected to login.

---

## 🧑‍💻 My Contribution

- Developed complete **Frontend** (React + Tailwind)
- Implemented **JWT Authentication** with protected routes
- Integrated **Socket.io** for real-time live result syncing
- Built **Poll CRUD** — create, edit, delete, browse pages
- Designed **Live Results Page** with real-time percentage bars
- Connected frontend with backend REST APIs

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/RukhsarYaqoob/Realtime-Voting-App.git
cd votepulse
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file inside backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run backend:

```bash
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Setup

⚠️ Environment variables are not included for security reasons.  
Please create your own `.env` file using `.env.example`.

---

## 📌 Project Purpose

This project is built for **portfolio purposes** to demonstrate:

- Real-time WebSocket integration
- Full-Stack MERN Development
- Authentication & Authorization
- Live Data Sync Across Clients
- Poll CRUD System