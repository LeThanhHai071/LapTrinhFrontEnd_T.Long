import React, { useState } from "react";
import "./newsDetail.css";

const newsDetail = () => {
  const article = {
    title: "Quốc hội thông qua nhiều chính sách quan trọng năm 2025",
    time: "20/12/2025 - 09:30",
    author: "PV Báo Tin Tức",
    image: "https://via.placeholder.com/900x500?text=Chi+Tiet+Bai+Bao",
    content: `
Quốc hội sáng nay đã biểu quyết thông qua nhiều luật và nghị quyết quan trọng
liên quan đến phát triển kinh tế – xã hội, ngân sách nhà nước và cải cách hành chính.

Các chính sách mới được kỳ vọng sẽ tạo động lực tăng trưởng,
nâng cao đời sống người dân và tăng cường hiệu quả quản lý nhà nước.

Nhiều đại biểu đánh giá cao tính thực tiễn và cấp thiết của các quyết sách lần này.
    `,
  };

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ===== TEXT TO SPEECH =====
  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      article.title + ". " + article.content
    );
    utterance.lang = "vi-VN";
    utterance.rate = 1;
    utterance.onend = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // ===== ADD COMMENT =====
  const handleAddComment = () => {
    if (!commentText.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now(),
        text: commentText,
        time: new Date().toLocaleString(),
      },
    ]);
    setCommentText("");
  };

  return (
    <div className="news-detail">
      <h1 className="title">{article.title}</h1>

      <div className="meta">
        <span>{article.author}</span> • <span>{article.time}</span>
        <button className="speak-btn" onClick={handleSpeak}>
          {isSpeaking ? "🔇 Dừng đọc" : "🔊 Nghe bài báo"}
        </button>
      </div>

      <img src={article.image} alt={article.title} className="main-image" />

      <div className="content">
        {article.content.split("\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* ===== COMMENT ===== */}
      <div className="comment-section">
        <h3>Bình luận</h3>

        <textarea
          placeholder="Nhập bình luận của bạn..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button onClick={handleAddComment}>Gửi bình luận</button>

        <ul className="comment-list">
          {comments.map((c) => (
            <li key={c.id}>
              <p>{c.text}</p>
              <small>{c.time}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default newsDetail;
