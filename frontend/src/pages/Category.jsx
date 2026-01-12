import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryFocus from "./CategoryFocus";
import "./Category.css";
import CategoryList from "./CategoryList";

const Category = () => {
  const { slug } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [parentCategory, setParentCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const findCategoryHierarchy = (menuArray, targetSlug) => {
    for (let cat of menuArray) {
      // Trường hợp 1: Slug là category cha (ví dụ: /thoi-su)
      if (cat.fullSlug === targetSlug) {
        return { parent: cat, current: cat };
      }
      // Trường hợp 2: Slug là category con (ví dụ: /thoi-su-phap-luat)
      if (cat.children && cat.children.length > 0) {
        const child = cat.children.find((c) => c.fullSlug === targetSlug);
        if (child) {
          return { parent: cat, current: child };
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/category/${slug}`
        );
        if (!response.ok) throw new Error("Không thể lấy dữ liệu");
        const data = await response.json();
        setCategoryData(data);

        const menuRes = await fetch(`http://localhost:5000/api/categories`);
        const menuList = await menuRes.json();
        const hierarchy = findCategoryHierarchy(menuList, slug);
        if (hierarchy) {
          setParentCategory(hierarchy.parent);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCategory();
  }, [slug]);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;

  return (
    <div>
      {/* {currentMenu && (
        <div className="layout__breadcrumb">
          <div className="container">
            <div className="box-breadcrumb">
              <div className="box-breadcrumb-name">
                <h1>
                  <Link
                    className="category-page__name"
                    to={`/category/${currentMenu.fullSlug}`}
                  >
                    {currentMenu.name}
                  </Link>
                </h1>
              </div>

              <div className="box-breadcrumb-sub">
                <div className="list swiper">
                  <div className="swiper-wrapper">
                    {currentMenu.children &&
                      currentMenu.children.map((child) => (
                        <Link
                          key={child.id}
                          className="swiper-slide"
                          to={`/category/${child.fullSlug}`}
                          style={{ marginRight: "16px" }}
                        >
                          {child.name}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {parentCategory && (
        <div className="layout__breadcrumb">
          <div className="container">
            <div className="box-breadcrumb">
              <div className="box-breadcrumb-name">
                <h1>
                  <Link
                    className="category-page__name"
                    to={`/category/${parentCategory.fullSlug}`}
                    style={{
                      color:
                        slug === parentCategory.fullSlug ? "#28a745" : "#000",
                    }}
                  >
                    {parentCategory.name}
                  </Link>
                </h1>
              </div>

              <div className="box-breadcrumb-sub">
                <div className="list swiper">
                  <div className="swiper-wrapper">
                    {parentCategory.children?.map((child) => {
                      const isActive = slug === child.fullSlug;
                      return (
                        <Link
                          key={child.id}
                          className="swiper-slide"
                          to={`/category/${child.fullSlug}`}
                          style={{
                            marginRight: "16px",
                            color: isActive ? "#28a745" : "#000", 
                            fontWeight: isActive ? "bold" : "normal",
                          }}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="list__focus">
        <div className="container">
          <div className="list__focus-flex">
            <CategoryFocus data={categoryData} />
          </div>
        </div>
      </div>
      <div className="list__stream">
        <div className="container">
          <div className="list__stream-flex">
            <CategoryList data={categoryData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
