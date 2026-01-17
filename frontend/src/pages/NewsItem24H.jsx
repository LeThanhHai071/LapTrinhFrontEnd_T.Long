const NewsItem24H = ({ id, url, title, imageUrl, srcSet, isFirst }) => {
  return (
    <div
      className="box-category-item"
      data-id={id}
      style={{ visibility: "visible" }}
    >
      <a
        className={`box-category-link-with-avatar img-resize ${isFirst ? "box-per" : ""}`}
        href={url}
        title={title}
      >
        <img
          src={imageUrl}
          srcSet={srcSet}
          alt={title}
          className="box-category-avatar"
          loading="lazy"
        />
      </a>
      <div className="box-category-content">
        <h3 className="box-title-text">
          <a className="box-category-link-title" href={url} title={title}>
            {title}
          </a>
        </h3>
      </div>
    </div>
  );
};

export default NewsItem24H;