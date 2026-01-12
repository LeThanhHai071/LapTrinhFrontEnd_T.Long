import React from "react";
import { Link } from "react-router-dom";

const CategoryList = ({ data }) => {
  if (!data || !data.articles || data.articles.length === 0) return null;

  const streamArticles = data.articles.slice(5);
  const category = data;

  return (
    <div className="list__stream-main list__main_check list__stream-checkhot">
      {streamArticles.map((article, index) => {
        return (
          <div
            key={article.id}
            className="box-category-item"
            data-id={article.id}
          >
            {/* Khối Ảnh */}
            <Link
              className="box-category-link-with-avatar img-resize"
              to={`/article/${article.id}`}
              title={article.title}
            >
              <img
                data-type="avatar"
                src={article.imageURL}
                alt={article.title}
                title={article.title}
                className="box-category-avatar"
                loading="lazy"
              />
            </Link>

            {/* Khối Nội dung */}
            <div className="box-category-content">
              {/* Tên danh mục */}
              <Link
                to={`/category/${category.fullSlug}`}
                className="box-category-category"
                title={category.categoryName}
              >
                {category.categoryName}
              </Link>

              {/* Tiêu đề bài viết */}
              <h3 className="box-title-text">
                <Link
                  to={`/article/${article.id}`}
                  className="box-category-link-title"
                  title={article.title}
                >
                  {article.title}
                </Link>
              </h3>

              {/* Bài liên quan (Nếu có dữ liệu liên quan từ API) */}
              {/* {article.relatedArticle && (
                <div className="item-related">
                  <a
                    className="box-category-related-link-title"
                    href={article.relatedArticle.link}
                    title={article.relatedArticle.title}
                  >
                    {article.relatedArticle.title}
                  </a>
                </div>
              )} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
