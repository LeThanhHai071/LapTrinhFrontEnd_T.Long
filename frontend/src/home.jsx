import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeFocus from "./pages/HomeFocus";
import HomeSidebar from "./pages/HomeSidebar";
import "./Home.css";

const Home = () => {
  const [focusArticles, setFocusArticles] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [focusRes, latestRes] = await Promise.all([
          axios.get("http://localhost:5000/api/category/home"),
          axios.get("http://localhost:5000/api/latest"),
        ]);

        setFocusArticles(focusRes.data.articles || []);
        setLatestArticles(latestRes.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;

  return (
    <main className="home-container">
      <div className="home-main-content">
        <div className="left-column">
          <HomeFocus articles={focusArticles} />
        </div>

        <div className="right-column">
          <HomeSidebar latestNews={latestArticles} />
        </div>
      </div>
    </main>
  );
};

export default Home;
