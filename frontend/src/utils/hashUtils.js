import CryptoJS from "crypto-js";

export const md5Hash = (text) => {
  return CryptoJS.MD5(text).toString();
};
