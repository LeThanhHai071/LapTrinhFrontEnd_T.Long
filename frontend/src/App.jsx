import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import Register from "./register";
import ShowWeather from "./ShowWeather";
import Advertise from "./advertise";
import NewsDetail from "./newsDetail.jsx";
import Subscription from "./Subscription.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/advertise" element={<Advertise />} />
                <Route path="/weather" element={<ShowWeather />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
