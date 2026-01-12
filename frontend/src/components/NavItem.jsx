const NavItem = ({ category, articles }) => {
  return (
    <li>
      <a
        href={`/category/${category.fullSlug}`}
        className="nav-link"
        title={category.name}
      >
        {category.name}
      </a>

      <div className="sub-menu loaded">
        <div className="sub-menu-flex">
          {/* CỘT TRÁI: Danh sách danh mục con */}
          <div className="category">
            <a href={`/category/${category.fullSlug}`} className="title-cate">
              {category.name}
            </a>
            <div className="list">
              {category.children?.map((sub) => (
                <a key={sub.id} href={`/category/${sub.fullSlug}`} className="item">
                  {sub.name}
                </a>
              ))}
            </div>
          </div>

          {/* CỘT PHẢI: 3 bài viết mới nhất */}
          <div className="news">
            {articles?.slice(0, 3).map((art, idx) => (
              <div key={idx} className="box-category-item">
                <a
                  className="box-category-link-with-avatar img-resize"
                  href={`/article/${art.link.split('-').pop().replace('.htm', '')}`}
                  title={art.title}
                >
                  <img
                    src={art.imageURL}
                    alt={art.title}
                    className="box-category-avatar"
                  />
                </a>
                <div className="box-category-content">
                  <h3>
                    <a
                      href={`/article/${art.link.split('-').pop().replace('.htm', '')}`}
                      className="box-category-link-title"
                      title={art.title}
                    >
                      {art.title}
                    </a>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
};

export default NavItem;
