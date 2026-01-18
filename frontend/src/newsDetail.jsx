import {useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchNewsDetail} from "./services/newsService";
import "./NewsDetail.css";
import {getUserIdFromStorage} from "./utils/authUtils.js";
import {articleService} from "./services/articleService";

const NewsDetail = () => {
    const {id: articleId} = useParams();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [speaking, setSpeaking] = useState(false);

    /* ===== USER LOGIN STATE ===== */
    const [user, setUser] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    /* ===== READER SETTINGS ===== */
    const [fontFamily, setFontFamily] = useState("Arial");
    const [fontSize, setFontSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.75);

    /* ===== LOAD USER ===== */
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    /* ===== LOAD DETAIL ===== */
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        fetchNewsDetail(articleId)
            .then((data) => {
                if (!isMounted) return;
                setArticle(data);
                setError(null);

                /* check userid */
                const userId = getUserIdFromStorage(); //
                if (userId) {
                    articleService.getSavedList(userId) //
                        .then(res => {
                            if (isMounted) {
                                const alreadySaved = res.data.some(item => String(item.articleId) === String(articleId)); //
                                setIsSaved(alreadySaved); //
                            }
                        })
                        .catch(err => console.error("Lỗi đồng bộ:", err));
                }
                /* end check userid */
            })
            .catch(() => {
                if (isMounted) setError("Không tìm thấy bài viết");
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
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
        utterance.rate = 1;
        utterance.onend = () => setSpeaking(false);

        window.speechSynthesis.speak(utterance);
        setSpeaking(true);
    };

    /* ==== nút save bài báo ==== */
    const handleToggleSave = async () => {
        try {
            const res = await articleService.smartToggleSave(article, articleId); //
            setIsSaved(res.data.isSaved); //
            alert(res.data.message);
        } catch (err) {
            if (err.message === "Chưa đăng nhập") {
                alert("Vui lòng đăng nhập để lưu bài báo!");
            } else {
                console.error("Lỗi chức năng lưu bài:", err);
            }
        }
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
                userName: user.name || user.username,
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

                <div style={{marginLeft: "auto", display: "flex", gap: "10px"}}>
                    <button className="speak-btn" onClick={handleSpeak}>
                        {speaking ? "⏹ Dừng đọc" : "🔊 Đọc báo"}
                    </button>

                    <button
                        className={`save-btn ${isSaved ? "active" : ""}`}
                        onClick={handleToggleSave}
                        aria-label="Save article"
                    >
                        <div className="inner-btn">
                            <svg
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="bookmark-icon"
                            >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span>{isSaved ? "Đã lưu" : "Lưu bài"}</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* ===== READER SETTINGS ===== */}
            <div className="reader-settings">
                <label>
                    Phông chữ:
                    <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Tahoma">Tahoma</option>
                    </select>
                </label>

                <label>
                    Cỡ chữ:
                    <input
                        type="range"
                        min="14"
                        max="22"
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                    />
                    <span>{fontSize}px</span>
                </label>

                <label>
                    Giãn dòng:
                    <input
                        type="range"
                        min="1.4"
                        max="2.2"
                        step="0.1"
                        value={lineHeight}
                        onChange={(e) => setLineHeight(e.target.value)}
                    />
                    <span>{lineHeight}</span>
                </label>
            </div>

            <p className="sapo">{article.sapo}</p>

            {/* ===== CONTENT ===== */}
            <div
                className="content"
                style={{fontFamily, fontSize: `${fontSize}px`, lineHeight}}
            >
                {article.content?.map((block, index) => {
                    if (block.type === "text") return <p key={index}>{block.content}</p>;
                    if (block.type === "h2") return <h2 key={index}>{block.content}</h2>;

                    if (block.type === "image_block") {
                        return (
                            <figure key={index}>
                                <img src={block.urls} alt={block.caption || ""}/>
                                {block.caption && <figcaption>{block.caption}</figcaption>}
                            </figure>
                        );
                    }
                    return null;
                })}
            </div>

            {/* ===== COMMENT ===== */}
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
                                <strong>{c.userName}</strong>: {c.text}
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