import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { HomeIconCustom } from "./Footer_SocialIcon";

const Navbar = () => {
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

              <li>
                <a
                  href="/chinh-tri.htm"
                  data-short-url="chinh-tri"
                  title="Chính trị"
                  className="nav-link"
                >
                  Chính trị
                </a>
                <div class="sub-menu loaded" data-zone="chinh-tri">
                  <div class="sub-menu-flex">
                    <div class="category">
                      <a
                        href="https://thanhnien.vn/chinh-tri.htm"
                        class="title-cate"
                      >
                        Chính trị
                      </a>
                      <div class="list">
                        <a
                          href="https://thanhnien.vn/chinh-tri/su-kien.htm"
                          title="Sự kiện"
                          class="item"
                        >
                          Sự kiện
                        </a>
                        <a
                          href="https://thanhnien.vn/chinh-tri/vuon-minh-trong-ky-nguyen-moi.htm"
                          title="Vươn mình trong kỷ nguyên mới"
                          class="item"
                        >
                          Vươn mình trong kỷ nguyên mới
                        </a>
                        <a
                          href="https://thanhnien.vn/chinh-tri/thoi-luan.htm"
                          title="Thời luận"
                          class="item"
                        >
                          Thời luận
                        </a>
                        <a
                          href="https://thanhnien.vn/chinh-tri/thi-dua-yeu-nuoc.htm"
                          title="Thi đua yêu nước"
                          class="item"
                        >
                          Thi đua yêu nước
                        </a>
                        <a
                          href="https://thanhnien.vn/chinh-tri/chung-dong-mau-lac-hong.htm"
                          title="Chung dòng máu Lạc Hồng"
                          class="item"
                        >
                          Chung dòng máu Lạc Hồng
                        </a>
                        <a
                          href="https://thanhnien.vn/chinh-tri/gop-y-van-kien-dai-hoi-dang.htm"
                          title="Góp ý văn kiện đại hội Đảng"
                          class="item"
                        >
                          Góp ý văn kiện đại hội Đảng
                        </a>
                      </div>
                    </div>
                    <div class="news">
                      <div class="box-category-item">
                        <a
                          class="box-category-link-with-avatar img-resize "
                          href="https://thanhnien.vn/tao-nguon-can-bo-nguoi-dan-toc-thieu-so-tu-hoc-sinh-xuat-sac-185251226160731383.htm"
                          title="Tạo nguồn cán bộ người dân tộc thiểu số từ học sinh xuất sắc"
                          data-id="185251226160731383"
                        >
                          <img
                            data-type="avatar"
                            src="https://images2.thanhnien.vn/zoom/200_125/528068263637045248/2025/12/26/tong-bi-thu-dan-toc-thieu-so-2-17667399629891521796289-194-0-1787-2549-crop-17667400183201287440506.jpg"
                            alt="Tạo nguồn cán bộ người dân tộc thiểu số từ học sinh xuất sắc"
                            class="box-category-avatar"
                          />
                        </a>
                        <div class="box-category-content">
                          <h3>
                            <a
                              data-linktype="newsdetail"
                              data-id="185251226160731383"
                              class="box-category-link-title"
                              data-newstype=""
                              href="https://thanhnien.vn/tao-nguon-can-bo-nguoi-dan-toc-thieu-so-tu-hoc-sinh-xuat-sac-185251226160731383.htm"
                              title="Tạo nguồn cán bộ người dân tộc thiểu số từ học sinh xuất sắc"
                            >
                              Tạo nguồn cán bộ người dân tộc thiểu số từ học
                              sinh xuất sắc
                            </a>
                          </h3>
                        </div>
                      </div>
                      <div class="box-category-item">
                        <a
                          class="box-category-link-with-avatar img-resize "
                          href="https://thanhnien.vn/tong-bi-thu-to-lam-moi-can-bo-dang-vien-phai-la-nhung-nguoi-truyen-cam-hung-18525122523181874.htm"
                          title="Tổng Bí thư Tô Lâm: Mỗi cán bộ đảng viên phải là những người truyền cảm hứng
"
                          data-id="18525122523181874"
                        >
                          <img
                            data-type="avatar"
                            src="https://images2.thanhnien.vn/zoom/200_125/528068263637045248/2025/12/25/ho-chi-minh-hanh-trinh-khat-vong-2025-25122025-10-1766677594271922289889-106-0-1706-2560-crop-17666793719941292558133.jpg"
                            alt="Tổng Bí thư Tô Lâm: Mỗi cán bộ đảng viên phải là những người truyền cảm hứng
"
                            class="box-category-avatar"
                          />
                        </a>
                        <div class="box-category-content">
                          <h3>
                            <a
                              data-linktype="newsdetail"
                              data-id="18525122523181874"
                              class="box-category-link-title"
                              data-newstype=""
                              href="https://thanhnien.vn/tong-bi-thu-to-lam-moi-can-bo-dang-vien-phai-la-nhung-nguoi-truyen-cam-hung-18525122523181874.htm"
                              title="Tổng Bí thư Tô Lâm: Mỗi cán bộ đảng viên phải là những người truyền cảm hứng
"
                            >
                              Tổng Bí thư Tô Lâm: Mỗi cán bộ đảng viên phải là
                              những người truyền cảm hứng
                            </a>
                          </h3>
                        </div>
                      </div>
                      <div class="box-category-item">
                        <a
                          class="box-category-link-with-avatar img-resize "
                          href="https://thanhnien.vn/kien-quyet-dau-tranh-voi-hanh-vi-loi-dung-cong-dong-viet-kieu-de-chong-pha-dang-nha-nuoc-185251225204243772.htm"
                          title="Kiên quyết đấu tranh với hành vi lợi dụng cộng đồng Việt kiều để chống phá Đảng, Nhà nước"
                          data-id="185251225204243772"
                        >
                          <img
                            data-type="avatar"
                            src="https://images2.thanhnien.vn/zoom/200_125/528068263637045248/2025/12/25/itoanquoctongketcongtacdoivoinguoivietnamonuocngoai8494556-1766664430296779300398-1-0-1181-1888-crop-1766670126972445771221-0-500-868-1888-crop-1766674179352584495791.jpg"
                            alt="Kiên quyết đấu tranh với hành vi lợi dụng cộng đồng Việt kiều để chống phá Đảng, Nhà nước"
                            class="box-category-avatar"
                          />
                        </a>
                        <div class="box-category-content">
                          <h3>
                            <a
                              data-linktype="newsdetail"
                              data-id="185251225204243772"
                              class="box-category-link-title"
                              data-newstype=""
                              href="https://thanhnien.vn/kien-quyet-dau-tranh-voi-hanh-vi-loi-dung-cong-dong-viet-kieu-de-chong-pha-dang-nha-nuoc-185251225204243772.htm"
                              title="Kiên quyết đấu tranh với hành vi lợi dụng cộng đồng Việt kiều để chống phá Đảng, Nhà nước"
                            >
                              Kiên quyết đấu tranh với hành vi lợi dụng cộng
                              đồng Việt kiều để chống phá Đảng, Nhà nước
                            </a>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <a
                  href="/thoi-su.htm"
                  data-short-url="thoi-su"
                  title="Thời sự"
                  className="nav-link"
                >
                  Thời sự
                </a>
                <div className="sub-menu loaded" data-zone="thoi-su">
                  <div className="sub-menu-flex">
                    <div className="category">
                      <a
                        href="https://thanhnien.vn/thoi-su.htm"
                        className="title-cate"
                      >
                        Thời sự
                      </a>
                      <div className="list">
                        <a
                          href="https://thanhnien.vn/thoi-su/phap-luat.htm"
                          title="Pháp luật"
                          className="item"
                        >
                          Pháp luật
                        </a>
                        <a
                          href="https://thanhnien.vn/thoi-su/dan-sinh.htm"
                          title="Dân sinh"
                          className="item"
                        >
                          Dân sinh
                        </a>
                        <a
                          href="https://thanhnien.vn/thoi-su/lao-dong-viec-lam.htm"
                          title="Lao động - Việc làm"
                          className="item"
                        >
                          Lao động - Việc làm
                        </a>
                        <a
                          href="https://thanhnien.vn/thoi-su/quyen-duoc-biet.htm"
                          title="Quyền được biết"
                          className="item"
                        >
                          Quyền được biết
                        </a>
                        <a
                          href="https://thanhnien.vn/thoi-su/phong-su--dieu-tra.htm"
                          title="Phóng sự / Điều tra"
                          className="item"
                        >
                          Phóng sự / Điều tra
                        </a>
                        <a
                          href="https://thanhnien.vn/thoi-su/quoc-phong.htm"
                          title="Quốc phòng"
                          className="item"
                        >
                          Quốc phòng
                        </a>
                        <a
                          href="https://thanhnien.vn/thoi-su/chong-tin-gia.htm"
                          title="Chống tin giả"
                          className="item"
                        >
                          Chống tin giả
                        </a>
                        <a
                          href="https://thanhnien.vn/thoi-su/thanh-tuu-y-khoa.htm"
                          title="Thành tựu y khoa"
                          className="item"
                        >
                          Thành tựu y khoa
                        </a>
                      </div>
                    </div>
                    <div className="news">
                      <div className="box-category-item">
                        <a
                          className="box-category-link-with-avatar img-resize "
                          href="https://thanhnien.vn/vi-sao-doanh-nghiep-thang-kien-van-khong-doi-duoc-tien-185251221094020226.htm"
                          title="Vì sao doanh nghiệp thắng kiện vẫn không đòi được tiền?"
                          data-id="185251221094020226"
                        >
                          <img
                            data-type="avatar"
                            src="https://images2.thanhnien.vn/zoom/200_125/528068263637045248/2025/12/21/phong-thi-hanh-an-1751423478144703812749-17662845358651035909684-130-0-1380-2000-crop-176628488585229505363.jpg"
                            alt="Vì sao doanh nghiệp thắng kiện vẫn không đòi được tiền?"
                            className="box-category-avatar"
                          />
                        </a>
                        <div className="box-category-content">
                          <h3>
                            <a
                              data-linktype="newsdetail"
                              data-id="185251221094020226"
                              className="box-category-link-title"
                              data-newstype=""
                              href="https://thanhnien.vn/vi-sao-doanh-nghiep-thang-kien-van-khong-doi-duoc-tien-185251221094020226.htm"
                              title="Vì sao doanh nghiệp thắng kiện vẫn không đòi được tiền?"
                            >
                              Vì sao doanh nghiệp thắng kiện vẫn không đòi được
                              tiền?
                            </a>
                          </h3>
                        </div>
                      </div>
                      <div className="box-category-item">
                        <a
                          className="box-category-link-with-avatar img-resize "
                          href="https://thanhnien.vn/chinh-sach-moi-ve-luong-thuong-thu-nhap-vien-chuc-tu-172026-185251220223919449.htm"
                          title="Chính sách mới về lương, thưởng, thu nhập viên chức từ 1.7.2026"
                          data-id="185251220223919449"
                        >
                          <img
                            data-type="avatar"
                            src="https://images2.thanhnien.vn/zoom/200_125/528068263637045248/2025/12/20/ung-khoa-cap-cuu-benh-vien-cho-ray-se-truc-vao-mung-1-tet-nam-nayanh-duy-tinh-1737642543829581875019-1766244979729131619837-36-0-836-1280-crop-17662450314801911699026.jpg"
                            alt="Chính sách mới về lương, thưởng, thu nhập viên chức từ 1.7.2026"
                            className="box-category-avatar"
                          />
                        </a>
                        <div className="box-category-content">
                          <h3>
                            <a
                              data-linktype="newsdetail"
                              data-id="185251220223919449"
                              className="box-category-link-title"
                              data-newstype=""
                              href="https://thanhnien.vn/chinh-sach-moi-ve-luong-thuong-thu-nhap-vien-chuc-tu-172026-185251220223919449.htm"
                              title="Chính sách mới về lương, thưởng, thu nhập viên chức từ 1.7.2026"
                            >
                              Chính sách mới về lương, thưởng, thu nhập viên
                              chức từ 1.7.2026
                            </a>
                          </h3>
                        </div>
                      </div>
                      <div className="box-category-item">
                        <a
                          className="box-category-link-with-avatar img-resize "
                          href="https://thanhnien.vn/triet-pha-duong-day-dua-ma-tuy-tu-campuchia-ve-viet-nam-tieu-thu-o-dong-nai-185251221091204438.htm"
                          title="Triệt phá đường dây đưa ma túy từ Campuchia về Việt Nam, tiêu thụ ở Đồng Nai"
                          data-id="185251221091204438"
                        >
                          <img
                            data-type="avatar"
                            src="https://images2.thanhnien.vn/zoom/200_125/528068263637045248/2025/12/21/ma-tuy-1766283519529788069779-6-0-319-501-crop-17662835949861363550188.jpg"
                            alt="Triệt phá đường dây đưa ma túy từ Campuchia về Việt Nam, tiêu thụ ở Đồng Nai"
                            className="box-category-avatar"
                          />
                        </a>
                        <div className="box-category-content">
                          <h3>
                            <a
                              data-linktype="newsdetail"
                              data-id="185251221091204438"
                              className="box-category-link-title"
                              data-newstype=""
                              href="https://thanhnien.vn/triet-pha-duong-day-dua-ma-tuy-tu-campuchia-ve-viet-nam-tieu-thu-o-dong-nai-185251221091204438.htm"
                              title="Triệt phá đường dây đưa ma túy từ Campuchia về Việt Nam, tiêu thụ ở Đồng Nai"
                            >
                              Triệt phá đường dây đưa ma túy từ Campuchia về
                              Việt Nam, tiêu thụ ở Đồng Nai
                            </a>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="header__mega-menu">
          <div className="container">
            <div href="javascript:;" className="header__close-menu">
              <span className="icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.19695 5.19695C5.45954 4.93435 5.88529 4.93435 6.14788 5.19695L17.8031 16.8521C18.0656 17.1147 18.0656 17.5405 17.8031 17.8031C17.5405 18.0656 17.1147 18.0656 16.8521 17.8031L5.19695 6.14788C4.93435 5.88529 4.93435 5.45954 5.19695 5.19695Z"
                    fill="#292929"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.8031 5.19695C17.5405 4.93435 17.1147 4.93435 16.8521 5.19695L5.19695 16.8521C4.93435 17.1147 4.93435 17.5405 5.19695 17.8031C5.45954 18.0656 5.88529 18.0656 6.14788 17.8031L17.8031 6.14788C18.0656 5.88529 18.0656 5.45954 17.8031 5.19695Z"
                    fill="#292929"
                  ></path>
                </svg>
              </span>
              Đóng menu
            </div>
            <div className="header__mm-flex">
              <div className="header__mm-cate" id="appen__mega-menu"></div>

              <div className="header__mm-right">
                <div className="box">
                  <a
                    href="/chao-ngay-moi.htm"
                    className="item"
                    title="Chào ngày mới"
                  >
                    <span className="icon">
                      <svg width="24" height="24">
                        <use xlink:href="#icon-weather"></use>
                      </svg>
                    </span>
                    Chào ngày mới
                  </a>
                  <a href="/tin-24h.htm" className="item" title="Tin 24h">
                    <span className="icon">
                      <svg width="24" height="24">
                        <use xlink:href="#icon-24h"></use>
                      </svg>
                    </span>
                    Tin 24h
                  </a>

                  <a
                    href="/thi-truong.htm"
                    className="item"
                    title="Tin thị trường"
                  >
                    <span className="icon">
                      <svg width="24" height="24">
                        <use xlink:href="#icon-thitruong"></use>
                      </svg>
                    </span>
                    Tin thị trường
                  </a>

                  <a href="/tin-nhanh-360.htm" className="item" title="Tin 360">
                    <span className="icon">
                      <svg width="24" height="24">
                        <use xlink:href="#icon-360"></use>
                      </svg>
                    </span>
                    Tin 360
                  </a>
                </div>

                <div className="box">
                  <a href="/video.htm" className="item" title="Video">
                    <span className="icon">
                      <svg width="24" height="24">
                        <use xlink:href="#icon-video"></use>
                      </svg>
                    </span>
                    Video
                  </a>

                  <a href="/magazine.htm" className="item" title="Magazine">
                    <span className="icon">
                      <svg width="24" height="24">
                        <use xlink:href="#icon-magazine"></use>
                      </svg>
                    </span>
                    Magazine
                  </a>
                </div>
                <div className="list-sub">
                  <a
                    href="/tien-ich/thoi-tiet.htm"
                    className="item"
                    title="Tiện ích"
                  >
                    <span className="icon">
                      <svg width="20" height="20">
                        <use xlink:href="#icon-tienich"></use>
                      </svg>
                    </span>
                    Tiện ích
                  </a>
                  <a
                    href="/ban-can-biet.htm"
                    className="item"
                    title="Bạn cần biết"
                  >
                    <span className="icon">
                      <svg width="20" height="20">
                        <use xlink:href="#icon-bancanbiet"></use>
                      </svg>
                    </span>
                    Bạn cần biết
                  </a>
                  <a href="/lien-he.htm" className="item" title="Liên hệ">
                    <span className="icon">
                      <svg width="20" height="20">
                        <use xlink:href="#icon-lienhe"></use>
                      </svg>
                    </span>
                    Liên hệ
                  </a>
                  <a
                    href="/thong-tin-toa-soan.html"
                    className="item"
                    title="Thông tin toà soạn"
                  >
                    <span className="icon">
                      <svg width="20" height="20">
                        <use xlink:href="#icon-info"></use>
                      </svg>
                    </span>
                    Thông tin toà soạn
                  </a>
                  <a
                    href="https://banggia.thanhnien.vn/"
                    className="item"
                    title="Liên hệ quảng cáo"
                  >
                    <span className="icon">
                      <svg width="20" height="20">
                        <use xlink:href="#icon-as"></use>
                      </svg>
                    </span>
                    Liên hệ quảng cáo
                  </a>
                </div>

                <div className="social">
                  <a
                    href="https://www.facebook.com/thanhnien"
                    title="Facebook"
                    className="item"
                    rel="nofollow"
                    target="_blank"
                  >
                    <svg width="32" height="32">
                      <use xlink:href="#icon-fb"></use>
                    </svg>
                  </a>
                  <a
                    href="https://zalo.me/2431025964363015388"
                    title="Zalo"
                    className="item"
                    rel="nofollow"
                    target="_blank"
                  >
                    <svg width="32" height="32">
                      <use xlink:href="#icon-zalo"></use>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCIW9cGgoRuGJnky3K3tbzNg"
                    title="Youtube"
                    className="item"
                    rel="nofollow"
                    target="_blank"
                  >
                    <svg width="32" height="32">
                      <use xlink:href="#icon-yt"></use>
                    </svg>
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
