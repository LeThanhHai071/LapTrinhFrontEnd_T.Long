import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./profile.css";

const EMPTY_PROFILE = {
  fullName: "",
  gender: "",
  birthday: "",
  email: "",
  phone: "",
  address: "",
};

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const loadedRef = useRef(false); // chặn useEffect chạy lại

  const [isEdit, setIsEdit] = useState(false);
  const [profile, setProfile] = useState(EMPTY_PROFILE);

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    if (!user?.id || loadedRef.current) return;
    loadedRef.current = true;

    axios
      .get(`http://localhost:5000/api/profile/${user.id}`)
      .then((res) => {
        const data = res.data || {};
        setProfile({ ...EMPTY_PROFILE, ...data });
      })
      .catch(() => {
        setProfile(EMPTY_PROFILE);
      });
  }, [user?.id]);

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/profile/${user.id}`,
        profile
      );
      alert("Cập nhật hồ sơ thành công");
      setIsEdit(false);
    } catch {
      alert("Lưu hồ sơ thất bại");
    }
  };

  if (!user) {
    return <p className="profile-error">Vui lòng đăng nhập</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="profile-title">Hồ sơ cá nhân</h2>

        <div className="profile-form">
          <FormGroup label="Họ và tên">
            <input
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </FormGroup>

          <FormGroup label="Giới tính">
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
          </FormGroup>

          <FormGroup label="Ngày sinh">
            <input
              type="date"
              name="birthday"
              value={profile.birthday}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </FormGroup>

          <FormGroup label="Email">
            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </FormGroup>

          <FormGroup label="Số điện thoại">
            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </FormGroup>

          <FormGroup label="Địa chỉ">
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </FormGroup>
        </div>

        <div className="profile-actions">
          {isEdit ? (
            <>
              <button className="btn btn-save" onClick={handleSave}>
                Lưu
              </button>
              <button
                className="btn btn-cancel"
                onClick={() => setIsEdit(false)}
              >
                Hủy
              </button>
            </>
          ) : (
            <button
              className="btn btn-edit"
              onClick={() => setIsEdit(true)}
            >
              Chỉnh sửa hồ sơ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const FormGroup = ({ label, children }) => (
  <div className="form-group">
    <label>{label}</label>
    {children}
  </div>
);

export default Profile;
