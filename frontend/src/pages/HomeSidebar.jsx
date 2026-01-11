import React from "react";
import { Link } from "react-router-dom";

const HomeSidebar = ({ latestNews }) => {
  return (
    <aside className="home-sidebar">
      <div className="sidebar-box">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Tin mới</h2>
        </div>
        <ul className="sidebar-list">
          {latestNews &&
            latestNews.map((item) => (
              <li key={item.id} className="sidebar-item">
                <Link to={`/article/${item.id}`} className="sidebar-link">
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
