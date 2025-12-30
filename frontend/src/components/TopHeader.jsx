import React from "react";
import { Link } from "react-router-dom";
import "./TopHeader.css";

const TopHeader = ({ onOpenMenu }) => {
  return (
    <div className="header od_header">
      <div className="header__sticky">
        <div className="header__top">
          <div className="header__container">
            <div className="header__top-flex">
              <div className="header__tf-left">
                <div className="header__tf-menu" onClick={onOpenMenu}>
                  <div className="bootstrap__icon">
                    <i className="bi bi-list"></i>
                  </div>
                </div>
                <div className="header__tf-search">
                  <div className="box-search header-search">
                    <input
                      className="btn-search txt-search txt-search-header"
                      placeholder="Tìm kiếm"
                    />
                    <a
                      href="javascript:;"
                      className="submit-search btn-search-a"
                      aria-label="btn-search-a"
                    >
                      <div className="bootstrap__icon">
                        <i className="bi bi-search"></i>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <h1>
                <a
                  href="/"
                  title="Báo thanh niên"
                  className="header__logo logo-fix"
                >
                  <img
                    className="logo-thuong"
                    alt="Báo thanh niên"
                    src="https://static.thanhnien.com.vn/thanhnien.vn/image/logo-40-nam-trang-chu.svg"
                    width="220px"
                    height="63px"
                  />
                </a>
              </h1>

              <div className="header__tf-right box-user is-show-user">
                <a
                  href="https://banggia.thanhnien.vn/"
                  className="item"
                  target="_blank"
                  title="Quảng cáo"
                >
                  <span className="text">Quảng cáo</span>
                  <span className="icon">
                    <div className="bootstrap__icon">
                      <i className="bi bi-megaphone-fill"></i>
                    </div>
                  </span>
                </a>

                <a
                  href="https://datbao.thanhnien.vn/"
                  className="item"
                  target="_blank"
                  title="Đặt báo"
                >
                  <span className="text">Đặt báo</span>
                  <span className="icon">
                    <div className="bootstrap__icon">
                      <i className="bi bi-newspaper"></i>
                    </div>
                  </span>
                </a>

                <a
                  href="https://my.thanhnien.vn/page/login.html?redirect_url=https://thanhnien.vn/"
                  className="item login login-btn"
                  title="Đăng nhập"
                >
                  <span className="text">Đăng nhập</span>
                  <span className="icon">
                    <div className="bootstrap__icon">
                      <i className="bi bi-person-circle"></i>
                    </div>
                  </span>
                </a>
                <div className="header__user user-des hidden list-action">
                  <div className="header__user-title title-user">
                    <a
                      href="https://my.thanhnien.vn/"
                      className="avatar "
                      id="__userImg"
                    >
                      <img
                        src="https://static.thanhnien.com.vn/thanhnien.vn/image/ava_inter.png"
                        alt="avatar-user"
                      />
                    </a>
                    <span className="icon-down">
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9104 7.46938L9.00035 10.3794L6.09035 7.46938C5.79785 7.17687 5.32535 7.17687 5.03285 7.46938C4.74035 7.76188 4.74035 8.23438 5.03285 8.52688L8.47535 11.9694C8.76785 12.2619 9.24035 12.2619 9.53285 11.9694L12.9754 8.52688C13.2679 8.23438 13.2679 7.76188 12.9754 7.46938C12.6829 7.18437 12.2029 7.17687 11.9104 7.46938Z"
                          fill="#292929"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div className="header__user-content header__user__login">
                    <div className="header__uc-main">
                      <div className="header__uc-news group-commnent hidden">
                        <div className="top">
                          <span className="text">Bình luận mới được duyệt</span>
                          <a
                            href="https://my.thanhnien.vn/binh-luan"
                            title="Xem tất cả"
                            className="btn-remore view-more"
                          >
                            Xem tất cả
                          </a>
                        </div>
                        <div className="mid">
                          <div className="content-box" id="content_comment"></div>
                        </div>
                      </div>
                      <div className="header__uc-link">
                        <a
                          href="https://my.thanhnien.vn/"
                          className="item-link"
                          title="Thông tin tài khoản"
                        >
                          {/* <svg className="icon" width="24" height="24">
                          <use xlink:href="#icon-user-login"></use>
                        </svg> */}
                          Thông tin tài khoản
                        </a>
                        <a
                          href="https://my.thanhnien.vn/doi-mat-khau"
                          className="item-link"
                          title="Đổi mật khẩu"
                        >
                          {/* <svg className="icon" width="24" height="24">
                          <use xlink:href="#change-pass"></use>
                        </svg> */}
                          Đổi mật khẩu
                        </a>
                        <a
                          href="https://my.thanhnien.vn/tin-da-luu"
                          className="item-link"
                          title="Tin đã lưu"
                        >
                          {/* <svg className="icon" width="24" height="24">
                          <use xlink:href="#save-news"></use>
                        </svg> */}
                          Tin đã lưu
                        </a>
                        <a
                          href="https://my.thanhnien.vn/tin-da-xem"
                          className="item-link"
                          title="Tin đã xem"
                        >
                          {/* <svg className="icon" width="24" height="24">
                          <use xlink:href="#history-news"></use>
                        </svg> */}
                          Tin đã xem
                        </a>
                        <a
                          href="javascript:;"
                          className="item-link"
                          title="Đăng xuất"
                          id="logout_user"
                        >
                          {/* <svg className="icon" width="24" height="24">
                          <use xlink:href="#log-out"></use>
                        </svg> */}
                          Đăng xuất
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
