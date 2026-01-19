import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import {
  FacebookIconCustom,
  HomeIconCustom,
  YoutubeIconCustom,
  ZaloIconCustom,
} from "./Footer_SocialIcon";
import CategoryBox from "./CategoryBox";
import { useState } from "react";
import { useEffect } from "react";
import NavItem from "./NavItem";

const Navbar = ({ isOpen, onCloseMenu }) => {
  const [categories, setCategories] = useState([]);
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // 1. Lấy danh mục (Backend đã trả về dạng cây)
        const response = await axios.get(
          "http://localhost:5000/api/categories",
        );
        const rawTree = response.data;

        // 2. Lọc bỏ các mục không muốn hiển thị trên Navbar
        const EXCLUDED_SLUGS = [
          "home",
          "ban-can-biet",
          "ban-doc",
          "tieu-dung-thong-minh",
          "dien-dan",
          "podcast",
        ];
        const filteredTree = rawTree.filter(
          (cat) =>
            !EXCLUDED_SLUGS.includes(cat.slug) &&
            cat.children &&
            cat.children.length > 0,
        );

        setCategories(filteredTree);

        // 3. Lấy tin tức cho từng mục cha để hiển thị ở Sub-menu
        const newsPromises = filteredTree.map(async (cat) => {
          try {
            const res = await axios.get(
              `http://localhost:5000/api/category/${cat.fullSlug}`,
            );
            return { slug: cat.slug, data: res.data.articles || [] };
          } catch (err) {
            return { slug: cat.slug, data: [] };
          }
        });

        const newsResults = await Promise.all(newsPromises);
        const formattedNews = {};
        newsResults.forEach((item) => {
          formattedNews[item.slug] = item.data;
        });

        setNewsData(formattedNews);
      } catch (error) {
        console.error("Lỗi fetch menu:", error);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <div className="header__middle">
      <div className="header__postion">
        <div className="header__nav">
          <div className="header__nav-flex">
            <ul className="menu-nav">
              <li>
                <a href="/" className="nav-link home active" title="Trang chủ">
                  <HomeIconCustom />
                </a>
              </li>
              {categories.map((cat) => (
                <NavItem
                  key={cat.id}
                  category={cat}
                  articles={newsData[cat.slug] || []}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className={`header__mega-menu ${isOpen ? "is-active" : ""}`}>
          <div className="container">
            <div className="header__close-menu" onClick={onCloseMenu}>
              <span className="icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.19695 5.19695C5.45954 4.93435 5.88529 4.93435 6.14788 5.19695L17.8031 16.8521C18.0656 17.1147 18.0656 17.5405 17.8031 17.8031C17.5405 18.0656 17.1147 18.0656 16.8521 17.8031L5.19695 6.14788C4.93435 5.88529 4.93435 5.45954 5.19695 5.19695Z"
                    fill="#292929"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.8031 5.19695C17.5405 4.93435 17.1147 4.93435 16.8521 5.19695L5.19695 16.8521C4.93435 17.1147 4.93435 17.5405 5.19695 17.8031C5.45954 18.0656 5.88529 18.0656 6.14788 17.8031L17.8031 6.14788C18.0656 5.88529 18.0656 5.45954 17.8031 5.19695Z"
                    fill="#292929"
                  ></path>
                </svg>
              </span>
              Đóng menu
            </div>
            <div className="header__mm-flex">
              <div className="header__mm-cate" id="appen__mega-menu">
                {categories.map((cat) => (
                  <CategoryBox key={cat.id} category={cat} />
                ))}
              </div>

              <div className="header__mm-right">
                <div className="box">
                  <Link
                    to={`/category/chao-ngay-moi`}
                    className="item"
                    title="Chào ngày mới"
                  >
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-cloud-sun-fill"></i>
                      </div>
                    </span>
                    Chào ngày mới
                  </Link>
                  <Link
                    to={`/category/tin-24h`}
                    className="item"
                    title="Tin 24h"
                  >
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-clock-history"></i>
                      </div>
                    </span>
                    Tin 24h
                  </Link>

                  <Link
                    to={`/category/tin-thi-truong`}
                    className="item"
                    title="Tin thị trường"
                  >
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-graph-up-arrow"></i>
                      </div>
                    </span>
                    Tin thị trường
                  </Link>

                  <Link
                    to={`/category/tin-nhanh-360`}
                    className="item"
                    title="Tin 360"
                  >
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-globe"></i>
                      </div>
                    </span>
                    Tin 360
                  </Link>
                </div>

                <div className="box">
                  <a href="" className="item" title="Video">
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-play-circle"></i>
                      </div>
                    </span>
                    Video
                  </a>

                  <a href="" className="item" title="Magazine">
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-journal-richtext"></i>
                      </div>
                    </span>
                    Magazine
                  </a>
                </div>
                <div className="list-sub">
                  <Link to={"/weather"} className="item" title="Tiện ích">
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-grid-fill"></i>
                      </div>
                    </span>
                    Tiện ích
                  </Link>
                  <Link
                    to={`/category/ban-can-biet`}
                    className="item"
                    title="Bạn cần biết"
                  >
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-info-circle"></i>
                      </div>
                    </span>
                    Bạn cần biết
                  </Link>
                  <a href="" className="item" title="Liên hệ">
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-telephone"></i>
                      </div>
                    </span>
                    Liên hệ
                  </a>
                  <a href="" className="item" title="Thông tin toà soạn">
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-building"></i>
                      </div>
                    </span>
                    Thông tin toà soạn
                  </a>
                  <Link
                    to="/advertise"
                    className="item"
                    title="Liên hệ quảng cáo"
                  >
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-megaphone"></i>
                      </div>
                    </span>
                    Liên hệ quảng cáo
                  </Link>
                </div>

                <div className="social">
                  <a
                    href=""
                    className="item"
                    rel="nofollow"
                    target="_blank"
                    title="Facebook"
                  >
                    <FacebookIconCustom />
                  </a>
                  <a
                    href=""
                    className="item"
                    rel="nofollow"
                    target="_blank"
                    title="Zalo"
                  >
                    <ZaloIconCustom />
                  </a>
                  <a
                    href=""
                    className="item"
                    rel="nofollow"
                    target="_blank"
                    title="Youtube"
                  >
                    <YoutubeIconCustom />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
