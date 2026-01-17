import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import MainLayout from "./components/MainLayout";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import NewsList from "./NewsList";
import NewsDetail from "./newsDetail";
import Subscription from "./Subscription";
import Advertise from "./Advertise";
import ShowWeather from "./ShowWeather";
import SearchPage from "./SearchPage.jsx";
import SearchDetailResult from "./SearchDetailResult.jsx";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    {/*<Route path="news/:slug" element={<NewsList />} />*/}
                    <Route path="news/:id" element={<NewsDetail />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="subscription" element={<Subscription />} />
                    <Route path="advertise" element={<Advertise />} />
                    <Route path="weather" element={<ShowWeather />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="search-detail/:id" element={<SearchDetailResult />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
