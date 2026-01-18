import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import SavedArticle from "./savedArticle";

import MainLayout from "./components/MainLayout";
import Home from "./home";
import Login from "./login";
import Profile from "./profile";
import Register from "./register";
import NewsList from "./NewsList";
import NewsDetail from "./newsDetail.jsx";
import Subscription from "./Subscription";
import Advertise from "./Advertise";
import ShowWeather from "./ShowWeather";
import SearchPage from "./SearchPage.jsx";
import SearchDetailResult from "./SearchDetailResult.jsx";
import Category from "./pages/Category.jsx";
import ChangePassword from "./ChangePassword";
import NewsLastest from "./pages/NewsLastest.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="news/:slug" element={<NewsList />} />
          <Route path="article/:id" element={<NewsDetail />} />
          <Route path="category/:slug" element={<Category />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="advertise" element={<Advertise />} />
          <Route path="weather" element={<ShowWeather />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="lastest" element={<NewsLastest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
