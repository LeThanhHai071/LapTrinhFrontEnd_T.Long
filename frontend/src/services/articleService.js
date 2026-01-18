import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth";

export const articleService = {
    toggleSave: async (payload) => {
        return await axios.post(`${API_BASE_URL}/toggle-save`, payload);
    },

    getSavedList: async (userId) => {
        return await axios.get(`${API_BASE_URL}/saved-list/${userId}`);
    }
};