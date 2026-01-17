import NewsItem360 from "./NewsItem360";

const News360Section = ({ sectionTitle, sectionUrl, highlightText, columns }) => {
  return (
    <div className="section__nsp-box-360" data-vr-zone={`Home - ${sectionTitle}`}>
      <div className="box-category" data-layout="4">
        
        {/* Tiêu đề Section */}
        <div className="box-category-top">
          <h2 className="title-category">
            <a className="box-category-title" href={sectionUrl} title={sectionTitle}>
              {sectionTitle} <span>{highlightText}</span>
            </a>
          </h2>
        </div>

        {/* Danh sách các cột tin */}
        <div className="box-category-middle">
          {columns.map((col, index) => (
            <div className="box-col" key={index}>
              {col.map((article) => (
                <NewsItem360 key={article.id} {...article} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News360Section;