import React, { useState } from 'react';

const CategoryBox = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const LIMIT = 5; 

  const items = category.children || [];
  const displayedItems = isExpanded ? items : items.slice(0, LIMIT);

  return (
    <div className="box">
      <a href={`/category/${category.fullSlug}`} className="title" title={category.name}>
        {category.name}
      </a>
      <div className={`list ${isExpanded ? 'is-open' : ''}`}>
        {displayedItems.map((sub) => (
          <a key={sub.id} href={`/category/${sub.fullSlug}`} className="item" title={sub.name}>
            {sub.name}
          </a>
        ))}
      </div>
      
      {items.length > LIMIT && (
        <button 
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