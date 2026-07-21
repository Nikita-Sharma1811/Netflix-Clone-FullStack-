import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";
import Admin from "./pages/Admin";
import Search from "./pages/Search";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/movie/:id" element={<MovieDetails />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/watchlist" element={<Watchlist />} />

      
      <Route path="/search" element={<Search />} />


      <Route path="/admin" element={<Admin />} />
      

    </Routes>
  );
}

export default App;