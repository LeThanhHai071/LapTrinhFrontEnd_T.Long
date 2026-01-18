import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { fetchAllNews as fetchNewsList } from "./services/newsService";
import "./savedArticle.css";

const SavedArticle = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Chỉ cần lấy danh sách để hiển thị
                const data = await fetchNewsList();
                setArticles(data);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu:", err);
            } finally {
                setIsLoading(false);
            }
        };
        loadInitialData();
    }, []);

    if (isLoading) return <div className="savedArticle-loading">Đang tải danh sách bài báo...</div>;

    return (
        <div className="savedArticle-container">
            <h2 className="savedArticle-headerTitle">Khám phá Tin tức</h2>
            <div className="savedArticle-wrapper">
                {articles.map((item) => (
                    <div key={item.id} className="savedArticle-itemCard">
                        <Link to={`/news/${item.id}`} className="savedArticle-link">
                            <div className="savedArticle-imageBox">
                                <img
                                    src={item.thumbnail || "https://via.placeholder.com/400x250"}
                                    alt={item.title}
                                    className="savedArticle-img"
                                />
                            </div>
                            <div className="savedArticle-info">
                                <span className="savedArticle-tag">{item.category || "Tổng hợp"}</span>
                                <h3 className="savedArticle-itemTitle">{item.title}</h3>
                                <p className="savedArticle-summary">
                                    {item.sapo ? item.sapo.substring(0, 95) + "..." : "Xem chi tiết bài viết tại đây."}
                                </p>
                                <div className="savedArticle-metaData">
                                    <span className="savedArticle-date">{item.publishDate}</span>
                                    <span className="savedArticle-readMore">Đọc tiếp</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedArticle;