import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BoxCategory_item = ({ data }) => {
    const resolveId = () => {
        if (data.articleId || data.id) return data.articleId || data.id; //
        if (data.link) {
            const matches = data.link.match(/-(\d+)\.htm/);
            return matches ? matches[1] : "";
        }
        return "";
    };

    const articleId = resolveId();

    const getSafeImage = () => {
        const rawImg = data.imageURL || data.thumbnail;
        if (Array.isArray(rawImg)) {
            return rawImg[0];
        }
        return rawImg || "https://placehold.co/240x150?text=No+Image";
    };

    const imageSrc = getSafeImage();

    return (
        <div className="box-category-item">
            <Link to={`/article/${articleId}`} className="box-category-link-with-avatar">
                <div className="box-category-avatar">
                    <img src={imageSrc} alt={data.title} loading="lazy" />
                </div>
            </Link>

            <div className="box-category-content">
                <h3 className="box-title-text">
                    <Link to={`/article/${articleId}`} className="box-category-link-title">
                        {data.title}
                    </Link>
                </h3>
            </div>
        </div>
    );
};

BoxCategory_item.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        articleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        link: PropTypes.string,
        title: PropTypes.string,
        imageURL: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        thumbnail: PropTypes.string,
        sapo: PropTypes.string
    }).isRequired
};

export default BoxCategory_item;