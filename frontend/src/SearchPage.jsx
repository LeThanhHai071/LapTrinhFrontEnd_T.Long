import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

const HighlightText = ({ text, highlight }) => {
    if (!text) return null;
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase()
                    ? <mark key={i} style={{ backgroundColor: '#ffeb3b', padding: '0 2px', borderRadius: '2px' }}>{part}</mark>
                    : part
            )}
        </span>
    );
};

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialKeyword = queryParams.get('q') || '';

    const [keyword, setKeyword] = useState(initialKeyword);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialKeyword) {
            setKeyword(initialKeyword);
            handleSearch(initialKeyword);
        }
    }, [initialKeyword]);

    const handleSearch = async (query) => {
        if (!query || query.trim().length < 2) return;
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error("Lỗi API Search:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-page-container" style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>
            <div style={{ borderBottom: '2px solid #eee', marginBottom: '20px', paddingBottom: '10px' }}>
                <h2 style={{ fontSize: '24px', color: '#333' }}>
                    {loading ? 'Đang tìm kiếm...' : `Tìm thấy ${results.length} kết quả cho "${keyword}"`}
                </h2>
            </div>

            <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm nội dung khác..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(keyword)}
                    style={{ flex: 1, padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={() => handleSearch(keyword)}
                    style={{ padding: '0 25px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Tìm kiếm
                </button>
            </div>

            {loading && <div style={{ textAlign: 'center', padding: '50px' }}>Đang quét dữ liệu...</div>}

            <div className="search-results">
                {results.map((item, index) => {
                    const title = item.title || "Bản tin không tiêu đề";
                    const description = item.sapo || item.description || "";

                    const detailId = item.articleId || (item.link ? btoa(item.link) : null);
                    const linkPath = detailId ? `/search-detail/${detailId}` : null;

                    if (!linkPath) return null;

                    return (
                        <div key={index} className="result-card" style={{
                            display: 'flex',
                            gap: '20px',
                            marginBottom: '25px',
                            padding: '15px',
                            border: '1px solid #f0f0f0',
                            borderRadius: '8px',
                            transition: 'box-shadow 0.3s'
                        }}
                             onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                             onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
                        >
                            <Link to={linkPath} style={{ flexShrink: 0 }}>
                                <img
                                    src={item.thumbnail || item.imageUrl || "https://via.placeholder.com/220x140?text=No+Image"}
                                    alt={title}
                                    style={{ width: '220px', height: '140px', objectFit: 'cover', borderRadius: '6px' }}
                                />
                            </Link>

                            <div className="result-info" style={{ flex: 1 }}>
                                <h3 style={{ marginTop: 0, fontSize: '1.2rem', lineHeight: '1.4' }}>
                                    <Link to={linkPath} style={{ textDecoration: 'none', color: '#1a0dab' }}>
                                        <HighlightText text={title} highlight={keyword} />
                                    </Link>
                                </h3>
                                <p style={{ color: '#555', fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    <HighlightText text={description} highlight={keyword} />
                                </p>
                                <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#888' }}>
                                    <span>Nguồn: {item._source || "Hệ thống"}</span>
                                    {item.publishDate && <span style={{ marginLeft: '15px' }}>{item.publishDate}</span>}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchPage;