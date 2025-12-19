import React from "react";
import "./home.css";

const Home = () => {
  // ===== TIN HOT =====
  const hotNews = {
    title: "Quốc hội thông qua nhiều chính sách quan trọng năm 2025",
    desc: "Sáng nay, Quốc hội đã biểu quyết thông qua nhiều luật và nghị quyết quan trọng.",
    image: "https://via.placeholder.com/800x450?text=Tin+Hot",
  };

  // ===== TIN 24H =====
  const news24h = [
    { id: 1, title: "Giá xăng tăng lần thứ 3 liên tiếp", time: "10 phút trước" },
    { id: 2, title: "TP.HCM điều chỉnh quy hoạch đô thị", time: "30 phút trước" },
    { id: 3, title: "Thời tiết: Miền Trung mưa lớn", time: "1 giờ trước" },
    { id: 4, title: "Cảnh báo lừa đảo công nghệ cao", time: "2 giờ trước" },
    { id: 5, title: "Tai nạn giao thông trên QL1A", time: "3 giờ trước" },
  ];

  // ===== CHÍNH TRỊ =====
  const politicsNews = [
    {
      id: 1,
      title: "Chủ tịch nước tiếp đoàn đại biểu quốc tế",
      desc: "Cuộc gặp nhằm tăng cường hợp tác song phương.",
      image: "https://via.placeholder.com/350x220?text=Chinh+Tri+1",
    },
    {
      id: 2,
      title: "Chính phủ họp phiên thường kỳ tháng 12",
      desc: "Thảo luận nhiều vấn đề kinh tế – xã hội.",
      image: "https://via.placeholder.com/350x220?text=Chinh+Tri+2",
    },
    {
      id: 3,
      title: "Cải cách hành chính giai đoạn mới",
      desc: "Hướng tới bộ máy tinh gọn, hiệu quả.",
      image: "https://via.placeholder.com/350x220?text=Chinh+Tri+3",
    },
  ];

  // ===== TÀI CHÍNH =====
  const financeNews = [
    {
      id: 1,
      title: "VN-Index tăng mạnh cuối phiên",
      desc: "Thị trường chứng khoán khởi sắc.",
      image: "https://via.placeholder.com/350x220?text=Tai+Chinh+1",
    },
    {
      id: 2,
      title: "Ngân hàng điều chỉnh lãi suất",
      desc: "Lãi suất vay mua nhà giảm nhẹ.",
      image: "https://via.placeholder.com/350x220?text=Tai+Chinh+2",
    },
    {
      id: 3,
      title: "Bất động sản dần phục hồi",
      desc: "Nhiều dự án được tái khởi động.",
      image: "https://via.placeholder.com/350x220?text=Tai+Chinh+3",
    },
  ];

  return (
    <div className="home">
      {/* ===== HOT + 24H ===== */}
      <section className="top-section">
        <div className="hot-news">
          <img src={hotNews.image} alt={hotNews.title} />
          <h1>{hotNews.title}</h1>
          <p>{hotNews.desc}</p>
        </div>

        <aside className="news-24h">
          <h3>Tin 24h</h3>
          <ul>
            {news24h.map((item) => (
              <li key={item.id}>
                <span className="dot">•</span>
                <div>
                  <p>{item.title}</p>
                  <small>{item.time}</small>
                </div>
              </li>
            ))}
            </ul>
        </aside>
      </section>

      {/* ===== CHÍNH TRỊ ===== */}
      <section className="category">
        <h2>Chính trị</h2>
        <div className="category-grid">
          {politicsNews.map((item) => (
            <div key={item.id} className="news-card">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TÀI CHÍNH ===== */}
      <section className="category">
        <h2>Tài chính</h2>
        <div className="category-grid">
          {financeNews.map((item) => (
            <div key={item.id} className="news-card">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>© 2025 Báo Tin Tức Việt Nam</p>
      </footer>
    </div>
  );
};

export default Home;