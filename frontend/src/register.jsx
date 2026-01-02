import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "./services/authService";
import "./login.css";

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

    try {
      const res = await register(form);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Đăng ký</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />

          <button className="btn-login">Đăng ký</button>
        </form>
      </div>
    </div>
  );
}
