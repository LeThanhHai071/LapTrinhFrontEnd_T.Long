import React, { useState } from 'react';

const CategoryBox = ({ title, titleHref, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const LIMIT = 3; 

  const displayedItems = isExpanded ? items : items.slice(0, LIMIT);

  return (
    <div className="box">
      <a href={titleHref} className="title" title={title}>
        {title}
      </a>
      <div className={`list ${isExpanded ? 'is-open' : ''}`}>
        {displayedItems.map((item, index) => (
          <a key={index} href={item.href} className="item" title={item.text}>
            {item.text}
          </a>
        ))}
      </div>
      
      {items.length > LIMIT && (
        <button 
          href="javascript:;" 
          className="view-more" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'thu gọn' : 'xem thêm'}
        </button>
      )}
    </div>
  );
};

export default CategoryBox;