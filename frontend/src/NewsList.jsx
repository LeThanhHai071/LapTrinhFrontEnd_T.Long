import { useEffect, useState } from "react";
import { fetchAllNews } from "./services/newsService";
import { Link } from "react-router-dom";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchAllNews().then(data => {
      const result = [];

      // data = final_data.json
      Object.keys(data).forEach(parentCate => {
        Object.keys(data[parentCate]).forEach(subCate => {
          data[parentCate][subCate].forEach(item => {
            result.push({
              id: btoa(item.link), // tạo id
              ...item,
              parentCate,
              subCate
            });
          });
        });
      });

      setNewsList(result);
    });
  }, []);

  return (
    <div>
      <h1>📰 Danh sách tin tức</h1>

      {newsList.map(item => (
        <div key={item.id} style={{ borderBottom: "1px solid #ddd", marginBottom: 20 }}>
          <img src={item.imageUrl} width="300" />

          <h3>{item.title}</h3>
          <p>{item.sapo}</p>

          <p>
            <small>
              {item.parentCate} / {item.cateName}
            </small>
          </p>

          <Link to={`/news/${item.id}`}>👉 Xem chi tiết</Link>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
