import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import {
  FacebookIconCustom,
  HomeIconCustom,
  YoutubeIconCustom,
  ZaloIconCustom,
} from "./Footer_SocialIcon";

const Navbar = ({ isOpen, onCloseMenu }) => {
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
                <div className="sub-menu loaded" data-zone="chinh-tri">
                  <div className="sub-menu-flex">
                    <div className="category">
                      <a
                        href="https://thanhnien.vn/chinh-tri.htm"
                        className="title-cate"
                      >
                        Chính trị
                      </a>
                      <div className="list">
                        <a
                          href="https://thanhnien.vn/chinh-tri/su-kien.htm"
                          title="Sự kiện"
                          className="item"
                        >
                          Sự kiện
                        </a>
                        <a
                          href="https://thanhnien.vn/chinh-tri/vuon-minh-trong-ky-nguyen-moi.htm"
                          title="Vươn mình trong kỷ nguyên mới"
                          className="item"
                        >
                          Vươn mình trong kỷ nguyên mới
                        </a>
                        <a
                          href="https://thanhnien.vn/chinh-tri/thoi-luan.htm"
                          title="Thời luận"
                          className="item"
                        >
                          Thời luận
                        </a>
                        <a
                          href="https://thanhnien.vn/chinh-tri/thi-dua-yeu-nuoc.htm"
                          title="Thi đua yêu nước"
                          className="item"
                        >
                          Thi đua yêu nước
                        </a>
                        <a
                          href="https://thanhnien.vn/chinh-tri/chung-dong-mau-lac-hong.htm"
                          title="Chung dòng máu Lạc Hồng"
                          className="item"
                        >
                          Chung dòng máu Lạc Hồng
                        </a>
                        <a
                          href="https://thanhnien.vn/chinh-tri/gop-y-van-kien-dai-hoi-dang.htm"
                          title="Góp ý văn kiện đại hội Đảng"
                          className="item"
                        >
                          Góp ý văn kiện đại hội Đảng
                        </a>
                      </div>
                    </div>
                    <div className="news">
                      <div className="box-category-item">
                        <a
                          className="box-category-link-with-avatar img-resize "
                          href="https://thanhnien.vn/tao-nguon-can-bo-nguoi-dan-toc-thieu-so-tu-hoc-sinh-xuat-sac-185251226160731383.htm"
                          title="Tạo nguồn cán bộ người dân tộc thiểu số từ học sinh xuất sắc"
                          data-id="185251226160731383"
                        >
                          <img
                            data-type="avatar"
                            src="https://images2.thanhnien.vn/zoom/200_125/528068263637045248/2025/12/26/tong-bi-thu-dan-toc-thieu-so-2-17667399629891521796289-194-0-1787-2549-crop-17667400183201287440506.jpg"
                            alt="Tạo nguồn cán bộ người dân tộc thiểu số từ học sinh xuất sắc"
                            className="box-category-avatar"
                          />
                        </a>
                        <div className="box-category-content">
                          <h3>
                            <a
                              data-linktype="newsdetail"
                              data-id="185251226160731383"
                              className="box-category-link-title"
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
                      <div className="box-category-item">
                        <a
                          className="box-category-link-with-avatar img-resize "
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
                            className="box-category-avatar"
                          />
                        </a>
                        <div className="box-category-content">
                          <h3>
                            <a
                              data-linktype="newsdetail"
                              data-id="18525122523181874"
                              className="box-category-link-title"
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
                      <div className="box-category-item">
                        <a
                          className="box-category-link-with-avatar img-resize "
                          href="https://thanhnien.vn/kien-quyet-dau-tranh-voi-hanh-vi-loi-dung-cong-dong-viet-kieu-de-chong-pha-dang-nha-nuoc-185251225204243772.htm"
                          title="Kiên quyết đấu tranh với hành vi lợi dụng cộng đồng Việt kiều để chống phá Đảng, Nhà nước"
                          data-id="185251225204243772"
                        >
                          <img
                            data-type="avatar"
                            src="https://images2.thanhnien.vn/zoom/200_125/528068263637045248/2025/12/25/itoanquoctongketcongtacdoivoinguoivietnamonuocngoai8494556-1766664430296779300398-1-0-1181-1888-crop-1766670126972445771221-0-500-868-1888-crop-1766674179352584495791.jpg"
                            alt="Kiên quyết đấu tranh với hành vi lợi dụng cộng đồng Việt kiều để chống phá Đảng, Nhà nước"
                            className="box-category-avatar"
                          />
                        </a>
                        <div className="box-category-content">
                          <h3>
                            <a
                              data-linktype="newsdetail"
                              data-id="185251225204243772"
                              className="box-category-link-title"
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
        <div className={`header__mega-menu ${isOpen ? "is-active" : ""}`}>
          <div className="container">
            <div
              href="javascript:;"
              className="header__close-menu"
              onClick={onCloseMenu}
            >
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
                <div className="box">
                  <a href="/chinh-tri.htm" className="title" title="Chính trị">
                    Chính trị
                  </a>
                  <div className="list">
                    <a
                      href="/chinh-tri/su-kien.htm"
                      className="item"
                      title="Sự kiện"
                    >
                      Sự kiện
                    </a>
                    <a
                      href="/chinh-tri/vuon-minh-trong-ky-nguyen-moi.htm"
                      className="item"
                      title="Vươn mình trong kỷ nguyên mới"
                    >
                      Vươn mình trong kỷ nguyên mới
                    </a>
                    <a
                      href="/chinh-tri/thoi-luan.htm"
                      className="item"
                      title="Thời luận"
                    >
                      Thời luận
                    </a>
                    <a
                      href="/chinh-tri/thi-dua-yeu-nuoc.htm"
                      className="item"
                      title="Thi đua yêu nước"
                    >
                      Thi đua yêu nước
                    </a>
                    <a
                      href="/chinh-tri/chung-dong-mau-lac-hong.htm"
                      className="item"
                      title="Chung dòng máu Lạc Hồng"
                    >
                      Chung dòng máu Lạc Hồng
                    </a>
                    <a
                      href="/chinh-tri/gop-y-van-kien-dai-hoi-dang.htm"
                      className="item"
                      title="Góp ý văn kiện đại hội Đảng"
                    >
                      Góp ý văn kiện đại hội Đảng
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/thoi-su.htm" className="title" title="Thời sự">
                    Thời sự
                  </a>
                  <div className="list">
                    <a
                      href="/thoi-su/phap-luat.htm"
                      className="item"
                      title="Pháp luật"
                    >
                      Pháp luật
                    </a>
                    <a
                      href="/thoi-su/dan-sinh.htm"
                      className="item"
                      title="Dân sinh"
                    >
                      Dân sinh
                    </a>
                    <a
                      href="/thoi-su/lao-dong-viec-lam.htm"
                      className="item"
                      title="Lao động - Việc làm"
                    >
                      Lao động - Việc làm
                    </a>
                    <a
                      href="/thoi-su/quyen-duoc-biet.htm"
                      className="item"
                      title="Quyền được biết"
                    >
                      Quyền được biết
                    </a>
                    <a
                      href="/thoi-su/phong-su--dieu-tra.htm"
                      className="item"
                      title="Phóng sự / Điều tra"
                    >
                      Phóng sự / Điều tra
                    </a>
                    <a
                      href="/thoi-su/quoc-phong.htm"
                      className="item"
                      title="Quốc phòng"
                    >
                      Quốc phòng
                    </a>
                    <a
                      href="/thoi-su/chong-tin-gia.htm"
                      className="item"
                      title="Chống tin giả"
                    >
                      Chống tin giả
                    </a>
                    <a
                      href="/thoi-su/thanh-tuu-y-khoa.htm"
                      className="item"
                      title="Thành tựu y khoa"
                    >
                      Thành tựu y khoa
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/the-gioi.htm" className="title" title="Thế giới">
                    Thế giới
                  </a>
                  <div className="list">
                    <a
                      href="/the-gioi/kinh-te-the-gioi.htm"
                      className="item"
                      title="Kinh tế thế giới"
                    >
                      Kinh tế thế giới
                    </a>
                    <a
                      href="/the-gioi/quan-su.htm"
                      className="item"
                      title="Quân sự"
                    >
                      Quân sự
                    </a>
                    <a
                      href="/the-gioi/goc-nhin.htm"
                      className="item"
                      title="Góc nhìn"
                    >
                      Góc nhìn
                    </a>
                    <a
                      href="/the-gioi/ho-so.htm"
                      className="item"
                      title="Hồ sơ"
                    >
                      Hồ sơ
                    </a>
                    <a
                      href="/the-gioi/nguoi-viet-nam-chau.htm"
                      className="item"
                      title="Người Việt năm châu"
                    >
                      Người Việt năm châu
                    </a>
                    <a
                      href="/the-gioi/chuyen-la.htm"
                      className="item"
                      title="Chuyện lạ"
                    >
                      Chuyện lạ
                    </a>
                    <a
                      className="item"
                      href="https://baucumy2024.thanhnien.vn/"
                      target="_blank"
                      rel="nofollow"
                      title="Bầu cử Mỹ 2024"
                    >
                      Bầu cử Mỹ 2024
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/kinh-te.htm" className="title" title="Kinh tế">
                    Kinh tế
                  </a>
                  <div className="list">
                    <a
                      href="/kinh-te/kinh-te-xanh.htm"
                      className="item"
                      title="Kinh tế xanh"
                    >
                      Kinh tế xanh
                    </a>
                    <a
                      href="/kinh-te/chinh-sach-phat-trien.htm"
                      className="item"
                      title="Chính sách - Phát triển"
                    >
                      Chính sách - Phát triển
                    </a>
                    <a
                      href="/kinh-te/ngan-hang.htm"
                      className="item"
                      title="Ngân hàng"
                    >
                      Ngân hàng
                    </a>
                    <a
                      href="/kinh-te/chung-khoan.htm"
                      className="item"
                      title="Chứng khoán"
                    >
                      Chứng khoán
                    </a>
                    <a
                      href="/kinh-te/doanh-nghiep.htm"
                      className="item"
                      title="Doanh nghiệp"
                    >
                      Doanh nghiệp
                    </a>
                    <a
                      href="/kinh-te/doanh-nhan.htm"
                      className="item"
                      title="Khát vọng Việt Nam"
                    >
                      Khát vọng Việt Nam
                    </a>
                    <a
                      href="/kinh-te/lam-giau.htm"
                      className="item"
                      title="Làm giàu"
                    >
                      Làm giàu
                    </a>
                    <a
                      href="/kinh-te/dia-oc.htm"
                      className="item"
                      title="Địa ốc"
                    >
                      Địa ốc
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/doi-song.htm" className="title" title="Đời sống">
                    Đời sống
                  </a>
                  <div className="list">
                    <a
                      href="/doi-song/thanh-nien-va-toi.htm"
                      className="item"
                      title="Thanh Niên và tôi"
                    >
                      Thanh Niên và tôi
                    </a>
                    <a
                      href="/doi-song/tet-yeu-thuong.htm"
                      className="item"
                      title="Tết yêu thương"
                    >
                      Tết yêu thương
                    </a>
                    <a
                      href="/doi-song/nguoi-song-quanh-ta.htm"
                      className="item"
                      title="Người sống quanh ta"
                    >
                      Người sống quanh ta
                    </a>
                    <a
                      href="/doi-song/gia-dinh.htm"
                      className="item"
                      title="Gia đình"
                    >
                      Gia đình
                    </a>
                    <a
                      href="/doi-song/am-thuc.htm"
                      className="item"
                      title="Ẩm thực"
                    >
                      Ẩm thực
                    </a>
                    <a
                      href="/doi-song/cong-dong.htm"
                      className="item"
                      title="Cộng đồng"
                    >
                      Cộng đồng
                    </a>
                    <a
                      href="/doi-song/mot-nua-the-gioi.htm"
                      className="item"
                      title="Một nửa thế giới"
                    >
                      Một nửa thế giới
                    </a>
                    <a
                      href="/doi-song/khat-vong-nam-rong.htm"
                      className="item"
                      title="Khát vọng năm rồng"
                    >
                      Khát vọng năm rồng
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/suc-khoe.htm" className="title" title="Sức khỏe">
                    Sức khỏe
                  </a>
                  <div className="list">
                    <a
                      href="/suc-khoe/khoe-dep-moi-ngay.htm"
                      className="item"
                      title="Khỏe đẹp mỗi ngày"
                    >
                      Khỏe đẹp mỗi ngày
                    </a>
                    <a
                      href="/suc-khoe/lam-dep.htm"
                      className="item"
                      title="Làm đẹp"
                    >
                      Làm đẹp
                    </a>
                    <a
                      href="/suc-khoe/gioi-tinh.htm"
                      className="item"
                      title="Giới tính"
                    >
                      Giới tính
                    </a>
                    <a
                      href="/suc-khoe/y-te-thong-minh.htm"
                      className="item"
                      title="Y tế thông minh"
                    >
                      Y tế thông minh
                    </a>
                    <a
                      href="/suc-khoe/tham-my-an-toan.htm"
                      className="item"
                      title="Thẩm mỹ an toàn"
                    >
                      Thẩm mỹ an toàn
                    </a>
                    <a
                      href="/suc-khoe/tin-hay-y-te.htm"
                      className="item"
                      title="Tin hay y tế"
                    >
                      Tin hay y tế
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/gioi-tre.htm" className="title" title="Giới trẻ">
                    Giới trẻ
                  </a>
                  <div className="list">
                    <a
                      href="/gioi-tre/song-yeu-an-choi.htm"
                      className="item"
                      title="Sống - Yêu - Ăn - Chơi"
                    >
                      Sống - Yêu - Ăn - Chơi
                    </a>
                    <a
                      href="/gioi-tre/tiep-suc-gen-z-mua-thi.htm"
                      className="item"
                      title="Tiếp sức gen Z mùa thi"
                    >
                      Tiếp sức gen Z mùa thi
                    </a>
                    <a
                      href="/gioi-tre/co-hoi-nghe-nghiep.htm"
                      className="item"
                      title="Cơ hội nghề nghiệp"
                    >
                      Cơ hội nghề nghiệp
                    </a>
                    <a
                      href="/gioi-tre/doan-hoi.htm"
                      className="item"
                      title="Đoàn - Hội"
                    >
                      Đoàn - Hội
                    </a>
                    <a
                      href="/gioi-tre/ket-noi.htm"
                      className="item"
                      title="Kết nối"
                    >
                      Kết nối
                    </a>
                    <a
                      href="/gioi-tre/khoi-nghiep.htm"
                      className="item"
                      title="Khởi nghiệp"
                    >
                      Khởi nghiệp
                    </a>
                    <a
                      href="/gioi-tre/the-gioi-mang.htm"
                      className="item"
                      title="Thế giới mạng"
                    >
                      Thế giới mạng
                    </a>
                    <a
                      href="/gioi-tre/guong-mat-tre.htm"
                      className="item"
                      title="Gương mặt trẻ"
                    >
                      Gương mặt trẻ
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/giao-duc.htm" className="title" title="Giáo dục">
                    Giáo dục
                  </a>
                  <div className="list">
                    <a
                      href="/giao-duc/tuyen-sinh.htm"
                      className="item"
                      title="Tuyển sinh"
                    >
                      Tuyển sinh
                    </a>
                    <a
                      href="/giao-duc/chon-nghe-chon-truong.htm"
                      className="item"
                      title="Chọn nghề - Chọn trường"
                    >
                      Chọn nghề - Chọn trường
                    </a>
                    <a
                      href="/giao-duc/du-hoc.htm"
                      className="item"
                      title="Du học"
                    >
                      Du học
                    </a>
                    <a
                      href="/giao-duc/nha-truong.htm"
                      className="item"
                      title="Nhà trường"
                    >
                      Nhà trường
                    </a>
                    <a
                      href="/giao-duc/phu-huynh.htm"
                      className="item"
                      title="Phụ huynh"
                    >
                      Phụ huynh
                    </a>
                    <a
                      href="/giao-duc/tra-cuu-diem-thi.htm"
                      className="item"
                      title="Tra cứu điểm thi"
                    >
                      Tra cứu điểm thi
                    </a>
                    <a
                      href="https://camnangtuyensinh.thanhnien.vn"
                      className="item"
                      title="Cẩm nang tuyển sinh 2025"
                    >
                      Cẩm nang tuyển sinh 2025
                    </a>
                    <a
                      href="/giao-duc/on-thi-tot-nghiep.htm"
                      className="item"
                      title="Ôn thi tốt nghiệp "
                    >
                      Ôn thi tốt nghiệp{" "}
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/du-lich.htm" className="title" title="Du lịch">
                    Du lịch
                  </a>
                  <div className="list">
                    <a
                      href="/du-lich/tin-tuc-su-kien.htm"
                      className="item"
                      title="Tin tức - Sự kiện"
                    >
                      Tin tức - Sự kiện
                    </a>
                    <a
                      href="/du-lich/choi-gi-an-dau-di-the-nao.htm"
                      className="item"
                      title="Chơi gì, ăn đâu, đi thế nào?"
                    >
                      Chơi gì, ăn đâu, đi thế nào?
                    </a>
                    <a
                      href="/du-lich/bat-dong-san-du-lich.htm"
                      className="item"
                      title="Bất động sản du lịch"
                    >
                      Bất động sản du lịch
                    </a>
                    <a
                      href="/du-lich/cau-chuyen-du-lich.htm"
                      className="item"
                      title="Câu chuyện du lịch"
                    >
                      Câu chuyện du lịch
                    </a>
                    <a
                      href="/du-lich/kham-pha.htm"
                      className="item"
                      title="Khám phá"
                    >
                      Khám phá
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/van-hoa.htm" className="title" title="Văn hóa">
                    Văn hóa
                  </a>
                  <div className="list">
                    <a
                      href="/van-hoa/song-dep.htm"
                      className="item"
                      title="Sống đẹp"
                    >
                      Sống đẹp
                    </a>
                    <a
                      href="/van-hoa/cau-chuyen-van-hoa.htm"
                      className="item"
                      title="Câu chuyện văn hóa"
                    >
                      Câu chuyện văn hóa
                    </a>
                    <a
                      href="/van-hoa/khao-cuu.htm"
                      className="item"
                      title="Khảo cứu"
                    >
                      Khảo cứu
                    </a>
                    <a
                      href="/van-hoa/xem-nghe.htm"
                      className="item"
                      title="Xem - Nghe"
                    >
                      Xem - Nghe
                    </a>
                    <a
                      href="/van-hoa/sach-hay.htm"
                      className="item"
                      title="Sách hay"
                    >
                      Sách hay
                    </a>
                    <a
                      href="/van-hoa/mon-ngon-ha-noi.htm"
                      className="item"
                      title="Món ngon Hà Nội"
                    >
                      Món ngon Hà Nội
                    </a>
                    <a
                      href="/van-hoa/nghia-tinh-mien-tay.htm"
                      className="item"
                      title="Nghĩa tình miền Tây"
                    >
                      Nghĩa tình miền Tây
                    </a>
                    <a
                      href="/van-hoa/hao-khi-mien-dong.htm"
                      className="item"
                      title="Hào khí miền Đông"
                    >
                      Hào khí miền Đông
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/giai-tri.htm" className="title" title="Giải trí">
                    Giải trí
                  </a>
                  <div className="list">
                    <a
                      href="https://ketnoi.thanhnien.vn/"
                      className="item"
                      title="Kết nối"
                    >
                      Kết nối
                    </a>
                    <a href="/giai-tri/phim.htm" className="item" title="Phim">
                      Phim
                    </a>
                    <a
                      href="/giai-tri/truyen-hinh.htm"
                      className="item"
                      title="Truyền hình"
                    >
                      Truyền hình
                    </a>
                    <a
                      href="/giai-tri/doi-nghe-si.htm"
                      className="item"
                      title="Đời nghệ sĩ"
                    >
                      Đời nghệ sĩ
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/the-thao.htm" className="title" title="Thể thao">
                    Thể thao
                  </a>
                  <div className="list">
                    <a
                      href="/the-thao/sea-games-33.htm"
                      className="item"
                      title="SEA Games 33"
                    >
                      SEA Games 33
                    </a>
                    <a
                      href="/the-thao/bong-da-thanh-nien-sinh-vien.htm"
                      className="item"
                      title="Bóng đá Thanh Niên Sinh viên"
                    >
                      Bóng đá Thanh Niên Sinh viên
                    </a>
                    <a
                      href="/the-thao/bong-da-viet-nam.htm"
                      className="item"
                      title="Bóng đá Việt Nam"
                    >
                      Bóng đá Việt Nam
                    </a>
                    <a
                      href="/the-thao/bong-da-quoc-te.htm"
                      className="item"
                      title="Bóng đá Quốc tế"
                    >
                      Bóng đá Quốc tế
                    </a>
                    <a
                      href="/the-thao/the-thao-cong-dong.htm"
                      className="item"
                      title="Thể thao &amp; Cộng đồng"
                    >
                      Thể thao &amp; Cộng đồng
                    </a>
                    <a
                      href="/the-thao/cac-mon-khac.htm"
                      className="item"
                      title="Các môn khác"
                    >
                      Các môn khác
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/cong-nghe.htm" className="title" title="Công nghệ">
                    Công nghệ
                  </a>
                  <div className="list">
                    <a
                      href="/cong-nghe/tin-tuc-cong-nghe.htm"
                      className="item"
                      title="Tin tức công nghệ"
                    >
                      Tin tức công nghệ
                    </a>
                    <a
                      href="/cong-nghe/blockchain.htm"
                      className="item"
                      title="Blockchain"
                    >
                      Blockchain
                    </a>
                    <a
                      href="/cong-nghe/san-pham.htm"
                      className="item"
                      title="Sản phẩm"
                    >
                      Sản phẩm
                    </a>
                    <a
                      href="/cong-nghe/xu-huong-chuyen-doi-so.htm"
                      className="item"
                      title="Xu hướng - Chuyển đổi số"
                    >
                      Xu hướng - Chuyển đổi số
                    </a>
                    <a
                      href="/cong-nghe/thu-thuat.htm"
                      className="item"
                      title="Thủ thuật"
                    >
                      Thủ thuật
                    </a>
                    <a href="/cong-nghe/game.htm" className="item" title="Game">
                      Game
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/xe.htm" className="title" title="Xe">
                    Xe
                  </a>
                  <div className="list">
                    <a
                      href="/xe/thi-truong.htm"
                      className="item"
                      title="Thị trường"
                    >
                      Thị trường
                    </a>
                    <a href="/xe/xe-dien.htm" className="item" title="Xe điện">
                      Xe điện
                    </a>
                    <a
                      href="/xe/danh-gia-xe.htm"
                      className="item"
                      title="Đánh giá xe"
                    >
                      Đánh giá xe
                    </a>
                    <a href="/xe/tu-van.htm" className="item" title="Tư vấn">
                      Tư vấn
                    </a>
                    <a href="/xe/video.htm" className="item" title="Video">
                      Video
                    </a>
                    <a
                      href="/xe/xe-giao-thong.htm"
                      className="item"
                      title="Xe - Giao thông"
                    >
                      Xe - Giao thông
                    </a>
                    <a
                      href="/xe/xe-doi-song.htm"
                      className="item"
                      title="Xe - Đời sống"
                    >
                      Xe - Đời sống
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a
                    href="/thoi-trang-tre.htm"
                    className="title"
                    title="Thời trang trẻ"
                  >
                    Thời trang trẻ
                  </a>

                  <div className="list">
                    <a
                      href="/thoi-trang-tre/thoi-trang-247.htm"
                      className="item"
                      title="Thời trang 24/7"
                    >
                      Thời trang 24/7
                    </a>
                    <a
                      href="/thoi-trang-tre/giu-dang.htm"
                      className="item"
                      title="Giữ dáng"
                    >
                      Giữ dáng
                    </a>
                    <a
                      href="/thoi-trang-tre/thoi-trang-nghe-nghiep.htm"
                      className="item"
                      title="Thời trang nghề &amp; nghiệp"
                    >
                      Thời trang nghề &amp; nghiệp
                    </a>
                    <a
                      href="/thoi-trang-tre/tan-huong.htm"
                      className="item"
                      title="Tận hưởng"
                    >
                      Tận hưởng
                    </a>
                    <a
                      href="/thoi-trang-tre/video.htm"
                      className="item"
                      title="Video"
                    >
                      Video
                    </a>
                    <a
                      href="/thoi-trang-tre/thu-vien-thoi-trang.htm"
                      className="item"
                      title="Thư viện thời trang"
                    >
                      Thư viện thời trang
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a href="/ban-doc.htm" className="title" title="Bạn đọc">
                    Bạn đọc
                  </a>
                  <div className="list">
                    <a
                      href="/ban-doc/la-thu-tam-su.htm"
                      className="item"
                      title="Lá thư tâm sự"
                    >
                      Lá thư tâm sự
                    </a>
                    <a
                      href="/ban-doc/tu-don-thu-ban-doc.htm"
                      className="item"
                      title="Từ đơn thư bạn đọc"
                    >
                      Từ đơn thư bạn đọc
                    </a>
                    <a
                      href="/ban-doc/hoi-va-dap.htm"
                      className="item"
                      title="Hỏi và đáp"
                    >
                      Hỏi và đáp
                    </a>
                    <a
                      href="/ban-doc/ban-doc-viet.htm"
                      className="item"
                      title="Bạn đọc viết"
                    >
                      Bạn đọc viết
                    </a>
                    <a
                      href="/ban-doc/co-quan-chua-tra-loi-ban-doc.htm"
                      className="item"
                      title="Cơ quan chưa trả lời bạn đọc"
                    >
                      Cơ quan chưa trả lời bạn đọc
                    </a>
                    <a
                      href="/ban-doc/tra-loi-ban-doc.htm"
                      className="item"
                      title="Trả lời bạn đọc"
                    >
                      Trả lời bạn đọc
                    </a>
                    <a
                      href="/ban-doc/la-lanh-dum-la-rach.htm"
                      className="item"
                      title="Lá lành đùm lá rách"
                    >
                      Lá lành đùm lá rách
                    </a>
                    <a
                      href="/ban-doc/tam-long-vang.htm"
                      className="item"
                      title="Tấm lòng vàng"
                    >
                      Tấm lòng vàng
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>

                <div className="box">
                  <a
                    href="https://raovat.thanhnien.vn/"
                    className="title"
                    title="Rao vặt"
                  >
                    Rao vặt
                  </a>
                  <div className="list">
                    <a
                      href="https://raovat.thanhnien.vn/nha-dat"
                      className="item"
                      title="Nhà đất"
                    >
                      Nhà đất
                    </a>
                    <a
                      href="https://raovat.thanhnien.vn/mua-ban-dich-vu"
                      className="item"
                      title="Mua bán - Dịch vụ"
                    >
                      Mua bán - Dịch vụ
                    </a>
                    <a
                      href="https://raovat.thanhnien.vn/hoc-hanh-viec-lam"
                      className="item"
                      title="Học hành - Việc làm"
                    >
                      Học hành - Việc làm
                    </a>
                  </div>
                </div>

                <div className="box">
                  <a
                    href="/tieu-dung-thong-minh.htm"
                    className="title"
                    title="Tiêu dùng thông minh"
                  >
                    Tiêu dùng thông minh
                  </a>
                  <div className="list">
                    <a
                      href="/tieu-dung-thong-minh/moi-moi-moi.htm"
                      className="item"
                      title="Mới- Mới- Mới"
                    >
                      Mới- Mới- Mới
                    </a>
                    <a
                      href="/tieu-dung-thong-minh/mua-mot-cham.htm"
                      className="item"
                      title="Mua một chạm"
                    >
                      Mua một chạm
                    </a>
                    <a
                      href="/tieu-dung-thong-minh/o-dau-re.htm"
                      className="item"
                      title="Ở đâu rẻ?"
                    >
                      Ở đâu rẻ?
                    </a>
                    <a
                      href="/tieu-dung-thong-minh/goc-nguoi-tieu-dung.htm"
                      className="item"
                      title="Góc người tiêu dùng"
                    >
                      Góc người tiêu dùng
                    </a>
                  </div>
                  <a href="javascript:;" className="view-more" title="xem thêm">
                    xem thêm
                  </a>
                </div>
              </div>

              <div className="header__mm-right">
                <div className="box">
                  <a
                    href="/chao-ngay-moi.htm"
                    className="item"
                    title="Chào ngày mới"
                  >
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-cloud-sun-fill"></i>
                      </div>
                    </span>
                    Chào ngày mới
                  </a>
                  <a href="/tin-24h.htm" className="item" title="Tin 24h">
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-clock-history"></i>
                      </div>
                    </span>
                    Tin 24h
                  </a>

                  <a
                    href="/thi-truong.htm"
                    className="item"
                    title="Tin thị trường"
                  >
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-graph-up-arrow"></i>
                      </div>
                    </span>
                    Tin thị trường
                  </a>

                  <a href="/tin-nhanh-360.htm" className="item" title="Tin 360">
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-globe"></i>
                      </div>
                    </span>
                    Tin 360
                  </a>
                </div>

                <div className="box">
                  <a href="/video.htm" className="item" title="Video">
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-play-circle"></i>
                      </div>
                    </span>
                    Video
                  </a>

                  <a href="/magazine.htm" className="item" title="Magazine">
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-journal-richtext"></i>
                      </div>
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
                      <div className="bootstrap__icon">
                        <i className="bi bi-grid-fill"></i>
                      </div>
                    </span>
                    Tiện ích
                  </a>
                  <a
                    href="/ban-can-biet.htm"
                    className="item"
                    title="Bạn cần biết"
                  >
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-info-circle"></i>
                      </div>
                    </span>
                    Bạn cần biết
                  </a>
                  <a href="/lien-he.htm" className="item" title="Liên hệ">
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-telephone"></i>
                      </div>
                    </span>
                    Liên hệ
                  </a>
                  <a
                    href="/thong-tin-toa-soan.html"
                    className="item"
                    title="Thông tin toà soạn"
                  >
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-building"></i>
                      </div>
                    </span>
                    Thông tin toà soạn
                  </a>
                  <a
                    href="https://banggia.thanhnien.vn/"
                    className="item"
                    title="Liên hệ quảng cáo"
                  >
                    <span className="icon">
                      <div className="bootstrap__icon">
                        <i className="bi bi-megaphone"></i>
                      </div>
                    </span>
                    Liên hệ quảng cáo
                  </a>
                </div>

                <div className="social">
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
    </div>
  );
};

export default Navbar;
