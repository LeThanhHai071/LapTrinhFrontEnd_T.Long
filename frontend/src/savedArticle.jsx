import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BoxCategory_item from "./pages/BoxCategory_item.jsx";
import { savedArticleService } from "./services/savedArticleService";
import { getUserIdFromStorage } from "./utils/authUtils.js";
import "./savedArticle.css";

const SavedArticle = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const userId = getUserIdFromStorage();
            if (!userId) {
                setIsLoading(false);
                return;
            }
            try {
                const data = await savedArticleService.getSavedList(userId);
                setArticles(data);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu:", err);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    if (isLoading) return <div className="container" style={{ padding: "40px", textAlign: "center" }}>Đang tải danh sách...</div>;

    return (
        <div className="lastest_content">
            <div className="list__new">
                <div className="container">
                    <div className="box-category">
                        <div className="box-category-middle list__main_check saved-list-container">
                            {articles.length > 0 ? (
                                articles.map((item) => (
                                    <BoxCategory_item key={item.id} data={item} />
                                ))
                            ) : (
                                <div className="empty-saved-state">
                                    <p>Bạn chưa lưu bài viết nào.</p>
                                    <Link to="/" className="go-home-link">Khám phá tin tức ngay</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedArticle;