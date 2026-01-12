// const NavItem = ({ parent, subCategories, latestNews }) => {
//   return (
//     <li>
//       <a href={`/${parent.slug}.htm`} className="nav-link" title={parent.name}>
//         {parent.name}
//       </a>

//       <div className="sub-menu loaded">
//         <div className="sub-menu-flex">
//           <div className="category">
//             <a href={`/${parent.slug}.htm`} className="title-cate">
//               {parent.name}
//             </a>
//             <div className="list">
//               {subCategories.map(sub => (
//                 <a key={sub.id} href={`/${parent.slug}/${sub.slug}.htm`} className="item">
//                   {sub.name}
//                 </a>
//               ))}
//             </div>
//           </div>

//           <div className="news">
//             {latestNews.slice(0, 3).map(news => (
//               <div key={news.articleId} className="box-category-item">
//                 <a className="box-category-link-with-avatar" href={news.link}>
//                   <img src={news.thumbnail} alt={news.title} className="box-category-avatar" />
//                 </a>
//                 <div className="box-category-content">
//                   <h3>
//                     <a href={news.link} className="box-category-link-title">
//                       {news.title}
//                     </a>
//                   </h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </li>
//   );
// };

const NavItem = ({ category, articles }) => {
  return (
    <li>
      {/* Link chính trên thanh Header */}
      <a href={`/news/${category.slug}`} className="nav-link" title={category.title}>
        {category.title}
      </a>

      <div className="sub-menu loaded" data-zone={category.slug}>
        <div className="sub-menu-flex">
          {/* CỘT TRÁI: Danh sách danh mục con */}
          <div className="category">
            <a href={`/${category.slug}`} className="title-cate">
              {category.title}
            </a>
            <div className="list">
              {category.items?.map((sub) => (
                <a key={sub.id} href={sub.href} className="item" title={sub.text}>
                  {sub.text}
                </a>
              ))}
            </div>
          </div>

          {/* CỘT PHẢI: 3 bài viết mới nhất */}
          <div className="news">
            {articles?.slice(0, 3).map((art) => (
              <div key={art.articleId} className="box-category-item">
                <a className="box-category-link-with-avatar img-resize" href={art.link} title={art.title}>
                  <img src={art.thumbnail} alt={art.title} className="box-category-avatar" />
                </a>
                <div className="box-category-content">
                  <h3>
                    <a href={art.link} className="box-category-link-title" title={art.title}>
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