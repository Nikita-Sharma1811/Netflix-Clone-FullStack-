const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");


dotenv.config();

connectDB();

const app = express();

app.use(cors());
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