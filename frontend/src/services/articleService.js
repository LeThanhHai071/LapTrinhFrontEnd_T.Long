import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth";
import { getUserIdFromStorage } from "../utils/authUtils.js";

export const articleService = {
    smartToggleSave: async (article, articleId) => {
        const userId = getUserIdFromStorage();

        if (!userId) {
            throw new Error("Chưa đăng nhập");
        }

        const payload = {
            userId: userId,
            articleId: articleId,
            title: article?.title,
            imageURL: article?.content?.find(b => b.type === "image_block")?.urls || "",
            link: window.location.href,
            sapo: article?.sapo
        };

        return await axios.post(`${API_BASE_URL}/toggle-save`, payload);
    },

    getSavedList: async (userId) => {
        return await axios.get(`${API_BASE_URL}/saved-list/${userId}`);
    }
};