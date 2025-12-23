import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import Register from "./register";
import NewsDetail from "./newsDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
