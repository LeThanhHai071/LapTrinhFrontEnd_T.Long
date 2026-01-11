// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { fetchAllNews } from "./services/newsService";
// import { flattenNews } from "./untils/newsHelper";
// import "./home.css";

// const ALLOWED_CATEGORIES = [
//   "Thời sự",
//   "Chính trị",
//   "Chào ngày mới",
//   "Kinh tế",
//   "Giải trí",
//   "Thể thao",
// ];

// const Home = () => {
//   const [newsByCate, setNewsByCate] = useState({});

//   useEffect(() => {
//     fetchAllNews().then((data) => {
//       const flatNews = flattenNews(data);

//       // gom bài theo cateName
//       const grouped = {};

//       flatNews.forEach((item) => {
//         if (!ALLOWED_CATEGORIES.includes(item.cateName)) return;

//         if (!grouped[item.cateName]) {
//           grouped[item.cateName] = [];
//         }

//         grouped[item.cateName].push(item);
//       });

//       setNewsByCate(grouped);
//     });
//   }, []);

//   // ===== TIN HOT: lấy bài đầu tiên của Thời sự =====
//   const hotNews = newsByCate["Thời sự"]?.[0];

//   return (
//     <div className="home">
//       {/* ===== HOT NEWS ===== */}
//       {hotNews && (
//         <section className="top-section">
//           <div className="hot-news">
//             <Link to={`/news/${btoa(hotNews.link)}`}>
//               <img src={hotNews.imageUrl} alt={hotNews.title} />
//               <h1>{hotNews.title}</h1>
//             </Link>
//             <p>{hotNews.sapo}</p>
//           </div>
//         </section>
//       )}

//       {/* ===== CATEGORIES ===== */}
//       {ALLOWED_CATEGORIES.map((cate) => {
//         const list = newsByCate[cate];
//         if (!list || list.length === 0) return null;

//         return (
//           <section className="category" key={cate}>
//             <h2>{cate}</h2>

//             <div className="category-grid">
//               {list.slice(0, 3).map((item) => (
//                 <Link
//                   key={item.link}
//                   to={`/news/${btoa(item.link)}`}
//                   className="news-card"
//                 >
//                   <img src={item.imageUrl} alt={item.title} />
//                   <h3>{item.title}</h3>
//                   <p>{item.sapo}</p>
//                 </Link>
//               ))}
//             </div>
//           </section>
//         );
//       })}
//     </div>
//   );
// };

// export default Home;

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

        setFocusArticles(focusRes.data || []);
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
