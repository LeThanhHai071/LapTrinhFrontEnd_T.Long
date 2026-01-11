// const API_BASE = "http://localhost:5000/api";

// /* ===== LẤY TOÀN BỘ TIN (HOME / LIST) ===== */
// export const fetchAllNews = async () => {
//   const res = await fetch(`${API_BASE}/news`);
//   if (!res.ok) {
//     throw new Error("Không tải được danh sách tin");
//   }
//   return res.json();
// };

// /* ===== LẤY CHI TIẾT BÀI ===== */
// export const fetchNewsDetail = async (articleId) => {
//   const res = await fetch(`${API_BASE}/news/detail/${articleId}`);

//   if (!res.ok) {
//     throw new Error("Không tìm thấy bài viết");
//   }

//   return res.json();
// };

const API_BASE = "http://localhost:5000/api";

// Lấy tất cả danh mục kèm bài viết (Để hiện ở trang Home)
export const fetchAllNews = async () => {
  // Đổi endpoint thành /categories-with-news (Bạn cần tạo ở BE)
  const res = await fetch(`${API_BASE}/categories`); 
  if (!res.ok) throw new Error("Không tải được dữ liệu");
  return res.json();
};

// Lấy chi tiết bài viết
export const fetchNewsDetail = async (encodedUrl) => {
  // encodedUrl chính là chuỗi btoa(link) từ trang Home truyền sang
  const res = await fetch(`${API_BASE}/article/${encodedUrl}`);
  if (!res.ok) throw new Error("Không tìm thấy bài viết");
  return res.json();
};