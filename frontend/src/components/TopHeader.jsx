import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TopHeader.css";

const TopHeader = ({ onOpenMenu }) => {
  const [user, setUser] = useState(null);
  const [openUser, setOpenUser] = useState(false);
  const navigate = useNavigate();

  // Load user từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setOpenUser(false);
    navigate("/login");
  };

  return (
    <div className="header__container">
      <div className="header__top-flex">

        {/* LEFT */}
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
              <div className="submit-search btn-search-a">
                <div className="bootstrap__icon">
                  <i className="bi bi-search"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOGO */}
        <h1>
          <Link to="/" className="header__logo logo-fix">
            <img
              className="logo-thuong"
              src="https://static.thanhnien.com.vn/thanhnien.vn/image/logo-40-nam-trang-chu.svg"
              alt="Báo thanh niên"
            />
          </Link>
        </h1>

        {/* RIGHT */}
        <div className="header__tf-right box-user">

          <Link to="/advertise" className="item">
            <span className="text">Quảng cáo</span>
            <span className="icon">
              <i className="bi bi-megaphone-fill"></i>
            </span>
          </Link>

          <Link to="/subscription" className="item">
            <span className="text">Đặt báo</span>
            <span className="icon">
              <i className="bi bi-newspaper"></i>
            </span>
          </Link>

          {/* CHƯA LOGIN */}
          {!user && (
            <Link to="/login" className="item login login-btn">
              <span className="text">Đăng nhập</span>
              <span className="icon">
                <i className="bi bi-person-circle"></i>
              </span>
            </Link>
          )}

          {/* ĐÃ LOGIN */}
          {user && (
            <div className="header__user">
              <div
                className="header__user-title title-user"
                onClick={() => setOpenUser(!openUser)}
              >
                <img
                  src="https://static.thanhnien.com.vn/thanhnien.vn/image/ava_inter.png"
                  alt="avatar-user"
                />
                <span className="icon-down">
                  <i className="bi bi-caret-down-fill"></i>
                </span>
              </div>

              {/* MENU USER */}
              <div
                className="header__user-content"
                style={{
                  visibility: openUser ? "visible" : "hidden",
                  opacity: openUser ? 1 : 0,
                }}
              >
                <div className="header__uc-main">
                  <div className="header__uc-link">
                    <a className="item-link">Thông tin tài khoản</a>
                    <a className="item-link">Đổi mật khẩu</a>
                    <a className="item-link">Tin đã lưu</a>
                    <a className="item-link">Tin đã xem</a>
                    <a
                      className="item-link"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TopHeader;
