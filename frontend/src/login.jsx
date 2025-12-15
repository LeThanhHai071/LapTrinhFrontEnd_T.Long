import React from "react";
import "./login.css";

export default function Login() {
const handleSubmit = (e) => {
e.preventDefault();
// TODO: call API login
console.log("Login submit");
};


return (
<div className="login-page">
<div className="login-card">
<h1 className="login-title">Đăng nhập</h1>
<p className="login-subtitle">Báo Thanh niên</p>


<form className="login-form" onSubmit={handleSubmit}>
<div className="form-group">
<label>Tên đăng nhập</label>
<input type="text" placeholder="Nhập username" required />
</div>


<div className="form-group">
<label>Mật khẩu</label>
<input type="password" placeholder="Nhập mật khẩu" required />
</div>


<button type="submit" className="btn-login">
Đăng nhập
</button>
</form>


<div className="login-footer">
<a href="#">Quên mật khẩu?</a>
<span> | </span>
<a href="#">Đăng ký</a>
</div>
</div>
</div>
);
}