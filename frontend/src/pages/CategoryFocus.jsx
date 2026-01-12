import React from "react";

const CategoryFocus = ({ data }) => {
  // Kiểm tra nếu chưa có dữ liệu
  if (!data || !data.articles || data.articles.length === 0) return null;

  const { articles } = data;

  // Hàm helper để lấy ID từ cuối link (ví dụ: ...-185260111210602152.htm -> 185260111210602152)
  const getArticleId = (url) => {
    const matches = url.match(/-(\d+)\.htm/);
    return matches ? matches[1] : "";
  };

  // Phân bổ dữ liệu theo layout trong ảnh
  const mainArticle = articles[0]; // Bài to bên trái
  const sidebarArticles = articles.slice(1, 3); // 2 bài bên phải
  const bottomArticles = articles.slice(3, 5); // 2 bài hàng dưới

  return (
    <div className="list__focus-main">
      <div className="box-category" data-layout="17">
        <div className="box-category-middle">
          {/* PHẦN TRÊN: BÀI CHÍNH VÀ 2 BÀI CỘT PHẢI */}
          <div className="box-category-item-main">
            {/* 1. Bài chính (Large) */}
            {mainArticle && (
              <div
                className="item-first"
                data-id={getArticleId(mainArticle.link)}
              >
                <a
                  className="box-category-link-with-avatar img-resize"
                  href={mainArticle.link}
                >
                  <img
                    src={mainArticle.imageURL}
                    alt={mainArticle.title}
                    className="box-category-avatar"
                  />
                </a>
                <div className="box-category-content">
                  <h2 className="box-title-text">
                    <a
                      className="box-category-link-title"
                      href={mainArticle.link}
                    >
                      {mainArticle.title}
                    </a>
                  </h2>
                  <div className="box-category-sapo d-block">
                    {mainArticle.description}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Cột 2 bài bên phải */}
            <div className="item-related">
              {sidebarArticles.map((item, index) => (
                <div
                  key={index}
                  className="box-category-item"
                  data-id={getArticleId(item.link)}
                >
                  <a
                    className="box-category-link-with-avatar img-resize"
                    href={item.link}
                  >
                    <img
                      src={item.imageURL}
                      alt={item.title}
                      className="box-category-avatar"
                    />
                  </a>
                  <div className="box-category-content">
                    <h3 className="box-title-text">
                      <a className="box-category-link-title" href={item.link}>
                        {item.title}
                      </a>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PHẦN DƯỚI: 2 BÀI HÀNG NGANG */}
          <div className="box-category-sub">
            {bottomArticles.map((item, index) => (
              <div
                key={index}
                className="box-category-item"
                data-id={getArticleId(item.link)}
              >
                <a
                  className="box-category-link-with-avatar img-resize"
                  href={item.link}
                >
                  <img
                    src={item.imageURL}
                    alt={item.title}
                    className="box-category-avatar"
                  />
                </a>
                <div className="box-category-content">
                  <h3 className="box-title-text">
                    <a className="box-category-link-title" href={item.link}>
                      {item.title}
                    </a>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFocus;
