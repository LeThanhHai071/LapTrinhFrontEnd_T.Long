import axios from "axios";
import { fetchNewsDetail } from "./newsService"; // Import hàm bạn vừa cung cấp

const API_BASE_URL = "http://localhost:5000/api/auth";

export const savedArticleService = {
    getSavedList: async (userId) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/saved-list/${userId}`);
            const savedItems = res.data;
            const enrichedData = await Promise.all(
                savedItems.map(async (item) => {
                    try {
                        const encodedUrl = btoa(item.link);
                        const details = await fetchNewsDetail(encodedUrl);
                        const imageBlock = details.content?.find(b => b.type === "image_block");
                        const rawUrls = imageBlock?.urls || imageBlock?.imageUrl || "";
                        const finalImage = Array.isArray(rawUrls) ? rawUrls[0] : rawUrls;

                        return {
                            ...item,
                            id: String(item.articleId),
                            articleId: String(item.articleId),
                            imageURL: finalImage || "https://placehold.co/240x150?text=No+Image",
                            sapo: details.sapo || item.sapo || ""
                        };
                    } catch (err) {
                        console.warn(`Không thể lấy chi tiết cho bài ${item.articleId}:`, err);
                        return { ...item, id: String(item.articleId) }; // Trả về dữ liệu gốc nếu lỗi
                    }
                })
            );

            return enrichedData.filter(item => item.id !== "");
        } catch (error) {
            console.error("Lỗi khi tải danh sách đã lưu:", error);
            throw error;
        }
    }
};