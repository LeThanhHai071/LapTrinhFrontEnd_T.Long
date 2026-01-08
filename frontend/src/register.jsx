import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "./services/authService";
import { validatePassword } from "./utils/passwordUtils";
import { md5Hash } from "./utils/hashUtils";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    }

    if (!validatePassword(form.password)) {
      alert(
        "Mật khẩu phải ≥ 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      );
      return;
    }

    const payload = {
      username: form.username,
      email: form.email,
      password: md5Hash(form.password)
    };

    try {
      const res = await register(payload);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">Tạo tài khoản</h1>
        <p className="register-subtitle">
          Tham gia cộng đồng <b>Báo Thanh Niên</b>
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Tên đăng nhập"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            onChange={handleChange}
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu"
            onChange={handleChange}
            required
          />

          <button className="btn-register">Đăng ký</button>
        </form>

        <div className="register-footer">
          <span>Đã có tài khoản?</span>
          <Link to="/login"> Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
