import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./services/authService";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      alert(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/"; 
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Đăng nhập</h1>
        <p className="login-subtitle">Báo Thanh Niên</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn-login">Đăng nhập</button>
        </form>

        <div className="login-footer">
          <Link to="/register">Đăng ký</Link>
        </div>
      </div>
    </div>
  );
}
