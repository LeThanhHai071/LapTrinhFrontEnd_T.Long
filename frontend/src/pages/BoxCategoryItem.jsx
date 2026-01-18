import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const BoxCategoryItem = ({ data }) => {
    const getArticleId = (url) => {
        const matches = url.match(/-(\d+)\.htm/);
        return matches ? matches[1] : "";
    };
    return (
        <div className="box-category-item" key={data.id}>
            <Link
                to={`/article/${getArticleId(data.link)}`}
                className={`box-category-link-with-avatar ${data.imgClass}`}
            >
                <img
                    src={data.imageURL}
                    className="box-category-avatar"
                    alt={data.title}
                    loading="lazy"
                />
            </Link>
            <div className="box-category-content">
                {/* <Link
          to={`/category/${data.fullSlug}`}
          className="box-category-category"
          title={data.categoryName}
        >
          {data.categoryName}
        </Link> */}
                <h3 className="box-title-text">
                    <Link
                        to={`/article/${getArticleId(data.link)}`}
                        className="box-category-link-title"
                    >
                        {data.title}
                    </Link>
                </h3>
            </div>
        </div>
    );
};

export default BoxCategoryItem;
// export default BoxCategoryItem;