import React from 'react';

const NewsItem360 = ({ id, url, title, imageUrl, srcSet, category, categoryUrl, imgType }) => {
  return (
    <div className="box-category-item" data-id={id} style={{ visibility: 'visible' }}>
      <a 
        className={`box-category-link-with-avatar ${imgType || 'img-resize'}`} 
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
        {/* Nhãn chuyên mục của bài viết */}
        <a className="box-category-category" href={categoryUrl} title={category}>
          {category}
        </a>
        <h3 className="box-title-text">
          <a className="box-category-link-title" href={url} title={title}>
            {title}
          </a>
        </h3>
      </div>
    </div>
  );
};

export default NewsItem360;