# 🎬 Netflix Clone (MERN Stack)

A full-stack Netflix Clone built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to browse movies, search content, watch trailers, like movies, manage a personal watchlist, and submit ratings and reviews. It also includes authentication and an admin panel for managing movie content.

---

## 🚀 Features

### User Features
- User Signup & Login (JWT Authentication)
- Browse all movies
- Netflix-style homepage
- Search movies by title
- Movie details page
- Watch YouTube trailers
- Like movies
- Add movies to Watchlist
- Remove movies from Watchlist
- Rate and review movies
- Similar movie recommendations
- Responsive UI

### Admin Features
- Add new movies
- Delete movies
- Manage movie collection

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js

---

## 📁 Project Structure

```
Netflix-Clone/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/netflix-clone.git
```

### 2. Navigate into the project

```bash
cd netflix-clone
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the **backend** folder and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## ▶️ Running the Project

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 📸 Screenshots

Add screenshots of your application here.

- Home Page
- Login Page
- Signup Page
- Movie Details
- Watchlist
- Admin Panel

---

## 📚 What I Learned

- Building a full-stack MERN application
- REST API development with Express.js
- MongoDB database design using Mongoose
- JWT-based Authentication
- React Hooks and React Router
- Axios for API integration
- CRUD Operations
- State Management
- Full-stack project deployment

