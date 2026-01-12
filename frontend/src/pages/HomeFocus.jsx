import React from "react";
import { Link } from "react-router-dom";
import "./HomeFocus.css";

const HomeFocus = ({ articles }) => {
  if (!articles || !Array.isArray(articles) || articles.length === 0)
    return null;

  const firstItem = articles[0];
  const relatedItems = articles.slice(1, 4); 
  const subItems = articles.slice(4, 12);

  return (
    <div className="box-category-item-main">
      {firstItem && (
        <div className="item-first">
          <Link
            to={`/article/${firstItem.id}`}
            className="box-category-link-with-avatar img-resize"
          >
            <img
              src={firstItem.imageURL}
              className="box-category-avatar"
              alt={firstItem.title}
            />
          </Link>
          <div className="box-category-content">
            <h2 className="box-title-text">
              <Link
                to={`/article/${firstItem.id}`}
                className="box-category-link-title"
              >
                {firstItem.title}
              </Link>
            </h2>
            <Link
              to={`/article/${firstItem.id}`}
              className="box-category-sapo d-block"
            >
              {firstItem.description}
            </Link>
          </div>
        </div>
      )}

      <div className="item-related">
        {relatedItems.map((item) => (
          <div className="box-category-item" key={item.id}>
            <div className="box-category-content">
              <h3 className="box-title-text">
                <Link
                  to={`/article/${item.id}`}
                  className="box-category-link-title"
                >
                  {item.title}
                </Link>
              </h3>
              <Link
                to={`/article/${item.id}`}
                className="box-category-sapo d-block"
              >
                {item.description?.substring(0, 150)}...
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="item-sub">
        {subItems.map((item) => (
          <div className="box-category-item" key={item.id}>
            <Link
              to={`/article/${item.id}`}
              className="box-category-link-with-avatar img-resize"
            >
              <img
                src={item.imageURL}
                className="box-category-avatar"
                alt={item.title}
                loading="lazy"
              />
            </Link>
            <h3 className="box-title-text">
              <Link
                to={`/article/${item.id}`}
                className="box-category-link-title"
              >
                {item.title}
              </Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFocus;