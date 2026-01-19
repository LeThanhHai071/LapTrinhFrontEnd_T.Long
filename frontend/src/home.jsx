import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeFocus from "./pages/HomeFocus";
import HomeFocusSub from "./pages/HomeFocusSub";
import NewsSection from "./pages/NewsSection";
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
      <div className="section__home-focus">
        <div className="container">
          <div className="section__hf-flex">
            <div className="section__hf-main left-column">
              <div className="box-category-middle">
                <HomeFocus articles={focusArticles} />
              </div>
            </div>

            <div className="section__hf-sub right-column">
              <HomeFocusSub latestNews={latestArticles} />
            </div>
          </div>
        </div>
      </div>
      <div className="section__news-sp">
        <div className="container">
          <NewsSection />
        </div>
      </div>
    </main>
  );
};

export default Home;
