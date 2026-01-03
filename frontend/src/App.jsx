import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import MainLayout from "./components/MainLayout";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import NewsDetail from "./NewsDetail";
import Subscription from "./Subscription";
import Advertise from "./Advertise";
import ShowWeather from "./ShowWeather";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout chính */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="advertise" element={<Advertise />} />
          <Route path="weather" element={<ShowWeather />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
