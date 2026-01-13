import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FacebookIconCustom,
  ZaloIconCustom,
  YoutubeIconCustom,
} from "./Footer_SocialIcon";
import { useState, useEffect } from "react";
import axios from "axios";

const Footer = () => {
  const [columns, setColumns] = useState([]);

  // Danh sách các slug bạn muốn loại bỏ (Blacklist)
  const BLACKLIST = [
    "home",
    "ban-can-biet",
    "ban-doc",
    "tieu-dung-thong-minh",
    "dien-dan",
    "podcast",
  ];

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        const allData = response.data;

        // 1. Lọc dữ liệu theo 2 điều kiện:
        // - Không nằm trong Blacklist
        // - Bắt buộc phải có danh mục con (children.length > 0)
        const filteredData = allData.filter(
          (cat) =>
            !BLACKLIST.includes(cat.slug) &&
            cat.children &&
            cat.children.length > 0
        );

        // 2. Chia dữ liệu vào các cột
        const ITEMS_PER_COL = 4;
        const chunked = [];
        for (let i = 0; i < filteredData.length; i += ITEMS_PER_COL) {
          chunked.push(filteredData.slice(i, i + ITEMS_PER_COL));
        }

        setColumns(chunked);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu footer:", error);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <div className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__nav">
            {/* Render các cột động từ API */}
            {columns.map((columnItems, colIdx) => (
              <div className="col" key={colIdx}>
                {columnItems.map((cat) => (
                  <a
                    key={cat.id}
                    className="item"
                    href={`/news/${cat.fullSlug}`}
                    title={cat.name}
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer__middle">
        <div className="container">
          <div className="footer__middle-flex">
            <a
              href="https://thanhnien.vn/"
              title="Báo Thanh niên"
              alt="Báo Thanh Niên"
              className="footer__logo"
            >
              <img
                src="https://static.thanhnien.com.vn/thanhnien.vn/image/logo-ft.png"
                width="152px"
                height="43px"
                alt="footer__logo"
                loading="lazy"
              />
            </a>
            <div className="footer__m-content">
              <div className="list">
                <a
                  href="https://datbao.thanhnien.vn/"
                  title="Đặt báo"
                  className="item"
                  target="_blank"
                >
                  Đặt báo{" "}
                </a>
                <a
                  href="https://banggia.thanhnien.vn/"
                  title="Quảng cáo"
                  className="item"
                  target="_blank"
                >
                  Quảng cáo{" "}
                </a>
                <a
                  href="https://thanhnien.vn/rss.html"
                  title="RSS"
                  className="item"
                >
                  RSS{" "}
                </a>
                <a
                  href="https://thanhnien.vn/thong-tin-toa-soan.html"
                  title="Tòa soạn"
                  className="item"
                >
                  Tòa soạn{" "}
                </a>
                <a
                  href="https://thanhnien.vn/policy.html"
                  title="Chính sách bảo mật"
                  className="item"
                >
                  Chính sách bảo mật{" "}
                </a>
              </div>
              <div className="social">
                <span>Theo dõi báo trên</span>
                <div className="list-sc">
                  <a
                    href="https://www.facebook.com/thanhnien"
                    className="item"
                    rel="nofollow"
                    target="_blank"
                    title="Facebook"
                  >
                    <FacebookIconCustom />
                  </a>
                  <a
                    href="https://zalo.me/2431025964363015388"
                    className="item"
                    rel="nofollow"
                    target="_blank"
                    title="Zalo"
                  >
                    <ZaloIconCustom />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCIW9cGgoRuGJnky3K3tbzNg"
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
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-flex">
            <div className="footer__contact">
              <p className="text">Hotline</p>
              <p className="value">0906 645 777</p>
              <p className="text">Liên hệ quảng cáo</p>
              <p className="value">0908 780 404</p>
            </div>
            <div className="footer__info">
              <p className="text">Tổng biên tập: Nguyễn Ngọc Toàn</p>
              <p className="text">Phó tổng biên tập: Hải Thành</p>
              <p className="text">Phó tổng biên tập: Lâm Hiếu Dũng</p>
              <p className="text">Phó tổng biên tập: Trần Việt Hưng</p>
              <p className="text">Tổng thư ký tòa soạn: Đức Trung</p>
            </div>
            <div className="copy-right">
              Giấy phép xuất bản số 110/GP - BTTTT cấp ngày 24.3.2020 ©
              2003-2025 Bản quyền thuộc về Báo Thanh Niên. Cấm sao chép dưới mọi
              hình thức nếu không có sự chấp thuận bằng văn bản.
              <a
                href="https://tinnhiemmang.vn/danh-ba-tin-nhiem/thanhnienvn-1625711824"
                title="Chứng nhận tín nhiệm mạng"
                target="_blank"
              >
                <img
                  src="https://static.mediacdn.vn/zoom/150_68/thanhnien.vn/image/handle_cert.png"
                  width="150"
                  height="68"
                  alt="Chứng nhận tín nhiệm mạng"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
