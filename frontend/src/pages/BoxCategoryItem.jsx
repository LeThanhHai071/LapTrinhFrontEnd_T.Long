import { Link } from "react-router-dom";

const BoxCategoryItem = ({ data }) => {
    const articleId = data.id || data.articleId || (data.link?.match(/-(\d+)\.htm/)?.[1]);
    const getSafeImage = () => {
        const rawImg = data.imageURL || data.thumbnail;
        if (Array.isArray(rawImg)) {
            return rawImg[0]; // Lấy link đầu tiên trong mảng
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
                {data.sapo && data.sapo !== "Bấm vào để xem chi tiết bài báo đã lưu." && (
                    <p className="box-category-sapo">{data.sapo}</p>
                )}
            </div>
        </div>
    );
};

export default BoxCategoryItem;