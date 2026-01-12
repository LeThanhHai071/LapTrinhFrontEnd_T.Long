import React, { useEffect, useState } from "react";
import "./styles/profile.css";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    gender: "",
    birthday: "",
    address: "",
    email: "",
    phone: "",
  });

  // Load profile từ localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setIsEdit(false);
    alert("Cập nhật hồ sơ thành công!");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="profile-title">
          <i className="bi bi-person-circle"></i> Hồ sơ cá nhân
        </h2>

        <div className="profile-form">
          {/* Họ và tên */}
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              disabled={!isEdit}
              placeholder="Nhập họ và tên"
            />
          </div>

          {/* Giới tính */}
          <div className="form-group">
            <label>Giới tính</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              disabled={!isEdit}
            >
              <option value="">-- Chọn --</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          {/* Ngày sinh */}
          <div className="form-group">
            <label>Ngày sinh</label>
            <input
              type="date"
              name="birthday"
              value={profile.birthday}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEdit}
              placeholder="example@gmail.com"
            />
          </div>

          {/* Số điện thoại */}
          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEdit}
              placeholder="0123456789"
            />
          </div>

          {/* Địa chỉ */}
          <div className="form-group">
            <label>Địa chỉ</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEdit}
              placeholder="Nhập địa chỉ"
            />
          </div>

          {/* Buttons */}
          <div className="profile-actions">
            {isEdit ? (
              <>
                <button className="btn btn-save" onClick={handleSave}>ưu</button>
                <button className="btn btn-cancel" onClick={() => setIsEdit(false)}>Hủy</button>
              </>
            ) : (
              <button
                className="btn btn-edit"
                onClick={() => setIsEdit(true)}
              >
                ✏️ Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
