import React, { useEffect, useState } from "react";
import BoxCategoryMiddle from "./BoxCategoryMiddle_col";
import BoxCategoryItem from "./BoxCategoryItem";
import { data, Link } from "react-router-dom";
import axios from "axios";

const NewsSection = () => {
  const [tin24h, setTin24h] = useState(null);
  const [tin360, setTin360] = useState(null);
  const [tinThiTruong, setTinThiTruong] = useState(null);
  const [gioiTre, setGioiTre] = useState(null);
  const [doiSong, setDoiSong] = useState(null);

  const [loading, setLoading] = useState(true);

  const getArticleId = (url) => {
    const matches = url.match(/-(\d+)\.htm/);
    return matches ? matches[1] : "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tin24hRes, tin360Res, tinThiTruongRes, doiSongRes, gioiTreRes] =
          await Promise.all([
            axios.get("http://localhost:5000/api/category/tin-24h"),
            axios.get("http://localhost:5000/api/category/tin-nhanh-360"),
            axios.get("http://localhost:5000/api/category/tin-thi-truong"),
            axios.get("http://localhost:5000/api/category/doi-song"),
            axios.get("http://localhost:5000/api/category/gioi-tre"),
          ]);

        setTin24h(tin24hRes.data || []);
        setTin360(tin360Res.data || []);
        setTinThiTruong(tinThiTruongRes.data || []);
        setDoiSong(doiSongRes.data || []);
        setGioiTre(gioiTreRes.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="section__nsp-flex">
      <div className="section__nsp-main">
        {tin24h && (
          <div className="section__nsp-box-24h">
            <div className="box-category box-border-top">
              <div className="box-category-top">
                <h2 className="title-category">
                  <Link
                    className="box-category-title"
                    to={`/category/${tin24h.fullSlug}`}
                    title={tin24h.categoryName}
                  >
                    {tin24h.categoryName}
                  </Link>
                </h2>
              </div>
              <div className="box-category-middle">
                {tin24h.articles?.slice(0, 8).map((item) => (
                  <BoxCategoryItem key={getArticleId(item.link)} data={item} />
                ))}
              </div>
            </div>
          </div>
        )}
        {tin360 && (
          <div className="section__nsp-box-360">
            <div className="box-category">
              <div className="box-category-top">
                <h2 className="title-category">
                  <Link
                    to={`/category/${tin360.fullSlug}`}
                    className="box-category-title"
                    title={tin360.categoryName}
                  >
                    {tin360.categoryName}
                  </Link>
                </h2>
              </div>
              <BoxCategoryMiddle articles={tin360.articles} />
            </div>
          </div>
        )}
        {tinThiTruong && (
          <div className="section__nsp-box-mart">
            <div className="box-category box-border-top" data-layout="3">
              <div className="box-category-top">
                <h2 className="title-category">
                  <Link
                    className="box-category-title"
                    to={`/category/${tinThiTruong.fullSlug}`}
                    title={tinThiTruong.categoryName}
                  >
                    {tinThiTruong.categoryName}
                  </Link>
                </h2>
              </div>
              <div className="box-category-middle">
                {tinThiTruong.articles?.slice(0, 8).map((item) => (
                  <BoxCategoryItem key={getArticleId(item.link)} data={item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="section__nsp-sub">
        {gioiTre && (
          <div className="section__nsp-box-cate">
            <div className="box-category box-border-top">
              <div className="box-category-top">
                <h2 className="title-category">
                  <Link
                    className="box-category-title"
                    to={`/category/${gioiTre.fullSlug}`}
                    title={gioiTre.categoryName}
                  >
                    {gioiTre.categoryName}
                  </Link>
                </h2>
              </div>
              <div className="box-category-middle">
                <BoxCategoryItem data={gioiTre.articles[0]} />
                <div className="box-category-sub">
                  {gioiTre.articles?.slice(1, 4).map((item) => (
                    <BoxCategoryItem key={item.id} data={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {doiSong && (
          <div className="section__nsp-box-cate">
            <div className="box-category box-border-top">
              <div className="box-category box-border-top">
                <div className="box-category-top">
                  <h2 className="title-category">
                    <Link
                      className="box-category-title"
                      to={`/category/${doiSong.fullSlug}`}
                      title={doiSong.categoryName}
                    >
                      {doiSong.categoryName}
                    </Link>
                  </h2>
                </div>
                <div className="box-category-middle">
                  <BoxCategoryItem data={doiSong.articles[0]} />
                  <div className="box-category-sub">
                    {doiSong.articles?.slice(1, 4).map((item) => (
                      <BoxCategoryItem key={item.id} data={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;
