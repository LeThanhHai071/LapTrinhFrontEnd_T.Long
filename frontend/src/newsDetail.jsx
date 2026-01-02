import React, { useEffect, useState } from "react";
import "./newsDetail.css";

const NewsDetail = () => {
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
  const [voice, setVoice] = useState(null);

  // ===== LOAD VIETNAMESE VOICE =====
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find((v) => v.lang === "vi-VN");
      if (viVoice) setVoice(viVoice);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // ===== TEXT TO SPEECH =====
  const handleSpeak = () => {
    const synth = window.speechSynthesis;

    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!voice) {
      alert("Trình duyệt chưa hỗ trợ giọng đọc tiếng Việt!");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      `${article.title}. ${article.content}`
    );

    utterance.voice = voice;
    utterance.lang = "vi-VN";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => setIsSpeaking(false);

    setIsSpeaking(true);
    synth.speak(utterance);
  };

  // ===== ADD COMMENT =====
  const handleAddComment = () => {
    if (!commentText.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now(),
        text: commentText,
        time: new Date().toLocaleString("vi-VN"),
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
        {article.content
          .trim()
          .split("\n")
          .map((p, i) => (
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

export default NewsDetail;
