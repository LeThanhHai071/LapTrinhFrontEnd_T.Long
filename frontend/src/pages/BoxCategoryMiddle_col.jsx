import React from "react";
import BoxCategoryItem from "./BoxCategoryItem";

const BoxCategoryMiddle = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  let listTop = articles.filter((item) => item.imgClass === "img-resize");
  let listBottom = articles.filter((item) => item.imgClass === "img-square");

  const isTopEmpty = listTop.length === 0;
  const isBottomEmpty = listBottom.length === 0;

  if (isTopEmpty && !isBottomEmpty) {
    const source = listBottom; 
    listTop = source.slice(0, 3);
    listBottom = source.slice(3, 6);
  } else if (!isTopEmpty && isBottomEmpty) {
    const source = listTop; 
    listTop = source.slice(0, 3);
    listBottom = source.slice(3, 6);
  }
  else if (isTopEmpty && isBottomEmpty) {
    listTop = articles.slice(0, 3);
    listBottom = articles.slice(3, 6);
  }

  const COLUMNS_COUNT = 3;
  const loopIndices = Array.from({ length: COLUMNS_COUNT }, (_, i) => i);

  return (
    <div className="box-category-middle">
      {loopIndices.map((index) => {
        const itemTop = listTop[index];
        const itemBottom = listBottom[index];
        if (!itemTop && !itemBottom) return null;
        return (
          <div className="box-col" key={index}>
            {itemTop && <BoxCategoryItem data={itemTop} />}
            {itemBottom && <BoxCategoryItem data={itemBottom} />}
          </div>
        );
      })}
    </div>
  );
};

export default BoxCategoryMiddle;
