import { useState } from "react";
import { changePassword } from "./services/authService";
import { validatePassword } from "./utils/passwordUtils";
import { md5Hash } from "./utils/hashUtils";
import "./changePassword.css";

export default function ChangePassword() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("Vui lòng đăng nhập");
      return;
    }

    if (!validatePassword(form.newPassword)) {
      alert("Mật khẩu mới phải ≥ 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("Xác nhận mật khẩu không khớp");
      return;
    }

    try {
      const res = await changePassword(user.id, {
        oldPassword: md5Hash(form.oldPassword),
        newPassword: md5Hash(form.newPassword),
      });

      alert(res.data.message);
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Đổi mật khẩu thất bại");
    }
  };

  return (
    <div className="cp-page">
      <div className="cp-card">
        <h2 className="cp-title">Đổi mật khẩu</h2>

        <form onSubmit={handleSubmit}>
          <div className="cp-group">
            <label>Mật khẩu cũ</label>
            <input
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cp-group">
            <label>Mật khẩu mới</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cp-group">
            <label>Xác nhận mật khẩu mới</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button className="cp-btn">Lưu mật khẩu</button>
        </form>
      </div>
    </div>
  );
}
