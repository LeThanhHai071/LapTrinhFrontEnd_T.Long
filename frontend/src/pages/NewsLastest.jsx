import React, { useEffect, useState } from "react";
import BoxCategoryItem from "./BoxCategoryItem";
import axios from "axios";
import "./NewsLastest.css";

const NewsLastest = () => {
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [latestRes] = await Promise.all([
          axios.get("http://localhost:5000/api/latest"),
        ]);

        setLatestArticles(latestRes.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="lastest_content">
      <div className="layout__breadcrumb">
        <div className="container">
          <div className="box-breadcrumb" data-layout="1">
            <div className="box-breadcrumb-name">
              <a href="/tin-moi.htm" title="Tin mới">
                Tin mới
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="list__new">
        <div className="container">
          <div className="list__new-flex">
            <div className="list__new-main list__stream-checkhot">
              <div className="box-category">
                <div className="box-category-middle list__main_check">
                  {latestArticles.map((item) => (
                    <BoxCategoryItem key={item.id} data={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLastest;
