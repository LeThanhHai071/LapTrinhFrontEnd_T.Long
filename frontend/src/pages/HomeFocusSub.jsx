import React from "react";
import { Link } from "react-router-dom";

const HomeFocusSub = ({ latestNews }) => {
  const getArticleId = (link) => {
    if (!link) return Math.random();
    const match = link.match(/-(\d+)\.htm$/);
    return match ? match[1] : link;
  };
  return (
    <div className="section__hf-box-news-read">
      <div className="box-tab">
        <Link to={"/category/lastestNews"} className="item">
          Tin mới
        </Link>
      </div>
      <div className="content-tab">
        <div className="box-category box-border-top">
          <div className="box-category-middle">
            {latestNews &&
              latestNews.slice(0, 4).map((item) => (
                <div
                  key={getArticleId(item.link)}
                  className="box-category-item box-item-news"
                >
                  <h3 className="box-title-text">
                    <Link
                      to={`/article/${getArticleId(item.link)}`}
                      className="box-category-link-title"
                    >
                      {item.title}
                    </Link>
                  </h3>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="sidebar-footer">
        <Link to={"/category/lastestNews"} className="view-more">
          Xem thêm
        </Link>
      </div>
    </div>
  );
};

export default HomeFocusSub;
