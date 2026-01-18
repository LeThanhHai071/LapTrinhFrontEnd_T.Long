import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchNewsDetail } from "./services/newsService";
import "./NewsDetail.css";

const NewsDetail = () => {
  const { id: articleId } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [speaking, setSpeaking] = useState(false);

  /* ===== USER LOGIN STATE ===== */
  const [user, setUser] = useState(null);

  /* ===== LOAD USER ===== */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* ===== LOAD ARTICLE ===== */
  useEffect(() => {
    setLoading(true);
    fetchNewsDetail(articleId)
      .then((data) => {
        setArticle(data);
        setError(null);
      })
      .catch(() => setError("Không tìm thấy bài viết"))
      .finally(() => setLoading(false));
  }, [articleId]);

  /* ===== TEXT TO SPEECH ===== */
  const handleSpeak = () => {
    if (!article) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const bodyText = article.content
      ?.filter((b) => b.type === "text")
      .map((b) => b.content)
      .join(" ");

    const text = [article.title, article.sapo, bodyText].join(". ");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  /* ===== ADD COMMENT (LOGIN REQUIRED) ===== */
  const handleAddComment = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để bình luận!");
      return;
    }

    if (!commentText.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        user: user.name,
        text: commentText,
        time: new Date().toLocaleString("vi-VN"),
      },
    ]);

    setCommentText("");
  };

  if (loading) return <p>Đang tải bài viết...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="news-detail">
      <h1 className="title">{article.title}</h1>

      <div className="meta">
        <span>{article.publishDate}</span>
        <span>{article.author.name}</span>

        <button className="speak-btn" onClick={handleSpeak}>
          {speaking ? "⏹ Dừng đọc" : "🔊 Đọc báo"}
        </button>
      </div>

      <p className="sapo">{article.sapo}</p>

      {/* ===== CONTENT ===== */}
      <div className="content">
        {article.content?.map((block, index) => {
          if (block.type === "text") return <p key={index}>{block.content}</p>;
          if (block.type === "h2") return <h2 key={index}>{block.content}</h2>;

          if (block.type === "image_block") {
            return (
              <figure key={index}>
                <img src={block.urls} alt={block.caption || ""} />
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );
          }
          return null;
        })}
      </div>

      {/* ===== COMMENT SECTION ===== */}
      <div className="comment-section">
        <h3>Bình luận</h3>

        {!user ? (
          <p className="login-warning">
            Bạn cần <Link to="/login">đăng nhập</Link> để bình luận
          </p>
        ) : (
          <>
            <textarea
              placeholder="Nhập bình luận..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handleAddComment}>Gửi bình luận</button>
          </>
        )}

        <ul className="comment-list">
          {comments.map((c, i) => (
            <li key={i}>
              <p>
                <strong>{c.user}</strong>: {c.text}
              </p>
              <small>{c.time}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsDetail;
