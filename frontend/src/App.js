import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/SignUp";

function App() {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken} />}/>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
