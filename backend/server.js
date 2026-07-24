const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");


dotenv.config();


console.log(process.env.JWT_SECRET);
connectDB();

const app = express();

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
  : ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/movies", movieRoutes);
app.get("/", (req, res) => {
  res.send("🎬 Netflix Backend is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});