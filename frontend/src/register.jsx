import React from "react";
import "./login.css"; // dùng chung CSS với login

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API register
    console.log("Register submit");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Đăng ký</h1>
        <p className="login-subtitle">Báo Thanh niên</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input type="text" placeholder="Nhập username" required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Nhập email" required />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" required />
          </div>

          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input type="password" placeholder="Nhập lại mật khẩu" required />
          </div>

          <button type="submit" className="btn-login">
            Đăng ký
          </button>
        </form>

        <div className="login-footer">
          <span>Đã có tài khoản? </span>
          <a href="/login">Đăng nhập</a>
        </div>
      </div>
    </div>
  );
}
