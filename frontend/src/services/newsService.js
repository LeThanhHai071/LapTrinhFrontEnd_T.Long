const API_BASE = "http://localhost:5000/api";

/* ===== LẤY TOÀN BỘ TIN (HOME / LIST) ===== */
export const fetchAllNews = async () => {
  const res = await fetch(`${API_BASE}/news`);
  if (!res.ok) {
    throw new Error("Không tải được danh sách tin");
  }
  return res.json();
};

/* ===== LẤY CHI TIẾT BÀI ===== */
export const fetchNewsDetail = async (articleId) => {
  const res = await fetch(`${API_BASE}/news/detail/${articleId}`);

  if (!res.ok) {
    throw new Error("Không tìm thấy bài viết");
  }

  return res.json();
};

