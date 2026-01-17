import React from "react";
import NewsItem24H from "./NewsItem24h";

const News24hSection = ({ categoryTitle, categoryUrl, articles }) => {
  return (
    <div className="section__nsp-box-24h" data-vr-zone="Home - Tin 24h">
      <div className="box-category box-border-top" data-layout="3">
        {/* Header của Section */}
        <div className="box-category-top">
          <h2 className="title-category">
            <a
              className="box-category-title"
              href={categoryUrl}
              title={categoryTitle}
            >
              {categoryTitle}
            </a>
          </h2>
        </div>

        {/* Danh sách bài viết */}
        <div className="box-category-middle">
          {articles.map((article, index) => (
            <NewsItem24H
              key={article.id || index}
              {...article}
              isFirst={index === 0} // Đánh dấu phần tử đầu tiên nếu cần style riêng
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default News24hSection;
