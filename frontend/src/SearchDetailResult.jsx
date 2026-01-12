import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./newsDetail.css";

const SearchDetailResult = () => {
    const { id: rawId } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [speaking, setSpeaking] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            try {
                // Tách lấy ID số từ chuỗi URL (ví dụ: tieu-de-185992649 -> 185992649)
                const actualId = rawId.includes("-") ? rawId.split("-").pop() : rawId;
                const response = await axios.get(`http://localhost:5000/api/search-detail/${actualId}`);
                setArticle(response.data);
                setError(null);
            } catch (err) {
                setError("❌ Bài viết chưa có nội dung chi tiết.");
            } finally {
                setLoading(false);
            }
        };

        if (rawId) fetchContent();
    }, [rawId]);

    // CHỨC NĂNG ĐỌC BÁO (Text-to-Speech)
    const handleSpeak = () => {
        if (!article || speaking) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
            if (!speaking) return;
        }

        const bodyText = article.body?.filter(b => b.type === "text").map(b => b.content).join(" ");
        const fullContent = `${article.title}. ${article.sapo || ""}. ${bodyText || ""}`;

        const utterance = new SpeechSynthesisUtterance(fullContent);
        utterance.lang = "vi-VN";
        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    // Dừng đọc khi người dùng chuyển trang
    useEffect(() => {
        return () => window.speechSynthesis.cancel();
    }, []);

    if (loading) return <div className="status-msg">⏳ Đang lấy nội dung bài viết...</div>;
    if (error) return <div className="status-msg">{error}</div>;

    return (
        <div className="news-detail">
            <h1 className="title">{article.title}</h1>
            <div className="meta">
                <span>{article.publishDate}</span>
                {article.author && <span> • {article.author}</span>}
                <button className={`speak-btn ${speaking ? 'active' : ''}`} onClick={handleSpeak}>
                    {speaking ? "⏹ Dừng đọc" : "🔊 Đọc báo"}
                </button>
            </div>

            <p className="sapo"><strong>{article.sapo}</strong></p>

            <div className="content">
                {article.body?.map((block, index) => {
                    if (block.type === "text") return <p key={index}>{block.content}</p>;
                    if (block.type === "image") {
                        return (
                            <figure key={index}>
                                <img src={block.url} alt={block.caption || ""} />
                                {block.caption && <figcaption>{block.caption}</figcaption>}
                            </figure>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default SearchDetailResult;