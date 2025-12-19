import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div class="header__sticky">
      <div class="header__top">
        <div class="header__container">
          <div class="header__top-flex">
            <div class="header__tf-left">
              <div class="header__tf-menu ">
                <div class="bootstrap__icon">
                  <i class="bi bi-list"></i>
                </div>
              </div>
              <div class="header__tf-search">
                <div class="box-search header-search">
                  <input
                    class="btn-search txt-search txt-search-header"
                    placeholder="Tìm kiếm"
                  />
                  <a
                    href="javascript:;"
                    class="submit-search btn-search-a"
                    aria-label="btn-search-a"
                  >
                    <div class="bootstrap__icon">
                      <i class="bi bi-search"></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <h1>
              <a href="/" title="Báo thanh niên" class="header__logo logo-fix">
                <img
                  class="logo-thuong"
                  alt="Báo thanh niên"
                  src="https://static.thanhnien.com.vn/thanhnien.vn/image/logo.svg"
                  width="220px"
                  height="63px"
                />
              </a>
            </h1>

            <div class="header__tf-right box-user is-show-user">
              <a
                href="https://banggia.thanhnien.vn/"
                class="item"
                target="_blank"
                title="Quảng cáo"
              >
                <span class="text">Quảng cáo</span>
                <span class="icon">
                  <div className="bootstrap__icon">
                    <i class="bi bi-megaphone-fill"></i>
                  </div>
                </span>
              </a>

              <a
                href="https://datbao.thanhnien.vn/"
                class="item"
                target="_blank"
                title="Đặt báo"
              >
                <span class="text">Đặt báo</span>
                <span class="icon">
                  <div className="bootstrap__icon">
                    <i class="bi bi-newspaper"></i>
                  </div>
                </span>
              </a>

              <a
                href="https://my.thanhnien.vn/page/login.html?redirect_url=https://thanhnien.vn/"
                class="item login login-btn"
                title="Đăng nhập"
              >
                <span class="text">Đăng nhập</span>
                <span class="icon">
                  <div className="bootstrap__icon">
                    <i class="bi bi-person-circle"></i>
                  </div>
                </span>
              </a>
              <div class="header__user user-des hidden list-action">
                <div class="header__user-title title-user">
                  <a
                    href="https://my.thanhnien.vn/"
                    class="avatar "
                    id="__userImg"
                  >
                    <img
                      src="https://static.thanhnien.com.vn/thanhnien.vn/image/ava_inter.png"
                      alt="avatar-user"
                    />
                  </a>
                  <span class="icon-down">
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
                <div class="header__user-content header__user__login">
                  <div class="header__uc-main">
                    <div class="header__uc-news group-commnent hidden">
                      <div class="top">
                        <span class="text">Bình luận mới được duyệt</span>
                        <a
                          href="https://my.thanhnien.vn/binh-luan"
                          title="Xem tất cả"
                          class="btn-remore view-more"
                        >
                          Xem tất cả
                        </a>
                      </div>
                      <div class="mid">
                        <div class="content-box" id="content_comment"></div>
                      </div>
                    </div>
                    <div class="header__uc-link">
                      <a
                        href="https://my.thanhnien.vn/"
                        class="item-link"
                        title="Thông tin tài khoản"
                      >
                        <svg class="icon" width="24" height="24">
                          <use xlink:href="#icon-user-login"></use>
                        </svg>
                        Thông tin tài khoản
                      </a>
                      <a
                        href="https://my.thanhnien.vn/doi-mat-khau"
                        class="item-link"
                        title="Đổi mật khẩu"
                      >
                        <svg class="icon" width="24" height="24">
                          <use xlink:href="#change-pass"></use>
                        </svg>
                        Đổi mật khẩu
                      </a>
                      <a
                        href="https://my.thanhnien.vn/tin-da-luu"
                        class="item-link"
                        title="Tin đã lưu"
                      >
                        <svg class="icon" width="24" height="24">
                          <use xlink:href="#save-news"></use>
                        </svg>
                        Tin đã lưu
                      </a>
                      <a
                        href="https://my.thanhnien.vn/tin-da-xem"
                        class="item-link"
                        title="Tin đã xem"
                      >
                        <svg class="icon" width="24" height="24">
                          <use xlink:href="#history-news"></use>
                        </svg>
                        Tin đã xem
                      </a>
                      <a
                        href="javascript:;"
                        class="item-link"
                        title="Đăng xuất"
                        id="logout_user"
                      >
                        <svg class="icon" width="24" height="24">
                          <use xlink:href="#log-out"></use>
                        </svg>
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
  );
};

export default Header;
