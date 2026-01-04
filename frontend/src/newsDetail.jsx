import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllNews } from "./services/newsService";
import "./NewsDetail.css";

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    fetchAllNews().then((data) => {
      let found = null;

      Object.values(data).forEach(parent =>
        Object.values(parent).forEach(sub =>
          sub.forEach(item => {
            if (btoa(item.link) === id) found = item;
          })
        )
      );

      setArticle(found);
    });
  }, [id]);

  /* ===== TEXT TO SPEECH ===== */
  const handleSpeak = () => {
    if (!article) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const text =
      article.title + ". " +
      article.sapo + ". " +
      article.body
        .filter(b => b.type === "text")
        .map(b => b.content)
        .join(" ");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  /* ===== COMMENT ===== */
  const handleAddComment = () => {
    if (!commentText.trim()) return;

    setComments([
      ...comments,
      {
        text: commentText,
        time: new Date().toLocaleString("vi-VN"),
      },
    ]);
    setCommentText("");
  };

  if (!article) return <p>⏳ Đang tải bài viết...</p>;

  return (
    <div className="news-detail">
      <h1 className="title">{article.title}</h1>

      <div className="meta">
        <span>{article.publishDate}</span>
        <span>•</span>
        <span>{article.author}</span>

        <button className="speak-btn" onClick={handleSpeak}>
          {speaking ? "⏹ Dừng đọc" : "🔊 Đọc báo"}
        </button>
      </div>

      <p className="sapo">{article.sapo}</p>

      <div className="content">
        {article.body.map((block, i) => {
          if (block.type === "text") {
            return <p key={i}>{block.content}</p>;
          }

          if (block.type === "image") {
            return (
              <figure key={i}>
                <img src={block.url} alt="" />
                <figcaption>{block.caption}</figcaption>
              </figure>
            );
          }

          return null;
        })}
      </div>

      {/* ===== COMMENT ===== */}
      <div className="comment-section">
        <h3>💬 Bình luận</h3>

        <textarea
          placeholder="Nhập bình luận..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button onClick={handleAddComment}>Gửi bình luận</button>

        <ul className="comment-list">
          {comments.map((c, i) => (
            <li key={i}>
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
