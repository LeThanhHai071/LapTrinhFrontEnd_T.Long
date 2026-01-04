import axios from "axios";

const API_URL = "http://localhost:5000/api/news";

// LẤY TOÀN BỘ DỮ LIỆU final_data.json
export const fetchAllNews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
