import React from "react";
import { Link } from "react-router-dom";

const HomeSidebar = ({ latestNews }) => {
  const getArticleId = (link) => {
    if (!link) return Math.random(); 
    const match = link.match(/-(\d+)\.htm$/);
    return match ? match[1] : link; 
  };
  return (
    <aside className="home-sidebar">
      <div className="sidebar-box">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Tin mới</h2>
        </div>
        <ul className="sidebar-list">
          {latestNews &&
            latestNews.map((item) => (
              <li key={getArticleId(item.link)} className="sidebar-item">
                <Link to={`/article/${getArticleId(item.link)}`} className="sidebar-link">
                  {item.title}
                </Link>
              </li>
            ))}
        </ul>
        <div className="sidebar-footer">
          <button className="btn-view-more">Xem thêm</button>
        </div>
      </div>
    </aside>
  );
};

export default HomeSidebar;
