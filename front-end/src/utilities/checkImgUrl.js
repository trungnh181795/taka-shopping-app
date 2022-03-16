export const checkImgUrl = (url) => {
    return url ? url.match(/\.(jpeg|jpg|gif|png)$/) != null : null;
  };