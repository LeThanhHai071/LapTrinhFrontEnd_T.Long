import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import MainLayout from "./components/MainLayout";
import Home from "./home";
import Login from "./login";
import Profile from "./profile";
import Register from "./register";
import NewsList from "./NewsList"; // Giữ lại NewsList
import NewsDetail from "./newsDetail";
import Subscription from "./Subscription";
import Advertise from "./Advertise";
import ShowWeather from "./ShowWeather";
import SearchPage from "./SearchPage.jsx";
import SearchDetailResult from "./SearchDetailResult.jsx";
import Category from "./pages/Category.jsx";
import ChangePassword from "./ChangePassword";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />

                    {/* Các Route từ nhánh Hung */}
                    <Route path="news/:id" element={<NewsDetail />} />

                    {/* Các Route từ nhánh Main */}
                    <Route path="category/:slug" element={<Category />} />
                    <Route path="article/:id" element={<NewsDetail />} />
                    <Route path="change-password" element={<ChangePassword />} />
                    <Route path="profile" element={<Profile />} />

                    {/* Các Route chung của cả 2 nhánh */}
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="subscription" element={<Subscription />} />
                    <Route path="advertise" element={<Advertise />} />
                    <Route path="weather" element={<ShowWeather />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="search-detail/:id" element={<SearchDetailResult />} />

                    {/* Route NewsList (trước đó bị comment, mình đã mở lại để không mất route nào) */}
                    <Route path="news-list/:slug" element={<NewsList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;