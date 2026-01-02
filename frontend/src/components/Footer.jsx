import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FacebookIconCustom, ZaloIconCustom, YoutubeIconCustom } from "./Footer_SocialIcon";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__nav">
            <div className="col">
              <a
                className="item"
                href="https://thanhnien.vn/chinh-tri.htm"
                title="Chính trị"
              >
                Chính trị
              </a>

              <a
                className="item"
                href="https://thanhnien.vn/thoi-su.htm"
                title="Thời sự"
              >
                Thời sự
              </a>
              <a
                className="item"
                href="https://thanhnien.vn/the-gioi.htm"
                title=" Thế giới"
              >
                Thế giới
              </a>
              <a
                className="item"
                href="https://thanhnien.vn/kinh-te.htm"
                title=" Kinh tế"
              >
                Kinh tế
              </a>
            </div>
            <div className="col">
              <a
                className="item"
                href="https://thanhnien.vn/doi-song.htm"
                title=" Đời sống"
              >
                Đời sống
              </a>
              <a
                className="item"
                href="https://thanhnien.vn/suc-khoe.htm"
                title=" Sức khoẻ"
              >
                Sức khoẻ
              </a>
              <a
                className="item"
                href="https://thanhnien.vn/gioi-tre.htm"
                title="Giới trẻ"
              >
                Giới trẻ
              </a>
              <a
                className="item"
                href="https://thanhnien.vn/giao-duc.htm"
                title="Giáo dục"
              >
                Giáo dục
              </a>
            </div>
            <div className="col">
              <a
                className="item"
                href="https://thanhnien.vn/du-lich.htm"
                title="Du lịch"
              >
                Du lịch
              </a>
              <a
                className="item"
                href="https://thanhnien.vn/van-hoa.htm"
                title="Văn hoá"
              >
                Văn hoá
              </a>
              <a
                className="item"
                href="https://thanhnien.vn/giai-tri.htm"
                title="Giải trí"
              >
                Giải trí
              </a>
              <a
                className="item"
                href="https://thanhnien.vn/the-thao.htm"
                title="Thể thao"
              >
                Thể thao
              </a>
            </div>
            <div className="col">
              <a
                className="item"
                href="https://thanhnien.vn/cong-nghe.htm"
                title="Công nghệ"
              >
                Công nghệ
              </a>
              <a
                className="item"
                href="https://thanhnien.vn/xe.htm"
                title=" Xe"
              >
                Xe
              </a>
              <a
                className="item"
                href="/thoi-trang-tre.htm"
                title="Thời trang trẻ"
              >
                Thời trang trẻ
              </a>
              <a
                className="item"
                href="https://thanhnien.vn/video.htm"
                title="Video"
              >
                Video
              </a>
            </div>
            <div className="col">
              <a
                className="item"
                href="https://thanhnien.vn/ban-doc.htm"
                title=" Bạn đọc"
              >
                Bạn đọc
              </a>
              <a
                className="item"
                href="https://raovat.thanhnien.vn/"
                title="Rao vặt"
              >
                Rao vặt
              </a>
            </div>
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
