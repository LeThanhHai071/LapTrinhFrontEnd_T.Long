export function flattenNews(data) {
  const result = [];

  Object.keys(data).forEach(parent => {
    Object.keys(data[parent]).forEach(sub => {
      data[parent][sub].forEach(article => {
        result.push(article);
      });
    });
  });

  return result;
}
