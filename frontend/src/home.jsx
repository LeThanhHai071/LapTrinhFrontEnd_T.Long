import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllNews } from "./services/newsService";
import { flattenNews } from "./untils/newsHelper";
import "./home.css";

const ALLOWED_CATEGORIES = [
  "Thời sự",
  "Chính trị",
  "Chào ngày mới",
  "Kinh tế",
  "Giải trí",
  "Thể thao",
];

const Home = () => {
  const [newsByCate, setNewsByCate] = useState({});

  useEffect(() => {
    fetchAllNews().then((data) => {
      const flatNews = flattenNews(data);

      // gom bài theo cateName
      const grouped = {};

      flatNews.forEach((item) => {
        if (!ALLOWED_CATEGORIES.includes(item.cateName)) return;

        if (!grouped[item.cateName]) {
          grouped[item.cateName] = [];
        }

        grouped[item.cateName].push(item);
      });

      setNewsByCate(grouped);
    });
  }, []);

  // ===== TIN HOT: lấy bài đầu tiên của Thời sự =====
  const hotNews = newsByCate["Thời sự"]?.[0];

  return (
    <div className="home">
      {/* ===== HOT NEWS ===== */}
      {hotNews && (
        <section className="top-section">
          <div className="hot-news">
            <Link to={`/news/${btoa(hotNews.link)}`}>
              <img src={hotNews.imageUrl} alt={hotNews.title} />
              <h1>{hotNews.title}</h1>
            </Link>
            <p>{hotNews.sapo}</p>
          </div>
        </section>
      )}

      {/* ===== CATEGORIES ===== */}
      {ALLOWED_CATEGORIES.map((cate) => {
        const list = newsByCate[cate];
        if (!list || list.length === 0) return null;

        return (
          <section className="category" key={cate}>
            <h2>{cate}</h2>

            <div className="category-grid">
              {list.slice(0, 3).map((item) => (
                <Link
                  key={item.link}
                  to={`/news/${btoa(item.link)}`}
                  className="news-card"
                >
                  <img src={item.imageUrl} alt={item.title} />
                  <h3>{item.title}</h3>
                  <p>{item.sapo}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Home;
