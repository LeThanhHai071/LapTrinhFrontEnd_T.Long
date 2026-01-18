import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchNewsDetail } from "./services/newsService";
import "./NewsDetail.css";
import { getUserIdFromStorage } from "./utils/authUtils.js";
import { articleService } from "./services/articleService";

const NewsDetail = () => {
  const { id: articleId } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const API_BASE_URL = "http://localhost:5000/api/auth";


  /* ===== LOAD DETAIL ===== */
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        fetchNewsDetail(articleId)
            .then((data) => {
                if (!isMounted) return;
                setArticle(data);
                setError(null);

                /*check userid */
                const userId = getUserIdFromStorage();
                if (userId) {
                    articleService.getSavedList(userId)
                        .then(res => {
                            if (isMounted) {
                                const alreadySaved = res.data.some(item => String(item.articleId) === String(articleId));
                                setIsSaved(alreadySaved);
                            }
                        })
                        .catch(err => console.error("Lỗi đồng bộ Coder B:", err));
                }
                /* end check userid*/
            })
            .catch(() => {
                if (isMounted) setError("Không tìm thấy bài viết");
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };
    }, [articleId]);

  /* ===== TEXT TO SPEECH ===== */
  const handleSpeak = () => {
    if (!article || speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const bodyText = article.content
      ?.filter((b) => b.type === "text")
      .map((b) => b.content)
      .join(" ");

    const text = [
      article.title,
      article.sapo,
      bodyText
    ].join(". ");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    utterance.rate = 1;
    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };




    /*====  handle nút save bài báo   ====*/
    // eslint-disable-next-line no-unused-vars
    const handleToggleSave = async () => {
        try {
            const res = await articleService.smartToggleSave(article, articleId);
            setIsSaved(res.data.isSaved);
            alert(res.data.message);
        } catch (err) {
            if (err.message === "Chưa đăng nhập") {
                alert("Vui lòng đăng nhập để lưu bài báo!");
            } else {
                console.error("Lỗi chức năng lưu bài:", err);
            }
        }
    };





  /* ===== COMMENT ===== */
  const handleAddComment = () => {
    if (!commentText.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        text: commentText,
        time: new Date().toLocaleString("vi-VN"),
      },
    ]);
    setCommentText("");
  };

  /* ===== UI STATE ===== */
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
          if (block.type === "text") {
            return <p key={index}>{block.content}</p>;
          }

          if(block.type === "h2") {
            return <h2 key={index}>{block.content}</h2>
          }

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
